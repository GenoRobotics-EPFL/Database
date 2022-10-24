import type { NextPage } from 'next'
import Head from 'next/head'

import { AppShell, Navbar, Header, Title, Button, Center } from '@mantine/core'
import { useState } from 'react'

const Home: NextPage = () => {

  const [clicked, setClicked] = useState(false)

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} p="xs">
            <Title order={3}>
              Menus
            </Title>
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
            <Title order={1}>
              GenoRobotics
            </Title>
          </Header>
        }
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        <Center sx={{ height: "100%" }}>
          <Button
            disabled={clicked}
            onClick={() => setClicked(true)}
            sx={{ width: 100 }}
          >
            {clicked ?
              "Nice" :
              "Click me"
            }
          </Button>
        </Center>
      </AppShell>
    </>
  )
}

export default Home
