export const defaultData = {
  indicators: [
    { id: crypto.randomUUID(), title: 'Matrículas 2026.2 UNDB', value: '--', source: 'RM / Power BI UNDB', target: 'Meta 2026.2', trend: '', type: 'Destaque' },
    { id: crypto.randomUUID(), title: 'Matrículas Dom Bosco 2026', value: '--', source: 'RM / Power BI Escola', target: 'Meta 2026', trend: '', type: 'Destaque' },
    { id: crypto.randomUUID(), title: 'Matrículas Medicina 2026.2', value: '--', source: 'RM / Power BI Medicina', target: 'Meta Medicina', trend: '', type: 'Destaque' },
    { id: crypto.randomUUID(), title: 'Inscritos Vestibular Medicina', value: '--', source: 'Processo seletivo tradicional', target: 'Acompanhamento', trend: '', type: 'Padrão' },
    { id: crypto.randomUUID(), title: 'Inscritos ENEM Medicina', value: '--', source: 'Entrada via ENEM', target: 'Acompanhamento', trend: '', type: 'Padrão' },
    { id: crypto.randomUUID(), title: 'Inscritos Transferência Externa Med', value: '--', source: 'Transferência externa Medicina', target: 'Acompanhamento', trend: '', type: 'Padrão' }
  ],
  calendar: [
    { id: crypto.randomUUID(), period: 'Junho', date: '30/06/2026', title: 'Ação Final de Semana Junho', business: 'UNDB Graduação, Dom Bosco Exponencial e Pós-Graduação', owner: 'Comercial', status: 'Em andamento', priority: 'Alta', cost: '0', totalLeads: '1014', leadsDB: '0', leadsUNDB: '0', leadsPos: '0', deadline: '30/06/2026', notes: 'Ação externa de captação e relacionamento. Canais: evento externo, WhatsApp e planilha.' },
    { id: crypto.randomUUID(), period: 'Julho', date: '01/07/2026', title: 'Clínica de Férias', business: 'UNDB Graduação', owner: 'Marketing + Comercial', status: 'Planejado', priority: 'Alta', cost: '0', totalLeads: '0', leadsDB: '0', leadsUNDB: '0', leadsPos: '0', deadline: '01/07/2026', notes: 'Experiência prática para acadêmicos da saúde.' },
    { id: crypto.randomUUID(), period: 'Julho', date: '07/07/2026', title: 'Férias em Movimento', business: 'Dom Bosco Exponencial', owner: 'Thayana', status: 'Planejado', priority: 'Alta', cost: '0', totalLeads: '0', leadsDB: '0', leadsUNDB: '0', leadsPos: '0', deadline: '07/07/2026', notes: 'Captação e relacionamento nas férias.' },
    { id: crypto.randomUUID(), period: 'Julho', date: '11/07/2026', title: 'Vestibular Medicina', business: 'Medicina', owner: 'Allyson', status: 'Em andamento', priority: 'Alta', cost: '0', totalLeads: '0', leadsDB: '0', leadsUNDB: '0', leadsPos: '0', deadline: '11/07/2026', notes: 'Acompanhar inscritos, prova, resultado e matrículas.' }
  ],
  calendar2027: [
    { id: crypto.randomUUID(), period: 'Janeiro', date: '', title: 'Planejamento Comercial 2027', business: 'Grupo Dom Bosco', owner: 'Marketing + Comercial', status: 'Planejado', priority: 'Alta', cost: '0', totalLeads: '0', leadsDB: '0', leadsUNDB: '0', leadsPos: '0', deadline: '', notes: 'Espaço aberto para consolidar ações do calendário 2027.' }
  ],
  internalActions: [
    { id: crypto.randomUUID(), date: '01/07/2026', title: 'Alinhamento Comercial', business: 'Grupo Dom Bosco', owner: 'Nathalia', status: 'Planejado', cost: '0', leads: '0', notes: 'Reunião interna de acompanhamento.' },
    { id: crypto.randomUUID(), date: '02/07/2026', title: 'Agendamento de Visitas às Escolas', business: 'Escola Dom Bosco / UNDB Graduação', owner: 'Marketing + Comercial', status: 'Planejado', cost: '0', leads: '0', notes: 'Organizar agenda de visitas, escolas prioritárias, responsáveis e retorno comercial.' }
  ],
  schoolVisits: [
    { id: crypto.randomUUID(), date: '', school: 'Escola a definir', business: 'UNDB Graduação / Dom Bosco', owner: 'Marketing + Comercial', status: 'Planejado', contact: '', scheduledTime: '', notes: 'Cadastrar escola, responsável, data e observações da visita.' }
  ],
  externalActions: [
    { id: crypto.randomUUID(), date: '15/07/2026', title: 'Ação externa de captação', business: 'UNDB Graduação', owner: 'Marketing', status: 'Planejado', cost: '0', leads: '0', notes: 'Cadastrar local e mecânica.' }
  ],
  events: [
    { id: crypto.randomUUID(), month: 'Junho', date: '30/06/2026', event: 'Ação Final de Semana Junho', business: 'Grupo Dom Bosco', owner: 'Comercial', status: 'Em andamento', cost: '0', totalLeads: '1014', notes: 'Evento realizado / em acompanhamento.' },
    { id: crypto.randomUUID(), month: 'Julho', date: '01/07/2026', event: 'Férias em Movimento', business: 'Dom Bosco Exponencial', owner: 'Thayana', status: 'Planejado', cost: '0', totalLeads: '0', notes: '' },
    { id: crypto.randomUUID(), month: 'Julho', date: '01/07/2026', event: 'Clínica de Férias', business: 'UNDB Graduação', owner: 'Marketing + Comercial', status: 'Planejado', cost: '0', totalLeads: '0', notes: '' }
  ],
  businessDemands: [
    { id: crypto.randomUUID(), business: 'Dom Bosco Exponencial', demand: 'Atualizar pendências da captação', owner: 'Ilana', nextAction: 'Validar lista de famílias e próximos contatos', deadline: '10/07/2026', status: 'Pendente', notes: '' },
    { id: crypto.randomUUID(), business: 'UNDB Graduação', demand: 'Acompanhar ações da graduação', owner: 'Allyson', nextAction: 'Atualizar status das ações e pontos de atenção', deadline: '10/07/2026', status: 'Pendente', notes: '' },
    { id: crypto.randomUUID(), business: 'Pós-Graduação', demand: 'Atualizar campanhas e cursos ativos', owner: 'Marketing', nextAction: 'Mapear cursos com prioridade comercial', deadline: '10/07/2026', status: 'Pendente', notes: '' },
    { id: crypto.randomUUID(), business: 'Medicina', demand: 'Validar status dos processos seletivos', owner: 'Allyson', nextAction: 'Atualizar inscritos, prova e próximas chamadas', deadline: '10/07/2026', status: 'Pendente', notes: '' },
    { id: crypto.randomUUID(), business: 'Policlínica UNDB', demand: 'Lançamento do produto Clube de Benefícios', owner: 'Marketing + Comercial', nextAction: 'Estruturar estratégia de lançamento do produto', deadline: '', status: 'Planejado', notes: 'Espaço em aberto para inserir estratégia, campanha, cronograma e responsáveis.' }
  ],
  businessEvents: [
    { id: crypto.randomUUID(), business: 'Dom Bosco Exponencial', date: '01/07/2026', event: 'Férias em Movimento', owner: 'Thayana', status: 'Planejado', cost: '0', leads: '0', notes: '' },
    { id: crypto.randomUUID(), business: 'UNDB Graduação', date: '01/07/2026', event: 'Clínica de Férias', owner: 'Marketing + Comercial', status: 'Planejado', cost: '0', leads: '0', notes: '' },
    { id: crypto.randomUUID(), business: 'Medicina', date: '11/07/2026', event: 'Vestibular Medicina', owner: 'Allyson', status: 'Em andamento', cost: '0', leads: '0', notes: 'Processos seletivos e acompanhamento de inscritos.' },
    { id: crypto.randomUUID(), business: 'Pós-Graduação', date: '', event: 'A definir', owner: 'Marketing', status: 'Planejado', cost: '0', leads: '0', notes: 'Cadastrar eventos e ações por curso.' },
    { id: crypto.randomUUID(), business: 'Policlínica UNDB', date: '', event: 'Lançamento Clube de Benefícios', owner: 'Marketing + Comercial', status: 'Planejado', cost: '0', leads: '0', notes: 'Estratégia em construção.' }
  ],
  domBoscoFerias: [
    { id: crypto.randomUUID(), program: 'Férias em Movimento', inscritos: '0', pagantes: '0', vouchers: '0', pacoteMensal: '0', pacoteQuinzenal: '0', pacoteSemanal: '0', pacoteDiaria: '0', notes: 'Acompanhamento comercial dos inscritos, pagantes, vouchers e pacotes vendidos.' }
  ],
  meetings: [
    { id: crypto.randomUUID(), date: '06/07/2026', block: 'Dom Bosco', owner: 'Ilana', task: 'Atualizar pendências da captação', deadline: '10/07/2026', status: 'Pendente', notes: '' },
    { id: crypto.randomUUID(), date: '06/07/2026', block: 'UNDB e Medicina', owner: 'Allyson', task: 'Validar status dos processos seletivos', deadline: '10/07/2026', status: 'Pendente', notes: '' },
    { id: crypto.randomUUID(), date: '06/07/2026', block: 'Ações - Marketing', owner: 'Marketing', task: 'Atualizar ações internas e externas', deadline: '10/07/2026', status: 'Pendente', notes: '' }
  ],
  powerbi: [
    { id: crypto.randomUUID(), area: 'Medicina', name: 'Dashboard Medicina', url: 'https://app.powerbi.com/view?r=eyJrIjoiNzI4ZWZmNmUtMjAxNS00NWVlLThhM2UtNTM1YjM1MTdjYmI1IiwidCI6ImZkOThjZTUxLTQ5ZmMtNDMyZS1hZGU3LTY0ZGQ3MWQzNGVjZSJ9' },
    { id: crypto.randomUUID(), area: 'Dom Bosco', name: 'Dashboard Dom Bosco', url: 'https://app.powerbi.com/view?r=eyJrIjoiN2U2MDAwNDQtY2EwOS00YTRjLWJjMzAtYWIxODVlMzJjMTMyIiwidCI6ImZkOThjZTUxLTQ5ZmMtNDMyZS1hZGU3LTY0ZGQ3MWQzNGVjZSJ9' },
    { id: crypto.randomUUID(), area: 'UNDB Graduação', name: 'Dashboard de Matrículas UNDB', url: 'https://app.powerbi.com/view?r=eyJrIjoiYmNlMzY0ZGYtMDNmNS00ZDg3LTlhN2UtMGI2OTc0NTZmNDdiIiwidCI6ImZkOThjZTUxLTQ5ZmMtNDMyZS1hZGU3LTY0ZGQ3MWQzNGVjZSJ9' }
  ],
  sheetConfig: [
    { id: crypto.randomUUID(), key: 'indicators', label: 'Indicadores da Home', csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=664980055&single=true&output=csv' },
    { id: crypto.randomUUID(), key: 'calendar', label: 'Calendário Comercial 2026', csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=1920524677&single=true&output=csv' },
    { id: crypto.randomUUID(), key: 'calendar2027', label: 'Calendário Comercial 2027', csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=1276893220&single=true&output=csv' },
    { id: crypto.randomUUID(), key: 'internalActions', label: 'Ações Internas', csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=231331620&single=true&output=csv' },
    { id: crypto.randomUUID(), key: 'schoolVisits', label: 'Agendamento de Visitas às Escolas', csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=1578452596&single=true&output=csv' },
    { id: crypto.randomUUID(), key: 'externalActions', label: 'Ações Externas', csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=225013141&single=true&output=csv' },
    { id: crypto.randomUUID(), key: 'events', label: 'Eventos por mês', csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=1232679214&single=true&output=csv' },
    { id: crypto.randomUUID(), key: 'businessDemands', label: 'Demandas por Negócio', csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=620556872&single=true&output=csv' },
    { id: crypto.randomUUID(), key: 'businessEvents', label: 'Eventos por Negócio', csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=1877299892&single=true&output=csv' },
    { id: crypto.randomUUID(), key: 'meetings', label: 'Reunião Comercial', csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=212748497&single=true&output=csv' },
    { id: crypto.randomUUID(), key: 'powerbiLinks', label: 'Links Power BI', csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=448232704&single=true&output=csv' },
    { id: crypto.randomUUID(), key: 'domBoscoFerias', label: 'Férias em Movimento - Dom Bosco', csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=294001099&single=true&output=csv' }
  ]
};

export const statusOptions = ['Planejado', 'Em andamento', 'Pendente', 'Aguardando', 'Concluído', 'Cancelado'];
export const priorityOptions = ['Alta', 'Média', 'Baixa'];
export const cardTypeOptions = ['Destaque', 'Padrão'];
export const monthOptions = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
