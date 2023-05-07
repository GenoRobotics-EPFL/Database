import {
  AppShell, Title, Button, TextInput, createStyles,
  Group, Textarea, Anchor, Stack, Divider, Select,
} from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { useForm } from '@mantine/form';
import { useDataState } from '../../utils/dataState';
import { API } from '../../types';
import React from 'react';

import { useRouter } from 'next/router'
import { Text, useMantineTheme } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconCheck, IconAlertCircle } from '@tabler/icons';
import { Dropzone } from '@mantine/dropzone';
import { fileExists } from '../../utils/utilsS3';
import { showNotification } from '@mantine/notifications';
import useFileUploader from '../../utils/useFileUploader';

const useStyles = createStyles((theme) => ({
  app: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 20,
    width: 400
  },
}));

export default function NewSequencing() {
  const state = useDataState()
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const router = useRouter()
  const fileUploader = useFileUploader()

  const form = useForm({
    initialValues: {
      id: 0,
      sample_id: 0,
      amplification_method_id: 0,
      amplification_timestamp: new Date(''),
      sequencing_method_id: 0,
      timestamp: new Date(''),
      base_calling_file: '',

    },
    validate: {
    },

  });


  const postSequencing = async (data: Omit<API.Sequencing, "id">) => {
    const response = await state.postSequencing(data)
    if (response.status == 200) {
      console.log("POST /sequencings")
      form.reset()
    } else {
      console.log("POST /sequencings failed.")
    }
  }

  const uploadFile = async (file: File) => {
    if (await fileExists(file.name)) {
      showNotification({
        title: 'Error',
        message: `A file with name '${file.name}' already exists`,
        color: "red",
        icon: <IconAlertCircle />,
      })
      return
    }
    fileUploader.uploadFile(file)
      .then(r => {
        if (r.status == 200) {
          form.setValues({ ...form.values, base_calling_file: file.name })
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
          Add a new sequencing
        </Title>

        <Divider mt="lg" />

        <form
          onSubmit={form.onSubmit(
            async (values) => await postSequencing({
              sample_id: values.sample_id,
              amplification_method_id: values.amplification_method_id,
              amplification_timestamp: values.amplification_timestamp,
              sequencing_method_id: values.sequencing_method_id,
              timestamp: values.timestamp,
              base_calling_file: values.base_calling_file,
            })
          )}
        >

          <Stack spacing={20} mt="md">

            <Select
              label="Sample ID:"
              sx={{ width: 200 }}
              data={state.samples.map(p => (
                {
                  value: String(p.id),
                  label: p.name
                }
              ))}
              withAsterisk
              {...form.getInputProps('sample_id')}
              value={String(form.values.sample_id)}
              onChange={(v) => form.setValues({ ...form.values, sample_id: Number(v) })}
            />

            <Select
              label="Amplification method ID:"
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

            <label htmlFor="sequencingtime">Amplification timestamp:</label>
            <Group>
              <input
                type="datetime-local"
                id="amplification_timestamp"
                name="amplification_timestamp"
                {...form.getInputProps('amplification_timestamp')}
              />
            </Group>

            <Select
              label="Sequencing method:"
              sx={{ width: 200 }}
              data={state.sequencingMethods.map(p => (
                {
                  value: String(p.id),
                  label: p.name
                }
              ))}
              withAsterisk
              {...form.getInputProps('sequencing_method_id')}
              value={String(form.values.sequencing_method_id)}
              onChange={(v) => form.setValues({ ...form.values, sequencing_method_id: Number(v) })}
            />
            <label htmlFor="sequencingtime">Sequencing datatime:</label>
            <Group>
              <input
                type="datetime-local"
                id="timestamp"
                name="timestamp"
                {...form.getInputProps('timestamp')}
              />
            </Group>
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
                      Upload base calling file
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
              <Button type="reset"  > Reset</Button>
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
