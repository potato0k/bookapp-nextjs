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

export const pageRanges = (): string[] => {
  let ranges: string[] = []

  const start = 0
  const stop = 2000
  const step = 100
  const length = (stop - start) / step + 1
//   console.log(length)

  for (let i = 0; i < stop; i += step) {
    const range = (i+1) + '...' + (i+step)
    // console.log(range)
    ranges.push(range)
  }

  return ranges
}

export const blockInvalidChar = (e: any) =>
  ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()