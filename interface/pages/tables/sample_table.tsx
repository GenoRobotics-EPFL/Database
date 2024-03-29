import { AppShell, Anchor, Title, Space, Divider, Table } from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import React from 'react'
import { useRouter } from 'next/router'
import { useDataState } from '../../utils/dataState'
import { downloadFile } from '../../utils/utilsS3'
import Link from 'next/link'
import { IconTrash } from '@tabler/icons';
import { deleteFile } from '../../utils/utilsS3'
import { showNotification } from '@mantine/notifications';
import { API } from '../../types';
import { IconAlertCircle, IconCheck } from '@tabler/icons';

export default function SampleTable() {

  const router = useRouter()
  const state = useDataState()

  const deleteSample = (element: API.Sample) => {
    state.deleteSample(element.id)
      .then(() => {
        showNotification({
          title: 'Deletion',
          message: `${element.name} deleted successfully.`,
          color: "teal",
          icon: <IconCheck />,
        })
        deleteFile(element.image_url, state.apiKey)
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
          Sample table
        </Title>

        <Table mt='md' sx={{ maxWidth: 1700 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Person ID</th>
              <th>Location ID</th>
              <th>Time stamp</th>
              <th>Sex</th>
              <th>Lifestage</th>
              <th>Reproduction</th>
              <th>Image URL</th>
              <th>Image time stamp</th>
              <th>Image description</th>
            </tr>
          </thead>
          <tbody>
            {state.samples.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.person_id}</td>
                <td>{element.location_id}</td>
                <td>{element.timestamp.toString()}</td>
                <td>{element.sex}</td>
                <td>{element.lifestage}</td>
                <td>{element.reproduction}</td>
                <td>
                  <a
                    onClick={() => downloadFile(element.image_url, state.apiKey)}
                    style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}
                  >
                    {element.image_url}
                  </a>
                </td>
                <td>{element.image_timestamp.toString()}</td>
                <td>{element.image_desc}</td>
                <td><IconTrash
                  size={15}
                  onClick={() => deleteSample(element)}
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