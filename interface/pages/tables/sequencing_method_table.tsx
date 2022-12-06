import { useState, useEffect } from 'react'

import { AppShell, Header, Title, Center, Footer, Table } from '@mantine/core'

import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';
import Link from 'next/link'
import { API } from '../../types'
import React from 'react'


export default function SequencingMethodTable() {
  const [sequencing_methods, setSequencingMethods] = useState<API.SequencingMethod[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:8000/sequencing_methods")
      const data = await response.json() as API.SequencingMethod[]
      setSequencingMethods(data)
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

        header={ MyHeader() }
        footer={ MyFooter() }
      >

        <Title order={2}>
          Sequencing method table
        </Title><br />

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {sequencing_methods.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.description}</td>
                <td>{element.type}</td>                
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
