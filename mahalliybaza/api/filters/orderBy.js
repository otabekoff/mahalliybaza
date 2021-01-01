export default function orderBy(property, direction) {
  if (!property) {
    this.userErrors.push('OrderBy() metodida maydon nomi ko\'rsatilmagan. Stringdan foydalaning. Masalan: "ism".')
  }
  else if (typeof property !== 'string') {
    this.userErrors.push('OrderBy () metodidagi birinchi parametr String (maydon nomi) bo\'lishi kerak. Masalan: "ism".')
  }
  else {
    this.orderByProperty = property
  }
  if (direction) {
    if (direction !== 'asc' && direction !== 'desc') {
      this.userErrors.push("OrderBy() metodidagi ikkinchi parametr 'asc' yoki 'desc' va string bo'lishi kerak.")
    }
    else {
      this.orderByDirection = direction
    }
  }
  return this
}