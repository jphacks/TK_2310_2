'use client';

import { Box, Button, Container } from '@mui/material';
import AppBar from './_components/AppBar';
import useUser from './_hooks/useUser';
import LoggedInOnly from './_components/LoggedInOnly';
import useEvents from './events/_hooks/useEvents';
import EventList from './events/EventList';

const HomePage = () => {
  const { logout } = useUser();
  const { events, isLoading, error } = useEvents();

  return (
    <div>
      <LoggedInOnly>
        <AppBar></AppBar>
        <Box sx={{ px: 8 }}>
          <EventList events={events} error={error} isLoading={isLoading} />
        </Box>
        <Container maxWidth='lg'>
          <Button onClick={logout}>ログアウト</Button>
        </Container>
      </LoggedInOnly>
    </div>
  );
};

export default HomePage;
