import { useState, useEffect } from 'react'

import { AppShell, Header, Title, Center, Footer, Table } from '@mantine/core'

import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';
import Link from 'next/link'
import { API } from '../../types'
import React from 'react'


export default function TaxonomyTable() {
  const [taxonomy, setTaxonomy] = useState<API.Taxonomy[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:8000/taxonomy")
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

        header={ MyHeader() }
        footer={ MyFooter() }
      >

        <Title order={2}>
          Taxonomy table
        </Title><br />

        <Table>
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
            {taxonomy.map((element) => (
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

        <h4>
          <Link href="/posts/see_tables">Back</Link>
        </h4>
      </AppShell>
    </>
  )
}
