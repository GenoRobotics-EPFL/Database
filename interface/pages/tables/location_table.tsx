import React from 'react'

import { AppShell, Space, Title, Anchor, Footer, Table } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { useDataState } from '../../utils/dataState';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { API } from '../../types'
import { URL } from '../../utils/config';


export default function LocationTable() {

  const router = useRouter()
  const state = useDataState()




  return (
    <AppShell
      padding="md"
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}

      header={MyHeader(false, false)}
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
          {state.locations.map((element) => (
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
      <div>
        <Anchor
          size={14}
          onClick={() => router.push("/posts/see_tables")}
        >
          See tables
        </Anchor>
      </div>
    </AppShell>
  )
}
