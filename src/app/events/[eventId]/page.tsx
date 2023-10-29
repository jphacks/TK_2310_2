'use client';

import AppBar from '@/app/_components/AppBar';
import EventDetail from './_components/EventDetail';
import useEvent from '../_hooks/useEvent';
import { Stack } from '@mui/system';
import ParticipantsList from './_components/ParticipantsList';

const EventDetailPage = ({ params }: { params: { eventId: string } }) => {
  const { eventId } = params;

  const { event } = useEvent(eventId);

  if (!event) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <AppBar />
      <main>
        <Stack
          sx={{
            p: 4,
            flexDirection: {
              md: 'column',
              xl: 'row',
            },
            gap: 4,
          }}
        >
          <EventDetail event={event} />
          <ParticipantsList participants={event.participants} />
        </Stack>
      </main>
    </div>
  );
};

export default EventDetailPage;
