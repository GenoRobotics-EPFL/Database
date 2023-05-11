import { useState, useEffect } from 'react'

import { AppShell, Anchor, Title, Space, Table, } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { API } from '../../types'
import React from 'react'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle, IconCheck, IconTrash, } from '@tabler/icons';
import { useDataState } from '../../utils/dataState';


export default function ConsensusSegmentTable() {
  const router = useRouter()
  const state = useDataState()

  const deleteConsensusSegment = (element: API.ConsensusSegment) => {
    state.deleteConsensusSegment(element.id)
      .then(() => {
        showNotification({
          title: 'Deletion',
          message: `Consensus segment deleted successfully.`,
          color: "teal",
          icon: <IconCheck />,
        })
      })
      .catch(e => {
        showNotification({
          title: 'Error',
          message: `Can't delete consensus segment`,
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
          Consensus segment table
        </Title>


        <Table mt='md' sx={{ maxWidth: 1100 }} >
          <thead>
            <tr>
              <th>ID</th>
              <th>Segment ID</th>
              <th>Primer name</th>
              <th>Primer description</th>
              <th>Primer 2 name</th>
              <th>Primer 2 description</th>
              <th>DNA region</th>
              <th>Sequence length</th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            {state.consensusSements.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.sequencing_id}</td>
                <td>{element.primer_forw_name}</td>
                <td>{element.primer_forw_seq}</td>
                <td>{element.primer_rev_name}</td>
                <td>{element.primer_rev_seq}</td>
                <td>{element.DNA_region}</td>
                <td>{element.sequence_length}</td>
                <td><IconTrash
                  size={15}
                  onClick={() => deleteConsensusSegment(element)}
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
