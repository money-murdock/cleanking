const KEY = 'cleanking-state-v1';

export function createLocalRepository(storage = window.localStorage) {
  return {
    load() {
      try { return JSON.parse(storage.getItem(KEY) || 'null'); } catch { return null; }
    },
    save(value) { storage.setItem(KEY, JSON.stringify(value)); },
    clear() { storage.removeItem(KEY); },
  };
}

export const repository = createLocalRepository();

