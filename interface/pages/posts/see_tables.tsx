import type { NextPage } from 'next'
import Head from 'next/head'


import {
  AppShell, Navbar, Title, Group, Center, createStyles,
  Box, SimpleGrid, Text, Container, UnstyledButton, NavLink, Menu, ActionIcon, Divider,
} from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import {
  IconMap, IconLayoutGridAdd, IconChevronDown, IconUserPlus, IconTestPipe, IconLocation,
  IconPlant, IconTournament, IconPlant2, IconColumns, IconHome2
} from '@tabler/icons';


import React from 'react'
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, useMantineTheme } from '@mantine/core';


const useStyles = createStyles((theme) => ({
  card: {
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  wrapper: {
    position: 'relative',
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

  card_title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 35,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },


}));


const data = [
  { title: 'Sample table', icon: IconTestPipe, color: 'indigo', page: '/sample_table' },
  { title: 'Person table', icon: IconUserPlus, color: 'blue', page: '/person_table' },
  { title: 'Amplification table', icon: IconTournament, color: 'green', page: '/amplification_table' },
  { title: 'Sequencing table', icon: IconMap, color: 'teal', page: '/sequencing_table' },
  { title: 'Location table', icon: IconLocation, color: 'cyan', page: '/location_table' },
  { title: 'Plant identification table', icon: IconPlant, color: 'pink', page: '/plant_identification_table' },
  { title: 'Taxonomy table', icon: IconPlant2, color: 'red', page: '/taxonomy_table' },
];



export default function SeeTables() {

  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const card = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        className={classes.card}
      >
        <div>
          <Text className={classes.category} size="xs">
          </Text>
          <Title mt='md' order={3} className={classes.card_title}>
            {item.title}
          </Title>

        </div>
        <item.icon color={theme.colors[item.color][6]} size={32} />
        <NavLink variant="subtle" color="dark"
          label='Open table'
          onClick={() => open("/tables/" + item.page, "_self")}
        />
      </Paper>
    </Carousel.Slide>
  ));


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
              Database{' '}
              <Text component="span" variant="gradient" gradient={{ from: 'darkgreen', to: 'teal' }} inherit>
                tables...
              </Text>{' '}
            </h1>
          </Container>
        </div>

        <Carousel
          slideSize="20%"
          breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
          slideGap="xl"
          align="start"
          slidesToScroll={mobile ? 1 : 2}
        >
          <Carousel.Slide key='Method tables'>
            <Paper
              shadow="md"
              p="xl"
              radius="md"
              className={classes.card}
            >
              <div>
                <Text className={classes.category} size="xs">
                </Text>
                <Title mt='md' order={3} className={classes.card_title}>
                  Method tables
                </Title>

              </div>
              <IconLayoutGridAdd size={40} stroke={2} color='violet' />

              <Menu trigger="hover" openDelay={100} closeDelay={400} width={200} shadow="md">
                <Menu.Target>
                  <Group>
                    <NavLink variant="subtle" color="dark" label='Open table'
                      rightSection={<IconChevronDown size={12} stroke={1.5} />}>
                    </NavLink>
                  </Group>
                </Menu.Target>
                <Menu.Dropdown>
                  <NavLink label="Amplification method" onClick={() => open("/tables/amplification_method_table", "_self")} />
                  <NavLink label="Sequencing method" onClick={() => open("/tables/sequencing_method_table", "_self")} />
                  <NavLink label="Identification method" onClick={() => open("/tables/identification_method_table", "_self")} />
                </Menu.Dropdown>
              </Menu>
            </Paper>
          </Carousel.Slide>
          {card}
        </Carousel>

      </AppShell >


    </>
  )
}
