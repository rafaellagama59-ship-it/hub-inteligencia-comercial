import { statusOptions, priorityOptions, cardTypeOptions, monthOptions } from '../data/defaultData';

const labels = {
  title: 'Título',
  value: 'Valor',
  source: 'Fonte',
  target: 'Meta/apoio',
  trend: 'Tendência',
  type: 'Categoria do card',
  period: 'Período',
  month: 'Mês',
  business: 'Negócio',
  location: 'Local',
  owner: 'Responsável',
  status: 'Status',
  priority: 'Prioridade',
  deadline: 'Prazo',
  notes: 'Observações',
  date: 'Data',
  cost: 'Custo',
  totalLeads: 'Total de leads',
  leads: 'Leads captados',
  leadGoal: 'Meta de leads',
  capturedLeads: 'Leads captados',
  achievementRate: '% atingimento',
  leadsDB: 'Leads DB',
  leadsUNDB: 'Leads UNDB',
  leadsPos: 'Leads Pós',
  event: 'Evento',
  block: 'Bloco',
  task: 'Tarefa',
  demand: 'Demanda',
  nextAction: 'Próxima ação',
  area: 'Área',
  name: 'Nome',
  url: 'Link',
  key: 'Chave',
  label: 'Descrição',
  csvUrl: 'CSV URL',
  school: 'Escola',
  contact: 'Contato',
  scheduledTime: 'Horário'
};

function SelectField({ value, options, onChange }) {
  return (
    <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
      {!value && <option value="">Selecionar</option>}
      {options.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}

export default function EditableTable({ title, description, rows = [], columns = [], onChange, onAdd, onDelete, addLabel = '+ Nova linha' }) {
  return (
    <section className="panel">
      <div className="panelHead">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {onAdd && <button className="ghost" onClick={onAdd}>{addLabel}</button>}
      </div>
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              {columns.map((c) => <th className={`col-${c}`} key={c}>{labels[c] || c}</th>)}
              {onDelete && <th className="col-actions">Ações</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.id || idx}>
                {columns.map((c) => (
                  <td className={`col-${c}`} key={c}>
                    {c === 'status' ? (
                      <SelectField value={row[c]} options={statusOptions} onChange={(v) => onChange(idx, c, v)} />
                    ) : c === 'priority' ? (
                      <SelectField value={row[c]} options={priorityOptions} onChange={(v) => onChange(idx, c, v)} />
                    ) : c === 'type' ? (
                      <SelectField value={row[c]} options={cardTypeOptions} onChange={(v) => onChange(idx, c, v)} />
                    ) : c === 'month' || c === 'period' ? (
                      <SelectField value={row[c]} options={monthOptions} onChange={(v) => onChange(idx, c, v)} />
                    ) : c === 'notes' || c === 'url' || c === 'csvUrl' || c === 'nextAction' || c === 'demand' || c === 'task' ? (
                      <textarea value={row[c] || ''} onChange={(e) => onChange(idx, c, e.target.value)} />
                    ) : (
                      <input value={row[c] || ''} placeholder={c === 'date' || c === 'deadline' ? 'dd/mm/aaaa' : ''} onChange={(e) => onChange(idx, c, e.target.value)} />
                    )}
                  </td>
                ))}
                {onDelete && <td className="col-actions"><button className="danger" onClick={() => onDelete(idx)}>Excluir</button></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
