import initSqlJs from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

class DatabaseService {
  constructor() {
    this.db = null;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    const SQL = await initSqlJs({
      locateFile: () => sqlWasmUrl
    });

    this.db = new SQL.Database();
    this.initialized = true;
  }

  async query(sql, params = []) {
    if (!this.initialized) await this.init();
    return this.db.exec(sql, params);
  }

  // ... other methods ...
}

export const dbService = new DatabaseService();