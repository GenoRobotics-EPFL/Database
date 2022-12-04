import {
  Navbar, Header, Title, Button, Center, Footer, Stack, NavLink, Box, Menu, Text, Input, Accordion, ScrollArea
} from '@mantine/core'
import { IconMap, IconLayoutGridAdd, IconChevronRight, IconUserPlus, IconTestPipe, IconLocation, IconPlant, IconTournament, IconPlant2, IconColumns } from '@tabler/icons';

import React from 'react'



export const MyNavbar = () => {
  return (
    <Navbar width={{ base: 260 }} height={600} p="xs">

      <Title order={2}>
        Menu
      </Title><br />


        <NavLink
          label="Add new method"
          onClick={() => open("/posts/new_method", "_self")}
          active
          variant="subtle"
          color="dark"
          rightSection={<IconChevronRight size={20} stroke={1.5} />}
          icon={<IconLayoutGridAdd size={20} stroke={1.5} color={"green"} />}
        />

        <NavLink
          label="Add new sample"
          onClick={() => open("/posts/new_sample", "_self")}
          active
          variant="subtle"
          color="dark"
          rightSection={<IconChevronRight size={20} stroke={1.5} />}
          icon={<IconTestPipe size={20} stroke={1.5} color={"green"}/>}
        />

        <NavLink
          label="Add new person"
          onClick={() => open("/posts/new_person", "_self")}
          variant="subtle"
          active
          color="dark"
          rightSection={<IconChevronRight size={20} stroke={1.5} />}
          icon={<IconUserPlus size={20} stroke={1.5} color={"green"}/>}

        />

        <NavLink
          label="Add new amplification"
          onClick={() => open("/posts/new_amplification", "_self")}
          variant="subtle"
          active
          color="dark"
          rightSection={<IconChevronRight size={20} stroke={1.5} />}
          icon={<IconTournament size={20} stroke={1.5} color={"green"} />}

        />

        <NavLink
          label="Add new sequencing"
          onClick={() => open("/posts/new_sequencing", "_self")}
          variant="subtle"
          active
          color="dark"
          rightSection={<IconChevronRight size={20} stroke={1.5} />}
          icon={<IconMap size={20} stroke={1.5} color={"green"}/>}
        />

        <NavLink
          label="Add new location"
          onClick={() => open("/posts/new_location", "_self")}
          variant="subtle"
          active
          color="dark"
          rightSection={<IconChevronRight size={20} stroke={1.5} />}
          icon={<IconLocation size={20} stroke={1.5} color={"green"}/>}
        />

        <NavLink
          label="Add new plant identification"
          onClick={() => open("/posts/new_plant_identification", "_self")}
          variant="subtle"
          active
          color="dark"
          rightSection={<IconChevronRight size={20} stroke={1.5} />}
          icon={<IconPlant size={20} stroke={1.5} color={"green"}/>}
        />

        <NavLink

          label="Add new taxonomy"
          onClick={() => open("/posts/new_taxonomy", "_self")}
          variant="subtle"
          active
          color="dark"
          rightSection={<IconChevronRight size={20} stroke={1.5} />}
          icon={<IconPlant2 size={20} stroke={1.5} color={"green"} />}

        />
 
        <NavLink
          label="See tables"
          onClick={() => open("/posts/see_tables", "_self")}
          variant="subtle"
          active
          color="dark"
          rightSection={<IconChevronRight size={20} stroke={1.5} />}
          icon={<IconColumns size={20} stroke={1.5} color={"green"} />}
        /> 


    </Navbar >
  )
}