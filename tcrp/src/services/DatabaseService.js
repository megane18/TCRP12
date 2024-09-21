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
      locateFile: () => sqlWasmUrl,
    });

    const savedDb = localStorage.getItem('sqliteDB');
    if (savedDb) {
      const dbBuffer = new Uint8Array(JSON.parse(savedDb));
      this.db = new SQL.Database(dbBuffer);
    } else {
      this.db = new SQL.Database();
    }

    this.initialized = true;
  }

  async query(sql, params = []) {
    if (!this.initialized) await this.init();
    const result = this.db.exec(sql, params);
    this._saveToLocalStorage(); // Save after every query
    return result;
  }

  _saveToLocalStorage() {
    const dbBytes = this.db.export();
    localStorage.setItem('sqliteDB', JSON.stringify(Array.from(dbBytes)));
  }

  // Reset database (for testing or clearing purposes)
  resetDatabase() {
    localStorage.removeItem('sqliteDB');
    this.db = null;
    this.initialized = false;
  }
}

export const dbService = new DatabaseService();
