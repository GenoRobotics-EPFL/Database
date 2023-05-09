import {
  AppShell, Title, Button, TextInput, Stack, createStyles,
  Group, Anchor, Divider,
} from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'

import { useRouter } from 'next/router'
import { useForm } from '@mantine/form';

import { useDataState } from '../../utils/dataState';
import { API } from '../../types';
import React from 'react';
import { URL } from '../../utils/config';

const useStyles = createStyles((theme) => ({
  app: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

}));

export default function NewLocation() {

  const router = useRouter()
  const state = useDataState()
  const { classes } = useStyles();
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
    const response = await state.postLocation(data)
    if (response.status == 200) {
      console.log("POST /locations")
      form.reset()
    } else {
      console.log("POST /locations failed.")
    }
  }



  return (
    <>
      <AppShell
        className={classes.app}
        padding="md"
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
        header={<MyHeader homeState tableState />}
        footer={MyFooter()}

      >
        <Title order={2} mt='md'>
          Add a new location
        </Title>

        <Divider mt="lg" />

        <form
          onSubmit={form.onSubmit(
            async (values) => await postLocation({
              collection_area: values.collection_area,
              gps: values.gps,
              elevation: values.elevation,
            })
          )}
        >
          <Stack spacing={20} mt="md">

            <TextInput
              placeholder="Collection area"
              label="Collection area:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('collection_area')}
            />
            <TextInput
              placeholder="GPS"
              label="GPS:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('gps')}
            />
            <TextInput
              placeholder="Elevation"
              label="Elevation:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('elevation')}
            />

            <Group mt="md" >
              <Button type="submit" > Submit</Button>
              <Button type="reset" onClick={form.reset} > Reset</Button>
            </Group>

            <Anchor size={14} onClick={() => router.push('/')}>
              Back to home page
            </Anchor>

          </Stack>
        </form>
      </AppShell>
    </>
  )
}