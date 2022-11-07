import { AppShell, Navbar, Header, Title, Button, Center, Checkbox, TextInput, Select } from '@mantine/core'

import Link from 'next/link'

export default function NewMethod() {

  return (
    <>
      

      <AppShell
        padding="md"
      >

        <Header height={60} p="xs">
          <Title order={1}>
            New method
          </Title>
        </Header>

        <form action="/send-data-here" method="post">
          <TextInput
            placeholder="Name"
            label="Method name"
            sx={{ width: 200 }}
            withAsterisk
          /><br />
          <TextInput
            placeholder="Description"
            label="Method description"
            sx={{ width: 200 }}
            withAsterisk
          /><br />

          <Select
            label="Method type"
            placeholder="Pick one"
            sx={{ width: 200 }}
            withAsterisk
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
