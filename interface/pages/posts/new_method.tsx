import {
  TextInput, Select, Anchor, Tabs, NumberInput, Textarea, NavLink, createStyles, Stack, Space, ActionIcon, AppShell, Title, Group, Button,
} from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { useForm } from '@mantine/form';
import { API } from '../../types';
import React from 'react';


const useStyles = createStyles((theme) => ({
  app: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

}));


export default function NewAmplificationMethod() {

  const amplification_form = useForm({
    initialValues: {
      methodname: '',
      id: 0,
    },
    validate: {
      methodname: (value) => (value ? null : 'Invalid method name')
    },
  });

  const identification_form = useForm({
    initialValues: {
      methodname: '',
      id: 0,
      methodtype: '',
      description: '',
      version: 0,
    },
    validate: {
      methodname: (value) => (value ? null : 'Invalid method name'),
      methodtype: (value) => (value ? null : 'Select method type'),
      description: (value) => (value ? null : 'Invalid description'),
      version: (value) => (value ? null : 'Enter version'),
    },

  });

  const sequencing_form = useForm({
    initialValues: {
      methodname: '',
      id: 0,
      methodtype: '',
      description: '',
    },
    validate: {
      methodname: (value) => (value ? null : 'Invalid method name'),
      methodtype: (value) => (value ? null : 'Select method type'),
      description: (value) => (value ? null : 'Invalid description'),
    },

  });

  const postAmplificationMethod = async (data: Omit<API.AmplificationMethod, "id">) => {
    const response = await fetch(
      "http://localhost:8000/amplification_methods/",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const amplification_method = await response.json()
    if (response.status == 200) {
      console.log("POST /amplification_methods")
      console.dir(amplification_method)
    } else {
      console.log("POST /amplification_methods failed.")
    }
  }

  const postIdentificationMethod = async (data: Omit<API.IdentificationMethod, "id">) => {
    const response = await fetch(
      "http://localhost:8000/identification_methods/",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const identification_method = await response.json()
    if (response.status == 200) {
      console.log("POST /identification_methods")
      console.dir(identification_method)
    } else {
      console.log("POST /identification_methods failed.")
    }
  }

  const postSequencingMethod = async (data: Omit<API.SequencingMethod, "id">) => {
    const response = await fetch(
      "http://localhost:8000/sequencing_methods/",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const sequencing_method = await response.json()
    if (response.status == 200) {
      console.log("POST /sequencing_methods")
      console.dir(sequencing_method)
    } else {
      console.log("POST /sequencing_methods failed.")
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
        <Title order={2} mt='md'>
          Add a new method
        </Title>

        <Tabs defaultValue="amplification" mt="lg">
          <Tabs.List>
            <Tabs.Tab value="amplification" >Amplification method</Tabs.Tab>
            <Tabs.Tab value="identification" >Identification method</Tabs.Tab>
            <Tabs.Tab value="sequencing" >Sequencing method</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="amplification" pt="xs" mt="md">
            <form
              onSubmit={amplification_form.onSubmit(
                async (values) => await postAmplificationMethod({
                  name: values.methodname,
                })
              )}
            >
              <Stack spacing={20}>
                <TextInput
                  placeholder="Name"
                  label="Method name"
                  sx={{ width: 400 }}
                  withAsterisk
                  {...amplification_form.getInputProps('methodname')}
                />

                <Group mt="md" >
                  <Button type="submit" >Submit</Button>
                  <Button type="reset" onClick={amplification_form.reset}> Reset</Button>
                </Group>

                <Anchor size={14} href="/" target="_self">
                  Back to home page
                </Anchor>

              </Stack>

            </form>

          </Tabs.Panel>

          <Tabs.Panel value="identification" pt="xs" mt="md">

            <form
              onSubmit={identification_form.onSubmit(
                async (values) => await postIdentificationMethod({
                  name: values.methodname,
                  description: values.description,
                  type: values.methodtype,
                  version: values.version
                })
              )}
            >
              <Stack spacing={20}>
                <TextInput
                  placeholder="Name"
                  label="Method name"
                  sx={{ width: 400 }}
                  withAsterisk
                  {...identification_form.getInputProps('methodname')}
                />
                <Textarea
                  placeholder="Description"
                  label="Method description"
                  sx={{ width: 400 }}
                  withAsterisk
                  {...identification_form.getInputProps('description')}
                />
                <Group>
                  <Select
                    label="Method type"
                    placeholder="Method type"
                    sx={{ width: 200 }}
                    withAsterisk
                    {...identification_form.getInputProps('methodtype')}
                    data={[
                      { value: 'sequ', label: 'Sequencing' },
                      { value: 'tax', label: 'Taxonomic' },
                    ]}
                  />
                  <NumberInput
                    defaultValue={1}
                    placeholder="Version"
                    label="Version"
                    sx={{ width: 100 }}
                    withAsterisk
                    {...identification_form.getInputProps('version')}
                  />
                </Group>

                <Group mt="md" >
                  <Button type="submit" >Submit</Button>
                  <Button type="reset" onClick={identification_form.reset} > Reset</Button>
                </Group>

                <Anchor size={15} href="/" target="_self">
                  Back to home page
                </Anchor>

              </Stack>

            </form>

          </Tabs.Panel>

          <Tabs.Panel value="sequencing" pt="xs" mt="md">

            <form
              onSubmit={
                sequencing_form.onSubmit(
                  async (values) => await postSequencingMethod({
                    name: values.methodname,
                    description: values.description,
                    type: values.methodtype,
                  }),
                  sequencing_form.reset
                )}
            >

              <Stack spacing={20}>
                <TextInput
                  placeholder="Name"
                  label="Method name"
                  sx={{ width: 400 }}
                  withAsterisk
                  {...sequencing_form.getInputProps('methodname')}
                />
                <Textarea
                  placeholder="Description"
                  label="Method description"
                  sx={{ width: 400 }}
                  withAsterisk
                  {...sequencing_form.getInputProps('description')}
                />
                <Select
                  label="Method type"
                  placeholder="Method type"
                  sx={{ width: 200 }}
                  withAsterisk
                  data={[
                    { value: 'dna', label: 'DNA sequencing' },
                  ]}
                  {...sequencing_form.getInputProps('methodtype')}
                />

                <Group mt="md" >
                  <Button type="submit" >Submit</Button>
                  <Button type="reset" onClick={sequencing_form.reset} > Reset</Button>
                </Group>

                <Anchor size={15} href="/" target="_self">
                  Back to home page
                </Anchor>

              </Stack>

            </form>

          </Tabs.Panel>

        </Tabs>


      </AppShell>
    </>
  );
}

