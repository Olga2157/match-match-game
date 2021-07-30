import { Score } from '../models/types/Score';
import Config from '../Config';

export default class ScoreIndexedDB {
  public static async putScore(score: Score): Promise<void> {
    const open = indexedDB.open(Config.DB_NAME, Config.DB_VERSION);
    // открытие базы данных и сравнение версий
    const onUpgrade = () => {
      const db = open.result;
      db.createObjectStore('score', { autoIncrement: true });
      const params = { keyPath: 'hash' } as IDBObjectStoreParameters;
      db.createObjectStore('users', params);
    };
    open.onupgradeneeded = await onUpgrade;
    const onSuccess = () => {
      const db = open.result;
      const tx = db.transaction('score', 'readwrite');
      const store = tx.objectStore('score');

      store.put({ hashUser: score.hashUser, score: score.score });
      tx.oncomplete = () => {
        db.close();
      };
    };
    open.onsuccess = await onSuccess;
  }

  public static getScores(): Promise<Score[]> {
    return new Promise((resolve) => {
      // открытие базы данных и сравнение версий
      const open = indexedDB.open(Config.DB_NAME, Config.DB_VERSION);
      open.onupgradeneeded = () => {
        const db = open.result;
        db.createObjectStore('score', { autoIncrement: true });
        const params = { keyPath: 'hash' } as IDBObjectStoreParameters;
        db.createObjectStore('users', params);
      };
      open.onsuccess = () => {
        const db = open.result;
        const tx = db.transaction('score', 'readonly');
        const store = tx.objectStore('score');
        const allRecords = store.getAll();
        allRecords.onsuccess = () => {
          resolve(allRecords.result);
        };
      };
    });
  }
}
