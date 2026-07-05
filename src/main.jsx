import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ExternalLink, LineChart, Save } from 'lucide-react';
import './styles.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FeriasMovimento from './components/FeriasMovimento.jsx';
import EditableTable from './components/EditableTable';
import { loadData, saveData, resetData } from './utils/storage';
import { fetchCSV } from './utils/csv';

const columns = {
  calendar: ['period', 'date', 'title', 'business', 'owner', 'status', 'priority', 'cost', 'totalLeads', 'leadsDB', 'leadsUNDB', 'leadsPos', 'deadline', 'notes'],
  calendar2027: ['period', 'date', 'title', 'business', 'owner', 'status', 'priority', 'cost', 'totalLeads', 'leadsDB', 'leadsUNDB', 'leadsPos', 'deadline', 'notes'],
  internalActions: ['date', 'title', 'business', 'owner', 'status', 'cost', 'leads', 'notes'],
  schoolVisits: ['date', 'school', 'business', 'owner', 'status', 'contact', 'scheduledTime', 'notes'],
  externalActions: ['date', 'title', 'location', 'business', 'owner', 'status', 'cost', 'leadGoal', 'capturedLeads', 'achievementRate', 'totalLeads'],
  external: ['date', 'title', 'location', 'business', 'owner', 'status', 'cost', 'leadGoal', 'capturedLeads', 'achievementRate', 'totalLeads'],
  events: ['month', 'date', 'event', 'business', 'owner', 'status', 'cost', 'totalLeads', 'notes'],
  businessDemands: ['business', 'demand', 'owner', 'nextAction', 'deadline', 'status', 'notes'],
  businessEvents: ['date', 'event', 'owner', 'status', 'cost', 'leads', 'notes'],
  meetings: ['date', 'block', 'owner', 'task', 'deadline', 'status', 'notes'],
  powerbi: ['area', 'name', 'url'],
  sheetConfig: ['key', 'label', 'csvUrl']
};

const pageInfo = {
  home: ['Visão Geral', 'Home com os principais indicadores comerciais por negócio.'],
  calendar: ['Calendário Comercial', 'Planejamento de campanhas, ações, gastos, leads e marcos comerciais.'],
  'calendar-2027': ['Calendário 2027', 'Planejamento comercial e operacional para 2027.'],
  internal: ['Ações Internas', 'Acompanhamento das ações internas e agendamento de visitas às escolas.'],
  external: ['Ações Externas', 'Ações de campo, eventos externos e captação.'],
  'dom-bosco': ['Escola Dom Bosco', 'Demandas, próximos passos, eventos e indicadores do Dom Bosco Exponencial.'],
  undb: ['UNDB Graduação', 'Demandas, próximos passos, eventos e indicadores da graduação.'],
  pos: ['Pós-Graduação', 'Demandas, próximos passos, eventos e indicadores da Pós-UNDB.'],
  medicina: ['Medicina', 'Processos seletivos, demandas, eventos e indicadores de Medicina.'],
  policlinica: ['Policlínica UNDB', 'Estratégia, lançamento do Clube de Benefícios e acompanhamento comercial.'],
  events: ['Eventos', 'Tabela por mês com ações realizadas e próximas ações.'],
  meetings: ['Reunião Comercial', 'Demandas geradas na reunião de segunda-feira.'],
  admin: ['Configurações', 'Links de Power BI, CSVs da planilha e rotinas administrativas.']
};

const businessMap = {
  'dom-bosco': 'Dom Bosco Exponencial',
  undb: 'UNDB Graduação',
  pos: 'Pós-Graduação',
  medicina: 'Medicina',
  policlinica: 'Policlínica UNDB'
};

function makeRow(cols, overrides = {}) {
  const base = Object.fromEntries(cols.map((c) => {
    if (c === 'status') return [c, 'Planejado'];
    if (c === 'priority') return [c, 'Média'];
    if (c === 'cost' || c === 'totalLeads' || c === 'leads' || c === 'leadGoal' || c === 'capturedLeads' || c === 'leadsDB' || c === 'leadsUNDB' || c === 'leadsPos') return [c, '0'];
    if (c === 'period' || c === 'month') return [c, 'Julho'];
    return [c, ''];
  }));
  return { id: crypto.randomUUID(), ...base, ...overrides };
}

