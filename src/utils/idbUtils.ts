const idbUtils = {
  getTransaction(objectStoreName: string, mode: IDBTransactionMode, db?: IDBDatabase) {
    if (!db) throw new Error('[IDB]: database is not initialized')
    return db.transaction(objectStoreName, mode).objectStore(objectStoreName)
  }
}


export default idbUtils