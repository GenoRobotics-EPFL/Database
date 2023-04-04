import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { MyNavbar } from '../../components/navbar';
import {
  AppShell, Title, Button, Stack, Group, Anchor, Divider,
  createStyles, TextInput
} from '@mantine/core'


import { useForm } from '@mantine/form';
import { API } from '../../types';
import React from 'react';
import { URL } from '../../utils/config';

const useStyles = createStyles((theme) => ({
  app: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

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

    },

  });

  const postPerson = async (data: Omit<API.Person, "id">) => {
    const response = await fetch(
      `${URL}/persons/`,
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

  const { classes } = useStyles();


  return (
    <>
      <AppShell
        className={classes.app}
        padding="md"
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}

        header={MyHeader()}
        footer={MyFooter()}

      >
        <Title order={2} mt="md" >
          Add a new person
        </Title>

        <Divider mt="lg" />

        <form
          onSubmit={form.onSubmit(
            async (values) => await postPerson({
              name: values.name,
              email: values.email,
            })
          )}
        >
          <Stack spacing={20} mt="md">
            <TextInput
              placeholder="Name Surname"
              label="Full Name"
              withAsterisk
              sx={{ width: 400 }}
              {...form.getInputProps('name')}

            />
            <TextInput
              placeholder="Enter email"
              label="Email"
              withAsterisk
              sx={{ width: 400 }}
              {...form.getInputProps('email')}
            />

            <Group mt="md" >
              <Button type="submit" >Submit</Button>
              <Button type="reset"  > Reset</Button>
            </Group>

            <Anchor size={14} href="/" target="_self">
              Back to home page
            </Anchor>
          </Stack>

        </form>

      </AppShell>

    </>
  )
}
