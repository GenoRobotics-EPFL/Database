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

      <body>

         <main id="main-holder">
          <h2>Login Page</h2>
          
            <form id="login" method="get" action="login.php">
              <label><b>Name</b></label><br />
              <input type="text" name="Name" id="Name" className="login-form-field" placeholder="Name "></input><br /><br />
              <label><b>Person ID</b></label><br />
              <input type="text" name="ID" id="ID" className="login-form-field" placeholder="Person ID "></input><br /><br />
              <input type="submit" value="Login" id="login-form-submit"></input>
            </form>  
         

        </main> 
        
      </body>


      
{/* <a id="login-button" ms-hide-element="true" href="" className="button logout login w-button">Login</a>

<Button
              type="submit"
              onClick={() => setClicked(true)}
              >
              Login</Button> */}

              {/* <Center sx={{ height: "100%" }}>
          <Button
            disabled={clicked}
            onClick={() => setClicked(true)}
            sx={{ width: 100 }}
          >
            {clicked ?
              "Nice" :
              "Login"
            }
          </Button>
        </Center> */}
            </AppShell>
            </>
            )
}

export default Home
