import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import {
  AppShell, Title, Button, Stack, Group, Anchor, Divider,
  createStyles, TextInput, Notification,
} from '@mantine/core'

import { useForm } from '@mantine/form';
import { API } from '../../types';
import React from 'react';
import { useDataState } from '../../utils/dataState';
import { useRouter } from 'next/router';
import { IconCheck, IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';


const useStyles = createStyles((theme) => ({
  app: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));


export default function NewPerson() {

  const router = useRouter()
  const state = useDataState()
  const { classes } = useStyles();

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
    const response = await state.postPerson(data)
    if (response.status == 200) {
      console.log("POST /persons")
      form.reset()
      showNotification({
        title: 'Notification',
        message: 'Your form was successfully submitted!',
        color: 'teal',
        icon: <IconCheck />,
      })

    } else {
      console.log("POST /persons failed.")

    }
  }

  return (
    <AppShell
      className={classes.app}
      padding="md"
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}

      header={<MyHeader homeState tableState />}
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
            sx={{ width: 300 }}
            {...form.getInputProps('name')}
          />
          <TextInput
            placeholder="Enter email"
            label="Email"
            withAsterisk
            sx={{ width: 300 }}
            {...form.getInputProps('email')}
          />

          <Group mt="md" >
            <Button type="submit"> Submit </Button>
            <Button type="reset" onClick={form.reset}> Reset </Button>
          </Group>

          <Anchor
            size={14}
            onClick={() => router.push("/")}
          >
            Back to home page
          </Anchor>
        </Stack>

      </form>

    </AppShell>
  )
}
