import { AppShell, Navbar, Header, Title, Button, Center, Tabs, TextInput, Select, NumberInput, Textarea, Text, Footer } from '@mantine/core'
import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';

import { useForm } from '@mantine/form';

import Link from 'next/link'
import { API } from '../../types';
import React from 'react';


export default function NewLocation() {
  const form = useForm({
    initialValues: {
      id: 0,
      collection_area: '',
      gps: '',
      elevation: 0,

    },
    validate: {
      collection_area: (value) => (value ? null : 'Enter collection area'),
      gps: (value) => (value ? null : 'Enter GPS'),
      elevation: (value) => (value ? null : 'Enter elevation'),
    },

  });


  const postLocation = async (data: Omit<API.Location, "id">) => {
    const response = await fetch(
      "http://localhost:8000/locations/",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const location = await response.json()
    if (response.status == 200) {
      console.log("POST /locations")
      console.dir(location)
    } else {
      console.log("POST /locations failed.")
    }
  }

  return (
    <>
      <AppShell
        padding="md"
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
        navbar={MyNavbar()}
        header={MyHeader()}
        footer={MyFooter()}

      >
        <Title order={2}>
          Add a new location
        </Title><br />


        <form
          onSubmit={form.onSubmit(
            async (values) => await postLocation({
              collection_area: values.collection_area,
              gps: values.gps,
              elevation: values.elevation,
            })
          )}
        >
          <TextInput
            placeholder="Collection area"
            label="Collection area:"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('collection_area')}
          /><br />
          <TextInput
            placeholder="GPS"
            label="GPS:"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('gps')}
          /><br />
          <TextInput
            placeholder="Elevation"
            label="Elevation:"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('elevation')}
          /><br />

          <Button type="submit">Submit</Button>
        </form>


        <h4>
          <Link href="/">Back</Link>
        </h4>

      </AppShell>
    </>
  )
}
