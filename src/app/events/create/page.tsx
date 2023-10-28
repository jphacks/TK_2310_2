'use client';

import CreateEventInput from './_components/CreateEventInput';
import AppBar from '@/app/_components/AppBar';
import { Container } from '@mui/system';

const EventCreatePage = () => {
  return (
    <div>
      <AppBar />
      <Container maxWidth='lg'>
        <CreateEventInput />
      </Container>
    </div>
  );
};

export default EventCreatePage;
