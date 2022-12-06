import { Center, Footer, } from '@mantine/core'
import React from 'react'

export const MyFooter = () => {
  return (

    <Footer height={130} p="xs">
      <Center>
        <img
          width="198.5"
          height="140.5"
          src="https://www.genorobotics.org/wp-content/uploads/2020/04/Genorobotics-logo-52.png"
          alt="Genorobotics logo-52" ></img>
        Copyright © 2022 GenoRobotics
      </Center>
    </Footer>
  )
}
