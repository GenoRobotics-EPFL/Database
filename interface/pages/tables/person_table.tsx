import { useState, useEffect } from 'react'

import { AppShell, Header, Title, Center, Footer, Table } from '@mantine/core'

import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';
import Link from 'next/link'
import { API } from '../../types'
import React from 'react'


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

        header={ MyHeader() }
        footer={ MyFooter() }
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
