export const defaultData = {
  indicators: [
    { id: crypto.randomUUID(), title: 'Matrículas 2026.2 UNDB', value: '--', source: 'RM / Power BI UNDB', target: 'Meta 2026.2', trend: '', type: 'primary' },
    { id: crypto.randomUUID(), title: 'Matrículas Dom Bosco 2026', value: '--', source: 'RM / Power BI Escola', target: 'Meta 2026', trend: '', type: 'primary' },
    { id: crypto.randomUUID(), title: 'Matrículas Medicina 2026.2', value: '--', source: 'RM / Power BI Medicina', target: 'Meta Medicina', trend: '', type: 'primary' },
    { id: crypto.randomUUID(), title: 'Inscritos Vestibular Medicina', value: '--', source: 'Processo seletivo tradicional', target: 'Acompanhamento', trend: '', type: 'secondary' },
    { id: crypto.randomUUID(), title: 'Inscritos ENEM Medicina', value: '--', source: 'Entrada via ENEM', target: 'Acompanhamento', trend: '', type: 'secondary' },
    { id: crypto.randomUUID(), title: 'Inscritos Transferência Externa Med', value: '--', source: 'Transferência externa Medicina', target: 'Acompanhamento', trend: '', type: 'secondary' }
  ],
  calendar: [
    { id: crypto.randomUUID(), period: 'Julho', title: 'Clínica de Férias', business: 'UNDB Graduação', owner: 'Marketing + Comercial', status: 'Planejado', priority: 'Alta', deadline: '2026-07-01', notes: 'Ação de experiência prática para acadêmicos da saúde.' },
    { id: crypto.randomUUID(), period: 'Julho', title: 'Vestibular Medicina', business: 'Medicina', owner: 'Allyson', status: 'Em andamento', priority: 'Alta', deadline: '2026-07-11', notes: 'Acompanhar inscritos, prova e conversão.' }
  ],
  internalActions: [
    { id: crypto.randomUUID(), date: '2026-07-01', title: 'Alinhamento Comercial', business: 'Grupo Dom Bosco', owner: 'Nathalia', status: 'Planejado', cost: '0', leads: '0', notes: 'Reunião interna de acompanhamento.' }
  ],
  externalActions: [
    { id: crypto.randomUUID(), date: '2026-07-15', title: 'Ação externa de captação', business: 'UNDB Graduação', owner: 'Marketing', status: 'Planejado', cost: '0', leads: '0', notes: 'Cadastrar local e mecânica.' }
  ],
  events: [
    { id: crypto.randomUUID(), date: '2026-07-01', event: 'Férias em Movimento', business: 'Dom Bosco Exponencial', owner: 'Thayana', status: 'Planejado', cost: '0', leadsDB: '0', leadsUNDB: '0', leadsPos: '0', notes: '' }
  ],
  meetings: [
    { id: crypto.randomUUID(), date: '2026-07-06', block: 'Dom Bosco', owner: 'Ilana', task: 'Atualizar pendências da captação', deadline: '2026-07-10', status: 'Pendente', notes: '' },
    { id: crypto.randomUUID(), date: '2026-07-06', block: 'UNDB e Medicina', owner: 'Allyson', task: 'Validar status dos processos seletivos', deadline: '2026-07-10', status: 'Pendente', notes: '' },
    { id: crypto.randomUUID(), date: '2026-07-06', block: 'Ações - Marketing', owner: 'Marketing', task: 'Atualizar ações internas e externas', deadline: '2026-07-10', status: 'Pendente', notes: '' }
  ],
  powerbi: [
    { id: crypto.randomUUID(), area: 'Medicina', name: 'Dashboard Medicina', url: 'https://app.powerbi.com/view?r=eyJrIjoiNzI4ZWZmNmUtMjAxNS00NWVlLThhM2UtNTM1YjM1MTdjYmI1IiwidCI6ImZkOThjZTUxLTQ5ZmMtNDMyZS1hZGU3LTY0ZGQ3MWQzNGVjZSJ9' },
    { id: crypto.randomUUID(), area: 'Dom Bosco', name: 'Dashboard Dom Bosco', url: 'https://app.powerbi.com/view?r=eyJrIjoiN2U2MDAwNDQtY2EwOS00YTRjLWJjMzAtYWIxODVlMzJjMTMyIiwidCI6ImZkOThjZTUxLTQ5ZmMtNDMyZS1hZGU3LTY0ZGQ3MWQzNGVjZSJ9' },
    { id: crypto.randomUUID(), area: 'Call Center', name: 'Ranking de Matrículas Call Center', url: 'https://app.powerbi.com/view?r=eyJrIjoiYmNlMzY0ZGYtMDNmNS00ZDg3LTlhN2UtMGI2OTc0NTZmNDdiIiwidCI6ImZkOThjZTUxLTQ5ZmMtNDMyZS1hZGU3LTY0ZGQ3MWQzNGVjZSJ9' }
  ],
  sheetConfig: [
    { id: crypto.randomUUID(), key: 'indicators', label: 'Indicadores da Home', csvUrl: '' },
    { id: crypto.randomUUID(), key: 'calendar', label: 'Calendário Comercial', csvUrl: '' },
    { id: crypto.randomUUID(), key: 'events', label: 'Eventos', csvUrl: '' },
    { id: crypto.randomUUID(), key: 'meetings', label: 'Reunião Comercial', csvUrl: '' }
  ]
};

export const statusOptions = ['Planejado', 'Em andamento', 'Pendente', 'Aguardando', 'Concluído', 'Cancelado'];
export const priorityOptions = ['Alta', 'Média', 'Baixa'];
