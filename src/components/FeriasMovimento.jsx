import NpsFerias from './NpsFerias.jsx';

export default function FeriasMovimento({ data }) {
  const ferias = (data?.domBoscoFerias || [])[0] || {};

  const cards = [
    ['Inscritos', ferias.inscritos || '0'],
    ['Pagantes', ferias.pagantes || '0'],
    ['Cortesia', ferias.cortesia || '0'],
    ['Mensal', ferias.pacoteMensal || '0'],
    ['Quinzenal', ferias.pacoteQuinzenal || '0'],
    ['Semanal', ferias.pacoteSemanal || '0'],
    ['Diária', ferias.pacoteDiaria || '0'],
    ['Alunos externos', ferias.alunosExternos || '0']
  ];

  return (
    <>
      <section className="panel">
        <div className="panelHead">
          <div>
            <span className="eyebrow">Dom Bosco</span>
            <h2>Férias em Movimento</h2>
            <p>Acompanhamento comercial de inscritos, pagantes, cortesias, pacotes vendidos e alunos externos.</p>
          </div>
        </div>

        <section className="cards small">
          {cards.map(([title, value]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <strong>{value}</strong>
            </article>
          ))}
        </section>
      </section>

      <NpsFerias data={data} />
    </>
  );
}
