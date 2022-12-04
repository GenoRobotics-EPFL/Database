import type { NextPage } from 'next'
import Head from 'next/head'
import { AppShell, Navbar, Header, Title, Button, Center, Image, Box, BackgroundImage, Text, Footer, MediaQuery, Aside, Table } from '@mantine/core'
import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { API } from '../../types'
import React from 'react'





export default function SampleTable() {

    const [samples, setSamples] = useState<API.Sample[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const cb = async () => {
            setLoading(true)
            const response = await fetch("http://localhost:8000/samples")
            const data = await response.json() as API.Sample[]
            setSamples(data)
            setLoading(false)
        }
        cb()
    }, [])

    return (
        <>
            <AppShell
                padding="md"
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}

                header={MyHeader()}
                footer={MyFooter()}

            >

                <Title order={2}>
                    Sample table
                </Title><br />


                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Person ID</th>
                            <th>Location ID</th>
                            <th>Time stamp</th>
                            <th>Image URL</th>
                            <th>Image time stamp</th>
                            <th>Image description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {samples.map((element) => (
                            <tr key={element.id}>
                                <td>{element.id}</td>
                                <td>{element.person_id}</td>
                                <td>{element.location_id}</td>
                                <td>{element.timestamp.toString()}</td>
                                <td>{element.image_url}</td>
                                <td>{element.image_timestamp.toString()}</td>
                                <td>{element.image_desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>


                <h4>
                    <Link href="/posts/see_tables">Back</Link>
                </h4>



            </AppShell>


        </>
    )
}
