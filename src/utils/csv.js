export function parseCSV(text){
  const rows=[]; let row=[], cell='', quote=false;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(c==='"' && quote && n==='"'){cell+='"';i++;continue}
    if(c==='"'){quote=!quote;continue}
    if(c===',' && !quote){row.push(cell);cell='';continue}
    if((c==='\n'||c==='\r') && !quote){ if(cell||row.length){row.push(cell);rows.push(row);row=[];cell=''} if(c==='\r'&&n==='\n')i++; continue }
    cell+=c;
  }
  if(cell||row.length){row.push(cell);rows.push(row)}
  const headers=(rows.shift()||[]).map(h=>h.trim());
  return rows.filter(r=>r.some(Boolean)).map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]??'']))).map(x=>({id:crypto.randomUUID(),...x}));
}
export async function fetchCSV(url){const res=await fetch(url); if(!res.ok) throw new Error('Erro ao buscar CSV'); return parseCSV(await res.text())}
