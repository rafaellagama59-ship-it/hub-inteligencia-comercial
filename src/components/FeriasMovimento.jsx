export default function FeriasMovimento({ data }) {
  const ferias = (data?.domBoscoFerias || [])[0] || {};

  const cards = [
    ['Inscritos', ferias.inscritos || '0'],
    ['Pagantes', ferias.pagantes || '0'],
    ['Vouchers', ferias.vouchers || '0'],
    ['Mensal', ferias.pacoteMensal || '0'],
    ['Quinzenal', ferias.pacoteQuinzenal || '0'],
    ['Semanal', ferias.pacoteSemanal || '0'],
    ['Diária', ferias.pacoteDiaria || '0']
  ];

  return (
    <section className="panel ferias-panel">
      <div className="panelHead">
        <div>
          <span className="eyebrow">Dom Bosco</span>
          <h2>Férias em Movimento</h2>
          <p>Acompanhamento de inscritos, pagantes, vouchers e pacotes vendidos.</p>
        </div>
      </div>

      <div className="ferias-grid">
        {cards.map(([title, value]) => (
          <article className="ferias-card" key={title}>
            <span>{title}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
