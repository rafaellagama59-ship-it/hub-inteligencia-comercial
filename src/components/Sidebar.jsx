import { Home, CalendarDays, Building2, GraduationCap, Target, Stethoscope, PartyPopper, Handshake, Settings, Megaphone, Globe2, HeartPulse } from 'lucide-react';

const groups = [
  { label: 'Painel', items: [['home', 'Visão Geral', Home], ['calendar', 'Calendário Comercial', CalendarDays]] },
  { label: 'Negócios', items: [['dom-bosco', 'Escola Dom Bosco', Building2], ['undb', 'UNDB Graduação', GraduationCap], ['pos', 'Pós-Graduação', Target], ['medicina', 'Medicina', Stethoscope], ['policlinica', 'Policlínica UNDB', HeartPulse]] },
  { label: 'Operação', items: [['events', 'Eventos', PartyPopper], ['calendar-2027', 'Calendário 2027', CalendarDays], ['internal', 'Ações Internas', Megaphone], ['external', 'Ações Externas', Globe2]] },
  { label: 'Gestão', items: [['meetings', 'Reunião Comercial', Handshake], ['admin', 'Configurações', Settings]] }
];

export default function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/hub-inteligencia-comercial/logo.svg" />
        <div><strong>Hub de Inteligência</strong><span>Comercial</span></div>
      </div>
      {groups.map((g) => (
        <div className="navGroup" key={g.label}>
          <p>{g.label}</p>
          {g.items.map(([id, label, Icon]) => (
            <button key={id} onClick={() => setPage(id)} className={page === id ? 'active' : ''}>
              <Icon size={18} />{label}
            </button>
          ))}
        </div>
      ))}
      <div className="sideNote">
        <strong>Base editável</strong>
        <span>Edite direto no Hub ou conecte CSVs publicados da planilha em Configurações.</span>
      </div>
    </aside>
  );
}
