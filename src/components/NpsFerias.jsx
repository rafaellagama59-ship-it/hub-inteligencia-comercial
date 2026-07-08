function normalizeText(value = '') {
  return String(value)
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function getValue(row, patterns = []) {
  const entries = Object.entries(row || {}).filter(([key]) => key !== 'id');

  for (const pattern of patterns) {
    const found = entries.find(([key]) => {
      const normalizedKey = normalizeText(key);
      return pattern.every((term) => normalizedKey.includes(normalizeText(term)));
    });

    if (found) return String(found[1] ?? '').trim();
  }

  return '';
}

function parseScore(value) {
  const match = String(value || '').match(/\d+(?:[.,]\d+)?/);
  if (!match) return null;
  const score = Number(match[0].replace(',', '.'));
  return Number.isFinite(score) && score >= 0 && score <= 10 ? score : null;
}

function experienceScore(value) {
  const normalized = normalizeText(value);
  if (normalized === 'excelente') return 5;
  if (normalized === 'muitoboa' || normalized === 'muitobom') return 4;
  if (normalized === 'boa' || normalized === 'bom') return 3;
  if (normalized === 'regular') return 2;
  if (normalized === 'ruim') return 1;
  return null;
}

function dateLabel(value) {
  const raw = String(value || '').trim();
  if (!raw) return 'Sem data';
  const firstPart = raw.split(/[ T]/)[0];
  return firstPart || 'Sem data';
}

function average(values) {
  const valid = values.filter((value) => Number.isFinite(value));
  if (!valid.length) return null;
  return valid.reduce((sum, value) => sum + value, 0) / valid.length;
}

function formatDecimal(value) {
  return value === null ? '0,0' : value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function percent(value, total) {
  if (!total) return '0%';
  return `${Math.round((value / total) * 100)}%`;
}

export default function NpsFerias({ data }) {
  const rows = Array.isArray(data?.domBoscoNpsFerias) ? data.domBoscoNpsFerias : [];

  const normalizedRows = rows.map((row) => {
    const timestamp = getValue(row, [
      ['carimbo', 'data', 'hora'],
      ['timestamp'],
      ['data', 'hora']
    ]);

    const npsRaw = getValue(row, [
      ['recomendaria', 'colonia'],
      ['0a10', 'recomendaria'],
      ['recomendaria', 'pai', 'mae']
    ]);

    const experience = getValue(row, [
      ['avalia', 'experiencia', 'filho'],
      ['experiencia', 'geral', 'filho'],
      ['experiencia', 'geral']
    ]);

    const preferredShift = getValue(row, [
      ['turno', 'preferencia'],
      ['preferencia', 'familia', 'colonia']
    ]);

    const referral = getValue(row, [
      ['indicar', 'familia'],
      ['nome', 'contato', 'indicada']
    ]);

    const improvement = getValue(row, [
      ['melhorar', 'proximos', 'dias'],
      ['algo', 'melhorar']
    ]);

    return {
      timestamp,
      date: dateLabel(timestamp),
      npsScore: parseScore(npsRaw),
      experience,
      experienceScore: experienceScore(experience),
      preferredShift,
      referral,
      improvement
    };
  });

  const validNps = normalizedRows.filter((row) => row.npsScore !== null);
  const promoters = validNps.filter((row) => row.npsScore >= 9).length;
  const neutrals = validNps.filter((row) => row.npsScore >= 7 && row.npsScore <= 8).length;
  const detractors = validNps.filter((row) => row.npsScore <= 6).length;
  const nps = validNps.length ? Math.round(((promoters - detractors) / validNps.length) * 100) : 0;
  const averageNps = average(validNps.map((row) => row.npsScore));
  const averageExperience = average(normalizedRows.map((row) => row.experienceScore));
  const referrals = normalizedRows.filter((row) => row.referral).length;

  const experienceOptions = ['Excelente', 'Muito boa', 'Boa', 'Regular', 'Ruim'];
  const experienceDistribution = experienceOptions.map((label) => {
    const count = normalizedRows.filter((row) => normalizeText(row.experience) === normalizeText(label)).length;
    return { label, count };
  });

  const shiftOrder = ['Manhã', 'Tarde', 'Integral, com refeição inclusa'];
  const shiftDistribution = shiftOrder.map((label) => {
    const count = normalizedRows.filter((row) => normalizeText(row.preferredShift) === normalizeText(label)).length;
    return { label, count };
  });

  const dailyMap = new Map();
  validNps.forEach((row) => {
    const current = dailyMap.get(row.date) || [];
    current.push(row.npsScore);
    dailyMap.set(row.date, current);
  });

  const dailyRows = Array.from(dailyMap.entries())
    .map(([date, scores]) => {
      const dayPromoters = scores.filter((score) => score >= 9).length;
      const dayDetractors = scores.filter((score) => score <= 6).length;
      const dayNps = Math.round(((dayPromoters - dayDetractors) / scores.length) * 100);
      return { date, responses: scores.length, average: average(scores), nps: dayNps };
    })
    .sort((a, b) => a.date.localeCompare(b.date, 'pt-BR'));

  const comments = normalizedRows
    .filter((row) => row.improvement)
    .slice()
    .reverse()
    .slice(0, 10);

  return (
    <>
      <section className="panel">
        <div className="panelHead">
          <div>
            <span className="eyebrow">Pesquisa de satisfação</span>
            <h2>NPS — Férias em Movimento</h2>
            <p>Acompanhamento geral das respostas, experiência das famílias, preferência de turno e oportunidades de melhoria.</p>
          </div>
        </div>

        <section className="cards small">
          <article className="card"><h3>NPS geral</h3><strong>{nps}</strong><p>Promotores menos detratores.</p></article>
          <article className="card"><h3>Nota média</h3><strong>{formatDecimal(averageNps)}</strong><p>Média das notas de 0 a 10.</p></article>
          <article className="card"><h3>Experiência média</h3><strong>{formatDecimal(averageExperience)}</strong><p>Média de 1 a 5.</p></article>
          <article className="card"><h3>Respostas</h3><strong>{rows.length}</strong><p>Total recebido na pesquisa.</p></article>
          <article className="card"><h3>Promotores</h3><strong>{promoters}</strong><p>{percent(promoters, validNps.length)} das respostas válidas.</p></article>
          <article className="card"><h3>Neutros</h3><strong>{neutrals}</strong><p>{percent(neutrals, validNps.length)} das respostas válidas.</p></article>
          <article className="card"><h3>Detratores</h3><strong>{detractors}</strong><p>{percent(detractors, validNps.length)} das respostas válidas.</p></article>
          <article className="card"><h3>Indicações</h3><strong>{referrals}</strong><p>Famílias indicadas na pesquisa.</p></article>
        </section>
      </section>

      <section className="panel">
        <div className="panelHead">
          <div>
            <h2>Avaliação da experiência</h2>
            <p>Distribuição das respostas de Excelente a Ruim.</p>
          </div>
        </div>
        <div className="tableWrap">
          <table>
            <thead><tr><th>Avaliação</th><th>Respostas</th><th>Percentual</th></tr></thead>
            <tbody>
              {experienceDistribution.map((item) => (
                <tr key={item.label}><td>{item.label}</td><td>{item.count}</td><td>{percent(item.count, rows.length)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panelHead">
          <div>
            <h2>Preferência de turno</h2>
            <p>Leitura da preferência informada pelas famílias.</p>
          </div>
        </div>
        <div className="tableWrap">
          <table>
            <thead><tr><th>Turno</th><th>Respostas</th><th>Percentual</th></tr></thead>
            <tbody>
              {shiftDistribution.map((item) => (
                <tr key={item.label}><td>{item.label}</td><td>{item.count}</td><td>{percent(item.count, rows.length)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panelHead">
          <div>
            <h2>Evolução diária</h2>
            <p>NPS e média das respostas por dia útil da pesquisa.</p>
          </div>
        </div>
        <div className="tableWrap">
          <table>
            <thead><tr><th>Data</th><th>Respostas</th><th>Nota média</th><th>NPS</th></tr></thead>
            <tbody>
              {dailyRows.length ? dailyRows.map((item) => (
                <tr key={item.date}><td>{item.date}</td><td>{item.responses}</td><td>{formatDecimal(item.average)}</td><td>{item.nps}</td></tr>
              )) : <tr><td colSpan="4">Ainda não há respostas válidas para exibir.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panelHead">
          <div>
            <h2>Pontos de melhoria</h2>
            <p>Últimos comentários enviados pelas famílias.</p>
          </div>
        </div>
        <div className="tableWrap">
          <table>
            <thead><tr><th>Data</th><th>Comentário</th></tr></thead>
            <tbody>
              {comments.length ? comments.map((item, index) => (
                <tr key={`${item.date}-${index}`}><td>{item.date}</td><td>{item.improvement}</td></tr>
              )) : <tr><td colSpan="2">Nenhum comentário enviado até o momento.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
