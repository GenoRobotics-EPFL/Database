import { AppShell, Navbar, Header, Title, Button, Tabs, Checkbox, TextInput, Select, NumberInput, Textarea, Footer } from '@mantine/core'
import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';

import { useForm } from '@mantine/form';

import Link from 'next/link'
import { API } from '../../types';


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
      "http://localhost:8000/amplifications/",
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
          Add a new amplification
        </Title><br />


        <form
          onSubmit={form.onSubmit(
            async (values) => await postAmplification({
              sample_id: values.sample_id,
              amplification_method_id: values.amplification_method_id,
              timestamp: values.timestamp,
            })
          )}
        >
          <TextInput
            placeholder="Amplification method ID:"
            label="Amplification method ID:"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('amplification_method_id')}
          /><br />
          <label htmlFor="amplificationtime">Amplification datatime:</label><br />
          <input
            type="datetime-local"
            id="timestamp"
            name="timestamp"
            {...form.getInputProps('timestamp')}
          /><br /><br />

          <Button type="submit">Submit</Button>
        </form>


        <h4>
          <Link href="/">Back</Link>
        </h4>

      </AppShell>





    </>
  );
}