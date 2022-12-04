import { AppShell, Navbar, Header, Title, Button, Tabs, Checkbox, TextInput, Select, NumberInput, Textarea, Footer } from '@mantine/core'
import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';
import { useForm } from '@mantine/form';

import Link from 'next/link'
import { API } from '../../types';
import React from 'react';


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

        },
        validate: {
            image_url: (value) => (value ? null : 'Invalid barcode'),
            image_desc: (value) => (value ? null : 'Enter description'),
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

                <h4>
                    <Link href="/">Back</Link>
                </h4>

            </AppShell>





        </>
    );
}
