import { useState, useEffect } from 'react'

import { AppShell, Anchor, Title, Space, Footer, Table } from '@mantine/core'

import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
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

        header={MyHeader()}
        footer={MyFooter()}
      >

        <Title mt='md' order={2}>
          Sequencing method table
        </Title>

        <Table mt='md' sx={{ maxWidth: 700 }}>
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
        <Space h="xl" />
        <div><Anchor size={14} href="/posts/see_tables" target="_self">
          See tables
        </Anchor></div>

      </AppShell>
    </>
  )
}
