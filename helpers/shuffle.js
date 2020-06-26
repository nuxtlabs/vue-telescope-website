export const knuthfisheryates = (arr) => {
  let i
  let temp
  let j
  const len = arr.length
  for (i = 0; i < len; i++) {
    j = ~~(Math.random() * (i + 1))
    temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}
