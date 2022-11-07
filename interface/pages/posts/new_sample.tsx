import { AppShell, Navbar, Header, Title, Button, Center, Checkbox, TextInput, Select, NumberInput, Textarea } from '@mantine/core'

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
                    <TextInput
                        placeholder="Storing Location"
                        label="Location"
                        sx={{ width: 200 }}
                        withAsterisk
                    /><br />
                    <TextInput
                        placeholder="Sample sequencer email"
                        label="Sequencer email"
                        sx={{ width: 200 }}
                        withAsterisk
                    /><br />
                    <TextInput
                        placeholder="Sample uploader email"
                        label="Uploader email"
                        sx={{ width: 200 }}
                        withAsterisk
                    /><br />
                    <Select
                        label="Sequencing method type"
                        placeholder="Pick one"
                        sx={{ width: 200 }}
                        withAsterisk
                        data={[
                            { value: 'nanopore', label: 'Nanopore DNA sequencing' },
                            { value: 'RNA', label: 'RNA sequencing' },
                            { value: 'illumina', label: 'Illumina sequencing' }
                        ]}
                    /><br />
                    <Select
                        label="Amplification method type"
                        placeholder="Pick one"
                        sx={{ width: 200 }}
                        withAsterisk
                        data={[
                            { value: 'pcr', label: 'Polymerase Chain Reaction' },
                            { value: 'isothermal', label: 'Isothermal amplification' },
                        ]}
                    /><br />
                    <TextInput
                        placeholder="Specimen storing ID:"
                        label="Specimen ID"
                        sx={{ width: 200 }}
                        withAsterisk
                    /><br />
                    <TextInput
                        placeholder="Specimen storing ID:"
                        label="Specimen ID"
                        sx={{ width: 200 }}
                        withAsterisk
                    /><br />


                    <label htmlFor="sequencingtime">Sequencing datatime:</label><br />
                    <input type="datetime-local" id="sequencingtime" name="sequencingtime" /><br /><br />
                    <label htmlFor="amplificationtime">Amplification datatime:</label><br />
                    <input type="datetime-local" id="amplificationtime" name="amplificationtime" /><br /><br />
                    <label htmlFor="extractiontime">Extraction datatime:</label><br />
                    <input type="datetime-local" id="extractiontime" name="extractiontime" /><br /><br />

                    <Select
                        label="Primer code"
                        placeholder="Pick one"
                        sx={{ width: 200 }}
                        withAsterisk
                        data={[
                            { value: 'forward', label: 'Forward' },
                            { value: 'reverse', label: 'Reverse' }
                        ]}
                    /><br />
                    <NumberInput
                        defaultValue={300}
                        placeholder="Lenght"
                        label="Sequence lenght"
                        sx={{ width: 200 }}
                        withAsterisk
                    /><br />
                    <TextInput
                        placeholder="Marker:"
                        label="Marker"
                        sx={{ width: 200 }}
                        withAsterisk
                    /><br />
                    <Textarea
                        placeholder="Description"
                        label="Primer Description"
                        sx={{ width: 400 }}
                        withAsterisk
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
