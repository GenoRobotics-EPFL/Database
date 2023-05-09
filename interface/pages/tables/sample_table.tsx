import { AppShell, Anchor, Title, Space, Divider, Table } from '@mantine/core'
import { MyHeader } from '../../components/header'
import { MyFooter } from '../../components/footer'
import React from 'react'
import { useRouter } from 'next/router'
import { useDataState } from '../../utils/dataState'
import { downloadFile } from '../../utils/utilsS3'
import Link from 'next/link'


export default function SampleTable() {

  const router = useRouter()
  const state = useDataState()

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

        <Table mt='md' sx={{ maxWidth: 1100 }}>
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
                    onClick={() => downloadFile(element.image_url)}
                    style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}
                  >
                    {element.image_url}
                  </a>
                </td>
                <td>{element.image_timestamp.toString()}</td>
                <td>{element.image_desc}</td>
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