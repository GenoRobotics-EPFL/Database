import { AppShell, Navbar, Header, Title, Button, Center, Checkbox } from '@mantine/core'

import Link from 'next/link'

export default function NewSample() {
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
                    <label for="name"><b>Storing Location:</b></label><br />
                    <input type="text" id="name" name="name" placeholder="Location " /><br /><br />
                    <label for="sequencer"><b>Sample sequencer email:</b></label><br />
                    <input type="text" id="description" name="sequencer" placeholder="Sequencer email " /><br /><br />
                    <label for="uploader"><b>Sample uploader email:</b></label><br />
                    <input type="text" id="description" name="uploader" placeholder="Uploader email " /><br /><br />
                    <label for="type"><b>Sequencing method type:</b></label><br />
                    <select name="type" id="type">
                        <option value="nanopore">Nanopore DNA sequencing</option>
                        <option value="RNA">RNA sequencing</option>
                        <option value="illumina">Illumina sequencing</option>
                    </select><br /><br />
                    <label for="type"><b>Amplification method type:</b></label><br />
                    <select name="type" id="type">
                        <option value="pcr">Polymerase Chain Reaction</option>
                        <option value="isothermal">Isothermal amplification</option>
                    </select><br /><br />
                    <label for="type"><b>Specimen storing ID:</b></label><br />
                    <input type="text" id="name" name="name" placeholder="Specimen ID: " /><br /><br />
                    <label for="sequencingtime"><b>Sequencing datatime:</b></label><br />
                    <input type="datetime-local" id="sequencingtime" name="sequencingtime" /><br /><br />
                    <label for="amplificationtime"><b>Amplification datatime:</b></label><br />
                    <input type="datetime-local" id="amplificationtime" name="amplificationtime" /><br /><br />
                    <label for="extractiontime"><b>Extraction datatime:</b></label><br />
                    <input type="datetime-local" id="extractiontime" name="extractiontime" /><br /><br />
                    <label for="type"><b>Primer code:</b></label><br />
                    <select name="type" id="type">
                        <option value="forward">Forward</option>
                        <option value="reverse">Reverse</option>
                    </select><br /><br />
                    <label for="lenght"><b>Sequence lenght: </b></label><br />
                    <input type="text" id="lenght" name="lenght" placeholder="Sequence lenght" /><br /><br />
                    <label for="marker"><b>Marker: </b></label><br />
                    <input type="text" id="marker" name="marker" placeholder="Marker" /><br /><br />
                    <label for="primer"><b>Primer Description: </b></label><br />
                    <input type="text" id="primer" name="primer" placeholder="Primer description" /><br /><br />

                        <Button type="submit">Submit</Button>


                </form>

                <h4>
                    <Link href="/">Back</Link>
                </h4>

            </AppShell>





        </>
    );
}