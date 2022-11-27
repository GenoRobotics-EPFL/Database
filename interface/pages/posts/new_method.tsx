import { AppShell, Textarea, Header, Title, Button, Center, Checkbox, TextInput, Select, Footer, Tabs, NumberInput } from '@mantine/core'
import { MyHeader, MyFooter, MyNavbar } from '../graphics'


import { useForm } from '@mantine/form';
import Link from 'next/link'
import { API } from '../../types';


export default function NewMethod() {

  const form = useForm({
    initialValues: {
      methodname: '',
      id: 0,
      methodtype: '',
      description: '',
      version: 0,
    },
    validate: {
      methodname: (value) => (value ? null : 'Invalid method name'),
      id: (value) => (value ? null : 'Invalid ID'),
      methodtype: (value) => (value ? null : 'Select method type'),
      description: (value) => (value ? null : 'Invalid description'),
      version: (value) => (value ? null : 'Enter version'),
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

  return (
    <>

      <AppShell
        padding="md"
        navbar={MyNavbar()}
        header={MyHeader()}
        footer={MyFooter()}
      >
        <Title order={2}>
          Add a new method
        </Title><br />



        <Tabs defaultValue="amplification">
          <Tabs.List>
            <Tabs.Tab value="amplification" >Amplification method</Tabs.Tab>
            <Tabs.Tab value="identification" >Identification method</Tabs.Tab>
            <Tabs.Tab value="sequencing" >Sequencing method</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="amplification" pt="xs">
            <form
              onSubmit={form.onSubmit(
                async (values) => await postAmplificationMethod({
                  name: values.methodname,
                })
              )}
            >
              < TextInput
                placeholder="Name"
                label="Method name"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('methodname')}
              /><br />
              <TextInput
                placeholder="Method ID"
                label="Method ID"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('id')}
              /><br />

              <Button type="submit">Submit</Button>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="identification" pt="xs">
            <form
              onSubmit={form.onSubmit(
                async (values) => await postIdentificationMethod({
                  name: values.methodname,
                  description: values.description,
                  type: values.methodtype,
                  version: values.version
                })
              )}
            >
              <TextInput
                placeholder="Name"
                label="Method name"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('methodname')}
              /><br />
              <TextInput
                placeholder="Method ID"
                label="Method ID"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('id')}
              /><br />
              <Textarea
                placeholder="Description"
                label="Method description"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('description')}
              /><br />
              <Select
                label="Method type"
                placeholder="Method type"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('methodtype')}
                data={[
                  { value: 'sequ', label: 'Sequencing' },
                  { value: 'tax', label: 'Taxonomic' },
                ]}
              /><br />
              <NumberInput
                defaultValue={1}
                placeholder="Version"
                label="Version"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('version')}
              /><br />
              <Button type="submit">Submit</Button>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="sequencing" pt="xs">
            <form
              onSubmit={form.onSubmit(
                async (values) => await postSequencingMethod({
                  name: values.methodname,
                  description: values.description,
                  type: values.methodtype,
                })
              )}
            >
              <TextInput
                placeholder="Name"
                label="Method name"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('methodname')}
              /><br />
              <TextInput
                placeholder="Method ID"
                label="Method ID"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('id')}
              /><br />
              <Select
                label="Method type"
                placeholder="Method type"
                sx={{ width: 200 }}
                withAsterisk
                {...form.getInputProps('methodtype')}
                data={[
                  { value: 'dna', label: 'DNA sequencing' },
                ]}
              /><br />
              <Button type="submit">Submit</Button>
            </form>
          </Tabs.Panel>
        </Tabs>


        <h4>
          <Link href="/">Back</Link>
        </h4>

      </AppShell>


    </>
  );
}
