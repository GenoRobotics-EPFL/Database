import { AppShell, Navbar, Header, Title, Button, Center, Checkbox, TextInput, Select, NumberInput, Textarea, Text, Footer } from '@mantine/core'
import { useForm } from '@mantine/form';

import Link from 'next/link'

export default function NewSpecimen() {
    const form = useForm({
        initialValues: {
            description: '',
            url: '',
            sex: '',
            lifestage: '',
            reproduction: '',
            collection_method: '',
            collection_time: '',
            domain: '',
            kingdom: '',
            phylum: '',
            class: '',
            family: '',
            species: '',
            continent: '',
            country: '',
            region: '',
            gps: ''
        },
        validate: {
            description: (value) => (value ? null : 'Invalid description'),
            url: (value) => (value ? null : 'Invalid URL'),
            sex: (value) => (value ? null : 'Invalid'),
            lifestage: (value) => (value ? null : 'Invalid'),
            reproduction: (value) => (value ? null : 'Invalid type'),
            collection_method: (value) => (value ? null : 'Invalid type'),
            domain: (value) => (value ? null : 'Invalid domain'),
            kingdom: (value) => (value ? null : 'Invalid kingdom'),
            phylum: (value) => (value ? null : 'Invalid phylum'),
            class: (value) => (value ? null : 'Invalid class'),
            family: (value) => (value ? null : 'Invalid family'),
            species: (value) => (value ? null : 'Invalid species'),
            continent: (value) => (value ? null : 'Invalid continent'),
            country: (value) => (value ? null : 'Invalid country'),
            region: (value) => (value ? null : 'Invalid region'),
            gps: (value) => (value ? null : 'Invalid GPS'),
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
                            component="a" sx={{ width: 200 }}
                            href="/posts/new_sample"
                            color="teal"
                        >Add a new sample
                        </Button><br />

                        <Button
                            component="a" sx={{ width: 200 }} disabled
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
                    Add a new specimen
                </Title><br />

                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Textarea
                        placeholder="Specimen description"
                        label="Description"
                        sx={{ width: 400 }}
                        withAsterisk
                        {...form.getInputProps('description')}

                    /><br />
                    <TextInput
                        placeholder="Image URL"
                        label="URL"
                        withAsterisk
                        {...form.getInputProps('url')}

                        sx={{ width: 200 }}
                    /><br />

                    <Select
                        label="Sex"
                        placeholder="Pick one"
                        sx={{ width: 200 }}
                        withAsterisk
                        {...form.getInputProps('sex')}

                        data={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'hermaphrodite', label: 'Hermaphrodite' },
                            { value: 'none', label: 'None' }
                        ]}
                    /><br />
                    <Select
                        label="Lifestage"
                        placeholder="Pick one"
                        sx={{ width: 200 }}
                        withAsterisk
                        {...form.getInputProps('lifestage')}

                        data={[
                            { value: 'adult', label: 'Adult' },
                            { value: 'immature', label: 'immature' }
                        ]}
                    /><br />
                    <Select
                        label="Reproduction"
                        placeholder="Pick one"
                        sx={{ width: 200 }}
                        withAsterisk
                        {...form.getInputProps('reproduction')}

                        data={[
                            { value: 'sexual', label: 'Sexual' },
                            { value: 'asexual', label: 'Asexual' },
                            { value: 'cyclic', label: 'Cyclic' },
                            { value: 'pathogen', label: 'Pathogen' }
                        ]}
                    /><br />
                    <Select
                        label="Collection method"
                        placeholder="Pick one"
                        sx={{ width: 200 }}
                        withAsterisk
                        {...form.getInputProps('collection_method')}
                        data={[
                            { value: 'collection', label: 'DNA collection' }
                        ]}
                    /><br />

                    <label htmlFor="collectiontime">Collection datatime:</label><br />
                    <input
                        type="datetime-local"
                        id="collectiontime"
                        name="collectiontime"
                        {...form.getInputProps('collection_time')}
                    /><br /><br />

                    <Text
                    />Taxonomy : <br /><br />
                    <TextInput
                        placeholder="Domain"
                        sx={{ width: 200 }}
                        {...form.getInputProps('domain')}

                    /><br />
                    <TextInput
                        placeholder="Kingdom"
                        sx={{ width: 200 }}
                        {...form.getInputProps('kingdom')}

                    /><br />
                    <TextInput
                        placeholder="Phylum"
                        sx={{ width: 200 }}
                        {...form.getInputProps('phylum')}

                    /><br />
                    <TextInput
                        placeholder="Class"
                        sx={{ width: 200 }}
                        {...form.getInputProps('class')}

                    /><br />
                    <TextInput
                        placeholder="Family"
                        sx={{ width: 200 }}
                        {...form.getInputProps('family')}

                    /><br />
                    <TextInput
                        placeholder="Species"
                        sx={{ width: 200 }}
                        {...form.getInputProps('species')}

                    /><br />

                    <Text
                    />Collection area : <br /><br />
                    <TextInput
                        placeholder="Continent/Ocean"
                        sx={{ width: 200 }}
                        {...form.getInputProps('continent')}

                    /><br />
                    <TextInput
                        placeholder="Country"
                        sx={{ width: 200 }}
                        {...form.getInputProps('country')}

                    /><br />
                    <TextInput
                        placeholder="Region"
                        sx={{ width: 200 }}
                        {...form.getInputProps('region')}

                    /><br />

                    <TextInput
                        placeholder="Coordinates"
                        label="GPS coordinates"
                        withAsterisk
                        sx={{ width: 200 }}
                        {...form.getInputProps('gps')}

                    /><br />

                    <Button type="submit">Submit</Button>

                </form>



                <h4>
                    <Link href="/">Back</Link>
                </h4>





            </AppShell>


        </>
    )
}
