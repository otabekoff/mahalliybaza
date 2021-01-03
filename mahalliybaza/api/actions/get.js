import isSubset from '../../utils/isSubset'
import logger from "../../utils/logger"
import reset from '../../api-utils/reset'
import selectionLevel from '../../api-utils/selectionLevel'
import showUserErrors from '../../api-utils/showUserErrors'

export default function get(options = {
  keys: false
}) {

  // get collection
  this.getCollection = () => {
    let collectionName = this.collectionName
    let orderByProperty = this.orderByProperty
    let orderByDirection = this.orderByDirection
    let limitBy = this.limitBy

    let collection = []
    return this.lf[collectionName].iterate((value, key) => {
      let collectionItem = {}
      if (!options.keys) {
        collectionItem = value
      } else {
        collectionItem = {
          key: key,
          data: value
        }
      }
      collection.push(collectionItem)
    }).then(() => {
      let logMessage = `"${ collectionName }" collectioni olindi`
      // orderBy
      if (orderByProperty) {
        logMessage += `, "${ orderByProperty }" orqali tartiblandi`
        if (!options.keys) {
          collection.sort((a, b) => {
            return a[orderByProperty].toString().localeCompare(b[orderByProperty].toString())
          })
        } else {
          collection.sort((a, b) => {
            return a.data[orderByProperty].toString().localeCompare(b.data[orderByProperty].toString())
          })
        }
      }
      if (orderByDirection == 'desc') {
        logMessage += ` (descending)`
        collection.reverse()
      }
      // limit
      if (limitBy) {
        logMessage += `, ${ limitBy } tagacha checklandi`
        collection = collection.splice(0, limitBy)
      }
      logMessage += `:`
      logger.log.call(this, logMessage, collection)
      reset.call(this)
      return collection
    })
  }

  // get document
  this.getDocument = () => {
    let collectionName = this.collectionName
    let docSelectionCriteria = this.docSelectionCriteria

    let collection = []
    let document = {}

    // get document by criteria
    this.getDocumentByCriteria = () => {
      return this.lf[collectionName].iterate((value, key) => {
        if (isSubset(value, docSelectionCriteria)) {
          collection.push(value)
        }
      }).then(() => {
        if (!collection.length) {
          logger.error.call(this, `${ JSON.stringify(docSelectionCriteria)} mezonlari bilan "${ collectionName }" collectionidagi documentlar topilmadi.`)
        } else {
          document = collection[0]
          logger.log.call(this, `${ JSON.stringify(docSelectionCriteria) } bilan document olindi:`, document)
          reset.call(this)
          return document
        }
      })
    }

    // get document by key
    this.getDocumentByKey = () => {
      return this.lf[collectionName].getItem(docSelectionCriteria).then((value) => {
        document = value
        if (document) {
          logger.log.call(this, `${ JSON.stringify(docSelectionCriteria) } bilan document olindi:`, document)
        } else {
          logger.error.call(this, `${ JSON.stringify(docSelectionCriteria)} kaliti bilan "${ collectionName }" collectionida document topilmadi.`)
        }
        reset.call(this)
        return document
      }).catch(err => {
        logger.error.call(this, `${ JSON.stringify(docSelectionCriteria)} kaliti bilan "${ collectionName }" collectionida document topilmadi.`)
        reset.call(this)
      });
    }

    if (typeof docSelectionCriteria == 'object') {
      return this.getDocumentByCriteria()
    } else {
      return this.getDocumentByKey()
    }
  }

  // check for user errors
  if (!(typeof options == 'object' && options instanceof Array == false)) {
    this.userErrors.push('get() ga uzatilgan ma\'lumotlar object bo\'lishi kerak. Array, string, number yoki boolean emas. Objectda keys (kalitlar) xususiyati true yoki falsega o\'rnatilgan bo\'lishi kerak. Masalan: {keys: true}.')
  } else {
    if (!options.hasOwnProperty('keys')) {
      this.userErrors.push('get() metodiga uzatilgan object true yoki false qiymatli keys (kalitlar) booleani bo\'lishi kerak. Masalan: { keys: true }')
    } else {
      if (typeof options.keys !== 'boolean') {
        this.userErrors.push('get() metodiga uzatilgan keys (kalitlar) booleaniga true yoki false qiymat berilishi kerak. String yoki number emas.')
      }
    }
  }

  if (!this.userErrors.length) {
    let currentSelectionLevel = selectionLevel.call(this)

    if (currentSelectionLevel == 'collection') {
      return this.getCollection()
    } else if (currentSelectionLevel == 'doc') {
      return this.getDocument()
    }
  } else {
    showUserErrors.call(this)
    return null
  }

}