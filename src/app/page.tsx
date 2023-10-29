'use client';

import { Box, Stack } from '@mui/material';
import AppBar from './_components/AppBar';
import LoggedInOnly from './_components/LoggedInOnly';
import useEvents from './events/_hooks/useEvents';
import EventList from './events/EventList';
import TodoList from './_components/TodoList';
import InfoCard from './_components/Analytics';

const HomePage = () => {
  const { events, isLoading, error } = useEvents();

  return (
    <div>
      <LoggedInOnly>
        <AppBar></AppBar>
        <Box sx={{ px: 8 }}>
          <Stack direction='row' spacing={4} sx={{ mb: 4 }}>
            <TodoList />
            <InfoCard
              title='アナリティクス'
              totalAmount={34}
              daysAmount={42}
              price={51000}
            />
          </Stack>
          <EventList events={events} error={error} isLoading={isLoading} />
        </Box>
      </LoggedInOnly>
    </div>
  );
};

export default HomePage;
