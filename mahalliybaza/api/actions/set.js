import logger from '../../utils/logger'
import isSubset from '../../utils/isSubset'
import success from '../../api-utils/success'
import error from '../../api-utils/error'
import showUserErrors from '../../api-utils/showUserErrors'
import selectionLevel from '../../api-utils/selectionLevel'

export default function set(newDocument, options = {
  keys: false
}) {

  let collectionName = this.collectionName
  let docSelectionCriteria = this.docSelectionCriteria
  let currentSelectionLevel = selectionLevel.call(this)

  return new Promise((resolve, reject) => {

    // set collection
    this.setCollection = () => {
      this.lf[collectionName].clear().then(() => {
        if (!options.keys) {
          newDocument.forEach(doc => {
            this.add(doc)
          })
          resolve(
            success.call(
              this,
              `"${ collectionName }" nomli collectionda ${ newDocument.length } ta document o'rnatildi.`,
              newDocument
            )
          )
        } else {
          console.log('Kalitlar taqdim etildi')
          // check that every document in array has a _key property
          let docsWithoutKey = 0
          newDocument.forEach(doc => {
            if (!doc.hasOwnProperty('_key')) {
              docsWithoutKey++
            }
          })
          if (docsWithoutKey) {
            reject(
              error.call(
                this,
                `.set() metodiga array ichida berilgan documentlarning har birida string bo'lgan _key property bo'lishi kerak.`
              )
            )
          } else {
            newDocument.forEach(doc => {
              let key = doc._key
              delete doc._key
              this.add(doc, key)
            })
            resolve(
              success.call(
                this,
                `"${ collectionName }" nomli collectionda ${ newDocument.length } ta document bilan (qayta yozish orqali) o'rnatildi.`,
                newDocument
              )
            )
          }
        }
      }).catch(err => {
        reject(
          error.call(
            this,
            `${ JSON.stringify(newDocument) } ma'lumotlari bilan ${ collectionName } collectioni (qayta yozish) orqali o'rnatilmadi.`
          )
        )
      });
    }

    // set document
    this.setDocument = () => {

      // set document by criteria
      this.setDocumentByCriteria = () => {
        let docsToSet = []
        this.lf[collectionName].iterate((value, key) => {
          if (isSubset(value, docSelectionCriteria)) {
            docsToSet.push({
              key,
              newDocument
            })
          }
        }).then(() => {
          if (!docsToSet.length) {
            reject(
              error.call(
                this,
                `${ collectionName } collectionida ${ JSON.stringify(docSelectionCriteria) } bilan documentlar topilmadi.`
              )
            )
          }
          if (docsToSet.length > 1) {
            logger.warn.call(this, `O'rnatish uchun ${ JSON.stringify(docSelectionCriteria) } bilan (${ docsToSet.length }) ta document topildi.`)
          }
        }).then(() => {
          docsToSet.forEach((docToSet, index) => {
            this.lf[collectionName].setItem(docToSet.key, docToSet.newDocument).then(value => {

              if (index === (docsToSet.length - 1)) {
                resolve(
                  success.call(
                    this,
                    `${ JSON.stringify(docSelectionCriteria) } bilan "${ collectionName }" collectionida ${ docsToSet.length } ta document${ docsToSet.length > 1 ? 'lar' : '' } (qayta yozish) orqali o'rnatildi.`,
                    newDocument
                  )
                )
              }
            }).catch(err => {
              reject(
                error.call(
                  this,
                  `${ docsToSet.length } ta document ${ collectionName } collectioniga (qayta yozish) orqali o'rnatildi.`
                )
              )
            })
          })
        })
      }

      // set document by key
      this.setDocumentByKey = () => {
        this.lf[collectionName].setItem(docSelectionCriteria, newDocument).then(value => {
          resolve(
            success.call(
              this,
              `${ JSON.stringify(docSelectionCriteria) } kaliti bilan "${ collectionName }" collectioni ichidagi document (qayta yozish) orqali o'rnatildi.`,
              newDocument
            )
          )
        }).catch(err => {
          reject(
            error.call(
              this,
              `"${ collectionName }" collectioni ichidagi document ${ JSON.stringify(docSelectionCriteria) } kaliti bilan (qayta yozish) orqali o'rnatildi.`
            )
          )
        })
      }

      if (typeof docSelectionCriteria == 'object') {
        return this.setDocumentByCriteria()
      } else {
        return this.setDocumentByKey()
      }
    }

    // check for user errors
    if (!newDocument) {
      this.userErrors.push('set() metodi uchun yangi document objecti taqdim etilmagan. Objectdan foydalaning. Masalan: {id: 1, ism: "Otabek", yoshi: 19}.')
    } else if (currentSelectionLevel === 'doc') {
      if (!(typeof newDocument == 'object' && newDocument instanceof Array == false)) {
        this.userErrors.push('set() metodiga uzatilgan ma\'lumotlar object bo\'lishi kerak. Array, string, number yoki boolean emas.')
      }
    } else if (currentSelectionLevel === 'collection') {
      if (!(typeof newDocument == 'object' && newDocument instanceof Array == true)) {
        this.userErrors.push('.set() ga uzatilgan ma\'lumotlar object(lar)ning massiv(lari) bo\'lishi kerak. Object, string, number yoki boolean emas.')
      }
    }

    if (!this.userErrors.length) {
      if (currentSelectionLevel == 'collection') {
        return this.setCollection()
      } else if (currentSelectionLevel == 'doc') {
        return this.setDocument()
      }
    } else {
      showUserErrors.call(this)
    }

  })
}