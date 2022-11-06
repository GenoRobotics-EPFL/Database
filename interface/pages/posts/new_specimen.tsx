import { AppShell, Navbar, Header, Title, Button, Center, Checkbox, TextInput, Select, NumberInput, Textarea, Text } from '@mantine/core'

import Link from 'next/link'

export default function NewSpecimen() {
    return (
        <>
            <AppShell
                padding="md"
            >

                <Header height={60} p="xs">
                    <Title order={1}>
                        New specimen
                    </Title>
                </Header>

                <form action="/send-data-here" method="post">
                    <Textarea
                        placeholder="Specimen description"
                        label="Description"
                        sx={{ width: 400 }}
                        withAsterisk
                    /><br />
                    <TextInput
                        placeholder="Image URL"
                        label="URL"
                        withAsterisk

                        sx={{ width: 200 }}
                    /><br />

                    <Select
                        label="Sex"
                        placeholder="Pick one"
                        sx={{ width: 200 }}
                        withAsterisk
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
                        data={[
                            { value: 'collection', label: 'DNA collection' }
                        ]}
                    /><br />

                    <label htmlFor="collectiontime">Collection datatime:</label><br />
                    <input type="datetime-local" id="collectiontime" name="collectiontime" /><br /><br />

                    <Text
                    />Taxonomy : <br /><br />
                    <TextInput
                        placeholder="Domain"
                        sx={{ width: 200 }}
                    /><br />
                    <TextInput
                        placeholder="Kingdom"
                        sx={{ width: 200 }}
                    /><br />
                    <TextInput
                        placeholder="Phylum"
                        sx={{ width: 200 }}
                    /><br />
                    <TextInput
                        placeholder="Class"
                        sx={{ width: 200 }}
                    /><br />
                    <TextInput
                        placeholder="Family"
                        sx={{ width: 200 }}
                    /><br />
                    <TextInput
                        placeholder="Species"
                        sx={{ width: 200 }}
                    /><br />

                    <Text
                    />Collection area : <br /><br />
                    <TextInput
                        placeholder="Continent/Ocean"
                        sx={{ width: 200 }}
                    /><br />
                    <TextInput
                        placeholder="Country"
                        sx={{ width: 200 }}
                    /><br />
                    <TextInput
                        placeholder="Region"
                        sx={{ width: 200 }}
                    /><br />

                    <TextInput
                        placeholder="Coordinates"
                        label="GPS coordinates"
                        withAsterisk
                        sx={{ width: 200 }}
                    /><br />


                </form>

                <Button type="submit">Submit</Button>

                <h4>
                    <Link href="/">Back</Link>
                </h4>

            </AppShell>


        </>
    )
}
