import type { NextPage } from 'next'
import Head from 'next/head'


import { AppShell, Navbar, Header, Title, Button, Center, Image, Box, BackgroundImage, Text, Footer, MediaQuery, Grid, NavLink } from '@mantine/core'
import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';import {
  IconMap, IconLayoutGridAdd, IconChevronRight, IconUserPlus, IconTestPipe, IconLocation,
  IconPlant, IconTournament, IconPlant2, IconColumns, IconHome2
} from '@tabler/icons';


import Link from 'next/link'
import React from 'react'

export default function SeeTables() {
  return (
    <>
      <AppShell
        padding="md"
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
        navbar={
          <Navbar width={{ base: 260 }} height={600} p="xs">

            <Title order={2}>
              See tables
            </Title><br />

            <NavLink
              label="Method tables"
              childrenOffset={28}
              rightSection={<IconChevronRight size={20} stroke={1.5} />}
              icon={<IconLayoutGridAdd size={20} stroke={1.5} color={"green"} />}>
              <NavLink label="Amplification methods" onClick={() => open("/tables/amplification_method_table", "_self")} />
              <NavLink label="Sequencing methods" onClick={() => open("/tables/sequencing_method_table", "_self")} />
              <NavLink label="Identification methods" onClick={() => open("/tables/identification_method_table", "_self")} />
            </NavLink>
            <NavLink
              label="Sample tables"
              onClick={() => open("/tables/sample_table", "_self")}
              rightSection={<IconChevronRight size={20} stroke={1.5} />}
              icon={<IconTestPipe size={20} stroke={1.5} color={"green"} />} />
            <NavLink
              label="Person tables"
              onClick={() => open("/tables/person_table", "_self")}
              rightSection={<IconChevronRight size={20} stroke={1.5} />}
              icon={<IconUserPlus size={20} stroke={1.5} color={"green"} />} />
            <NavLink
              label="Amplification tables"
              onClick={() => open("/tables/amplification_table", "_self")}
              rightSection={<IconChevronRight size={20} stroke={1.5} />}
              icon={<IconTournament size={20} stroke={1.5} color={"green"} />} />
            <NavLink
              label="Sequencing tables"
              onClick={() => open("/tables/sequencing_table", "_self")}
              rightSection={<IconChevronRight size={20} stroke={1.5} />}
              icon={<IconMap size={20} stroke={1.5} color={"green"} />} />
            <NavLink
              label="Plant identification tables"
              onClick={() => open("/tables/plant_identification_table", "_self")}
              rightSection={<IconChevronRight size={20} stroke={1.5} />}
              icon={<IconPlant size={20} stroke={1.5} color={"green"} />} />
            <NavLink
              label="Taxonomy tables"
              onClick={() => open("/tables/taxonomy_table", "_self")}
              rightSection={<IconChevronRight size={20} stroke={1.5} />}
              icon={<IconPlant2 size={20} stroke={1.5} color={"green"} />} />
            <NavLink
              label="Location tables"
              onClick={() => open("/tables/location_table", "_self")}
              rightSection={<IconChevronRight size={20} stroke={1.5} />}
              icon={<IconColumns size={20} stroke={1.5} color={"green"} />} /><br />
            <NavLink 
            icon={<IconHome2 size={20} stroke={1.5} color={"green"}/>} 
            label="Back to home page" 
            onClick={() => open("/", "_self")} />

          </Navbar>

        }
        header={MyHeader()}
        footer={MyFooter()}
      >

        <Image
          width={1100}
          height={500}
          src="https://www.genorobotics.org/wp-content/uploads/2020/12/Photomontage-jungle-4.jpg"
          alt="Genorobotics mainpage" ></Image>

        <h4>
          <Link href="/">Back to home page</Link>
        </h4>

      </AppShell >


    </>
  )
}
