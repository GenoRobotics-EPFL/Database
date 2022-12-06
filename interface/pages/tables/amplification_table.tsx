import { useState, useEffect } from 'react'

import { AppShell, Header, Title, Center, Footer, Table } from '@mantine/core'

import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';
import Link from 'next/link'
import { API } from '../../types'
import React from 'react'


export default function AmplificationTable() {
  const [amplifications, setAmplifications] = useState<API.Amplification[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:8000/amplifications")
      const data = await response.json() as API.Amplification[]
      setAmplifications(data)
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
          Amplification table
        </Title><br />

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sample ID</th>
              <th>Amplification method ID</th>
              <th>Time stamp</th>
            </tr>
          </thead>
          <tbody>
            {amplifications.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.sample_id}</td>
                <td>{element.amplification_method_id}</td>
                <td>{element.timestamp.toString()}</td>
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
