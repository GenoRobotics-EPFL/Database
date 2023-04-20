import {
  AppShell, Title, Button, TextInput, Select, createStyles,
  Divider, Stack, Group, Anchor,
} from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'

import { useRouter } from 'next/router'
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

export default function NewPlantIdentification() {
  const form = useForm({
    initialValues: {
      id: 0,
      sample_id: 0,
      sequencing_id: 0,
      taxonomy_id: 0,
      identification_method_id: 0,
      timestamp: new Date(''),
      seq1_score: 0,
      seq2_score: 0,
      seq3_score: 0,
      seq4_score: 0,
    },

    validate: {
    },

  });

  const postPlantIdentification = async (data: Omit<API.PlantIdentification, "id">) => {
    const response = await fetch(
      `${URL}/plant_identifications/`,
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
        header={MyHeader()}
        footer={MyFooter()}

      >
        <Title order={2} mt='md'>
          Add a new plant identification
        </Title>

        <Divider mt="lg" />

        <form
          onSubmit={form.onSubmit(
            async (values) => await postPlantIdentification({
              sample_id: values.sample_id,
              sequencing_id: values.sequencing_id,
              taxonomy_id: values.taxonomy_id,
              identification_method_id: values.identification_method_id,
              timestamp: values.timestamp,
              seq1_score: values.seq1_score,
              seq2_score: values.seq2_score,
              seq3_score: values.seq3_score,
              seq4_score: values.seq4_score
            })
          )}
        >
          <Stack spacing={20} mt="md">

            <TextInput
              placeholder="Method ID"
              label="Identification method ID:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('identification_method_id')}
            />

            <label htmlFor="timestamp">Identification datatime:</label>
            <Group>
              <input
                type="datetime-local"
                id="timestamp"
                name="timestamp"
                {...form.getInputProps('timestamp')}
              />
            </Group>

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
