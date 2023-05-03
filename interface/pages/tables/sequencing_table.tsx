import { useState, useEffect } from 'react'

import { AppShell, Anchor, Title, Space, Table } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { API } from '../../types'
import React from 'react'
import { URL } from '../../utils/config';
import { useRouter } from 'next/router'

export default function SequencingTable() {
  const [sequencings, setSequencings] = useState<API.Sequencing[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch(`${URL}/sequencings`)
      const data = await response.json() as API.Sequencing[]
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

        header={MyHeader(false, false)}
        footer={MyFooter()}
      >

        <Title mt='md' order={2}>
          Sequencing table
        </Title>

        <Table mt='md'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sample ID</th>
              <th>Amplification method ID</th>
              <th>Amplification timestamp</th>
              <th>Sequencing method ID</th>
              <th>Time stamp</th>
              <th>Base calling file</th>
            </tr>
          </thead>
          <tbody>
            {sequencings.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.sample_id}</td>
                <td>{element.amplification_method_id}</td>
                <td>{element.amplification_timestamp.toString()}</td>
                <td>{element.sequencing_method_id}</td>
                <td>{element.timestamp.toString()}</td>
                <td>{element.base_calling_file}</td>
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
