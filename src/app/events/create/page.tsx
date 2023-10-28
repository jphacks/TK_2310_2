'use client';
import { Container } from '@mui/system';
import CreateEventInput from './_components/CreateEventInput';
import AppBar from '@/app/_components/AppBar';

const EventCreatePage = () => {
  return (
    <div>
      <AppBar />
      <Container maxWidth='md'>
        <CreateEventInput />
      </Container>
    </div>
  );
};

export default EventCreatePage;
