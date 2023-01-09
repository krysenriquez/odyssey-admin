export const arrayObjectToSelectOptions = (array, value, label, defaultLabel) => {
  let return_arr = [
    {
      value: '',
      label: defaultLabel,
    },
  ]
  array.map((arr) => {
    return_arr.push({
      value: arr[`${value}`],
      label: arr[`${label}`],
    })
  })

  return return_arr
}

export const arrayToSelectOptions = (array, defaultLabel) => {
  let return_arr = [
    {
      value: '',
      label: defaultLabel,
    },
  ]

  array.map((arr) => {
    return_arr.push({value: arr, label: arr})
  })

  return return_arr
}
