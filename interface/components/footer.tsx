import { Center, Footer, Group, Text, Image, Divider, } from '@mantine/core'

import React from 'react'

export const MyFooter = () => {
  return (


    <Footer height={110} p="xs">

      <Center>
        <Group sx={{ height: '80%' }} px={20} position='apart'>
          <img
            height='100'
            width='auto'
            src="https://www.genorobotics.org/wp-content/uploads/2020/04/Genorobotics-logo-52.png"
            alt="Genorobotics logo-52" ></img>
          <Text size={12}>Copyright © 2022 GenoRobotics</Text>
        </Group>

      </Center>


    </Footer>
  )
}



// export const MyFooter = () => {
//   return (


//     <Footer height={300} p="xs">

//       <Center>
//         <img
//           height='110'
//           width='auto'
//           src="https://www.genorobotics.org/wp-content/uploads/2020/04/Genorobotics-logo-52.png"
//           alt="Genorobotics logo-52" ></img>
//         <Text size={14}>Copyright © 2022 GenoRobotics</Text>

//       </Center>
//       <Divider>
//         <Center>

//           <Text size={14}>Copyright © 2022 GenoRobotics</Text>

//         </Center>
//       </Divider>
//     </Footer>
//   )
// }
