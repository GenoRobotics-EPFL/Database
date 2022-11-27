import { useState, useEffect } from 'react'
import { MyHeader, MyFooter, MyNavbar } from '../graphics'

import { AppShell, Navbar, Header, Title, Button, Center, Image, Box, BackgroundImage, Text, Footer, MediaQuery, Aside, TextInput } from '@mantine/core'


import { useForm } from '@mantine/form';
import Link from 'next/link'
import { API } from '../../types';

export default function NewPerson() {

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      id: 0,
    },
    validate: {
      name: (value) => (value ? null : 'Invalid name'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      id: (value) => (value ? null : 'Invalid ID')
    },

  });

  const postPerson = async (data: Omit<API.Person, "id">) => {
    const response = await fetch(
      "http://localhost:8000/persons/",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const person = await response.json()
    if (response.status == 200) {
      console.log("POST /persons")
      console.dir(person)
    } else {
      console.log("POST /persons failed.")
    }
  }

  return (
    <>
      <AppShell
        padding="md"
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}

        navbar={ MyNavbar() }
        header={ MyHeader() }
        footer={ MyFooter() }

      >
        <Title order={2} >
          Add a new person
        </Title><br />

        <form
          onSubmit={form.onSubmit(
            async (values) => await postPerson({
              name: values.name,
              email: values.email,
            })
          )}
        >
          <TextInput
            placeholder="Name Surname"
            label="Full Name"
            withAsterisk
            sx={{ width: 200 }}
            {...form.getInputProps('name')}

          /><br />
          <TextInput
            placeholder="Enter email"
            label="Email"
            withAsterisk
            sx={{ width: 200 }}
            {...form.getInputProps('email')}
          /><br />
          <TextInput
            placeholder="Enter ID"
            label="Person ID"
            withAsterisk
            sx={{ width: 200 }}
            {...form.getInputProps('id')}
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