function includesBusiness(value = '', business = '') {
  const v = String(value).toLowerCase();
  const b = String(business).toLowerCase();
  if (!b) return false;
  if (v.includes(b)) return true;
  if (business === 'Dom Bosco Exponencial' && v.includes('dom bosco')) return true;
  if (business === 'UNDB Graduação' && (v.includes('undb') || v.includes('graduação'))) return true;
  if (business === 'Pós-Graduação' && (v.includes('pós') || v.includes('pos'))) return true;
  if (business === 'Policlínica UNDB' && v.includes('policlínica')) return true;
  return false;
}

function App() {
  const [page, setPage] = useState(location.hash?.replace('#', '') || 'home');
  const [data, setData] = useState(loadData());
  const [toast, setToast] = useState('');
  const [syncing, setSyncing] = useState(false);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  }

  function commit() {
    saveData(data);
    showToast('Alterações salvas neste navegador.');
  }

  function updateRow(section, idx, key, value) {
    setData((d) => {
      const rows = [...(d[section] || [])];
      rows[idx] = { ...rows[idx], [key]: value };
      return { ...d, [section]: rows };
    });
  }

  function addRow(section, cols, overrides = {}) {
    setData((d) => ({ ...d, [section]: [...(d[section] || []), makeRow(cols, overrides)] }));
  }

  function deleteRow(section, idx) {
    setData((d) => ({ ...d, [section]: (d[section] || []).filter((_, i) => i !== idx) }));
  }

  async function syncSheets() {
    if (syncing) return;
    const configs = (data.sheetConfig || []).filter((cfg) => String(cfg.csvUrl || '').trim());

    if (!configs.length) {
      showToast('Nenhum link CSV configurado.');
      return;
    }

    setSyncing(true);
    showToast(`Sincronizando ${configs.length} abas...`);

    const results = await Promise.allSettled(
      configs.map(async (cfg) => {
        const sectionKey = cfg.key === 'powerbiLinks' ? 'powerbi' : cfg.key;
        const rows = await fetchCSV(cfg.csvUrl, sectionKey);
        return { cfg, sectionKey, rows };
      })
    );

    const next = { ...data };
    const failed = [];
    let success = 0;

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        next[result.value.sectionKey] = result.value.rows;
        success += 1;
      } else {
        console.error(result.reason);
        failed.push(result.reason?.message || 'Erro desconhecido');
      }
    });

    setData(next);
    setSyncing(false);

    if (failed.length) {
      showToast(`Sincronização parcial: ${success}/${configs.length} abas. Confira links com erro.`);
      alert(`Algumas abas não sincronizaram (${failed.length}). Confira se os links CSV estão publicados corretamente.`);
      return;
    }

    showToast(`Sincronização concluída: ${success}/${configs.length} abas. Clique em Salvar alterações.`);
  }

  const [title, subtitle] = pageInfo[page] || pageInfo.home;

  return (
    <div className="app">
      <Sidebar page={page} setPage={(p) => { setPage(p); location.hash = p; }} />
      <main>
        <Header title={title} subtitle={subtitle} data={data} setData={setData} onSave={commit} />
        {toast && <div className="toast"><Save size={16} />{toast}</div>}
        <Page
          page={page}
          data={data}
          updateRow={updateRow}
          addRow={addRow}
          deleteRow={deleteRow}
          syncSheets={syncSheets}
          syncing={syncing}
          setData={setData}
        />
      </main>
    </div>
  );
}

function Page(props) {
  const { page, data, updateRow, addRow, deleteRow } = props;

  if (page === 'home') return <Home data={data} />;
  if (page === 'admin') return <Admin {...props} />;
  if (['dom-bosco', 'undb', 'pos', 'medicina', 'policlinica'].includes(page)) return <Business page={page} {...props} />;

  if (page === 'calendar') {
    return <EditableTable title="Calendário Comercial 2026" description="Inclui data da ação, gasto, total de leads e leads por unidade." rows={data.calendar || []} columns={columns.calendar} onChange={(i, k, v) => updateRow('calendar', i, k, v)} onAdd={() => addRow('calendar', columns.calendar)} onDelete={(i) => deleteRow('calendar', i)} />;
  }

  if (page === 'calendar-2027') {
    return <EditableTable title="Calendário Comercial 2027" description="Espaço para planejamento das ações de 2027." rows={data.calendar2027 || []} columns={columns.calendar2027} onChange={(i, k, v) => updateRow('calendar2027', i, k, v)} onAdd={() => addRow('calendar2027', columns.calendar2027, { period: 'Janeiro' })} onDelete={(i) => deleteRow('calendar2027', i)} />;
  }

  if (page === 'internal') return <InternalActions {...props} />;
  if (page === 'events') return <Events {...props} />;

  const map = { external: 'externalActions', meetings: 'meetings' };
  const section = map[page];
  const title = pageInfo[page][0];
  const cols = columns[section];

  return <EditableTable title={title} description="Todos os campos abaixo são editáveis. O status é selecionável." rows={data[section] || []} columns={cols} onChange={(i, k, v) => updateRow(section, i, k, v)} onAdd={() => addRow(section, cols)} onDelete={(i) => deleteRow(section, i)} />;
}

