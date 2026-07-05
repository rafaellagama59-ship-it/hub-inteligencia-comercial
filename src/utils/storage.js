import { defaultData } from '../data/defaultData';

const KEY = 'hub-inteligencia-comercial-v5-ferias-20260705';
const LEGACY_KEYS = ['hub-inteligencia-comercial-v4-ajustes-20260701'];

function mergeDefaultConfig(data = {}) {
  const next = { ...defaultData, ...data };

  const defaultSheetConfig = Array.isArray(defaultData.sheetConfig) ? defaultData.sheetConfig : [];
  const currentSheetConfig = Array.isArray(data.sheetConfig) ? data.sheetConfig : [];
  const byKey = new Map();

  defaultSheetConfig.forEach((item) => {
    if (item?.key) byKey.set(item.key, { ...item });
  });

  currentSheetConfig.forEach((item) => {
    if (!item?.key) return;
    const fallback = byKey.get(item.key) || {};
    byKey.set(item.key, {
      ...fallback,
      ...item,
      csvUrl: item.csvUrl || fallback.csvUrl || ''
    });
  });

  next.sheetConfig = Array.from(byKey.values());

  if (!Array.isArray(next.domBoscoFerias) || !next.domBoscoFerias.length) {
    next.domBoscoFerias = defaultData.domBoscoFerias || [];
  }

  return next;
}

export function loadData() {
  try {
    const keys = [KEY, ...LEGACY_KEYS];

    for (const key of keys) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;

      const migrated = mergeDefaultConfig(JSON.parse(raw));
      localStorage.setItem(KEY, JSON.stringify(migrated));
      return migrated;
    }

    const initial = mergeDefaultConfig(defaultData);
    localStorage.setItem(KEY, JSON.stringify(initial));
    return initial;
  } catch {
    return mergeDefaultConfig(defaultData);
  }
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(mergeDefaultConfig(data)));
}

export function resetData() {
  localStorage.removeItem(KEY);
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  const initial = mergeDefaultConfig(defaultData);
  localStorage.setItem(KEY, JSON.stringify(initial));
  return initial;
}

export function downloadJson(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'backup-hub-inteligencia-comercial.json';
  a.click();
  URL.revokeObjectURL(url);
}
