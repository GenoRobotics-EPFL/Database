import { AppShell, Navbar, Header, Title, Button, Tabs, Checkbox, TextInput, Select, NumberInput, Textarea, Footer } from '@mantine/core'
import { MyHeader, MyFooter, MyNavbar } from '../graphics'

import { useForm } from '@mantine/form';

import Link from 'next/link'
import { API } from '../../types';


export default function NewSample() {
    const form = useForm({
        initialValues: {
            id: 0,
            person_id: 0,
            location_id: 0,
            timestamp: new Date(''),
            image_url: '',
            image_timestamp: new Date(''),
            image_desc: '',

            sample_id: 0,
            amplification_method_id: 0,

            amplification_id: 0,
            sequencing_method_id: 0,
            base_calling_file: '',
            primer_code: '',
            sequence_length: '',
            barcode: '',
            primer_desc: '',

        },
        validate: {
            id: (value) => (value ? null : 'Invalid ID'),
            person_id: (value) => (value ? null : 'Invalid  ID'),
            location_id: (value) => (value ? null : 'Invalid ID'),
            sample_id: (value) => (value ? null : 'Invalid ID'),
            amplification_method_id: (value) => (value ? null : 'Invalid ID'),
            amplification_id: (value) => (value ? null : 'Invalid ID'),
            sequencing_method_id: (value) => (value ? null : 'Invalid ID'),
            base_calling_file: (value) => (value ? null : 'Invalid base calling file'),
            primer_code: (value) => (value ? null : 'Invalid primer code'),
            sequence_length: (value) => (value ? null : 'Invalid'),
            barcode: (value) => (value ? null : 'Invalid barcode'),
            primer_desc: (value) => (value ? null : 'Enter description'),

        },

    });

    const postSample = async (data: Omit<API.Sample, "id">) => {
        const response = await fetch(
            "http://localhost:8000/samples/",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )
        const sample = await response.json()
        if (response.status == 200) {
            console.log("POST /samples")
            console.dir(sample)
        } else {
            console.log("POST /samples failed.")
        }
    }

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
                    Add a new sample
                </Title><br />

                <Tabs defaultValue="sample">
                    <Tabs.List>
                        <Tabs.Tab value="sample" >Sample</Tabs.Tab>
                        <Tabs.Tab value="amplification" >Amplification</Tabs.Tab>
                        <Tabs.Tab value="sequencing" >Sequencing</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="sample" pt="xs">
                        <form
                            onSubmit={form.onSubmit(
                                async (values) => await postSample({
                                    person_id: values.person_id,
                                    location_id: values.location_id,
                                    timestamp: values.timestamp,
                                    image_url: values.image_url,
                                    image_timestamp: values.image_timestamp,
                                    image_desc: values.image_desc,
                                })
                            )}
                        >
                            <TextInput
                                placeholder="Sample storing ID"
                                label="Sample ID:"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('id')}
                            /><br />
                            <TextInput
                                placeholder="Person ID"
                                label="Person ID:"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('person_id')}
                            /><br />
                            <label htmlFor="extractiontime">Extraction datatime:</label><br />
                            <input
                                type="datetime-local"
                                id="timestamp"
                                name="timestamp"
                                {...form.getInputProps('timestamp')}
                            /><br /><br />
                            <TextInput
                                placeholder="Image URL"
                                label="URL:"
                                withAsterisk
                                {...form.getInputProps('image_url')}
                                sx={{ width: 200 }}
                            /><br />
                            <label htmlFor="imagetime">Image timestamp:</label><br />
                            <input
                                type="datetime-local"
                                id="image_timestamp"
                                name="image_timestamp"
                                {...form.getInputProps('image_timestamp')}
                            /><br /><br />
                            <Textarea
                                placeholder="Description"
                                label="Image description:"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('image_desc')}
                            /><br />

                            <Button type="submit">Submit</Button>
                        </form>
                    </Tabs.Panel>

                    <Tabs.Panel value="amplification" pt="xs">
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
                                placeholder="Amplification ID:"
                                label="Amplification ID"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('id')}
                            /><br />
                            <NumberInput
                                defaultValue={0}
                                placeholder="Amplification method ID"
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
                    </Tabs.Panel>

                    <Tabs.Panel value="sequencing" pt="xs">
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
                            <TextInput
                                placeholder="Sequencing ID"
                                label="Sequencing ID:"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('id')}
                            /><br />
                            <NumberInput
                                defaultValue={0}
                                placeholder="Sequencing method ID"
                                label="Sequencing method ID:"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('sequencing_method_id')}
                            /><br />
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
                    </Tabs.Panel>
                </Tabs>



                <h4>
                    <Link href="/">Back</Link>
                </h4>

            </AppShell>





        </>
    );
}
