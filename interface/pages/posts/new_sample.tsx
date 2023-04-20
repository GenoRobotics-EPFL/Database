import {
  AppShell, Title, Button, TextInput, Textarea, createStyles,
  Divider, Stack, Group, Anchor, Select, Table
} from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { useForm } from '@mantine/form';

import { Text, useMantineTheme } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import { useRouter } from 'next/router'
import { API } from '../../types';
import React from 'react';
import { useState, useEffect } from 'react';
import { URL } from '../../utils/config';

const useStyles = createStyles((theme) => ({
  app: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

}));





export default function NewSample() {
  const form = useForm({
    initialValues: {
      id: 0,
      person_id: 0,
      location_id: 0,
      timestamp: new Date(''),
      sex: '',
      lifestage: '',
      reproduction: '',
      image_url: '',
      image_timestamp: new Date(''),
      image_desc: '',

    },
    validate: {
      sex: (value) => (value ? null : 'Select one'),
      lifestage: (value) => (value ? null : 'Select one'),
      reproduction: (value) => (value ? null : 'Select one'),
      image_url: (value) => (value ? null : 'Invalid barcode'),
      image_desc: (value) => (value ? null : 'Enter description'),
    },

  });

  //////
  const [persons, setPersons] = useState<API.Person[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // define inner callback as useEffect doesn't support async callback
    // https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
    const cb = async () => {
      setLoading(true)
      const response = await fetch(`${URL}/persons`)
      const data = await response.json() as API.Person[]
      setPersons(data)
      setLoading(false)
    }
    cb()
  }, []) // for now this effect has no dependency (it's only executed once) hence the empty brackets 
  // https://medium.com/devil-is-in-the-details/dependency-array-in-useeffect-hook-d73e0ef2ab33

  const data = {
    ...persons.map((element) => (
      <div key={element.id}>{element.name}</div>))
  }
  /////

  const postSample = async (data: Omit<API.Sample, "id">) => {
    const response = await fetch(
      `${URL}/samples/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const sample = await response.json()
    if (response.status == 200) {
      console.log("POST /samples")
      console.dir(sample)
    } else {
      console.log("POST /samples failed.")
    }
  }

  const { classes } = useStyles();
  const [value, setValue] = useState(null);
  const theme = useMantineTheme();
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
        <Title order={2} mt="md">
          Add a new sample
        </Title>

        <Divider mt="lg" />

        <form
          onSubmit={form.onSubmit(
            async (values) => await postSample({
              person_id: values.person_id,
              location_id: values.location_id,
              timestamp: values.timestamp,
              sex: values.sex,
              lifestage: values.lifestage,
              reproduction: values.reproduction,
              image_url: values.image_url,
              image_timestamp: values.image_timestamp,
              image_desc: values.image_desc,
            })
          )}
        >
          <Stack spacing={20} mt="md">
            <Select
              placeholder="Person ID"
              label="Person ID:"
              sx={{ width: 150 }}

              data={[{
                ...persons.map((element) => (
                  <div key={element.id}>{element.name}</div>))
              }]} //FIND A FIX

              withAsterisk
              {...form.getInputProps('person_id')}
            />


            <Group>
              <Stack>
                <label htmlFor="extractiontime">Extraction datatime:</label>
                <Group>
                  <input
                    type="datetime-local"
                    id="timestamp"
                    name="timestamp"
                    style={{ width: 200 }}
                    {...form.getInputProps('timestamp')}
                  />
                </Group>
              </Stack>
              <Stack>
                <label htmlFor="imagetime">Image timestamp:</label>
                <Group>
                  <input
                    type="datetime-local"
                    id="image_timestamp"
                    name="image_timestamp"
                    style={{ width: 200 }}
                    {...form.getInputProps('image_timestamp')}
                  />
                </Group>
              </Stack>
            </Group>
            <Select
              label="Sex:"
              placeholder="Sex"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('sex')}

              data={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'hermaphrodite', label: 'Hermaphrodite' },
                { value: 'none', label: 'None' }
              ]}
            />
            <Select
              label="Lifestage:"
              placeholder="Lifestage"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('lifestage')}

              data={[
                { value: 'adult', label: 'Adult' },
                { value: 'immature', label: 'Immature' }
              ]}
            />
            <Select
              label="Reproduction:"
              placeholder="Reproduction"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('reproduction')}

              data={[
                { value: 'sexual', label: 'Sexual' },
                { value: 'asexual', label: 'Asexual' },
                { value: 'cyclic', label: 'Cyclic' },
                { value: 'pathogen', label: 'Pathogen' }
              ]}
            />
            <TextInput
              placeholder="Image URL"
              label="URL:"
              withAsterisk
              {...form.getInputProps('image_url')}
              sx={{ width: 400 }}
            />
            <Textarea
              placeholder="Description"
              label="Image description:"
              sx={{ width: 400 }}
              withAsterisk
              {...form.getInputProps('image_desc')}
            />
            <Group>
              <Dropzone
                onDrop={(files) => console.log('accepted files', files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}

              // {...props}
              >
                <Group position="center" spacing="xl" style={{ minHeight: 50, pointerEvents: 'none' }}>
                  <Dropzone.Accept>
                    <IconUpload
                      size={50}
                      stroke={1.5}
                      color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      size={50}
                      stroke={1.5}
                      color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto size={40} stroke={1.5} />
                  </Dropzone.Idle>

                  <div>
                    <Text size="lg" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="xs" color="dimmed" inline mt={7}>
                      Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
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
  );
}