function normalizeMetricValue(value) {
  if (value === null || value === undefined) return null;
  const raw = String(value).trim();
  if (!raw || raw === '--') return null;
  const cleaned = raw.replace(/\./g, '').replace(',', '.').replace(/[^0-9.-]/g, '');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function findIndicator(indicators, terms) {
  return (indicators || []).find((item) => {
    const title = String(item.title || '').toLowerCase();
    return terms.every((term) => title.includes(term));
  });
}

function metricText(value) {
  return value === null ? 'número pendente' : `${value.toLocaleString('pt-BR')}`;
}

function buildStrategicReading(data) {
  const indicators = data.indicators || [];
  const db = normalizeMetricValue(findIndicator(indicators, ['dom bosco'])?.value);
  const undb = normalizeMetricValue(findIndicator(indicators, ['undb'])?.value);
  const med = normalizeMetricValue(findIndicator(indicators, ['medicina', 'matr'])?.value);
  const vestibular = normalizeMetricValue(findIndicator(indicators, ['vestibular'])?.value);
  const enem = normalizeMetricValue(findIndicator(indicators, ['enem'])?.value);
  const transferencia = normalizeMetricValue(findIndicator(indicators, ['transfer'])?.value);
  const pending = (data.meetings || []).filter((x) => x.status !== 'Concluído').length;
  const events = (data.events || []).length;

  const hasMainNumbers = [db, undb, med].some((value) => value !== null);
  const totalMedDemand = [vestibular, enem, transferencia].reduce((sum, value) => sum + (value || 0), 0);

  if (!hasMainNumbers) {
    return {
      headline: 'Assim que os números de matrícula forem preenchidos, esta área passa a mostrar a leitura estratégica da captação por negócio, com foco em onde reforçar atuação comercial, eventos e follow-up.',
      db: 'Acompanhar matrículas 2026, agendamentos de visita e ações de relacionamento com famílias. O foco é transformar visitas e eventos em reserva de vaga.',
      undb: 'Acompanhar matrículas 2026.2, ações por curso e conversão dos interessados gerados nas ações externas e experiências acadêmicas.',
      med: 'Acompanhar matrícula, vestibular tradicional, ENEM e transferência externa para priorizar o canal com maior potencial de fechamento.',
      focus: `${events} eventos mapeados e ${pending} pendências comerciais abertas para acompanhamento na reunião.`
    };
  }

  const leader = [
    ['Dom Bosco', db],
    ['UNDB Graduação', undb],
    ['Medicina', med]
  ].filter(([, value]) => value !== null).sort((a, b) => b[1] - a[1])[0]?.[0];

  return {
    headline: `Leitura atual: ${leader ? `${leader} concentra o maior volume informado` : 'a base já tem números para leitura'}, com ${metricText(db)} matrículas Dom Bosco, ${metricText(undb)} matrículas UNDB e ${metricText(med)} matrículas Medicina. A prioridade é cruzar esses resultados com ações, eventos e pendências abertas para acelerar fechamento.`,
    db: `Dom Bosco está com ${metricText(db)} matrículas. Priorizar visitas às escolas, relacionamento com famílias e retorno rápido dos leads gerados em ações internas e eventos.`,
    undb: `UNDB está com ${metricText(undb)} matrículas 2026.2. Reforçar ações por curso, Clínica de Férias, experiências acadêmicas e follow-up comercial por responsável.`,
    med: `Medicina está com ${metricText(med)} matrículas e ${totalMedDemand ? totalMedDemand.toLocaleString('pt-BR') : 'demanda ainda pendente'} inscritos/interessados somando vestibular, ENEM e transferência. O foco é separar canal com maior chance de matrícula.`,
    focus: `${events} eventos mapeados e ${pending} pendências abertas. Usar a reunião comercial para definir responsável, prazo e próxima ação por negócio.`
  };
}


function findDashboardForIndicator(card, dashboards = []) {
  const title = String(card.title || '').toLowerCase();
  const source = String(card.source || '').toLowerCase();
  const text = `${title} ${source}`;
  const list = dashboards || [];

  if (text.includes('dom bosco')) return list.find((d) => includesBusiness(d.area, 'Dom Bosco'));
  if (text.includes('medicina') || text.includes('vestibular') || text.includes('enem') || text.includes('transfer')) return list.find((d) => includesBusiness(d.area, 'Medicina'));
  if (text.includes('call center')) return list.find((d) => includesBusiness(d.area, 'Call Center'));
  if (text.includes('undb')) return list.find((d) => includesBusiness(d.area, 'UNDB Graduação') || includesBusiness(d.area, 'UNDB'));
  return null;
}

function DashboardLinks({ links = [] }) {
  const validLinks = (links || []).filter((item) => item.url && item.name);
  if (!validLinks.length) return null;

  return (
    <section className="dashboardQuickLinks">
      <div>
        <span>Dashboards em tempo real</span>
        <h2>Acompanhamento público dos painéis</h2>
        <p>Clique em um dashboard para abrir o Power BI público e acompanhar os números atualizados.</p>
      </div>
      <div className="dashboardQuickGrid">
        {validLinks.map((link) => (
          <a href={link.url} target="_blank" rel="noreferrer" key={link.id || link.url}>
            <ExternalLink size={18} />
            <strong>{link.name}</strong>
            <small>{link.area}</small>
          </a>
        ))}
      </div>
    </section>
  );
}

function Home({ data }) {
  const reading = buildStrategicReading(data);

  return (
    <>
      <section className="strategicReading">
        <div className="readingMain">
          <span>Leitura estratégica da captação</span>
          <h2>Dom Bosco, UNDB e Medicina</h2>
          <p>{reading.headline}</p>
        </div>
        <div className="readingGrid">
          <article>
            <strong>Dom Bosco</strong>
            <p>{reading.db}</p>
          </article>
          <article>
            <strong>UNDB Graduação</strong>
            <p>{reading.undb}</p>
          </article>
          <article>
            <strong>Medicina</strong>
            <p>{reading.med}</p>
          </article>
          <article>
            <strong>Foco da semana</strong>
            <p>{reading.focus}</p>
          </article>
        </div>
      </section>
      <DashboardLinks links={data.powerbi || []} />
      <section className="cards">
        {(data.indicators || []).map((c, i) => {
          const dash = findDashboardForIndicator(c, data.powerbi || []);
          return (
            <article className={c.type === 'Destaque' || c.type === 'primary' ? 'card primary' : 'card'} key={c.id || i}>
              <span className="cardIcon"><LineChart size={20} /></span>
              <h3>{c.title || 'Indicador'}</h3>
              <strong>{c.value || '--'}</strong>
              <p>{c.source}</p>
              <small>{c.target}{c.trend ? ` • ${c.trend}` : ''}</small>
              {dash?.url && <a className="cardDashLink" href={dash.url} target="_blank" rel="noreferrer">Abrir dashboard</a>}
            </article>
          );
        })}
      </section>
    </>
  );
}

function InternalActions({ data, updateRow, addRow, deleteRow }) {
  return (
    <>
      <EditableTable title="Ações Internas" description="Acompanhamento das ações internas do Grupo Dom Bosco." rows={data.internalActions || []} columns={columns.internalActions} onChange={(i, k, v) => updateRow('internalActions', i, k, v)} onAdd={() => addRow('internalActions', columns.internalActions)} onDelete={(i) => deleteRow('internalActions', i)} />
      <EditableTable title="Agendamento de visitas às escolas" description="Controle de escolas, responsáveis, contatos e status das visitas." rows={data.schoolVisits || []} columns={columns.schoolVisits} onChange={(i, k, v) => updateRow('schoolVisits', i, k, v)} onAdd={() => addRow('schoolVisits', columns.schoolVisits)} onDelete={(i) => deleteRow('schoolVisits', i)} />
    </>
  );
}

function Events({ data, updateRow, addRow, deleteRow }) {
  return <EditableTable title="Eventos por mês" description="Preencha mês, data, evento, negócio, responsável, status, custo, total de leads e observações." rows={data.events || []} columns={columns.events} onChange={(i, k, v) => updateRow('events', i, k, v)} onAdd={() => addRow('events', columns.events)} onDelete={(i) => deleteRow('events', i)} />;
}

function FilteredEditableTable({ title, description, section, rows, columns: cols, filter, defaults, updateRow, addRow, deleteRow }) {
  const indexedRows = (rows || []).map((row, index) => ({ row, index })).filter(({ row }) => filter(row));
  return (
    <EditableTable
      title={title}
      description={description}
      rows={indexedRows.map(({ row }) => row)}
      columns={cols}
      onChange={(visibleIndex, key, value) => updateRow(section, indexedRows[visibleIndex].index, key, value)}
      onAdd={() => addRow(section, cols, defaults)}
      onDelete={(visibleIndex) => deleteRow(section, indexedRows[visibleIndex].index)}
    />
  );
}

function Business(props) {
  const { page, data, updateRow, addRow, deleteRow } = props;
  const business = businessMap[page];
  const label = page === 'policlinica' ? 'Policlínica' : business.replace(' Exponencial', '').replace('-Graduação', '');
  const links = (data.powerbi || []).filter((x) => includesBusiness(x.area, business) || (page === 'medicina' && includesBusiness(x.area, 'Medicina')));
  const businessEventsRows = data.businessEvents || [];
  const businessDemandsRows = data.businessDemands || [];

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">{label}</p>
          <h2>Painel comercial</h2>
          <p>Área executiva com demandas, responsáveis, próximas ações, prazos e eventos do negócio.</p>
        </div>
      </section>

      <section className="linkGrid">
        {links.length ? links.map((l) => <a className="powerLink" href={l.url} target="_blank" key={l.id} rel="noreferrer"><ExternalLink />{l.name}</a>) : <p className="empty">Cadastre links em Configurações.</p>}
      </section>

      <section className="cards small">
        <article className="card"><h3>Ações no calendário</h3><strong>{(data.calendar || []).filter((x) => includesBusiness(x.business, business)).length}</strong><p>Itens vinculados ao negócio.</p></article>
        <article className="card"><h3>Eventos</h3><strong>{businessEventsRows.filter((x) => includesBusiness(x.business, business)).length}</strong><p>Eventos cadastrados para este negócio.</p></article>
        <article className="card"><h3>Pendências</h3><strong>{businessDemandsRows.filter((x) => includesBusiness(x.business, business) && x.status !== 'Concluído').length}</strong><p>Demandas abertas do negócio.</p></article>
      </section>

      {page === 'dom-bosco' && <FeriasMovimento data={data} />}

      <FilteredEditableTable
        title="Demandas, responsáveis e próximos passos"
        description="Use este espaço durante as reuniões comerciais para registrar demanda, responsável, próxima ação e prazo."
        section="businessDemands"
        rows={businessDemandsRows}
        columns={columns.businessDemands}
        filter={(row) => includesBusiness(row.business, business)}
        defaults={{ business }}
        updateRow={updateRow}
        addRow={addRow}
        deleteRow={deleteRow}
      />

      <FilteredEditableTable
        title="Eventos do negócio"
        description="Tabela com data, evento, responsável, status, custo, leads captados e observações."
        section="businessEvents"
        rows={businessEventsRows}
        columns={columns.businessEvents}
        filter={(row) => includesBusiness(row.business, business)}
        defaults={{ business }}
        updateRow={updateRow}
        addRow={addRow}
        deleteRow={deleteRow}
      />
    </>
  );
}

