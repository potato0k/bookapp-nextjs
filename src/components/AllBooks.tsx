import { IBook } from '@/models'
import { Link } from '@chakra-ui/next-js'
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Input,
  Select,
  Stack
} from '@chakra-ui/react'
import { usePagination } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import BooksData from '@/lib/data'
import { countries, languages, pageRanges } from '@/helpers'

export const AllBooksPage = () => {
  const [books, setBooks] = useState<IBook[]>(BooksData)

  //filters
  const [searchFilter, setSearchFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [languageFilter, setLanguageFilter] = useState('')
  const [filteredBooks, setfilteredBooks] = useState<IBook[]>(books)

  //pagination
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [total, setTotal] = useState<number>(
    Math.ceil(filteredBooks.length / itemsPerPage)
  )
  const [visibleBooks, setVisibleBooks] = useState<IBook[]>(
    filteredBooks.slice(0, itemsPerPage)
  )

  const pagination = usePagination({
    total,
    initialPage: 1,
    onChange (page) {
      const start = (page - 1) * itemsPerPage
      const end = start + itemsPerPage
      setVisibleBooks(filteredBooks.slice(start, end))
      // console.log(JSON.stringify(visibleBooks))
      // console.log("start:",start)
      // console.log("end:",end)
    }
  })

  const textSearchFilter = (books: IBook[]) => {
    const filteredItems = []

    if (searchFilter) {
      for (const book of books) {
        if (book['title'].toLowerCase().includes(searchFilter)) {
          filteredItems.push(book)
        }
      }
      return filteredItems
    } else {
      return books
    }
  }

  useEffect(() => {
    const search_filtered = textSearchFilter(books)
    setfilteredBooks(search_filtered)
    setVisibleBooks(filteredBooks)
    console.log(JSON.stringify(filteredBooks))
  }, [searchFilter])

  const handleFilter = () => {
    let outputData = []

    if (countryFilter) {
      for (const book of books) {
        if (book['country'].includes(countryFilter)) {
          outputData.push(book)
        }
      }
    }
    if (languageFilter) {
      for (const book of books) {
        if (book['country'].includes(languageFilter)) {
          outputData.push(book)
        }
      }
    }

    setVisibleBooks(outputData)
  }

  return (
    <>
      <Box
        width={{ base: '100%', lg: '90%' }}
        mx='auto'
        px={{ base: '1.8rem', lg: '4rem' }}
        py={{ base: '1.6rem', lg: '2rem' }}
      >
        <Heading
          letterSpacing='2'
          fontSize={{ base: 'xl', lg: '4xl' }}
          py='2rem'
        >
          Showing All Books
        </Heading>

        <Box mb='1rem'>
          <Text mb='0.5rem'>Search</Text>
          <Input
            placeholder='Search by keyword'
            fontSize={{ base: 'xs', lg: 'sm' }}
            width='auto'
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
          />
        </Box>

        <Text mb='0.5rem'>Filter through books</Text>

        <Stack flexDir={{ base: 'column', md: 'row' }} mb='1rem' gap='1rem'>
          <Box>
            <Text mb='0.4rem' fontSize={{ base: 'xs', lg: 'sm' }}>
              Country
            </Text>
            <Select
              placeholder='Country'
              fontSize={{ base: 'xs', lg: 'sm' }}
              width='auto'
              value={countryFilter}
              onChange={e => setCountryFilter(e.target.value)}
            >
              {countries(books).map((option, index) => (
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
              placeholder='Language'
              fontSize={{ base: 'xs', lg: 'sm' }}
              value={languageFilter}
              onChange={e => setLanguageFilter(e.target.value)}
            >
              {languages(books).map((option, index) => (
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
              placeholder='Page range'
              fontSize={{ base: 'xs', lg: 'sm' }}
              value={countryFilter}
              onChange={e => setCountryFilter(e.target.value)}
            >
              {pageRanges().map((option, index) => (
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
              placeholder='Century'
              fontSize={{ base: 'xs', lg: 'sm' }}
              value={countryFilter}
              onChange={e => setCountryFilter(e.target.value)}
            >
              {pageRanges().map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Box>
        </Stack>

        <Flex gap={2} mb='2rem'>
          <Button fontSize={{ base: 'xs', lg: 'sm' }} onClick={handleFilter}>
            Apply Filters
          </Button>
          <Button fontSize={{ base: 'xs', lg: 'sm' }}>Remove Filters</Button>
        </Flex>

        {/* table */}
        <Box overflowX='auto'>
          <Table size={{ base: 'sm', lg: 'md' }} variant='simple'>
            <TableCaption>Books Display</TableCaption>
            <Thead>
              <Tr>
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
                <Tr _hover={{ bg: 'gray.400' }} key={index}>
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
                    <Link href={book.link}>{book.title}</Link>
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
              <Tr>
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
      </Box>

      {/* pagination */}
      <Flex
        flexDir={{ base: 'column', lg: 'row' }}
        w={{ base: '100%', lg: '90%' }}
        px={{ base: '2rem', lg: '4rem' }}
        mx='auto'
        pb='2rem'
        justifyContent='space-between'
      >
        <Flex
          justify={{ base: 'center', lg: 'flex-end' }}
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
              setTotal(Math.ceil(filteredBooks.length / itemsPerPage))
              const start = itemsPerPage
              const end = start + itemsPerPage
              setVisibleBooks(filteredBooks.slice(start, end))
              pagination.setPage(1)
            }}
          >
            Change
          </Button>
        </Flex>

        {filteredBooks.length > itemsPerPage && (
          <Flex justify={{ base: 'center', lg: 'flex-end' }} py='0.5rem'>
            {pagination.range.map(range =>
              range === 'dots' ? (
                <Button
                  fontSize='xs'
                  borderWidth='1px'
                  borderColor='brand.primary'
                  color='brand.primary'
                  bgColor='white'
                  mx='1'
                  key={range}
                >
                  ...
                </Button>
              ) : (
                <Button
                  onClick={() => pagination.setPage(range)}
                  fontSize='sm'
                  borderWidth='1px'
                  borderColor='brand.primary'
                  color={
                    pagination.active === range ? 'white' : 'brand.primary'
                  }
                  bgColor={
                    pagination.active === range ? 'brand.primary' : 'white'
                  }
                  mx='1'
                  key={range}
                  _active={{ bgColor: 'none' }}
                  _hover={{ bgColor: 'none' }}
                >
                  {range}
                </Button>
              )
            )}
          </Flex>
        )}
      </Flex>
    </>
  )
}
