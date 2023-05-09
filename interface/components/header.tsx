
import React, { FC } from 'react';
import {
  Header, Group, ActionIcon, useMantineColorScheme, Title, NavLink,
  Menu, createStyles, Burger, Text, Image, Button,
} from '@mantine/core';
import {
  IconMap, IconLayoutGridAdd, IconUserPlus, IconTestPipe, IconLocation,
  IconPlant, IconTournament, IconPlant2, IconSun, IconMoonStars, IconColumns,
} from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router'

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  root: {
    position: 'relative',
    zIndex: 1,
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  hover: {
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    '&:hover': {
      transform: 'scale(1.04)',
    },
    cursor: 'pointer'
  },

  pointer: {
    cursor: 'pointer'
  }

}));

const data = [
  { title: 'Method', icon: IconLayoutGridAdd, page: '/new_method' },
  { title: 'Sample', icon: IconTestPipe, page: '/new_sample' },
  { title: 'Person', icon: IconUserPlus, page: '/new_person' },
  { title: 'Sequencing', icon: IconMap, page: '/new_sequencing' },
  { title: 'Location', icon: IconLocation, page: '/new_location' },
  { title: 'Plant identification', icon: IconPlant, page: '/new_plant_identification' },
  { title: 'Taxonomy', icon: IconPlant2, page: '/new_taxonomy' },
  { title: 'Consensus segment', icon: IconColumns, page: '/new_consensus_segment' },

];

export type MyHeaderProps = {
  homeState?: boolean
  tableState?: boolean
}

export const MyHeader: FC<MyHeaderProps> = (props) => {

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const router = useRouter()

  const navlinks = data.map((item) => (
    <NavLink
      key={item.title}
      label={item.title}
      onClick={() => router.push("/posts" + item.page)}
      active
      variant="subtle"
      color="dark"
      icon={<item.icon color={'green'} size={14} />}
    />
  ));

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Burger opened={opened} onClick={toggle}>Open Navbar</Burger>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Add to Database</Menu.Label>
              {navlinks}
              <Menu.Divider />
            </Menu.Dropdown>
          </Menu>

          <Title order={1} size="h2" weight={600}>
            <Group>
              <Image
                height={50}
                className={classes.hover}
                width='auto'
                src="https://www.genorobotics.org/wp-content/uploads/2020/11/Genorobotics-logo-12-fond-transp.png"
                alt="GenoRobotics"
                onClick={() => router.push("/")}
              />
              <Text className={classes.pointer} onClick={() => router.push("/")}> GenoRobotics </Text>
            </Group>
          </Title>
        </Group>

        <Group spacing={50} >
          <Group>
            {props.homeState &&
              <Button
                variant='subtle'
                className={cx(classes.link)}
                onClick={() => {
                  router.push("/")
                }}
              >
                {'Home Page'}
              </Button>
            }
            {props.tableState &&
              <Button
                variant='subtle'
                className={cx(classes.link)}
                onClick={() => {
                  router.push('/posts/see_tables/')
                }}
              >
                {'See tables'}
              </Button>
            }
          </Group>
          <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
            })}>
            {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
          </ActionIcon>

        </Group>
      </div>
    </Header>

  );
}



