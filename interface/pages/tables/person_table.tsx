import React from 'react'

import { AppShell, Space, Title, Anchor, Table } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'

import { useDataState } from '../../utils/dataState';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import { API } from '../../types';
import { IconTrash } from '@tabler/icons';

export default function PersonTable() {
  const router = useRouter()
  const state = useDataState()

  const deletePerson = (element: API.Person) => {
    state.deletePerson(element.id)
      .then(() => {
        showNotification({
          title: 'Deletion',
          message: `${element.name} deleted successfully.`,
          color: "teal",
          icon: <IconCheck />,
        })
      })
      .catch(e => {
        showNotification({
          title: 'Error',
          message: `Can't delete ${element.name}`,
          color: "red",
          icon: <IconAlertCircle />,
        })
      })
  }

  return (
    <AppShell
      padding="md"
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}

      header={<MyHeader homeState tableState />}
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.persons.map((element) => (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.name}</td>
              <td>{element.email}</td>
              <td><IconTrash size={15} onClick={() => deletePerson(element)} style={{ cursor: 'pointer' }}></IconTrash></td>
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
