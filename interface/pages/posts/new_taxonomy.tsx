import { AppShell, Navbar, Header, Title, Button, Center, Tabs, TextInput, Select, NumberInput, Textarea, Text, Footer } from '@mantine/core'
import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';
import { useForm } from '@mantine/form';

import Link from 'next/link'
import { API } from '../../types';
import React from 'react';


export default function NewTaxonomy() {
  const form = useForm({
    initialValues: {
      id: 0,
      domain: '',
      kingdom: '',
      phylum: '',
      class_: '',
      family: '',
      species: '',

    },
    validate: {
      domain: (value) => (value ? null : 'Invalid domain'),
      kingdom: (value) => (value ? null : 'Invalid kingdom'),
      phylum: (value) => (value ? null : 'Invalid phylum'),
      class_: (value) => (value ? null : 'Invalid class'),
      family: (value) => (value ? null : 'Invalid family'),
      species: (value) => (value ? null : 'Invalid species'),

    },

  });

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
          Add a new taxonomy
        </Title><br />


        <form
          onSubmit={form.onSubmit(
            async (values) => await postTaxonomy({
              domain: values.domain,
              kingdom: values.kingdom,
              phylum: values.phylum,
              class_: values.class_,
              family: values.family,
              species: values.species,
            })
          )}
        >
          <TextInput
            placeholder="Domain"
            label="Domain"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('domain')}
          /><br />
          <TextInput
            placeholder="Kingdom"
            label="Kingdom"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('kingdom')}
          /><br />
          <TextInput
            placeholder="Phylum"
            label="Phylum"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('phylum')}
          /><br />
          <TextInput
            placeholder="Class"
            label="Class"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('class_')}
          /><br />
          <TextInput
            placeholder="Family"
            label="Family"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('family')}
          /><br />
          <TextInput
            placeholder="Species"
            label="Species"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('species')}
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
