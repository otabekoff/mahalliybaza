export default function limit(limitBy) {
  if (!limitBy) {
    this.userErrors.push("Limit() metodida integer(raqam) ko'rsatilmagan.")
  }
  else if (!Number.isInteger(limitBy)) {
    this.userErrors.push("limit() metodidagi limit parametri float, boolean, string yoki objekt emas, balki butun son (masalan, 3) bo'lishi kerak.")
  }
  else {
    this.limitBy = limitBy
  }
  return this
}