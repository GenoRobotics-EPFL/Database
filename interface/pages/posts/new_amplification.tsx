import {
  AppShell, createStyles, Title, Button, TextInput, Divider,
  Stack, Group, Anchor, Text,
} from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'

import { useForm } from '@mantine/form';
import { useEffect } from 'react';

import { API } from '../../types';
import { useRouter } from 'next/router'
import { URL } from '../../utils/config';


const useStyles = createStyles((theme) => ({
  app: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

}));

export default function NewAmplification() {
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
    const response = await fetch(
      `${URL}/amplifications/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const amplification = await response.json()
    if (response.status == 200) {
      console.log("POST /amplifications")
      console.dir(amplification)
    } else {
      console.log("POST /amplifications failed.")
    }
  }

  const { classes } = useStyles();

  function loadInitialValues(): Promise<API.Amplification> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        id: 0,
        sample_id: 0,
        amplification_method_id: 0,
        timestamp: new Date(''),
      }),
        2000);
    });
  }
  useEffect(() => {
    loadInitialValues().then((values) => {
      form.setValues(values);
      form.resetDirty(values);
    });
  }, []);

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

            <Text>Amplification method ID:</Text>
            <Group>
              <TextInput
                placeholder="Amplification method ID:"
                sx={{ width: 100 }}
                withAsterisk
                {...form.getInputProps('amplification_method_id')}
              />
            </Group>
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

            <Anchor size={14} href="/" target="_self">
              Back to home page
            </Anchor>
          </Stack>
        </form>
      </AppShell>
    </>
  )
}
