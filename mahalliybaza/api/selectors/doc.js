export default function doc(docSelectionCriteria) {
  if (!docSelectionCriteria) {
    this.userErrors.push('Doc() metodida belgilangan hujjat mezonlari yo\'q. Kalitli string yoki mezonlarga ega bo\'lgan objectdan foydalaning. Masalan: {id: 1}.')
  } else if (typeof docSelectionCriteria !== 'string' && typeof docSelectionCriteria !== 'object') {
    this.userErrors.push('Doc() metodida ko\'rsatilgan hujjat mezonlari number yoki boolean bo\'lmasligi kerak. Kalitli string yoki mezonlarga ega bo\'lgan objectdan foydalaning. Masalan: {id: 1}.')
  } else {
    this.docSelectionCriteria = docSelectionCriteria
  }
  return this
}