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
import FileUploadButton from '@/app/_components/FileUpload';
import { mainTheme } from '@/themes/main';

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
    setEventDraft((current) => ({ ...current, latitude, longitude }));
  };

  const [adImage, setAdImage] = useState<File>();

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
              address={eventDraft.address}
              setAddress={(address) => {
                setEventDraft((current) => ({ ...current, address }));
              }}
            />
          </Box>
          <Box sx={{ width: '100%', p: 1, boxSizing: 'border-box' }}>
            <Typography variant='h3' gutterBottom>
              広告の画像をアップロード
            </Typography>
            <Stack
              sx={{
                background: mainTheme.palette.primary.light,
                height: 400,
                justifyContent: 'center',
              }}
            >
              <FileUploadButton
                label='ここに画像ファイルを追加してください'
                file={adImage}
                setFile={(file) => setAdImage(file)}
              />
            </Stack>
            <Box m={1}>
              <Typography>
                ・1つのイベントで使用できる広告は1種類のみです
              </Typography>
              <Typography>
                ・ゴミ拾いイベントに参加する全てのSAFAユーザーがこの広告を身につけて活動します
              </Typography>
            </Box>
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
            {activeStep !== 2 && (
              <Button
                variant='contained'
                sx={{ mt: 4 }}
                onClick={() => setActiveStep(activeStep + 1)}
              >
                次へ
              </Button>
            )}
            {activeStep === 2 && (
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
