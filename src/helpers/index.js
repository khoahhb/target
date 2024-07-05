const textFitler = (value, rowValue) =>
    rowValue.toLowerCase().includes(value.toLowerCase())

const textSort = (a, b) => a.localeCompare(b)

export { textFitler, textSort }
