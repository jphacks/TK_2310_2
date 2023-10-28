'use client';
// import { AppBar } from '@mui/material';

import { Box, Button, Container, Paper, Typography } from '@mui/material';
import AppBar from './_components/AppBar';
import useUser from './_hooks/useUser';
import LoggedInOnly from './_components/LoggedInOnly';
import useEvents from './events/_hooks/useEvents';
import EventList from './events/EventList';

const HomePage = () => {
  const { logout } = useUser();
  const { events, error } = useEvents();

  return (
    <div>
      <LoggedInOnly>
        <AppBar></AppBar>
        <Box sx={{ px: 8 }}>
          <EventList events={events} error={error} />
        </Box>
        <Container maxWidth='lg'>
          <main>
            <Button variant='contained' color='primary'>
              Button
            </Button>
            <Button variant='contained' color='secondary'>
              Button
            </Button>
            <Button variant='outlined' color='primary'>
              Button
            </Button>
            <Button variant='outlined' color='secondary'>
              Button
            </Button>

            <Button
              variant='contained'
              color='primary'
              onClick={() => logout()}
            />

            <Box m={2}>
              <Paper elevation={0}>
                <Typography variant='h1'>SAFA 機械 h1</Typography>
                <Typography variant='h2'>SAFA 機械 h2</Typography>
                <Typography variant='h3'>SAFA 機械 h3</Typography>
                <Typography variant='subtitle1'>SAFA 機械 subtitle1</Typography>
                <Typography variant='body1'>SAFA 機械 body1</Typography>
                <Typography variant='body2' color='gray'>
                  SAFA 機械 body2
                </Typography>
              </Paper>
            </Box>
          </main>
        </Container>
      </LoggedInOnly>
    </div>
  );
};

export default HomePage;
