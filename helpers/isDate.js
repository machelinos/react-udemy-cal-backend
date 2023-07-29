const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const isDate = (value) => {
  if (!value) {
    return false
  }

  const isValid = dayjs(value).isValid()

  return isValid ? true : false
}

module.exports = { isDate }
