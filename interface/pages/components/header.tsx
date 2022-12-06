import {Header, Title,} from '@mantine/core'

import React from 'react'


export const MyHeader = () => {
  return (
    <Header height={80} p="xs">
      <Title order={1}>
        <img
          width="65"
          height="45"
          src="https://www.genorobotics.org/wp-content/uploads/2020/11/Genorobotics-logo-12-fond-transp-90x64.png"
          alt="GenoRobotics"
          sizes="(max-width: 90px) 100vw, 90px" />
        GenoRobotics
      </Title>
    </Header>
  )
}