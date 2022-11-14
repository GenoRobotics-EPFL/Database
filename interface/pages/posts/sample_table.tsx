import type { NextPage } from 'next'
import Head from 'next/head'


import { AppShell, Navbar, Header, Title, Button, Center, Image, Box, BackgroundImage, Text, Footer, MediaQuery, Aside, Table } from '@mantine/core'

import Link from 'next/link'




export default function SampleTable() {
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

                


            >

                <Title order={2}>
                    Sample table
                </Title><br />



                <Table>
                    <thead>
                        <tr>
                            <th>Sample ID</th>
                            <th>Storing location</th>
                            <th>Sample sequencer</th>
                            <th>Uploader sequencer</th>
                            <th>Sequencing type</th>
                            <th>Amplification type</th>
                            <th>Sequencing time</th>
                            <th>Amplification time</th>
                            <th>Primer code</th>
                            <th>Sequence length</th>
                            <th>Marker</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </Table>


                <h4>
                    <Link href="/posts/see_tables">Back</Link>
                </h4>



            </AppShell>


        </>
    )
}