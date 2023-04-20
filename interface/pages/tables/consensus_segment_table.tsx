import { useState, useEffect } from 'react'

import { AppShell, Anchor, Title, Space, Table, } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { API } from '../../types'
import React from 'react'
import { URL } from '../../utils/config';
import { useRouter } from 'next/router'




export default function ConsensusSegmentTable() {
  const [consensus_segments, setConsensusSegments] = useState<API.ConsensusSegment[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch(`${URL}/consensus_segments`)
      const data = await response.json() as API.ConsensusSegment[]
      setConsensusSegments(data)
      setLoading(false)
    }
    cb()
  }, [])
  const router = useRouter()

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
          Consensus segment table
        </Title>


        <Table mt='md' sx={{ maxWidth: 1100 }} >
          <thead>
            <tr>
              <th>ID</th>
              <th>Segment ID</th>
              <th>Primer name</th>
              <th>Primer description</th>
              <th>Primer 2 name</th>
              <th>Primer 2 description</th>
              <th>DNA region</th>
              <th>Sequence length</th>

            </tr>
          </thead>
          <tbody>
            {consensus_segments.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.sequence_id}</td>
                <td>{element.primer_name}</td>
                <td>{element.primer_desc}</td>
                <td>{element.primer2_name}</td>
                <td>{element.primer2_desc}</td>
                <td>{element.DNA_region}</td>
                <td>{element.sequence_length}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Space h="xl" />
        <div><Anchor size={14} onClick={() => router.push('/posts/see_tables')}>
          See tables
        </Anchor></div>
      </AppShell>
    </>
  )
}
