import { AppShell, Navbar, Header, Title, Button, Center, Checkbox, TextInput, Select, NumberInput, Textarea, Footer } from '@mantine/core'
import { useForm } from '@mantine/form';

import Link from 'next/link'

export default function NewSample() {
    const form = useForm({
        initialValues: {
            location: '',
            sequencer_email: '',
            uploader_email: '',
            methodtype: '',
            amplificationtype: '',
            ID: '',
            sequencing_time: '',
            amplification_time: '',
            extraction_time: '',
            primercode: '',
            length: '',
            marker: '',
            description: ''
        },
        validate: {
            location: (value) => (value ? null : 'Invalid location'),
            sequencer_email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            uploader_email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            methodtype: (value) => (value ? null : 'Invalid type'),
            amplificationtype : (value) => (value ? null : 'Invalid type'),
            ID: (value) => (value ? null : 'Invalid ID'),
            primercode: (value) => (value ? null : 'Invalid code'),
            marker: (value) => (value ? null : 'Invalid marker'),
            description: (value) => (value ? null : 'Invalid description'),
        },

    });

    return (
        <>

            <AppShell
                padding="md"
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}
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
                            component="a" sx={{ width: 200 }}
                            href="/posts/new_method"
                            color="teal"
                        >Add a new method
                        </Button><br />

                        <Button
                            component="a" sx={{ width: 200 }} disabled
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
                    Add a new sample
                </Title><br />

                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        placeholder="Storing Location"
                        label="Location"
                        sx={{ width: 200 }}
                        withAsterisk
                        {...form.getInputProps('location')}

                    /><br />
                    <TextInput
                        placeholder="Sample sequencer email"
                        label="Sequencer email"
                        sx={{ width: 200 }}
                        withAsterisk
                        {...form.getInputProps('sequencer_email')}

                    /><br />
                    <TextInput
                        placeholder="Sample uploader email"
                        label="Uploader email"
                        sx={{ width: 200 }}
                        withAsterisk
                        {...form.getInputProps('uploader_email')}

                    /><br />
                    <Select
                        label="Sequencing method type"
                        placeholder="Pick one"
                        sx={{ width: 200 }}
                        withAsterisk
                        {...form.getInputProps('methodtype')}
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
                        {...form.getInputProps('amplificationtype')}
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
                        {...form.getInputProps('ID')}

                    /><br />


                    <label htmlFor="sequencingtime">Sequencing datatime:</label><br />
                    <input
                        type="datetime-local"
                        id="sequencingtime"
                        name="sequencingtime"
                        {...form.getInputProps('sequencing_time')}

                    /><br /><br />
                    <label htmlFor="amplificationtime">Amplification datatime:</label><br />
                    <input
                        type="datetime-local"
                        id="amplificationtime"
                        name="amplificationtime" 
                        {...form.getInputProps('amplification_time')}
                        /><br /><br />
                    <label htmlFor="extractiontime">Extraction datatime:</label><br />
                    <input
                        type="datetime-local"
                        id="extractiontime"
                        name="extractiontime" 
                        {...form.getInputProps('extraction_time')}
                        /><br /><br />

                    <Select
                        label="Primer code"
                        placeholder="Pick one"
                        sx={{ width: 200 }}
                        withAsterisk
                        {...form.getInputProps('primercode')}

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
                        {...form.getInputProps('lenght')}

                    /><br />
                    <TextInput
                        placeholder="Marker:"
                        label="Marker"
                        sx={{ width: 200 }}
                        withAsterisk
                        {...form.getInputProps('marker')}

                    /><br />
                    <Textarea
                        placeholder="Description"
                        label="Primer Description"
                        sx={{ width: 400 }}
                        withAsterisk
                        {...form.getInputProps('description')}

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
