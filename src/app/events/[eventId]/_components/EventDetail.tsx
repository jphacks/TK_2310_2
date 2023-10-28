import { formatDate, formatDurationDate } from '@/lib/formatDate';
import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { Fragment } from 'react';

type Props = {
  event: SafaEvent;
  isLoading?: boolean;
};
const EventDetail = ({ event, isLoading }: Props) => {
  const data = [
    {
      label: '開催日時',
      value: formatDurationDate(event.willStartAt, event.willCompleteAt),
    },
    { label: '募集締め切り日時', value: formatDate(event.applicationDeadline) },
    { label: '募集人数', value: `${event.participantCount}人` },
    { label: '1人あたり報酬額', value: `¥${event.unitPrice}` },
    { label: '総費用', value: `¥${event.unitPrice * event.participantCount}` },
    { label: '主催', value: event.hostCompanyName },
  ];
  return (
    <Paper elevation={0} sx={{ maxWidth: '500px' }}>
      {isLoading && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      <Stack spacing={2} p={4}>
        <Typography variant='h1'>{event.title}</Typography>
        <Typography variant='body1'>{event.description}</Typography>
        <Typography variant='h2' color='secondary'>
          基本情報
        </Typography>
        <Grid container gap={2}>
          {data.map((item, index) => (
            <Fragment key={index}>
              <Grid item xs={4}>
                <Typography variant='body1' color='gray'>
                  {item.label}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant='body1'>{item.value}</Typography>
              </Grid>
            </Fragment>
          ))}
          <Grid item xs={4}>
            <Typography variant='body1' color='gray'>
              開催場所
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant='body1'>{event.address}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              href={`https://maps.google.com/maps?q=${event.latitude},${event.longitude}`}
            >
              Googleマップで開く
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};
//
export default EventDetail;
