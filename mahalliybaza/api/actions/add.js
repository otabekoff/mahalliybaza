let UUID = require('ordered-uuid')
import success from '../../api-utils/success'
import error from '../../api-utils/error'
import showUserErrors from '../../api-utils/showUserErrors'

export default function add(data, keyProvided) {
  // check for user errors
  if (!data) {
    this.userErrors.push('add() metodida ma\'lumot yo\'q. Siz objectdan foydalanishingiz kerak, misol: { id: 1, ism: "Otabek", yosh: 19 }')
  }
  else if (!(typeof data == 'object' && data instanceof Array == false)) {
    this.userErrors.push('add() funksiyasiga uzatilgan ma\'lumot object bo\'lishi kerak. Array, string, number yoki boolean emas.')
  }

  // no user errors, do the add
  if (!this.userErrors.length) {
    let collectionName = this.collectionName
  
    return new Promise((resolve, reject) => {
      let key = null

      // if no key provided, generate random, ordered key
      if (!keyProvided) {
        key = UUID.generate()
      }
      else {
        key = keyProvided
      }

      return this.lf[collectionName].setItem(key, data).then(() => {
        resolve(
          success.call(
            this,
            `Document "${ collectionName }" collectioniga qo'shildi.`,
            { key, data }
          )
        )
      }).catch(err => {
        reject(
          error.call(
            this,
            `Documentni ${ collectionName } collectioniga qo'shib bo'lmadi.`
          )
        )
      })
    })
  }
  else {
    showUserErrors.call(this)
  }
}