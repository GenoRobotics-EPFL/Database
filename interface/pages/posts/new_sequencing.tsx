import { AppShell, Navbar, Header, Title, Button, Tabs, Checkbox, TextInput, Select, NumberInput, Textarea, Footer } from '@mantine/core'
import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';
import { useForm } from '@mantine/form';

import Link from 'next/link'
import { API } from '../../types';
import React from 'react';


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
      "http://localhost:8000/sequencings/",
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

  return (
    <>

      <AppShell
        padding="md"
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
        navbar={MyNavbar()}
        header={MyHeader()}
        footer={MyFooter()}
      >

        <Title order={2}>
          Add a new sequencing
        </Title><br />

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
          <label htmlFor="sequencingtime">Sequencing datatime:</label><br />
          <input
            type="datetime-local"
            id="timestamp"
            name="timestamp"
            {...form.getInputProps('timestamp')}
          /><br /><br />
          <TextInput
            placeholder="Base calling file"
            label="Base calling file:"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('base_calling_file')}
          /><br />
          <TextInput
            placeholder="Primer code"
            label="Primer code:"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('primer_code')}
          /><br />
          <TextInput
            placeholder="Sequence length"
            label="Sequence length:"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('sequence_length')}
          /><br />
          <TextInput
            placeholder="Barcode"
            label="Barcode:"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('barcode')}
          /><br />
          <Textarea
            placeholder="Primer description"
            label="Primer description:"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('primer_desc')}
          /><br />

          <Button type="submit">Submit</Button>
        </form>



        <h4>
          <Link href="/">Back</Link>
        </h4>

      </AppShell>





    </>
  );
}
