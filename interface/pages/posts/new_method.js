import { AppShell, Navbar, Header, Title, Button, Center, Checkbox } from '@mantine/core'

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
          <label for="name"><b>Method name:</b></label><br />
          <input type="text" id="name" name="name" placeholder="Name " /><br /><br />
          <label for="description"><b>Method description:</b></label><br />
          <input type="text" id="description" name="description" placeholder="Description " /><br /><br />
          <label for="type"><b>Method type:</b></label><br />
          <select name="type" id="type">
            <option value="amplification">Amplification</option>
            <option value="extraction">Extraction</option>
            <option value="sequencing">Sequencing</option>
            <option value="taxonomic">Taxonomic</option>
            <option value="collection">Collection</option>
          </select><br /><br />
          <Button type="submit">Submit</Button>


        </form>

        <h4>
          <Link href="/">Back</Link>
        </h4>

      </AppShell>






    </>
  );
}