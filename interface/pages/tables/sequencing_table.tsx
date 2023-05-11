import { AppShell, Anchor, Title, Space, Table } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import React from 'react'
import { useRouter } from 'next/router'
import { downloadFile } from '../../utils/utilsS3'
import { useDataState } from '../../utils/dataState'
import { IconTrash } from '@tabler/icons';
import { deleteFile } from '../../utils/utilsS3'
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import { API } from '../../types';

export default function SequencingTable() {

  const state = useDataState()
  const router = useRouter()


  const deleteSequencing = (element: API.Sequencing) => {
    state.deleteSequencing(element.id)
      .then(() => {
        showNotification({
          title: 'Deletion',
          message: `Sequencing deleted successfully.`,
          color: "teal",
          icon: <IconCheck />,
        })
        deleteFile(element.base_calling_file)
      })
      .catch(e => {
        showNotification({
          title: 'Error',
          message: `Can't delete sequencing`,
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
          Sequencing table
        </Title>

        <Table mt='md' sx={{ maxWidth: 1400 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sample ID</th>
              <th>Amplification method ID</th>
              <th>Amplification timestamp</th>
              <th>Sequencing method ID</th>
              <th>Time stamp</th>
              <th>Base calling file</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.sequencings.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.sample_id}</td>
                <td>{element.amplification_method_id}</td>
                <td>{element.amplification_timestamp.toString()}</td>
                <td>{element.sequencing_method_id}</td>
                <td>{element.timestamp.toString()}</td>
                <td>
                  <a
                    onClick={() => downloadFile(element.base_calling_file)}
                    style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}
                  >
                    {element.base_calling_file}
                  </a>
                </td>
                <td><IconTrash
                  size={15}
                  onClick={() => deleteSequencing(element)}
                  style={{ cursor: 'pointer' }}>
                </IconTrash></td>
              </tr >
            ))
            }
          </tbody >
        </Table >

        <Space h="xl" />
        <div><Anchor size={14} onClick={() => router.push('/posts/see_tables')}>
          See tables
        </Anchor></div>
      </AppShell >
    </>
  )
}
