import {
  AppShell, createStyles, Title, Button, TextInput, Divider,
  Stack, Group, Anchor, Text, Select,
} from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'

import { useForm } from '@mantine/form';
import { API } from '../../types';
import React from 'react';
import { useDataState } from '../../utils/dataState';
import { useRouter } from 'next/router'



const useStyles = createStyles((theme) => ({
  app: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

}));

export default function NewAmplification() {
  const router = useRouter()
  const state = useDataState()
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      id: 0,
      sample_id: 0,
      amplification_method_id: 0,
      timestamp: new Date(''),

    },
    validate: {

    },

  });


  const postAmplification = async (data: Omit<API.Amplification, "id">) => {
    const response = await state.postAmplification(data)
    if (response.status == 200) {
      console.log("POST /amplifications")
      form.reset()
    } else {
      console.log("POST /amplifications failed.")
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

        <Title order={2} mt="md">
          Add a new amplification
        </Title>

        <Divider mt="lg" />

        <form
          onSubmit={form.onSubmit(
            async (values) => await postAmplification({
              sample_id: values.sample_id,
              amplification_method_id: values.amplification_method_id,
              timestamp: values.timestamp,
            })
          )}
          onReset={form.onReset}
        >
          <Stack spacing={20} mt="md">

            <Select
              label="Amplification method:"
              sx={{ width: 200 }}
              data={state.amplificationMethods.map(p => (
                {
                  value: String(p.id),
                  label: p.name
                }
              ))}
              withAsterisk
              {...form.getInputProps('amplification_method_id')}
              value={String(form.values.amplification_method_id)}
              onChange={(v) => form.setValues({ ...form.values, amplification_method_id: Number(v) })}
            />

            <label htmlFor="amplificationtime">Amplification datatime:</label>
            <Group >
              <input
                type="datetime-local"
                id="timestamp"
                name="timestamp"
                {...form.getInputProps('timestamp')}
              />
            </Group>

            <Group mt="md" >
              <Button type="submit" >Submit</Button>
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
