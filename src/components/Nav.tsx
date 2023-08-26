import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, useColorMode } from '@chakra-ui/react'

export const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box
      w='100%'
      px={{ base: '0.5rem', lg: '2rem' }}
      py='0.6rem'
      mx='auto'
      borderBottomColor='brand.primaryLight'
      borderBottomWidth='1px'
    >
      <Flex justify='flex-end'>
        <Button
          onClick={toggleColorMode}
          boxSize='2rem'
        >
          {colorMode === 'light' ? (
            <MoonIcon boxSize='0.8rem' />
          ) : (
            <SunIcon boxSize='0.8rem' />
          )}
        </Button>
      </Flex>
    </Box>
  )
}
