import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, AlertTriangle, CheckCircle2, ExternalLink, LineChart, Save } from 'lucide-react';
import './styles.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import EditableTable from './components/EditableTable';
import { defaultData } from './data/defaultData';
import { loadData, saveData, resetData } from './utils/storage';
import { fetchCSV } from './utils/csv';

const tableConfig={
 calendar:['period','title','business','owner','status','priority','deadline','notes'],
 internal:['date','title','business','owner','status','cost','leads','notes'],
 external:['date','title','business','owner','status','cost','leads','notes'],
 events:['date','event','business','owner','status','cost','leadsDB','leadsUNDB','leadsPos','notes'],
 meetings:['date','block','owner','task','deadline','status','notes'],
 powerbi:['area','name','url'],
 sheetConfig:['key','label','csvUrl']
};
const pageInfo={
 home:['Visão Geral','Home com os principais indicadores comerciais por negócio.'],
 calendar:['Calendário Comercial','Planejamento de campanhas, ações e marcos comerciais.'],
 internal:['Ações Internas','Acompanhamento das ações internas do Grupo Dom Bosco.'],
 external:['Ações Externas','Ações de campo, eventos externos e captação.'],
 'dom-bosco':['Escola Dom Bosco','Indicadores, ações e links do Dom Bosco Exponencial.'],
 undb:['UNDB Graduação','Acompanhamento comercial da graduação.'],
 pos:['Pós-Graduação','Acompanhamento comercial da Pós-UNDB.'],
 medicina:['Medicina','Processos seletivos, inscritos e indicadores de Medicina.'],
 events:['Eventos','Leads, custos, responsáveis e status por evento.'],
 meetings:['Reunião Comercial','Demandas geradas na reunião de segunda-feira.'],
 admin:['Configurações','Links de Power BI, CSVs da planilha e rotinas administrativas.']
};
function emptyRow(columns){return {id:crypto.randomUUID(),...Object.fromEntries(columns.map(c=>[c,c==='status'?'Planejado':c==='priority'?'Média':'']))}}
function App(){const [page,setPage]=useState(location.hash?.replace('#','')||'home'); const [data,setData]=useState(loadData()); const [toast,setToast]=useState('');
 function commit(){saveData(data); setToast('Alterações salvas neste navegador.'); setTimeout(()=>setToast(''),2500)}
 function setSection(section,rows){setData(d=>({...d,[section]:rows}))}
 function updateRow(section,idx,key,value){const rows=[...(data[section]||[])]; rows[idx]={...rows[idx],[key]:value}; setSection(section,rows)}
 function addRow(section){setSection(section,[...(data[section]||[]),emptyRow(tableConfig[section])])}
 function delRow(section,idx){setSection(section,(data[section]||[]).filter((_,i)=>i!==idx))}
 async function syncSheets(){let next={...data}; for(const cfg of data.sheetConfig||[]){if(!cfg.csvUrl) continue; try{next[cfg.key]=await fetchCSV(cfg.csvUrl)}catch(e){alert(`Erro ao sincronizar ${cfg.label}`)}} setData(next); setToast('Sincronização concluída. Clique em Salvar alterações.'); setTimeout(()=>setToast(''),2500)}
 const [title,subtitle]=pageInfo[page]||pageInfo.home;
 return <div className="app"><Sidebar page={page} setPage={(p)=>{setPage(p); location.hash=p}}/><main><Header title={title} subtitle={subtitle} data={data} setData={setData} onSave={commit}/>{toast&&<div className="toast"><Save size={16}/>{toast}</div>}<Page page={page} data={data} updateRow={updateRow} addRow={addRow} delRow={delRow} syncSheets={syncSheets} setData={setData}/></main></div>}
