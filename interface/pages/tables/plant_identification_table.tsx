import { useState, useEffect } from 'react'

import { AppShell, Header, Title, Center, Footer, Table } from '@mantine/core'

import { MyHeader } from '../components/header'
import { MyFooter } from '../components/footer'
import { MyNavbar } from '../components/navbar';
import Link from 'next/link'
import { API } from '../../types'
import React from 'react'


export default function PlantIdentificationTable() {
    const [persons, setSequencings] = useState<API.PlantIdentification[]>([])
    const [loading, setLoading] = useState<boolean>(true)
  
    useEffect(() => {
      const cb = async () => {
        setLoading(true)
        const response = await fetch("http://localhost:8000/plant_identifications")
        const data = await response.json() as API.PlantIdentification[]
        setSequencings(data)
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
          Plant Identification table
        </Title><br />

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sample ID</th>
              <th>Sequencing ID</th>
              <th>Taxonomy ID</th>
              <th>Identification method ID</th>
              <th>Time stamp</th>
              <th>Sex</th>
              <th>Lifestage</th>
              <th>Reproduction</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.sample_id}</td>
                <td>{element.sequencing_id}</td>
                <td>{element.taxonomy_id}</td>
                <td>{element.identification_method_id}</td>
                <td>{element.timestamp.toString()}</td>
                <td>{element.sex}</td>
                <td>{element.lifestage}</td>
                <td>{element.reproduction}</td>
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
