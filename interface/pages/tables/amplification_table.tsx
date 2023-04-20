import { useState, useEffect } from 'react'

import { AppShell, Space, Title, Anchor, Footer, Table } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'

import { API } from '../../types'
import React from 'react'
import { URL } from '../../utils/config';
import { useRouter } from 'next/router'

export default function AmplificationTable() {
  const [amplifications, setAmplifications] = useState<API.Amplification[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch(`${URL}/amplifications`)
      const data = await response.json() as API.Amplification[]
      setAmplifications(data)
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
          Amplification table
        </Title>

        <Table mt='md' sx={{ maxWidth: 700 }}>
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

        <Space h="xl" />
        <div><Anchor size={14} onClick={() => router.push("/posts/see_tables")}>
          See tables
        </Anchor></div>

      </AppShell>
    </>
  )
}
