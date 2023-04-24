import { Center, Footer, Group, Text, Image, Divider, createStyles } from '@mantine/core'

import React from 'react'
import { useRouter } from 'next/router'


const useStyles = createStyles((theme) => ({

  hover: {
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

}));

export const MyFooter = () => {

  const { classes, cx } = useStyles();
  const router = useRouter()

  return (


    <Footer height={110} p="xs">

      <Center>
        <Group sx={{ height: '80%' }} px={20} position='apart'>
          <Image
            height={100}
            width='auto'
            className={classes.hover}
            src="https://www.genorobotics.org/wp-content/uploads/2020/04/Genorobotics-logo-52.png"
            alt="Genorobotics logo-52" ></Image>

          <Text component='a' onClick={() => router.push("/")} styles={{ cursor: 'pointer' }} size={12}>Copyright © 2022 GenoRobotics</Text>
        </Group>

      </Center>


    </Footer>
  )
}


