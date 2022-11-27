import type { NextPage } from 'next'
import Head from 'next/head'

import { MyHeader, MyFooter, MyNavbar } from './graphics'

import { AppShell, Navbar, Header, Title, Button, Center, Image, Box, BackgroundImage, Text, Footer, MediaQuery, Aside } from '@mantine/core'

import { useForm } from '@mantine/form'

import { useState } from 'react'

import Link from 'next/link'




const Home: NextPage = () => {
 
  
  // const [clicked, setClicked] = useState(false)


  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <AppShell
        padding="md"
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}

        navbar={ MyNavbar() }
        header={ MyHeader() }
        footer={ MyFooter() }

      >

        <Image
          width={1100}
          height={500}
          src="https://www.genorobotics.org/wp-content/uploads/2020/12/Photomontage-jungle-4.jpg"
          alt="Genorobotics mainpage" ></Image>


      </AppShell>



    </>
  )
}

export default Home