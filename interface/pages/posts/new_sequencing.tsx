import {
  AppShell, Title, Button, TextInput, createStyles,
  Group, Textarea, Anchor, Stack, Divider,
} from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { MyNavbar } from '../../components/navbar';
import { useForm } from '@mantine/form';

import Link from 'next/link'
import { API } from '../../types';
import React from 'react';


import { Text, useMantineTheme } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { URL } from '../../utils/config';

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
  const form = useForm({
    initialValues: {
      id: 0,
      sample_id: 0,
      amplification_id: 0,
      sequencing_method_id: 0,
      timestamp: new Date(''),
      base_calling_file: '',
      primer_code: '',
      sequence_length: '',
      barcode: '',
      primer_desc: '',

    },
    validate: {
      base_calling_file: (value) => (value ? null : 'Invalid base calling file'),
      primer_code: (value) => (value ? null : 'Invalid primer code'),
      sequence_length: (value) => (value ? null : 'Invalid'),
      barcode: (value) => (value ? null : 'Invalid barcode'),
      primer_desc: (value) => (value ? null : 'Enter description'),

    },

  });


  const postSequencing = async (data: Omit<API.Sequencing, "id">) => {
    const response = await fetch(
      `${URL}/sequencings/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const sequencing = await response.json()
    if (response.status == 200) {
      console.log("POST /sequencings")
      console.dir(sequencing)
    } else {
      console.log("POST /sequencings failed.")
    }
  }

  const { classes } = useStyles();
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

        <Title order={2} mt='md'>
          Add a new sequencing
        </Title>

        <Divider mt="lg" />

        <form
          onSubmit={form.onSubmit(
            async (values) => await postSequencing({
              sample_id: values.sample_id,
              amplification_id: values.amplification_id,
              sequencing_method_id: values.sequencing_method_id,
              timestamp: values.timestamp,
              base_calling_file: values.base_calling_file,
              primer_code: values.primer_code,
              sequence_length: values.sequence_length,
              barcode: values.barcode,
              primer_desc: values.primer_desc,
            })
          )}
        >

          <Stack spacing={20} mt="md">

            <label htmlFor="sequencingtime">Sequencing datatime:</label>
            <Group>
              <input
                type="datetime-local"
                id="timestamp"
                name="timestamp"
                {...form.getInputProps('timestamp')}
              />
            </Group>
            <TextInput
              placeholder="Base calling file"
              label="Base calling file:"
              sx={{ width: 200 }}
              withAsterisk
              {...form.getInputProps('base_calling_file')}
            />
            <Group>
              <Dropzone
                className={classes.dropzone}
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
                      Upload base calling file
                    </Text>
                    <Text size="xs" color="dimmed" inline mt={7}>
                      Drag or click to select files
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            </Group>
            <Group>
              <TextInput
                placeholder="Sequence length"
                label="Sequence length:"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('sequence_length')}
              />
              <TextInput
                placeholder="Barcode"
                label="Barcode:"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('barcode')}
              />
            </Group>

            <Group>
              <TextInput
                placeholder="Primer code"
                label="Primer code:"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('primer_code')}
              />
              <TextInput
                placeholder="Primer description"
                label="Primer description:"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('primer_desc')}
              />
            </Group>

            <Group mt="md" >
              <Button type="submit" > Submit</Button>
              <Button type="reset"  > Reset</Button>
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
