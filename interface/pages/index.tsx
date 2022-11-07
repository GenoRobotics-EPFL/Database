import type { NextPage } from 'next'
import Head from 'next/head'

import { AppShell, Navbar, Header, Title, Button, Center, Image, Box, BackgroundImage, Text } from '@mantine/core'

import { useState } from 'react'

import Link from 'next/link'
import { kMaxLength } from 'buffer'



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

            <Title order={2}>
              Menu
            </Title><br />

            <Button
              component="a"
              href="/posts/new_method"
              sx={{ width: 200 }}
              color="teal"
            >Add a new method
            </Button><br />

            <Button
              component="a" sx={{ width: 200 }}
              href="/posts/new_sample"
              color="teal"
            >Add a new sample
            </Button><br />

            <Button
              component="a" sx={{ width: 200 }}
              href="/posts/new_specimen"
              color="teal"
            >Add a new specimen
            </Button><br />


          </Navbar>

        }



        header={

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