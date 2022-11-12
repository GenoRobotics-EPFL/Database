import { AppShell, Navbar, Header, Title, Button, Center, Checkbox, TextInput, Select, Footer, Group } from '@mantine/core'
import { useForm } from '@mantine/form';

import Link from 'next/link'


export default function NewMethod() {

  const form = useForm({
    initialValues: {
      methodname: '',
      description: '',
      methodtype: ''
    },
    validate: {
      methodname: (value) => (value ? null : 'Invalid method name'),
      description: (value) => (value ? null : 'Invalid description'),
      methodtype: (value) => (value ? null : 'Pick method type')
    },

  });

  return (
    <>

      <AppShell
        padding="md"
        header={
          <Header height={80} p="xs">
            <Title order={1}>
              <img
                width="65"
                height="45"
                src="https://www.genorobotics.org/wp-content/uploads/2020/11/Genorobotics-logo-12-fond-transp-90x64.png"
                alt="GenoRobotics"
                sizes="(max-width: 90px) 100vw, 90px" />
              GenoRobotics
            </Title>
          </Header>

        }

        footer={
          <Footer height={110} p="xs">
            <Center>
              <img
                width="200"
                height="100"
                src="https://www.genorobotics.org/wp-content/uploads/2020/04/Genorobotics-logo-52.png"
                alt="Genorobotics logo-52" ></img>
              Copyright © 2022 GenoRobotics
            </Center>
          </Footer>
        }

        navbar={
          <Navbar width={{ base: 300 }} p="xs">

            <Title order={2}>
              Menu
            </Title><br />

            <Button
              component="a" sx={{ width: 200 }} disabled
              href="/posts/new_method"
              color="teal"
            >Add a new method
            </Button><br />

            <Button
              component="a" sx={{ width: 200 }}
              href="/posts/new_sample"
              color="teal"
            >Add a new sample
            </Button><br />

            <Button
              component="a" sx={{ width: 200 }}
              href="/posts/new_specimen"
              color="teal"
            >Add a new specimen
            </Button><br />

            <Button
              component="a" sx={{ width: 200 }}
              href="/posts/new_person"
              color="teal"
            >Add a new person
            </Button><br />

            <Button
              component="a" sx={{ width: 200 }}
              href="/posts/see_tables"
              color="teal"
            >See tables
            </Button><br />


          </Navbar>

        }
      >
        <Title order={2}>
          Add a new method
        </Title><br />

        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            placeholder="Name"
            label="Method name"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('methodname')}
          /><br />
          <TextInput
            placeholder="Description"
            label="Method description"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('description')}
          /><br />

          <Select
            label="Method type"
            placeholder="Pick one"
            sx={{ width: 200 }}
            withAsterisk
            {...form.getInputProps('methodtype')}
            data={[
              { value: 'amplif', label: 'Amplification' },
              { value: 'extract', label: 'Extraction' },
              { value: 'sequ', label: 'Sequencing' },
              { value: 'tax', label: 'Taxonomic' },
              { value: 'collec', label: 'Collection' },
            ]}
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
