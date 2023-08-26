import { IBook } from './models'

export const countries = (books: IBook[]): string[] => {
  let countries: string[] = []

  const countries_ = books.map(book => {
    if (book.country.includes(' and ')) {
      countries.push(...book.country.split(' and '))
      return ''
    }
    if (book.country.includes(', ')) {
      countries.push(...book.country.split(', '))
      return ''
    }
    if (book.country.includes('/')) {
      countries.push(...book.country.split('/'))
      return ''
    }
    return book.country
  })

  countries.push(...countries_)

  countries.sort()

  const uniqueCountries = countries.filter(function (item, pos) {
    return countries.indexOf(item) == pos
  })

  const filteredCountries = uniqueCountries.filter(function (item) {
    return item != ''
  })

  return filteredCountries
}

export const languages = (books: IBook[]): string[] => {
  let languages: string[] = []

  const languages_ = books.map(book => {
    if (book.language.includes(', ')) {
      languages.push(...book.language.split(', '))
      return ''
    }
    return book.language
  })

  languages.push(...languages_)

  languages.sort()

  const uniqueLanguages = languages.filter(function (item, pos) {
    return languages.indexOf(item) == pos
  })

  const filteredLanguages = uniqueLanguages.filter(function (item) {
    return item != ''
  })

  return filteredLanguages
}

export const calculateRangeFamily = (pageNum: number) => {
  let rangeFamily: string
  let start, end

  if (pageNum % 100 == 0) {
    end = pageNum
    start = end - 99
  } else {
    start = pageNum - (pageNum % 100) + 1
    end = start + 99
  }

  console.log('start:', start, 'end:', end)
  rangeFamily = start.toString().concat('.', end.toString())

  return rangeFamily
}

export const pageRanges = (books: IBook[]): string[] => {
  let ranges: string[] = []
  let sortedRanges: string[] = []

  books.forEach(item => ranges.push(calculateRangeFamily(item['pages'])))

  uniqueArray(ranges)
    .sort(function (a, b) {
      return a - b
    })
    .forEach(range => {
      range = range.replace('.', '...')
      sortedRanges.push(range)
    })

  return sortedRanges
}

export const calculateCentury = (year: number) => {
  let century: number

  //negative years and positive years have different calculations to convert
  //to their century counterpart
  if (year < 0) {
    century = Math.trunc((year + 1) / 100 - 1)
  } else {
    century = Math.trunc((year - 1) / 100 + 1)
  }

  return century
}

export const centuries = (books: IBook[]): number[] => {
  let centuries: number[] = []

  books.forEach(item => centuries.push(calculateCentury(item['year'])))

  //make list unique, sort it and return it
  return uniqueArray(centuries).sort(function (a, b) {
    return a - b
  })
}

//remove duplicates from array
function uniqueArray (a: any[]) {
  return [...new Set(a)]
}
export const blockInvalidChar = (e: any) =>
  ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
