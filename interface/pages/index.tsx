import type { NextPage } from 'next'

import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import {
  AppShell, Title, Text, createStyles, Card, SimpleGrid, Container, Group, Button,
  UnstyledButton, Blockquote, ActionIcon, useMantineColorScheme,
} from '@mantine/core'
import { IconSun, IconMoonStars, } from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';

import React from 'react'

import {
  IconMap,
  IconLayoutGridAdd,
  IconUserPlus,
  IconTestPipe,
  IconLocation,
  IconPlant,
  IconTournament,
  IconPlant2,
  IconColumns,
} from '@tabler/icons';



const mockdata = [
  { title: 'New method', icon: IconLayoutGridAdd, color: 'violet', page: '/new_method' },
  { title: 'New sample', icon: IconTestPipe, color: 'indigo', page: '/new_sample' },
  { title: 'New person', icon: IconUserPlus, color: 'blue', page: '/new_person' },
  { title: 'New amplification', icon: IconTournament, color: 'green', page: '/new_amplification' },
  { title: 'New sequencing', icon: IconMap, color: 'teal', page: '/new_sequencing' },
  { title: 'New location', icon: IconLocation, color: 'cyan', page: '/new_location' },
  { title: 'New plant identification', icon: IconPlant, color: 'pink', page: '/new_plant_identification' },
  { title: 'New taxonomy', icon: IconPlant2, color: 'red', page: '/new_taxonomy' },
  { title: 'See tables', icon: IconColumns, color: 'orange', page: '/see_tables' },
];



const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
  wrapper: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: 50,
    paddingBottom: 50,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },


}));


const Home: NextPage = () => {

  const { classes, theme } = useStyles();

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item} onClick={() => open('/posts/' + item.page, "_self")}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="sm" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>

  ));

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>

      <AppShell
        padding="md"
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.dark[6]
          },
        })}

        header={MyHeader()}
        footer={MyFooter()}
      >

        <div className={classes.wrapper}>
          <Container size={700} className={classes.inner}>
            <h1 className={classes.title}>
              Add to{' '}
              <Text component="span" variant="gradient" gradient={{ from: 'darkgreen', to: 'teal' }} inherit>
                Database
              </Text>{' '}
              ...
            </h1>
          </Container>
        </div>

        <Card radius="md" className={classes.card}>

          <SimpleGrid cols={3} mt="md">
            {items}
          </SimpleGrid>

        </Card>

      </AppShell>



    </>
  )
}

export default Home



