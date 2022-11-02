import { AppShell, Navbar, Header, Title, Button, Center, Checkbox } from '@mantine/core'

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

                    <label for="description"><b>Description:</b></label><br />
                    <input type="text" id="description" name="description" placeholder="Description " /><br /><br />
                    <label for="URL"><b>Image URL:</b></label><br />
                    <input type="text" id="URL" name="URL" placeholder="URL " /><br /><br />
                    <label for="type"><b>Sex:</b></label><br />
                    <select name="type" id="sex">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="hermaphrodite">Hermaphrodite</option>
                        <option value="none">None</option>
                    </select><br /><br />
                    <label for="type"><b>Lifestage:</b></label><br />
                    <select name="type" id="lifestage">
                        <option value="adult">Adult</option>
                        <option value="immature">immature</option>
                    </select><br /><br />
                    <label for="type"><b>Reproduction:</b></label><br />
                    <select name="type" id="reproduction">
                        <option value="sexual">Sexual</option>
                        <option value="asexual">Asexual</option>
                        <option value="cyclic">Cyclic</option>
                        <option value="pathogen">Pathogen</option>
                    </select><br /><br />
                    <label for="type"><b>Collection method:</b></label><br />
                    <select name="type" id="collection">
                        <option value="collection">[DNA collection]</option>
                    </select><br /><br />
                    <label for="type"><b>Taxonomic method:</b></label><br />
                    <select name="type" id="taxonomic">
                        <option value="taxonomic">Comparative morphology</option>
                    </select><br /><br />
                    <label for="taxonomictime"><b>Taxonomic datatime:</b></label><br />
                    <input type="datetime-local" id="taxonomictime" name="taxonomictime" /><br /><br />
                    <label for="collectiontime"><b>Collection datatime:</b></label><br />
                    <input type="datetime-local" id="collectiontime" name="collectiontime" /><br /><br />
                    
                    <label for="type"><b>Taxonomy:</b></label><br /><br />
                    <input type="text" id="domain" name="domain" placeholder="Domain " /><br /><br />
                    <input type="text" id="kingdom" name="kingdom" placeholder="Kingdom " /><br /><br />
                    <input type="text" id="phylum" name="phylum" placeholder="Phylum " /><br /><br />
                    <input type="text" id="class" name="class" placeholder="Class " /><br /><br />
                    <input type="text" id="family" name="family" placeholder="Family " /><br /><br />
                    <input type="text" id="species" name="species" placeholder="Species " /><br /><br />

                    <label for="type"><b>Collection area:</b></label><br /><br />
                    <input type="text" id="area" name="area" placeholder="Continent/Ocean " /><br /><br />
                    <input type="text" id="country" name="country" placeholder="Country " /><br /><br />
                    <input type="text" id="region" name="region" placeholder="Region " /><br /><br />
                   
                    <label for="type"><b>Collection GPS coordoninates:</b></label><br /><br />
                    <input type="text" id="gps" name="gsp" placeholder="GPS coordinates " /><br /><br />

                </form>



                <h4>
                    <Link href="/">Back</Link>
                </h4>

            </AppShell>


        </>
    )
}