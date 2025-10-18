import { CONFIG } from "@workspace/ui/config/config";


const DB_NAME = CONFIG.SiteName;
const STORE_NAME = `${DB_NAME}Store`;
const DB_VERSION = 1;

class IndexedDbService {
  private db: IDBDatabase | null = null;
  private dbReadyPromise: Promise<void>;

  constructor() {
    this.dbReadyPromise = this.openDatabase();
  }

  private openDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof indexedDB === "undefined") {
        reject(new Error("IndexedDB is not supported in this environment"));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      request.onupgradeneeded = () => {
        this.db = request.result;
        if (!this.db.objectStoreNames.contains(STORE_NAME)) {
          this.db.createObjectStore(STORE_NAME, { keyPath: "key" });
        }
      };
    });
  }

  private async getDb(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    await this.dbReadyPromise;
    if (!this.db) throw new Error("Database is not initialized");
    return this.db;
  }

  private async runTransaction<T>(
    mode: IDBTransactionMode,
    operation: (store: IDBObjectStore) => IDBRequest<T>
  ): Promise<T> {
    const db = await this.getDb();
    return new Promise<T>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, mode);
      const store = tx.objectStore(STORE_NAME);
      const request = operation(store);

      request.onsuccess = () => resolve(request.result as T);
      request.onerror = () => reject(request.error);
      tx.onerror = () => reject(tx.error);
    });
  }

  async createRecord(key: string, data: any) {
    try {
      return await this.runTransaction("readwrite", (store) =>
        store.add({ key, data })
      );
    } catch (err: any) {
      if (err?.name === "ConstraintError") {
        return this.updateRecord(key, data);
      }
      throw err;
    }
  }

  updateRecord(key: string, data: any) {
    return this.runTransaction("readwrite", (store) =>
      store.put({ key, data })
    );
  }

  getRecord<T = any>(key: string): Promise<T | null> {
    return this.runTransaction("readonly", (store) => store.get(key)).then(
      (record: any) => (record ? record.data ?? null : null)
    );
  }

  deleteRecord(key: string) {
    return this.runTransaction("readwrite", (store) => store.delete(key)).then(
      () => true
    );
  }
}

/* ---------- Safe Singleton ---------- */
let instance: IndexedDbService | null = null;

function getIndexedDbService(): IndexedDbService | null {
  if (typeof window === "undefined") {
    return null; // SSR: no IndexedDB
  }
  if (!instance) {
    instance = new IndexedDbService();
  }
  return instance;
}

/* ---------- Public API ---------- */
export async function getItem<T = any>(key: string): Promise<T | null> {
  const svc = getIndexedDbService();
  if (!svc) return null; // SSR-safe
  return svc.getRecord<T>(key);
}

export async function setItem<T = any>(key: string, value: T): Promise<void> {
  const svc = getIndexedDbService();
  if (!svc) return; // SSR-safe
  const existing = await svc.getRecord(key);
  if (existing) {
    await svc.updateRecord(key, value);
  } else {
    await svc.createRecord(key, value);
  }
}

export async function removeItem(key: string): Promise<void> {
  const svc = getIndexedDbService();
  if (!svc) return; // SSR-safe
  await svc.deleteRecord(key);
}

export default getIndexedDbService;
