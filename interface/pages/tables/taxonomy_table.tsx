import { useState, useEffect } from 'react'

import { AppShell, Anchor, Title, Space, Footer, Table } from '@mantine/core'

import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import { API } from '../../types'
import React from 'react'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import { IconTrash } from '@tabler/icons';
import { useDataState } from '../../utils/dataState';

export default function TaxonomyTable() {
  const router = useRouter()
  const state = useDataState()

  const deleteTaxonomy = (element: API.Taxonomy) => {
    state.deleteTaxonomy(element.id)
      .then(() => {
        showNotification({
          title: 'Deletion',
          message: `${element.species} deleted successfully.`,
          color: "teal",
          icon: <IconCheck />,
        })
      })
      .catch(e => {
        showNotification({
          title: 'Error',
          message: `Can't delete ${element.species}`,
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
          Taxonomy table
        </Title>

        <Table mt='md' sx={{ maxWidth: 700 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Domain</th>
              <th>Kingdom</th>
              <th>Phylum</th>
              <th>Class</th>
              <th>Family</th>
              <th>Species</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.taxonomies.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.domain}</td>
                <td>{element.kingdom}</td>
                <td>{element.phylum}</td>
                <td>{element.class_}</td>
                <td>{element.family}</td>
                <td>{element.species}</td>
                <td><IconTrash
                  size={15}
                  onClick={() => deleteTaxonomy(element)}
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
