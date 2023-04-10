import { useState, useEffect } from 'react'

import { AppShell, Anchor, Title, Space, Footer, Table } from '@mantine/core'

import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { API } from '../../types'
import React from 'react'


export default function TaxonomyTable() {
  const [taxonomies, setTaxonomy] = useState<API.Taxonomy[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:8000/taxonomies")
      const data = await response.json() as API.Taxonomy[]
      setTaxonomy(data)
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
          Taxonomy table
        </Title>

        <Table mt='md' sx={{ maxWidth: 700 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Domain</th>
              <th>Kingdom</th>
              <th>Phylum</th>
              <th>Class</th>
              <th>Family</th>
              <th>Species</th>
            </tr>
          </thead>
          <tbody>
            {taxonomies.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.domain}</td>
                <td>{element.kingdom}</td>
                <td>{element.phylum}</td>
                <td>{element.class_}</td>
                <td>{element.family}</td>
                <td>{element.species}</td>

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
