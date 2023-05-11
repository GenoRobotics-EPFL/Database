import { useState, useEffect } from 'react'

import { AppShell, Space, Title, Anchor, Footer, Table } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { API } from '../../types'
import React from 'react'
import { URL } from '../../utils/config';
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import { useDataState } from '../../utils/dataState';
import { IconTrash } from '@tabler/icons';

export default function IdentificationMethodTable() {
  const [identification_methods, setIdentificationMethods] = useState<API.IdentificationMethod[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const state = useDataState()

  useEffect(() => {
    const cb = async () => {
      setLoading(true)
      const response = await fetch(`${URL}/identification_methods`)
      const data = await response.json() as API.IdentificationMethod[]
      setIdentificationMethods(data)
      setLoading(false)
    }
    cb()
  }, [])



  const deleteIdentificationMethod = (element: API.IdentificationMethod) => {
    state.deleteIdentificationMethod(element.id)
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
          Identification method table
        </Title><br />

        <Table mt='md' sx={{ maxWidth: 700 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Version</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {identification_methods.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.description}</td>
                <td>{element.type}</td>
                <td>{element.version}</td>
                <td><IconTrash
                  size={15}
                  onClick={() => deleteIdentificationMethod(element)}
                  style={{ cursor: 'pointer' }}>
                </IconTrash></td>

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
