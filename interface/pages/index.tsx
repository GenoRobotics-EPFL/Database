import type { NextPage } from 'next'
import Head from 'next/head'

import { AppShell, Navbar, Header, Title, Button, Center } from '@mantine/core'
import { useState } from 'react'

import Link from 'next/link'




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

            <Button 
              type = "button"
              variant="light" color="violet" size="xs" compact            
              disabled={clicked}
              onClick={() => setClicked(true)}
              sx={{ width: 200 }}
              ><Link href="/posts/new_method">Add a new method</Link>
            </Button><br />

            <Button 
              type = "button"
              variant="light" color="violet" size="xs" compact            
              disabled={clicked}
              onClick={() => setClicked(true)}
              sx={{ width: 200 }}
              ><Link href="/posts/new_sample">Add a new sample</Link>
            </Button><br />

            <Button 
              type = "button"
              variant="light" color="violet" size="xs" compact            
              disabled={clicked}
              onClick={() => setClicked(true)}
              sx={{ width: 200 }}
              ><Link href="/posts/new_specimen">Add a new specimen</Link>
            </Button><br />


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




    

  



            </AppShell>
            </>
            )
}

export default Home