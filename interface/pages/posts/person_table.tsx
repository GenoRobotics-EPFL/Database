import { useState, useEffect } from 'react'

import { AppShell, Header, Title, Center, Footer, Table } from '@mantine/core'
import Link from 'next/link'
import { API } from '../../types'

export default function PersonTable() {
  const [persons, setPersons] = useState<API.Person[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // define inner callback as useEffect doesn't support async callback
    // https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
    const cb = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:8000/persons")
      const data = await response.json() as API.Person[]
      setPersons(data)
      setLoading(false)
    }
    cb()
  }, []) // for now this effect has no dependency (it's only executed once) hence the empty brackets 
  // https://medium.com/devil-is-in-the-details/dependency-array-in-useeffect-hook-d73e0ef2ab33

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
          Person table
        </Title><br />

        <Table>
          <thead>
            <tr>
              <th>Person ID</th>
              <th>Full name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.email}</td>
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
