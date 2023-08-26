import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, useColorMode } from '@chakra-ui/react'

export const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box w={{ base: '100%', lg: '90%' }} p='1rem' mx='auto'>
      <Flex justify='flex-end'>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Box>
  )
}
