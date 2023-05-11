import { useState, useEffect } from 'react'

import { AppShell, Anchor, Title, Space, Table, Button, } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { API } from '../../types'
import React from 'react'
import { URL } from '../../utils/config';
import { useRouter } from 'next/router'
import { IconAlertCircle, IconCheck, IconTrash } from '@tabler/icons';
import { useDataState } from '../../utils/dataState';
import { showNotification } from '@mantine/notifications';


export default function AmplificationMethodTable() {
  const [amplification_methods, setAmplificationMethods] = useState<API.AmplificationMethod[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch(`${URL}/amplification_methods`)
      const data = await response.json() as API.AmplificationMethod[]
      setAmplificationMethods(data)
      setLoading(false)
    }
    cb()
  }, [])
  const router = useRouter()
  const state = useDataState()

  const deleteAmplificationMethod = (element: API.AmplificationMethod) => {
    state.deleteAmplificationMethod(element.id)
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
          Amplification method table
        </Title>


        <Table mt='md' sx={{ maxWidth: 500 }} >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            {amplification_methods.map((element) => (
              <tr key={element.id} >
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td><IconTrash
                  size={15}
                  onClick={() => deleteAmplificationMethod(element)}
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
