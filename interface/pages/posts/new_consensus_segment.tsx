import {
  AppShell, Title, Button, TextInput, Select, createStyles,
  Divider, Stack, Group, Anchor,
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

export default function NewConsensusSegment() {

  const router = useRouter()
  const state = useDataState()
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      id: 0,
      sequence_id: 0,
      segment_sequence: '',
      primer_forw_name: '',
      primer_forw_seq: '',
      primer_rev_name: '',
      primer_rev_seq: '',
      DNA_region: '',
      sequence_length: 0,
    },

    validate: {

    },

  });

  const postConsensusSegment = async (data: Omit<API.ConsensusSegment, "id">) => {
    const response = await state.postConsensusSegment(data)
    if (response.status == 200) {
      console.log("POST /consensus_segments")
      form.reset()
    } else {
      console.log("POST /consensus_segments failed.")
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
        header={MyHeader(false, false)}
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
              primer_forw_name: values.primer_forw_name,
              primer_forw_seq: values.primer_forw_seq,
              primer_rev_name: values.primer_rev_name,
              primer_rev_seq: values.primer_rev_seq,
              DNA_region: values.DNA_region,
              sequence_length: values.sequence_length
            })
          )}
        >
          <Stack spacing={20} mt="md">
            <Select
              label="Sequencing ID:"
              sx={{ width: 200 }}
              data={state.sequencings.map(p => (
                {
                  value: String(p.id),
                  label: p.id
                }
              ))}
              withAsterisk
              {...form.getInputProps('sequence_id')}
              value={String(form.values.sequence_id)}
              onChange={(v) => form.setValues({ ...form.values, sequence_id: Number(v) })}
            />

            <TextInput
              placeholder="Segment sequence"
              label="Segment sequence:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('segment_sequence')}
            />

            <TextInput
              placeholder="Primer name"
              label="Forward primer name:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('primer_name')}
            />

            <TextInput
              placeholder="Sequence"
              label="Forward primer sequence:"
              sx={{ width: 300 }}
              withAsterisk
              {...form.getInputProps('primer_desc')}
            />

            <TextInput
              placeholder="Primer name"
              label="Reverse primer name:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('primer2_name')}
            />

            <TextInput
              placeholder="Sequence"
              label="Reverse primer sequence:"
              sx={{ width: 300 }}
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