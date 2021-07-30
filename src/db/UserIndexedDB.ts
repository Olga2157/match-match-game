import { User } from '../models/types/User';
import Config from '../Config';

export default class UserIndexedDB {
  public static async putUser(user: User): Promise<void> {
    // открытие базы данных и сравнение версий
    const open = indexedDB.open(Config.DB_NAME, Config.DB_VERSION);
    const onupgradeneeded = () => {
      const db = open.result;
      const params = { keyPath: 'hash' } as IDBObjectStoreParameters;
      db.createObjectStore('users', params);
      db.createObjectStore('score', { autoIncrement: true });
    };
    open.onupgradeneeded = await onupgradeneeded;
    const onSuccess = () => {
      const db = open.result;
      const tx = db.transaction('users', 'readwrite');
      const store = tx.objectStore('users');
      store.put(user);
      tx.oncomplete = () => {
        db.close();
      };
    };
    open.onsuccess = await onSuccess;
  }

  public static getUser(hashId: number): Promise<User> {
    return new Promise((resolve) => {
      const open = indexedDB.open(Config.DB_NAME, Config.DB_VERSION);
      // открытие базы данных и сравнение версий
      open.onupgradeneeded = () => {
        const db = open.result;
        const params = { keyPath: 'hash' } as IDBObjectStoreParameters;
        db.createObjectStore('users', params);
        db.createObjectStore('score', { autoIncrement: true });
      };
      open.onsuccess = () => {
        const db = open.result;
        const tx = db.transaction('users', 'readonly');
        const store = tx.objectStore('users');
        const user = store.get(hashId);
        user.onsuccess = () => {
          resolve(user.result);
        };
      };
    });
  }
}
