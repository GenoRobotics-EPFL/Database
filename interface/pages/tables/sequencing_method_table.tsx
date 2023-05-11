import { useState, useEffect } from 'react'

import { AppShell, Anchor, Title, Space, Footer, Table } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import React from 'react'
import { URL } from '../../utils/config';
import { useRouter } from 'next/router'
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import { API } from '../../types';
import { IconTrash } from '@tabler/icons';
import { useDataState } from '../../utils/dataState';
import { showNotification } from '@mantine/notifications';


export default function SequencingMethodTable() {
  const [sequencing_methods, setSequencingMethods] = useState<API.SequencingMethod[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const state = useDataState()


  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch(`${URL}/sequencing_methods`)
      const data = await response.json() as API.SequencingMethod[]
      setSequencingMethods(data)
      setLoading(false)
    }
    cb()
  }, [])

  const deleteSequencingMethod = (element: API.SequencingMethod) => {
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
          Sequencing method table
        </Title>

        <Table mt='md' sx={{ maxWidth: 700 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sequencing_methods.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.description}</td>
                <td>{element.type}</td>
                <td><IconTrash
                  size={15}
                  onClick={() => deleteSequencingMethod(element)}
                  style={{ cursor: 'pointer' }}>
                </IconTrash></td>
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
