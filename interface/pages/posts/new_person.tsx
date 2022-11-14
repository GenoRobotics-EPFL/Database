import { useState, useEffect } from 'react'

import {
  AppShell,
  Navbar,
  Header,
  Title,
  Button,
  Center,
  TextInput,
  Footer,
} from '@mantine/core'
import { useForm } from '@mantine/form';

import Link from 'next/link'
import { API } from '../../types';

export default function NewPerson() {

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      id: ''
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

        header={
          <Header height={80} p="xs">
            <Title order={1}>
              <img
                width="65"
                height="45"
                src="https://www.genorobotics.org/wp-content/uploads/2020/11/Genorobotics-logo-12-fond-transp-90x64.png"
                alt="GenoRobotics"
                sizes="(max-width: 90px) 100vw, 90px" />
              GenoRobotics
            </Title>
          </Header>

        }

        footer={
          <Footer height={110} p="xs">
            <Center>
              <img
                width="200"
                height="100"
                src="https://www.genorobotics.org/wp-content/uploads/2020/04/Genorobotics-logo-52.png"
                alt="Genorobotics logo-52" ></img>
              Copyright © 2022 GenoRobotics
            </Center>
          </Footer>
        }

        navbar={
          <Navbar width={{ base: 300 }} p="xs">

            <Title order={2}>
              Menu
            </Title><br />

            <Button
              component="a" sx={{ width: 200 }}
              href="/posts/new_method"
              color="teal"
            >Add a new method
            </Button><br />

            <Button
              component="a" sx={{ width: 200 }}
              href="/posts/new_sample"
              color="teal"
            >Add a new sample
            </Button><br />

            <Button
              component="a" sx={{ width: 200 }}
              href="/posts/new_specimen"
              color="teal"
            >Add a new specimen
            </Button><br />

            <Button
              component="a" sx={{ width: 200 }} disabled
              href="/posts/new_person"
              color="teal"
            >Add a new person
            </Button><br />

            <Button
              component="a" sx={{ width: 200 }}
              href="/posts/see_tables"
              color="teal"
            >See tables
            </Button><br />
          </Navbar>
        }

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
