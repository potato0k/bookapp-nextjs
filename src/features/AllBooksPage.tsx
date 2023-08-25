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
import { useState } from 'react'
import BooksData from '@/lib/data'
import { countries, languages, pageRanges } from '@/helpers'

export const AllBooksPage = () => {
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
        <AllBooksPage />
      </Box>
    </>
  )
}
