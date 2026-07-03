function normalizeKey(key = '') {
  return String(key)
    .trim()
    .replace(/^\uFEFF/, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

const headerAliases = {
  chave: 'key',
  key: 'key',
  titulo: 'title',
  title: 'title',
  acao: 'title',
  valor: 'value',
  value: 'value',
  fonte: 'source',
  source: 'source',
  meta: 'target',
  target: 'target',
  apoio: 'target',
  tendencia: 'trend',
  trend: 'trend',
  observacao: 'notes',
  observacoes: 'notes',
  notes: 'notes',
  tipo: 'type',
  categoria: 'category',
  categoriacard: 'type',
  period: 'period',
  periodo: 'period',
  mes: 'month',
  month: 'month',
  data: 'date',
  date: 'date',
  negocio: 'business',
  business: 'business',
  responsavel: 'owner',
  owner: 'owner',
  status: 'status',
  prioridade: 'priority',
  priority: 'priority',
  custo: 'cost',
  cost: 'cost',
  totalleads: 'totalLeads',
  totaldeleads: 'totalLeads',
  leadsdb: 'leadsDB',
  leadsundb: 'leadsUNDB',
  leadspos: 'leadsPos',
  leadscaptados: 'leads',
  leads: 'leads',
  prazo: 'deadline',
  deadline: 'deadline',
  evento: 'event',
  event: 'event',
  bloco: 'block',
  block: 'block',
  tarefa: 'task',
  task: 'task',
  demanda: 'demand',
  demand: 'demand',
  proximaacao: 'nextAction',
  nextaction: 'nextAction',
  area: 'area',
  nome: 'name',
  name: 'name',
  link: 'url',
  url: 'url',
  csvurl: 'csvUrl',
  escola: 'school',
  school: 'school',
  contato: 'contact',
  contact: 'contact',
  horario: 'scheduledTime',
  scheduledtime: 'scheduledTime',
  local: 'location',
  location: 'location'
};

function normalizeHeader(header) {
  const normalized = normalizeKey(header);
  return headerAliases[normalized] || String(header).trim();
}

export function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', quote = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i + 1];
    if (c === '"' && quote && n === '"') { cell += '"'; i++; continue; }
    if (c === '"') { quote = !quote; continue; }
    if (c === ',' && !quote) { row.push(cell); cell = ''; continue; }
    if ((c === '\n' || c === '\r') && !quote) {
      if (cell || row.length) { row.push(cell); rows.push(row); row = []; cell = ''; }
      if (c === '\r' && n === '\n') i++;
      continue;
    }
    cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }

  const headers = (rows.shift() || []).map(normalizeHeader);
  return rows
    .filter((r) => r.some((value) => String(value || '').trim()))
    .map((r) => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? '').trim()])))
    .map((x) => ({ id: crypto.randomUUID(), ...x }));
}

function ensureCardType(row, index) {
  if (row.type) return row.type;
  return index < 3 ? 'Destaque' : 'Padrão';
}

function formatIndicator(row, index) {
  return {
    id: row.id || crypto.randomUUID(),
    title: row.title || row.name || row.key || 'Indicador',
    value: row.value || '--',
    source: row.source || row.notes || '',
    target: row.target || '',
    trend: row.trend || '',
    type: ensureCardType(row, index)
  };
}

function formatPowerBI(row) {
  return {
    id: row.id || crypto.randomUUID(),
    area: row.area || row.business || '',
    name: row.name || row.title || 'Dashboard',
    url: row.url || '',
    notes: row.notes || ''
  };
}

function formatLeads(row) {
  return {
    ...row,
    leads: row.leads || row.totalLeads || row.leadsCaptados || '',
    totalLeads: row.totalLeads || row.leads || ''
  };
}

export function normalizeCSVRows(section, rows) {
  if (section === 'indicators') return rows.map(formatIndicator);
  if (section === 'powerbi' || section === 'powerbiLinks') return rows.map(formatPowerBI).filter((row) => row.url);
  if (['internalActions', 'externalActions', 'businessEvents'].includes(section)) return rows.map(formatLeads);
  return rows;
}

export async function fetchCSV(url, section = '') {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao buscar CSV');
  return normalizeCSVRows(section, parseCSV(await res.text()));
}
