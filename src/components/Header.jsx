import { useEffect } from 'react';
import { downloadJson } from '../utils/storage';

const FERIAS_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRdd7WTmB_843PzdzMlbyA3Q4tVZV-RrbcaLnj66bd-GylXnFOjI-zPkxbG7B2VA/pub?gid=294001099&single=true&output=csv';
const NPS_FERIAS_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCbNGCi5MGhgD9H0enFtC2ez22o0QaQBXtTSGmaIXG-UQkZ52xWNO6jZ8enqZISY3ELnh2WgWrFQFQ/pub?gid=0&single=true&output=csv';

function upsertFeriasConfig(data = {}) {
  const current = Array.isArray(data.sheetConfig) ? data.sheetConfig : [];
  const withoutFerias = current.filter((item) => !['domBoscoFerias', 'domBoscoNpsFerias'].includes(item?.key));

  return {
    ...data,
    domBoscoFerias: Array.isArray(data.domBoscoFerias) && data.domBoscoFerias.length
      ? data.domBoscoFerias
      : [
          {
            id: crypto.randomUUID(),
            program: 'Férias em Movimento',
            inscritos: '0',
            pagantes: '0',
            cortesia: '0',
            pacoteMensal: '0',
            pacoteQuinzenal: '0',
            pacoteSemanal: '0',
            pacoteDiaria: '0',
            emBranco: '0',
            notes: 'Acompanhamento comercial dos inscritos, pagantes, cortesias, pacotes vendidos e cadastros em branco.'
          }
        ],
    domBoscoNpsFerias: Array.isArray(data.domBoscoNpsFerias) ? data.domBoscoNpsFerias : [],
    sheetConfig: [
      ...withoutFerias,
      {
        id: crypto.randomUUID(),
        key: 'domBoscoFerias',
        label: 'Férias em Movimento - Dom Bosco',
        csvUrl: FERIAS_CSV
      },
      {
        id: crypto.randomUUID(),
        key: 'domBoscoNpsFerias',
        label: 'NPS Férias em Movimento',
        csvUrl: NPS_FERIAS_CSV
      }
    ]
  };
}

function ensureNpsConfig(data = {}) {
  const current = Array.isArray(data.sheetConfig) ? data.sheetConfig : [];
  const existing = current.find((item) => item?.key === 'domBoscoNpsFerias');

  if (existing?.csvUrl === NPS_FERIAS_CSV && Array.isArray(data.domBoscoNpsFerias)) {
    return data;
  }

  const withoutNps = current.filter((item) => item?.key !== 'domBoscoNpsFerias');

  return {
    ...data,
    domBoscoNpsFerias: Array.isArray(data.domBoscoNpsFerias) ? data.domBoscoNpsFerias : [],
    sheetConfig: [
      ...withoutNps,
      {
        id: existing?.id || crypto.randomUUID(),
        key: 'domBoscoNpsFerias',
        label: 'NPS Férias em Movimento',
        csvUrl: NPS_FERIAS_CSV
      }
    ]
  };
}

function FeriasConfigPanel({ data, setData }) {
  const hasConfig = (data?.sheetConfig || []).some((item) => item?.key === 'domBoscoFerias');
  const hasNpsConfig = (data?.sheetConfig || []).some((item) => item?.key === 'domBoscoNpsFerias');

  function applyFeriasConfig() {
    setData((current) => upsertFeriasConfig(current));
    alert('CSVs do Férias em Movimento e do NPS inseridos. Agora clique em Salvar alterações e depois em Sincronizar CSVs.');
  }

  return (
    <section className="panel">
      <div className="panelHead">
        <div>
          <p className="eyebrow">Integração do Férias em Movimento</p>
          <h2>Planilhas conectadas ao Hub</h2>
          <p>Use este botão para inserir ou corrigir automaticamente os CSVs comercial e de NPS do Férias em Movimento.</p>
        </div>
        <button className="primary" onClick={applyFeriasConfig}>Inserir CSVs do Férias</button>
      </div>

      <section className="cards small">
        <article className="card">
          <h3>Base comercial</h3>
          <strong>{hasConfig ? 'OK' : 'Falta'}</strong>
          <p>Inscritos, pagantes, cortesias e pacotes.</p>
        </article>
        <article className="card">
          <h3>Pesquisa NPS</h3>
          <strong>{hasNpsConfig ? 'OK' : 'Falta'}</strong>
          <p>Respostas, NPS, experiência, turnos e melhorias.</p>
        </article>
        <article className="card">
          <h3>Chaves</h3>
          <strong style={{ fontSize: 18 }}>domBoscoFerias</strong>
          <p>domBoscoNpsFerias</p>
        </article>
      </section>
    </section>
  );
}

export default function Header({ title, subtitle, data, setData, onSave }) {
  useEffect(() => {
    setData((current) => ensureNpsConfig(current));
  }, [setData]);

  function importJson(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        setData(JSON.parse(r.result));
        alert('Backup importado. Clique em Salvar alterações.');
      } catch {
        alert('Arquivo inválido');
      }
    };
    r.readAsText(f);
  }

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Grupo Dom Bosco</p>
          <h1>{title}</h1>
          <span>{subtitle}</span>
        </div>
        <div className="topActions">
          <button className="ghost" onClick={() => downloadJson(data)}>Exportar JSON</button>
          <label className="ghost fileBtn">
            Importar JSON
            <input type="file" accept=".json" onChange={importJson} />
          </label>
          <button className="primary" onClick={onSave}>Salvar alterações</button>
        </div>
      </header>

      {title === 'Configurações' && <FeriasConfigPanel data={data} setData={setData} />}
    </>
  );
}
