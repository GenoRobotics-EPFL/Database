import React from 'react'

import { AppShell, Space, Title, Anchor, Table } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'

import { useDataState } from '../../utils/dataState';
import { useRouter } from 'next/router';


export default function PersonTable() {
  const router = useRouter()
  const state = useDataState()

  return (
    <AppShell
      padding="md"
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}

      header={MyHeader()}
      footer={MyFooter()}
    >

      <Title mt='md' order={2}>
        Person table
      </Title>

      <Table mt='md' sx={{ maxWidth: 700 }}>
        <thead>
          <tr>
            <th>Person ID</th>
            <th>Full name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {state.persons.map((element) => (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.name}</td>
              <td>{element.email}</td>
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
