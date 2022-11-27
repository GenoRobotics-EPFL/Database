import { AppShell, Navbar, Header, Title, Button, Center, Tabs, TextInput, Select, NumberInput, Textarea, Text, Footer } from '@mantine/core'
import { MyHeader, MyFooter, MyNavbar } from '../graphics'

import { useForm } from '@mantine/form';

import Link from 'next/link'
import { API } from '../../types';


export default function NewSpecimen() {
    const form = useForm({
        initialValues: {
            id: 0,
            sample_id: 0,
            sequencing_id: 0,
            taxonomy_id: 0,
            identification_method_id: 0,
            timestamp: new Date(''),
            sex: '',
            lifestage: '',
            reproduction: '',

            collection_area: '',
            gps: '',
            elevation: 0,

            domain: '',
            kingdom: '',
            phylum: '',
            class_: '',
            family: '',
            species: '',

        },
        validate: {
            id: (value) => (value ? null : 'Invalid ID'),
            sample_id: (value) => (value ? null : 'Invalid ID'),
            sequencing_id: (value) => (value ? null : 'Invalid ID'),
            taxonomy_id: (value) => (value ? null : 'Invalid ID'),
            identification_method_id: (value) => (value ? null : 'Invalid ID'),
            timestamp: (value) => (value ? null : 'Invalid'),
            sex: (value) => (value ? null : 'Select one'),
            lifestage: (value) => (value ? null : 'Select one'),
            reproduction: (value) => (value ? null : 'Select one'),
            collection_area: (value) => (value ? null : 'Enter collection area'),
            gps: (value) => (value ? null : 'Enter GPS'),
            elevation: (value) => (value ? null : 'Enter elevation'),
            domain: (value) => (value ? null : 'Invalid domain'),
            kingdom: (value) => (value ? null : 'Invalid kingdom'),
            phylum: (value) => (value ? null : 'Invalid phylum'),
            class_: (value) => (value ? null : 'Invalid class'),
            family: (value) => (value ? null : 'Invalid family'),
            species: (value) => (value ? null : 'Invalid species'),

        },

    });

    const postPlantIdentification = async (data: Omit<API.PlantIdentification, "id">) => {
        const response = await fetch(
            "http://localhost:8000/plant_identifications/",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )
        const plant_identification = await response.json()
        if (response.status == 200) {
            console.log("POST /plant_identifications")
            console.dir(plant_identification)
        } else {
            console.log("POST /plant_identifications failed.")
        }
    }

    const postLocation = async (data: Omit<API.Location, "id">) => {
        const response = await fetch(
            "http://localhost:8000/locations/",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )
        const location = await response.json()
        if (response.status == 200) {
            console.log("POST /locations")
            console.dir(location)
        } else {
            console.log("POST /locations failed.")
        }
    }

    const postTaxonomy = async (data: Omit<API.Taxonomy, "id">) => {
        const response = await fetch(
            "http://localhost:8000/taxonomy/",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )
        const taxonomy = await response.json()
        if (response.status == 200) {
            console.log("POST /taxonomy")
            console.dir(taxonomy)
        } else {
            console.log("POST /taxonomy failed.")
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
                    Add a new specimen
                </Title><br />

                <Tabs defaultValue="plantidentification">
                    <Tabs.List>
                        <Tabs.Tab value="plantidentification" >Plant identification</Tabs.Tab>
                        <Tabs.Tab value="location" >Location</Tabs.Tab>
                        <Tabs.Tab value="taxonomy" >Taxonomy</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="plantidentification" pt="xs">
                        <form
                            onSubmit={form.onSubmit(
                                async (values) => await postPlantIdentification({
                                    sample_id: values.sample_id,
                                    sequencing_id: values.sequencing_id,
                                    taxonomy_id: values.taxonomy_id,
                                    identification_method_id: values.identification_method_id,
                                    timestamp: values.timestamp,
                                    sex: values.sex,
                                    lifestage: values.lifestage,
                                    reproduction: values.reproduction,
                                })
                            )}
                        >
                            < TextInput
                                placeholder="ID"
                                label="ID:"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('id')}
                            /><br />
                            <TextInput
                                placeholder="Method ID"
                                label="Identification method ID:"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('identification_method_id')}
                            /><br />
                            <label htmlFor="timestamp">Identification datatime:</label><br />
                            <input
                                type="datetime-local"
                                id="timestamp"
                                name="timestamp"
                                {...form.getInputProps('timestamp')}
                            /><br /><br />
                            <Select
                                label="Sex:"
                                placeholder="Sex"
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
                                label="Lifestage:"
                                placeholder="Lifestage"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('lifestage')}

                                data={[
                                    { value: 'adult', label: 'Adult' },
                                    { value: 'immature', label: 'immature' }
                                ]}
                            /><br />
                            <Select
                                label="Reproduction:"
                                placeholder="Reproduction"
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

                            <Button type="submit">Submit</Button>
                        </form>

                    </Tabs.Panel>

                    <Tabs.Panel value="location" pt="xs">
                        <form
                            onSubmit={form.onSubmit(
                                async (values) => await postLocation({
                                    collection_area: values.collection_area,
                                    gps: values.gps,
                                    elevation: values.elevation,
                                })
                            )}
                        >
                            <TextInput
                                placeholder="Collection area"
                                label="Collection area:"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('collection_area')}
                            /><br />
                            <TextInput
                                placeholder="GPS"
                                label="GPS:"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('gps')}
                            /><br />
                            <TextInput
                                placeholder="Elevation"
                                label="Elevation:"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('elevation')}
                            /><br />

                            <Button type="submit">Submit</Button>
                        </form>
                    </Tabs.Panel>

                    <Tabs.Panel value="taxonomy" pt="xs">
                        <form
                            onSubmit={form.onSubmit(
                                async (values) => await postTaxonomy({
                                    domain: values.domain,
                                    kingdom: values.kingdom,
                                    phylum: values.phylum,
                                    class_: values.class_,
                                    family: values.family,
                                    species: values.species,
                                })
                            )}
                        >
                            <TextInput
                                placeholder="Domain"
                                label="Domain"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('domain')}
                            /><br />
                            <TextInput
                                placeholder="Kingdom"
                                label="Kingdom"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('kingdom')}
                            /><br />
                            <TextInput
                                placeholder="Phylum"
                                label="Phylum"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('phylum')}
                            /><br />
                            <TextInput
                                placeholder="Class"
                                label="Class"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('class_')}
                            /><br />
                            <TextInput
                                placeholder="Family"
                                label="Family"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('family')}
                            /><br />
                            <TextInput
                                placeholder="Species"
                                label="Species"
                                sx={{ width: 200 }}
                                withAsterisk
                                {...form.getInputProps('species')}
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
    )
}
