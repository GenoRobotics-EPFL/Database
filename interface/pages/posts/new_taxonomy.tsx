import {
  AppShell, Title, Button, TextInput, createStyles,
  Stack, Group, Anchor, Divider
} from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router'
import { useDataState } from '../../utils/dataState';

import { API } from '../../types';
import React from 'react';
import { IconCheck, IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications'; import { Id } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  app: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

}));
export default function NewTaxonomy() {

  const state = useDataState()

  const form = useForm({
    initialValues: {
      id: 0,
      sample_id: 0,
      identification_id: 0,
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
    const response = await state.postTaxonomy(data)
    if (response.status == 200) {
      console.log("POST /taxonomies")
      form.reset()
      showNotification({
        title: 'Notification',
        message: 'Your form was successfully submitted!',
        color: 'teal',
        icon: <IconCheck />,
      })
    } else {
      console.log("POST /taxonomies failed.")
    }
  }

  const { classes } = useStyles();
  const router = useRouter()

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
          Add a new taxonomy
        </Title>

        <Divider mt="lg" />

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
          <Stack spacing={20} mt="md">
            <TextInput
              placeholder="Domain"
              label="Domain:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('domain')}
            />
            <TextInput
              placeholder="Kingdom"
              label="Kingdom:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('kingdom')}
            />
            <TextInput
              placeholder="Phylum"
              label="Phylum:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('phylum')}
            />
            <TextInput
              placeholder="Class"
              label="Class:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('class_')}
            />
            <TextInput
              placeholder="Family"
              label="Family:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('family')}
            />
            <TextInput
              placeholder="Species"
              label="Species:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('species')}
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
