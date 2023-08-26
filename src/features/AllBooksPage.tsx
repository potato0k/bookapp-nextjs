import {
  calculateCentury,
  centuries,
  countries,
  languages,
  pageRanges
} from '@/helpers'
import BooksData from '@/lib/data'
import { IBook } from '@/models'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LinkIcon,
  ExternalLinkIcon
} from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export const AllBooksPage = () => {
  //filters
  const [searchFilter, setSearchFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [languageFilter, setLanguageFilter] = useState('')
  const [rangeFilter, setRangeFilter] = useState('')
  const [centuryFilter, setCenturyFilter] = useState('')
  const [filteredBooks, setfilteredBooks] = useState<IBook[]>(BooksData)
  const [openFilterSection, setOpenFilterSection] = useState(false)

  //pagination
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [activePage, setActivePage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(filteredBooks.length / itemsPerPage)
  )

  const paginationNumbers = (total: number): number[] => {
    const paginationNumbers_: number[] = []

    for (let i = 1; i <= total; i++) {
      paginationNumbers_.push(i)
    }
    return paginationNumbers_
  }

  const [paginationNumArr, setPaginationNumArr] = useState<number[]>(
    paginationNumbers(totalPages)
  )
  const [visibleBooks, setVisibleBooks] = useState<IBook[]>([])

  //filter functions
  const textSearchFilter = (books: IBook[]) => {
    const filteredItems = []

    if (searchFilter) {
      for (const book of books) {
        if (
          book['title'].toLowerCase().includes(searchFilter.toLowerCase()) ||
          book['author'].toLowerCase().includes(searchFilter.toLowerCase()) ||
          book['country'].toLowerCase().includes(searchFilter.toLowerCase()) ||
          book['language'].toLowerCase().includes(searchFilter.toLowerCase())
        ) {
          filteredItems.push(book)
        }
      }
      return filteredItems
    } else {
      return books
    }
  }

  const selectedCountryFilter = (books: IBook[]) => {
    const filteredItems = []

    if (countryFilter) {
      for (const book of books) {
        if (
          book['country'].toLowerCase().includes(countryFilter.toLowerCase())
        ) {
          filteredItems.push(book)
        }
      }
      return filteredItems
    } else {
      return books
    }
  }

  const selectedLanguageFilter = (books: IBook[]) => {
    const filteredItems = []

    if (languageFilter) {
      for (const book of books) {
        if (
          book['language'].toLowerCase().includes(languageFilter.toLowerCase())
        ) {
          filteredItems.push(book)
        }
      }
      return filteredItems
    } else {
      return books
    }
  }

  const selectedPageRangeFilter = (books: IBook[]) => {
    const filteredItems = []

    if (rangeFilter) {
      //get the starting and ending of range
      const startNum = Number(rangeFilter.split('...')[0])
      const endNum = Number(rangeFilter.split('...')[1])

      for (const book of books) {
        if (book['pages'] >= startNum && book['pages'] <= endNum) {
          filteredItems.push(book)
        }
      }
      return filteredItems
    } else {
      return books
    }
  }

  const selectedCenturyFilter = (books: IBook[]) => {
    const filteredItems = []

    if (centuryFilter) {
      //filter by century
      for (const book of books) {
        if (calculateCentury(book['year']) == Number(centuryFilter)) {
          filteredItems.push(book)
        }
      }
      return filteredItems
    } else {
      return books
    }
  }

  const handleRemoveFilters = () => {
    setCountryFilter('')
    setLanguageFilter('')
    setRangeFilter('')
    setCenturyFilter('')
  }

  useEffect(() => {
    const search_filtered = textSearchFilter(BooksData)
    const country_filtered = selectedCountryFilter(search_filtered)
    const language_filtered = selectedLanguageFilter(country_filtered)
    const pageRange_filtered = selectedPageRangeFilter(language_filtered)
    const century_filtered = selectedCenturyFilter(pageRange_filtered)
    setActivePage(1)

    setfilteredBooks(century_filtered)

    // console.log('useeffect')
    const start = 0
    const end = start + itemsPerPage

    // console.log('pagenum:', activePage, ' start:', start, ' end:', end)
    setVisibleBooks(century_filtered.slice(start, end))
    setTotalPages(Math.ceil(century_filtered.length / itemsPerPage))
    setPaginationNumArr(
      paginationNumbers(Math.ceil(century_filtered.length / itemsPerPage))
    )

    // console.log(JSON.stringify(filteredBooks))
  }, [searchFilter, countryFilter, languageFilter, rangeFilter, centuryFilter])

  return (
    <>
      <Box
        width={{ base: '100%', lg: '90%' }}
        mx='auto'
        px={{ base: '1.8rem', lg: '4rem' }}
        py={{ base: '1.6rem', lg: '2rem' }}
      >
        <Heading
          letterSpacing={1.5}
          fontSize={{ base: 'xl', lg: '4xl' }}
          py='2rem'
        >
          Showing All Books
        </Heading>
        <Box mb='1rem'>
          <Text mb='0.5rem'>Search</Text>
          <Input
            placeholder='Search by keyword'
            fontSize={{ base: 'xs', lg: 'md' }}
            width='auto'
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
          />
        </Box>

        {!openFilterSection ? (
          <Button
            variant='outline'
            fontSize={{ base: 'xs', lg: 'sm' }}
            size='md'
            fontWeight='normal'
            onClick={() => {
              setOpenFilterSection(true)
            }}
          >
            Filter through books
            <ChevronDownIcon
              boxSize='1.3rem'
              ml='0.5rem'
              _hover={{ color: 'brand.primary', cursor: 'pointer' }}
            />
          </Button>
        ) : (
          <Button
            variant='outline'
            fontSize={{ base: 'xs', lg: 'sm' }}
            size='md'
            fontWeight='normal'
            onClick={() => {
              setOpenFilterSection(false)
            }}
          >
            Filter through books
            <ChevronUpIcon
              boxSize='1.3rem'
              ml='0.5rem'
              _hover={{ color: 'brand.primary', cursor: 'pointer' }}
            />
          </Button>
        )}
        {openFilterSection && (
          <>
            <Stack
              flexDir={{ base: 'column', md: 'row' }}
              mt='-1px'
              mb='1rem'
              gap='1rem'
              p='0.7rem'
              borderWidth='1px'
              borderRadius='md'
            >
              <Flex flexDir={{ base: 'column', md: 'row' }} gap='1rem'>
                <Box>
                  <Text mb='0.4rem' fontSize={{ base: 'xs', lg: 'sm' }}>
                    Country
                  </Text>
                  <Select
                    placeholder='None'
                    fontSize={{ base: 'xs', lg: 'sm' }}
                    width='auto'
                    value={countryFilter}
                    onChange={e => setCountryFilter(e.target.value)}
                  >
                    {countries(filteredBooks).map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Text mb='0.4rem' fontSize={{ base: 'xs', lg: 'sm' }}>
                    Language
                  </Text>
                  <Select
                    placeholder='None'
                    fontSize={{ base: 'xs', lg: 'sm' }}
                    value={languageFilter}
                    onChange={e => setLanguageFilter(e.target.value)}
                  >
                    {languages(filteredBooks).map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Text mb='0.4rem' fontSize={{ base: 'xs', lg: 'sm' }}>
                    No. of pages
                  </Text>
                  <Select
                    placeholder='None'
                    fontSize={{ base: 'xs', lg: 'sm' }}
                    value={rangeFilter}
                    onChange={e => setRangeFilter(e.target.value)}
                  >
                    {pageRanges(filteredBooks).map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Text mb='0.4rem' fontSize={{ base: 'xs', lg: 'sm' }}>
                    Century
                  </Text>
                  <Select
                    placeholder='None'
                    fontSize={{ base: 'xs', lg: 'sm' }}
                    value={centuryFilter}
                    onChange={e => setCenturyFilter(e.target.value)}
                  >
                    {centuries(filteredBooks).map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Flex>

              <Flex alignItems='end'>
                <Button
                  fontWeight='medium'
                  onClick={handleRemoveFilters}
                  fontSize={{ base: 'xs', lg: 'sm' }}
                >
                  Remove Filters
                </Button>
              </Flex>
            </Stack>
          </>
        )}
        <Box overflowX='auto' mt='2.2rem'>
          <Table size={{ base: 'sm', lg: 'md' }} variant='simple'>
            <TableCaption>Books Display</TableCaption>
            <Thead>
              <Tr _hover={{ bg: 'none' }}>
                <Th>No</Th>
                <Th>Cover</Th>
                <Th>Title</Th>
                <Th>Author</Th>
                <Th>Country</Th>
                <Th>Language</Th>
                <Th>Pages</Th>
                <Th>Year</Th>
              </Tr>
            </Thead>
            <Tbody>
              {visibleBooks.map((book: IBook, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Image
                      alt={book.title}
                      rounded='sm'
                      boxSize='3rem'
                      objectFit='cover'
                      src={book.imageLink}
                    />
                  </Td>
                  <Td>
                    <Link
                      position='relative'
                      href={book.link}
                      _hover={{ fontWeight: 'bold' }}
                    >
                      {book.title}
                      <ExternalLinkIcon
                        position='absolute'
                        ml='2px'
                        boxSize='0.6rem'
                      />
                    </Link>
                  </Td>
                  <Td>{book.author}</Td>
                  <Td>{book.country}</Td>
                  <Td>{book.language}</Td>
                  <Td isNumeric>{book.pages}</Td>
                  <Td isNumeric>{book.year}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr _hover={{ bg: 'none' }}>
                <Th>No</Th>
                <Th>Cover</Th>
                <Th>Title</Th>
                <Th>Author</Th>
                <Th>Country</Th>
                <Th>Language</Th>
                <Th>Pages</Th>
                <Th>Year</Th>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
        <Flex
          mx='auto'
          justify='space-between'
          flexDir={{ base: 'column', lg: 'row' }}
          py='1rem'
        >
          <Flex
            justify={{ base: 'center', lg: 'flex-start' }}
            py='0.5rem'
            alignItems='center'
          >
            <Text mx='1' fontSize='xs'>
              Items per page:
            </Text>
            <Select
              value={itemsPerPage}
              width='auto'
              mx='1'
              size='md'
              onChange={e => {
                setItemsPerPage(Number(e.target.value))
              }}
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Select>
            <Button
              fontSize='xs'
              mx='1'
              fontWeight='normal'
              onClick={() => {
                setTotalPages(Math.ceil(filteredBooks.length / itemsPerPage))
                const start = 0
                const end = start + itemsPerPage
                setActivePage(1)
                setVisibleBooks(filteredBooks.slice(start, end))
                setPaginationNumArr(
                  paginationNumbers(
                    Math.ceil(filteredBooks.length / itemsPerPage)
                  )
                )
              }}
            >
              Change
            </Button>
          </Flex>
          <Flex m='1rem' gap={2} justify={{ base: 'center', lg: 'flex-end' }}>
            <Button
              size='sm'
              isDisabled={activePage == 1 ? true : false}
              onClick={() => {
                const start = (activePage - 1 - 1) * itemsPerPage
                const end = start + itemsPerPage
                setActivePage(activePage - 1)

                setVisibleBooks(filteredBooks.slice(start, end))
              }}
            >
              &lt;
            </Button>
            {paginationNumArr.map((pageNum, index) => (
              <Button
                onClick={() => {
                  const start = (pageNum - 1) * itemsPerPage
                  const end = start + itemsPerPage
                  setActivePage(pageNum)
                  setVisibleBooks(filteredBooks.slice(start, end))
                }}
                bgColor={pageNum == activePage ? 'brand.primary' : ''}
                key={index}
                size='sm'
              >
                {pageNum}
              </Button>
            ))}

            <Button
              size='sm'
              isDisabled={activePage == totalPages ? true : false}
              onClick={() => {
                const start = (activePage + 1 - 1) * itemsPerPage
                const end = start + itemsPerPage
                setActivePage(activePage + 1)
                setVisibleBooks(filteredBooks.slice(start, end))
              }}
            >
              &gt;
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
