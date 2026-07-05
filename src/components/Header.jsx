import { downloadJson } from '../utils/storage';

const FERIAS_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=294001099&single=true&output=csv';

function upsertFeriasConfig(data = {}) {
  const current = Array.isArray(data.sheetConfig) ? data.sheetConfig : [];
  const withoutFerias = current.filter((item) => item?.key !== 'domBoscoFerias');

  return {
    ...data,
    domBoscoFerias: Array.isArray(data.domBoscoFerias) && data.domBoscoFerias.length
      ? data.domBoscoFerias
      : [
          {
            id: crypto.randomUUID(),
            program: 'Férias em Movimento',
            inscritos: '0',
            pagantes: '0',
            vouchers: '0',
            pacoteMensal: '0',
            pacoteQuinzenal: '0',
            pacoteSemanal: '0',
            pacoteDiaria: '0',
            notes: 'Acompanhamento comercial dos inscritos, pagantes, vouchers e pacotes vendidos.'
          }
        ],
    sheetConfig: [
      ...withoutFerias,
      {
        id: crypto.randomUUID(),
        key: 'domBoscoFerias',
        label: 'Férias em Movimento - Dom Bosco',
        csvUrl: FERIAS_CSV
      }
    ]
  };
}

function FeriasMovimentoDash({ data }) {
  const ferias = (data?.domBoscoFerias || [])[0] || {};

  const cards = [
    ['Inscritos', ferias.inscritos || '0', 'Total de inscrições registradas.'],
    ['Pagantes', ferias.pagantes || '0', 'Inscrições pagas confirmadas.'],
    ['Vouchers', ferias.vouchers || '0', 'Inscrições via voucher.'],
    ['Mensal', ferias.pacoteMensal || '0', 'Pacotes mensais vendidos.'],
    ['Quinzenal', ferias.pacoteQuinzenal || '0', 'Pacotes quinzenais vendidos.'],
    ['Semanal', ferias.pacoteSemanal || '0', 'Pacotes semanais vendidos.'],
    ['Diária', ferias.pacoteDiaria || '0', 'Diárias vendidas.']
  ];

  return (
    <section className="panel">
      <div className="panelHead">
        <div>
          <p className="eyebrow">Férias em Movimento</p>
          <h2>Resumo comercial</h2>
          <p>Dash de inscritos, pagantes, vouchers e pacotes do Férias em Movimento.</p>
        </div>
      </div>

      <section className="cards small">
        {cards.map(([title, value, description]) => (
          <article className="card" key={title}>
            <h3>{title}</h3>
            <strong>{value}</strong>
            <p>{description}</p>
          </article>
        ))}
      </section>
    </section>
  );
}

function FeriasConfigPanel({ data, setData }) {
  const hasConfig = (data?.sheetConfig || []).some((item) => item?.key === 'domBoscoFerias');

  function applyFeriasConfig() {
    setData((current) => upsertFeriasConfig(current));
    alert('CSV do Férias em Movimento inserido. Agora clique em Salvar alterações e depois em Sincronizar CSVs.');
  }

  return (
    <section className="panel">
      <div className="panelHead">
        <div>
          <p className="eyebrow">Correção obrigatória</p>
          <h2>Planilha Férias em Movimento - Dom Bosco</h2>
          <p>Use este botão para inserir ou corrigir automaticamente a linha do CSV do Férias em Movimento.</p>
        </div>
        <button className="primary" onClick={applyFeriasConfig}>Inserir CSV do Férias</button>
      </div>

      <section className="cards small">
        <article className="card">
          <h3>Status</h3>
          <strong>{hasConfig ? 'OK' : 'Falta'}</strong>
          <p>{hasConfig ? 'A chave domBoscoFerias já existe.' : 'Clique no botão para criar a chave domBoscoFerias.'}</p>
        </article>
        <article className="card">
          <h3>Chave</h3>
          <strong style={{ fontSize: 22 }}>domBoscoFerias</strong>
          <p>É essa chave que alimenta o dash da página Escola Dom Bosco.</p>
        </article>
        <article className="card">
          <h3>Descrição</h3>
          <strong style={{ fontSize: 22 }}>Férias em Movimento</strong>
          <p>Inscritos, pagantes, vouchers e pacotes vendidos.</p>
        </article>
      </section>
    </section>
  );
}

export default function Header({ title, subtitle, data, setData, onSave }) {
  function importJson(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        setData(JSON.parse(r.result));
        alert('Backup importado. Clique em Salvar alterações.');
      } catch {
        alert('Arquivo inválido');
      }
    };
    r.readAsText(f);
  }

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Grupo Dom Bosco</p>
          <h1>{title}</h1>
          <span>{subtitle}</span>
        </div>
        <div className="topActions">
          <button className="ghost" onClick={() => downloadJson(data)}>Exportar JSON</button>
          <label className="ghost fileBtn">
            Importar JSON
            <input type="file" accept=".json" onChange={importJson} />
          </label>
          <button className="primary" onClick={onSave}>Salvar alterações</button>
        </div>
      </header>

      {title === 'Configurações' && <FeriasConfigPanel data={data} setData={setData} />}
      {title === 'Escola Dom Bosco' && <FeriasMovimentoDash data={data} />}
    </>
  );
}
