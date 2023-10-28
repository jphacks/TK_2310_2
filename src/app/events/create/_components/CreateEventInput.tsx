import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Map from './Map';
import EventConfig from './EventConfig';
import Carousel from '@/app/_components/Carousel';
import { atom, useAtom } from 'jotai';
import { createEvent } from '../../_hooks/createEvent';
import useUser from '@/app/_hooks/useUser';
import { useRouter } from 'next/navigation';

const eventDraftAtom = atom<SafaEventDraft>({
  title: '',
  description: '',
  participantCount: 0,
  unitPrice: 0,
  willStartAt: new Date(),
  willCompleteAt: new Date(),
  applicationDeadline: new Date(),
  address: '',
  latitude: 35.71446174798392,
  longitude: 139.76179540157318,
});

const CreateEventInput = () => {
  const [eventDraft, setEventDraft] = useAtom(eventDraftAtom);

  const [activeStep, setActiveStep] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const setLatitudeLongitude = (latitude: number, longitude: number) => {
    setEventDraft({ ...eventDraft, latitude, longitude });
  };

  const { user, token } = useUser();

  const router = useRouter();

  const onCreateClick = async () => {
    if (!user || !token) {
      return;
    }
    setIsLoading(true);
    const response = await createEvent(token, user, eventDraft);
    console.log(response);
    setIsLoading(false);
    router.push('/');
  };

  return (
    <Paper elevation={0}>
      {isLoading && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      <Box p={4}>
        <Typography variant='h2' sx={{ mb: 4 }}>
          イベントを作成
        </Typography>
        <Carousel pageIndex={activeStep}>
          <Box sx={{ width: '100%', p: 1, boxSizing: 'border-box' }}>
            <EventConfig
              eventDraft={eventDraft}
              setEventDraft={setEventDraft}
            />
          </Box>
          <Box sx={{ width: '100%', p: 1, boxSizing: 'border-box' }}>
            <Map
              latitude={eventDraft.latitude}
              longitude={eventDraft.longitude}
              setLatitudeLongitude={setLatitudeLongitude}
            />
          </Box>
        </Carousel>

        <Stack direction='row' justifyContent='space-between'>
          <div>
            {activeStep !== 0 && (
              <Button
                variant='outlined'
                sx={{ mt: 4 }}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                前へ
              </Button>
            )}
          </div>
          <div>
            {activeStep !== 1 && (
              <Button
                variant='contained'
                sx={{ mt: 4 }}
                onClick={() => setActiveStep(activeStep + 1)}
              >
                次へ
              </Button>
            )}
            {activeStep === 1 && (
              <Button
                variant='contained'
                color='secondary'
                sx={{ mt: 4 }}
                onClick={onCreateClick}
              >
                作成する
              </Button>
            )}
          </div>
        </Stack>
      </Box>
    </Paper>
  );
};

export default CreateEventInput;
