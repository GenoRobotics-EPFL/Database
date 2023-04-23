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

export default function NewConsensusSegment() {
  const form = useForm({
    initialValues: {
      id: 0,
      sequence_id: 0,
      segment_sequence: '',
      primer_name: '',
      primer_desc: '',
      primer2_name: '',
      primer2_desc: '',
      DNA_region: '',
      sequence_length: 0,
    },

    validate: {

    },

  });

  const postConsensusSegment = async (data: Omit<API.ConsensusSegment, "id">) => {
    const response = await fetch(
      `${URL}/consensus_segments/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const consensus_segment = await response.json()
    if (response.status == 200) {
      console.log("POST /consensus_segments")
      console.dir(consensus_segment)
    } else {
      console.log("POST /consensus_segments failed.")
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
          Add a new consensus segment
        </Title>

        <Divider mt="lg" />

        <form
          onSubmit={form.onSubmit(
            async (values) => await postConsensusSegment({
              sequence_id: values.sequence_id,
              segment_sequence: values.segment_sequence,
              primer_name: values.primer_name,
              primer_desc: values.primer_desc,
              primer2_name: values.primer2_name,
              primer2_desc: values.primer2_desc,
              DNA_region: values.DNA_region,
              sequence_length: values.sequence_length
            })
          )}
        >
          <Stack spacing={20} mt="md">

            <TextInput
              placeholder="Segment sequence"
              label="Segment sequence:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('segment_sequence')}
            />

            <TextInput
              placeholder="Primer name"
              label="Primer name:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('primer_name')}
            />

            <TextInput
              placeholder="Primer description"
              label="Primer description:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('primer_desc')}
            />

            <TextInput
              placeholder="Primer name"
              label="Primer 2 name:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('primer2_name')}
            />

            <TextInput
              placeholder="Primer description"
              label="Primer 2 description:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('primer2_desc')}
            />

            <TextInput
              placeholder="DNA region"
              label="DNA region:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('DNA_region')}
            />

            <TextInput
              placeholder="Sequence length"
              label="Sequence length:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('sequence_length')}
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
