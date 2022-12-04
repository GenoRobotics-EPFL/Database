import { AppShell, Navbar, Header, Title, Button, Center, Tabs, TextInput, Select, NumberInput, Textarea, Text, Footer } from '@mantine/core'
import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';



import { useForm } from '@mantine/form';

import Link from 'next/link'
import { API } from '../../types';
import React from 'react';


export default function NewPlantIdentification() {
  const form = useForm({
    initialValues: {
      id: 0,
      sample_id: 0,
      sequencing_id: 0,
      taxonomy_id: 0,
      identification_method_id: 0,
      timestamp: new Date(''),
      sex: '',
      lifestage: '',
      reproduction: '',
    },

    validate: {
      sex: (value) => (value ? null : 'Select one'),
      lifestage: (value) => (value ? null : 'Select one'),
      reproduction: (value) => (value ? null : 'Select one'),
    },

  });

  const postPlantIdentification = async (data: Omit<API.PlantIdentification, "id">) => {
    const response = await fetch(
      "http://localhost:8000/plant_identifications/",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const plant_identification = await response.json()
    if (response.status == 200) {
      console.log("POST /plant_identifications")
      console.dir(plant_identification)
    } else {
      console.log("POST /plant_identifications failed.")
    }
  }

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

  const postTaxonomy = async (data: Omit<API.Taxonomy, "id">) => {
    const response = await fetch(
      "http://localhost:8000/taxonomy/",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const taxonomy = await response.json()
    if (response.status == 200) {
      console.log("POST /taxonomy")
      console.dir(taxonomy)
    } else {
      console.log("POST /taxonomy failed.")
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
          Add a new plant identification
        </Title><br />

        <form
          onSubmit={form.onSubmit(
            async (values) => await postPlantIdentification({
              sample_id: values.sample_id,
              sequencing_id: values.sequencing_id,
              taxonomy_id: values.taxonomy_id,
              identification_method_id: values.identification_method_id,
              timestamp: values.timestamp,
              sex: values.sex,
              lifestage: values.lifestage,
              reproduction: values.reproduction,
            })
          )}
        >

          <TextInput
            placeholder="Method ID"
            label="Identification method ID:"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('identification_method_id')}
          /><br />
          <label htmlFor="timestamp">Identification datatime:</label><br />
          <input
            type="datetime-local"
            id="timestamp"
            name="timestamp"
            {...form.getInputProps('timestamp')}
          /><br /><br />
          <Select
            label="Sex:"
            placeholder="Sex"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('sex')}

            data={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'hermaphrodite', label: 'Hermaphrodite' },
              { value: 'none', label: 'None' }
            ]}
          /><br />
          <Select
            label="Lifestage:"
            placeholder="Lifestage"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('lifestage')}

            data={[
              { value: 'adult', label: 'Adult' },
              { value: 'immature', label: 'immature' }
            ]}
          /><br />
          <Select
            label="Reproduction:"
            placeholder="Reproduction"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('reproduction')}

            data={[
              { value: 'sexual', label: 'Sexual' },
              { value: 'asexual', label: 'Asexual' },
              { value: 'cyclic', label: 'Cyclic' },
              { value: 'pathogen', label: 'Pathogen' }
            ]}
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
