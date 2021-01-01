import localForage from "localforage";

export default function collection(collectionName) {
  if (!collectionName) {
    this.userErrors.push('Collection() metodida to\'plam nomi ko\'rsatilmagan')
    return this
  }
  else if (typeof collectionName !== 'string') {
    this.userErrors.push('Collection() metodidagi to\'plam nomi string bo\'lishi kerak, object, number yoki boolean emas.')
    return this
  }
  else {
    this.collectionName = collectionName

    let dbName = this.dbName

    // if we've not created a localForage instance 
    // for this collection, create one
    if (!(collectionName in this.lf)) {
      this.lf[collectionName] = localForage.createInstance({
        driver      : localForage.INDEXEDDB,
        name        : dbName,
        storeName   : collectionName
      })
    }
    return this
  }

}