function Page(props){const {page,data}=props; if(page==='home') return <Home data={data}/>; if(page==='admin') return <Admin {...props}/>; if(page==='dom-bosco'||page==='undb'||page==='pos'||page==='medicina') return <Business page={page} data={data}/>; const map={calendar:'calendar',internal:'internalActions',external:'externalActions',events:'events',meetings:'meetings'}; const section=map[page]; const cols=tableConfig[page]; return <EditableTable title={pageInfo[page][0]} description="Todos os campos abaixo são editáveis. O status é selecionável." rows={data[section]||[]} columns={cols} onChange={(i,k,v)=>props.updateRow(section,i,k,v)} onAdd={()=>{const rows=[...(data[section]||[]),emptyRow(cols)]; props.setData(d=>({...d,[section]:rows}))}} onDelete={(i)=>props.setData(d=>({...d,[section]:(d[section]||[]).filter((_,idx)=>idx!==i)}))}/>}
function Home({data}){const pending=(data.meetings||[]).filter(x=>x.status!=='Concluído').length; const events=(data.events||[]).length; const done=(data.meetings||[]).filter(x=>x.status==='Concluído').length; return <><section className="hero"><div><p className="eyebrow">Dashboard Executivo</p><h2>Indicadores principais</h2><p>Resumo limpo para diretoria e reunião comercial. A edição detalhada fica nas abas operacionais e na planilha.</p></div><div className="miniStats"><span><Activity/> {events} eventos</span><span><AlertTriangle/> {pending} pendências</span><span><CheckCircle2/> {done} concluídas</span></div></section><section className="cards">{(data.indicators||[]).map((c,i)=><article className={c.type==='primary'?'card primary':'card'} key={c.id||i}><span className="cardIcon"><LineChart size={20}/></span><h3>{c.title}</h3><strong>{c.value}</strong><p>{c.source}</p><small>{c.target}{c.trend?` • ${c.trend}`:''}</small></article>)}</section><EditableTable title="Editar indicadores da Home" description="Use esta tabela para ajustes rápidos. Para atualização automática, conecte a planilha em Configurações." rows={data.indicators||[]} columns={['title','value','source','target','trend','type']} onChange={()=>{}} onAdd={()=>{}} onDelete={()=>{}} /></>}
function Business({page,data}){const areaMap={'dom-bosco':'Dom Bosco','undb':'UNDB','pos':'Pós','medicina':'Medicina'}; const area=areaMap[page]; const links=(data.powerbi||[]).filter(x=>(x.area||'').toLowerCase().includes(area.toLowerCase()) || (page==='medicina'&&(x.area||'').toLowerCase().includes('medicina'))); return <><section className="hero"><div><p className="eyebrow">{area}</p><h2>Painel comercial</h2><p>Área executiva com links estratégicos e recortes operacionais.</p></div></section><section className="linkGrid">{links.length?links.map(l=><a className="powerLink" href={l.url} target="_blank" key={l.id}><ExternalLink/>{l.name}</a>):<p className="empty">Cadastre links em Configurações.</p>}</section><section className="cards small"><article className="card"><h3>Ações no calendário</h3><strong>{(data.calendar||[]).filter(x=>(x.business||'').toLowerCase().includes(area.toLowerCase())).length}</strong><p>Itens vinculados ao negócio.</p></article><article className="card"><h3>Eventos</h3><strong>{(data.events||[]).filter(x=>(x.business||'').toLowerCase().includes(area.toLowerCase())).length}</strong><p>Eventos cadastrados.</p></article><article className="card"><h3>Pendências</h3><strong>{(data.meetings||[]).filter(x=>x.status!=='Concluído').length}</strong><p>Demandas abertas da reunião.</p></article></section></>}
function Admin({data,updateRow,addRow,delRow,syncSheets,setData}){return <><section className="hero adminHero"><div><p className="eyebrow">Administração</p><h2>Configurações e integrações</h2><p>Cadastre links CSV publicados da planilha e links Power BI.</p></div><div className="topActions"><button className="primary" onClick={syncSheets}>Sincronizar CSVs</button><button className="ghost" onClick={()=>{if(confirm('Restaurar dados iniciais?')) setData(resetData())}}>Restaurar base</button></div></section><EditableTable title="Links Power BI" description="Botões exibidos nas páginas de negócio." rows={data.powerbi||[]} columns={tableConfig.powerbi} onChange={(i,k,v)=>updateRow('powerbi',i,k,v)} onAdd={()=>addRow('powerbi')} onDelete={(i)=>delRow('powerbi',i)}/><EditableTable title="Planilhas CSV" description="Publique cada aba da planilha como CSV e cole o link aqui." rows={data.sheetConfig||[]} columns={tableConfig.sheetConfig} onChange={(i,k,v)=>updateRow('sheetConfig',i,k,v)} onAdd={()=>addRow('sheetConfig')} onDelete={(i)=>delRow('sheetConfig',i)}/></>}
createRoot(document.getElementById('root')).render(<App/>);
