import {
  AppShell, Title, Button, TextInput, Textarea, createStyles,
  Divider, Stack, Group, Anchor, Select, Table, LoadingOverlay
} from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { useForm } from '@mantine/form';

import { Text, useMantineTheme } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconAlertCircle, IconCheck } from '@tabler/icons';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';

import { API } from '../../types';
import React from 'react';
import { useDataState } from '../../utils/dataState';
import { useRouter } from 'next/router';
import useFileUploader from '../../utils/useFileUploader';
import { fileExists } from '../../utils/utilsS3';
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
  app: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

}));



export default function NewSample() {

  const router = useRouter()
  const state = useDataState()
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const fileUploader = useFileUploader()

  const form = useForm<Omit<API.Sample, "id">>({
    initialValues: {
      person_id: 0,
      location_id: 0,
      timestamp: new Date(''),
      name: "",
      sex: '',
      lifestage: '',
      reproduction: '',
      image_url: '',
      image_timestamp: new Date(''),
      image_desc: '',
    },
    validate: {
      person_id: (value) => (value ? null : 'Select someone...'),
      location_id: (value) => (value ? null : 'Select a location...'),
      image_url: (value) => (value ? null : 'Enter an image...'),
      image_desc: (value) => (value ? null : 'Enter description'),
    },

  });


  const postSample = async (data: Omit<API.Sample, "id">) => {
    state.postSample(data)
      .then(response => {
        console.log("POST /samples")
        form.reset()
        showNotification({
          title: 'Notification',
          message: 'Your form was successfully submitted!',
          color: 'teal',
          icon: <IconCheck />,
        })
      })
      .catch(response => {
        console.log("POST /samples failed.")
        showNotification({
          title: 'Error',
          message: `Code: ${response.status}`,
          color: "red",
          icon: <IconAlertCircle />,
        })
      })
  }

  const uploadFile = async (file: File) => {
    if (await fileExists(file.name, state.apiKey)) {
      showNotification({
        title: 'Error',
        message: `A file with name '${file.name}' already exists`,
        color: "red",
        icon: <IconAlertCircle />,
      })
      return
    }
    fileUploader.uploadFile(file, state.apiKey)
      .then(r => {
        if (r.status == 200) {
          form.setValues({ ...form.values, image_url: file.name })
          showNotification({
            title: 'File upload',
            message: `The file ${file.name} was successfully uploaded.`,
            color: "teal",
            icon: <IconCheck />,
          })
        } else {
          showNotification({
            title: 'Error',
            message: `Code: ${r.status}`,
            color: "red",
            icon: <IconAlertCircle />,
          })
        }
      })
      .catch((e: Error) => {
        showNotification({
          title: 'Error',
          message: e.message,
          color: "red",
          icon: <IconAlertCircle />,
        })
      })
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
      <Title order={2} mt="md">
        Add a new sample
      </Title>

      <Divider mt="lg" />

      <form
        onSubmit={form.onSubmit(
          async (values) => await postSample({
            person_id: values.person_id,
            location_id: values.location_id,
            name: values.name,
            timestamp: values.timestamp,
            sex: null,
            lifestage: null,
            reproduction: null,
            image_url: values.image_url,
            image_timestamp: values.image_timestamp,
            image_desc: values.image_desc,
          })
        )}
      >
        <Stack spacing={20} mt="md">
          <Select
            label="Person"
            sx={{ width: 200 }}
            data={state.persons.map(p => (
              {
                value: String(p.id),
                label: p.name
              }
            ))}
            withAsterisk
            {...form.getInputProps('person_id')}
            // override value/onChange as the value as to be a string
            // https://mantine.dev/core/select/#controlled
            value={String(form.values.person_id)}
            onChange={(v) => form.setValues({ ...form.values, person_id: Number(v) })}
          />
          <Select
            label="Location"
            sx={{ width: 200 }}
            data={state.locations.map(p => (
              {
                value: String(p.id),
                label: `${p.collection_area} (${p.id})`
              }
            ))}
            withAsterisk
            {...form.getInputProps('location_id')}
            // override value/onChange as the value as to be a string
            // https://mantine.dev/core/select/#controlled
            value={String(form.values.location_id)}
            onChange={(v) => form.setValues({ ...form.values, location_id: Number(v) })}
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
          <TextInput
            placeholder="Name"
            label="Name:"
            withAsterisk
            {...form.getInputProps('name')}
            sx={{ width: 200 }}
          />
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
          <Textarea
            placeholder="Description"
            label="Image description:"
            sx={{ width: 400 }}
            withAsterisk
            {...form.getInputProps('image_desc')}
          />
          <Group>
            <Dropzone
              maxFiles={1}
              onDrop={(files) => uploadFile(files[0])}
              onReject={(files) => console.log('rejected files', files)}
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
                    Upload sample image
                  </Text>
                  <Text size="xs" color="dimmed" inline mt={7}>
                    Attach one file
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </Group>

          <Group mt="md" >
            <Button type="submit" > Submit</Button>
            <Button type="reset" onClick={form.reset} > Reset</Button>
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
  );
}