function Admin({ data, updateRow, addRow, deleteRow, syncSheets, syncing, setData }) {
  return (
    <>
      <section className="hero adminHero">
        <div>
          <p className="eyebrow">Administração</p>
          <h2>Configurações e integrações</h2>
          <p>Cadastre links CSV publicados da planilha e links Power BI.</p>
        </div>
        <div className="topActions">
          <button className="primary" onClick={syncSheets} disabled={syncing}>{syncing ? 'Sincronizando...' : 'Sincronizar CSVs'}</button>
          <button className="ghost" onClick={() => { if (confirm('Restaurar dados iniciais?')) setData(resetData()); }}>Restaurar base</button>
        </div>
      </section>
      <EditableTable title="Links Power BI" description="Botões exibidos nas páginas de negócio." rows={data.powerbi || []} columns={columns.powerbi} onChange={(i, k, v) => updateRow('powerbi', i, k, v)} onAdd={() => addRow('powerbi', columns.powerbi)} onDelete={(i) => deleteRow('powerbi', i)} />
      <EditableTable title="Planilhas CSV" description="Publique cada aba da planilha como CSV e cole o link aqui." rows={data.sheetConfig || []} columns={columns.sheetConfig} onChange={(i, k, v) => updateRow('sheetConfig', i, k, v)} onAdd={() => addRow('sheetConfig', columns.sheetConfig)} onDelete={(i) => deleteRow('sheetConfig', i)} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
