import {
  AppShell, Title, Button, TextInput, Textarea, createStyles,
  Divider, Stack, Group, Anchor, Paper,
} from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { useForm } from '@mantine/form';

import { Text, useMantineTheme } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import { API } from '../../types';
import React from 'react';
import { useState } from 'react';
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
      image_url: '',
      image_timestamp: new Date(''),
      image_desc: '',

    },
    validate: {
      image_url: (value) => (value ? null : 'Invalid barcode'),
      image_desc: (value) => (value ? null : 'Enter description'),
    },

  });

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
              image_url: values.image_url,
              image_timestamp: values.image_timestamp,
              image_desc: values.image_desc,
            })
          )}
        >
          <Stack spacing={20} mt="md">
            <TextInput
              placeholder="Person ID"
              label="Person ID:"
              sx={{ width: 100 }}
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
                    style={{ width: 400 }}
                    {...form.getInputProps('image_timestamp')}
                  />
                </Group>
              </Stack>
            </Group>
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

            <Anchor size={14} href="/" target="_self">
              Back to home page
            </Anchor>

          </Stack>
        </form>



      </AppShell>





    </>
  );
}
