import { useState, useEffect } from 'react'

import { AppShell, Header, Title, Center, Footer, Table } from '@mantine/core'

import { MyHeader, MyFooter, MyNavbar } from '../graphics'

import Link from 'next/link'
import { API } from '../../types'

export default function AmplificationMethodTable() {
  const [amplification_methods, setAmplificationMethods] = useState<API.AmplificationMethod[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:8000/amplification_methods")
      const data = await response.json() as API.AmplificationMethod[]
      setAmplificationMethods(data)
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
          Amplification method table
        </Title><br />

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {amplification_methods.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.name}</td>
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
