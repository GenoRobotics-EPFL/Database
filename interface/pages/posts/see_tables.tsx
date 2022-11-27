import type { NextPage } from 'next'
import Head from 'next/head'


import { AppShell, Navbar, Header, Title, Button, Center, Image, Box, BackgroundImage, Text, Footer, MediaQuery, Grid } from '@mantine/core'
import { MyHeader, MyFooter, MyNavbar } from '../graphics'

import Link from 'next/link'

export default function SeeTables() {
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
                    See tables
                </Title><br />


                <Grid grow >
                    <Grid.Col span={4}>
                        <Button
                            component="a" sx={{ width: 250 }} 
                            href="/tables/sample_table"
                            color="indigo" variant="default"
                        >Sample table
                        </Button><br /><br />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Button
                            component="a" sx={{ width: 250 }} 
                            href="/tables/person_table"
                            color="indigo" variant="default"
                        >Person table
                        </Button><br /><br />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Button
                            component="a" sx={{ width: 250 }} 
                            href="/tables/location_table"
                            color="indigo" variant="default"
                        >Location table
                        </Button><br /><br />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Button
                            component="a" sx={{ width: 250 }} 
                            href="/tables/amplification_method_table"
                            color="indigo" variant="default"
                        >Amplification method table
                        </Button><br /><br />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Button
                            component="a" sx={{ width: 250 }} 
                            href="/tables/identification_method_table"
                            color="indigo" variant="default"
                        >Identification method table
                        </Button><br /><br />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Button
                            component="a" sx={{ width: 250 }} 
                            href="/tables/sequencing_method_table"
                            color="indigo" variant="default"
                        >Sequencing method table
                        </Button><br /><br />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Button
                            component="a" sx={{ width: 250 }} 
                            href="/tables/amplification_table"
                            color="indigo" variant="default"
                        >Amplification table
                        </Button><br /><br />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Button
                            component="a" sx={{ width: 250 }} 
                            href="/tables/sequencing_table"
                            color="indigo" variant="default"
                        >Sequencing table
                        </Button><br /><br />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Button
                            component="a" sx={{ width: 250 }} 
                            href="/tables/plant_identification_table"
                            color="teal" variant="default"
                        >Plant Identification table
                        </Button><br /><br />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Button
                            component="a" sx={{ width: 250 }} 
                            href="/tables/taxonomy_table"
                            color="indigo" variant="default"
                        >Taxonomy table
                        </Button><br /><br />
                    </Grid.Col>



                </Grid>

                

                <h4>
                    <Link href="/">Back</Link>
                </h4>






            </AppShell>


        </>
    )
}
