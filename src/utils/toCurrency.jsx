export const toCurrency = (value) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(value)

export const toPointValue = (value) => {
  return value.toLocaleString() + ' PV'
}

export const toNumber = (value) => {
  return value.toLocaleString('en-PH', {minimumFractionDigits: 2})
}
