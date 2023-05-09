import { useState, useEffect } from 'react'

import { AppShell, Anchor, Title, Space, Footer, Table } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import Link from 'next/link'
import { API } from '../../types'
import React from 'react'
import { URL } from '../../utils/config';
import { useRouter } from 'next/router'

export default function PlantIdentificationTable() {
  const [persons, setSequencings] = useState<API.PlantIdentification[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch(`${URL}/plant_identifications`)
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

        header={<MyHeader homeState tableState />}
        footer={MyFooter()}
      >

        <Title mt='md' order={2}>
          Plant Identification table
        </Title>

        <Table mt='md' sx={{ maxWidth: 1300 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sample ID</th>
              <th>Sequencing ID</th>
              <th>Taxonomy ID</th>
              <th>Identification method ID</th>
              <th>Time stamp</th>
              <th>Sequence 1 score</th>
              <th>Sequence 2 score</th>
              <th>Sequence 3 score</th>
              <th>Sequence 4 score</th>

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
                <td>{element.seq1_score}</td>
                <td>{element.seq2_score}</td>
                <td>{element.seq3_score}</td>
                <td>{element.seq4_score}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Space h="xl" />
        <div><Anchor size={14} onClick={() => router.push('/posts/see_tables')}>
          See tables
        </Anchor>
        </div>

      </AppShell>
    </>
  )
}
