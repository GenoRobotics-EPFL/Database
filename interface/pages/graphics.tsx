import { Navbar, Header, Title, Button, Center, Footer, Stack, } from '@mantine/core'


export const MyHeader = () => {
  return (
    <Header height={80} p="xs">
      <Title order={1}>
        <img
          width="65"
          height="45"
          src="https://www.genorobotics.org/wp-content/uploads/2020/11/Genorobotics-logo-12-fond-transp-90x64.png"
          alt="GenoRobotics"
          sizes="(max-width: 90px) 100vw, 90px" />
        GenoRobotics
      </Title>
    </Header>
  )
}

export const MyFooter = () => {
  return (

    <Footer height={140} p="xs">
      <Center>
        <img
          width="198.5"
          height="140.5"
          src="https://www.genorobotics.org/wp-content/uploads/2020/04/Genorobotics-logo-52.png"
          alt="Genorobotics logo-52" ></img>
        Copyright © 2022 GenoRobotics
      </Center>
    </Footer>
  )
}

export const MyNavbar = () => {
  return (
    <Navbar width={{ base: 300 }} p="xs">
      
      <Center>
        <Title order={2}>
          Menu
        </Title><br />

      </Center>

      <Stack align="center" spacing="l" sx={(theme) => ({ height: 300 })}>

      <Button
        component="a" sx={{ width: 200, margin: 20 }}
        href="/posts/new_method"
        color="teal"
      >Add a new method
      </Button>

      <Button
        component="a" sx={{ width: 200, margin: 20 }}
        href="/posts/new_sample"
        color="teal"
      >Add a new sample
      </Button>

      <Button
        component="a" sx={{ width: 200, margin: 20 }}
        href="/posts/new_specimen"
        color="teal"
      >Add a new specimen
      </Button>

      <Button
        component="a" sx={{ width: 200, margin: 20 }}
        href="/posts/new_person"
        color="teal"
      >Add a new person
      </Button>

      <Button
        component="a" sx={{ width: 200, margin: 20 }}
        href="/posts/see_tables"
        color="teal"
      >See tables
      </Button>

    </Stack>


    </Navbar >
  )
}