import { downloadJson } from '../utils/storage';

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

      {title === 'Escola Dom Bosco' && <FeriasMovimentoDash data={data} />}
    </>
  );
}
