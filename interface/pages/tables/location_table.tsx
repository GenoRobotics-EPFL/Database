import { useState, useEffect } from 'react'

import { AppShell, Space, Title, Anchor, Footer, Table } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { MyNavbar } from '../../components/navbar';
import Link from 'next/link'
import { API } from '../../types'
import React from 'react'


export default function LocationTable() {
  const [locations, setLocations] = useState<API.Location[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:8000/locations")
      const data = await response.json() as API.Location[]
      setLocations(data)
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
          Location table
        </Title>

        <Table mt='md' sx={{ maxWidth: 700 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Collection area</th>
              <th>GPS</th>
              <th>Elevation</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.collection_area}</td>
                <td>{element.gps}</td>
                <td>{element.elevation}</td>
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
