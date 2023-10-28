import { Box, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

const CreateEventInput = () => {
  const [eventDraft, setEventDraft] = useState<SafaEventDraft>({
    title: '',
    description: '',
    participantCount: 0,
    unitPrice: 0,
    willStartAt: new Date(),
    willCompleteAt: new Date(),
    applicationDeadline: new Date(),
    address: '',
    latitude: 0,
    longitude: 0,
  });

  const handleStartDateChange = (newDateDayjs: Dayjs | null) => {
    if (!newDateDayjs) {
      return;
    }
    const newDate = newDateDayjs.toDate();
    const willStartAt = new Date(eventDraft.willStartAt);
    willStartAt.setFullYear(newDate.getFullYear());
    willStartAt.setMonth(newDate.getMonth());
    willStartAt.setDate(newDate.getDate());
    setEventDraft({ ...eventDraft, willStartAt });
  };

  const handleStartTimeChange = (newTimeDayjs: Dayjs | null) => {
    if (!newTimeDayjs) {
      return;
    }
    const newTime = newTimeDayjs.toDate();
    const willStartAt = new Date(eventDraft.willStartAt);
    willStartAt.setHours(newTime.getHours());
    willStartAt.setMinutes(newTime.getMinutes());
    setEventDraft({ ...eventDraft, willStartAt });
  };

  const handleEndTimeChange = (newTimeDayjs: Dayjs | null) => {
    if (!newTimeDayjs) {
      return;
    }
    const newTime = newTimeDayjs.toDate();
    const willCompleteAt = new Date(eventDraft.willCompleteAt);
    willCompleteAt.setHours(newTime.getHours());
    willCompleteAt.setMinutes(newTime.getMinutes());
    setEventDraft({ ...eventDraft, willCompleteAt });
  };

  const handleApplicationDeadlineDateChange = (newDateDayjs: Dayjs | null) => {
    if (!newDateDayjs) {
      return;
    }
    const newDate = newDateDayjs.toDate();
    const applicationDeadline = new Date(eventDraft.applicationDeadline);
    applicationDeadline.setFullYear(newDate.getFullYear());
    applicationDeadline.setMonth(newDate.getMonth());
    applicationDeadline.setDate(newDate.getDate());
    setEventDraft({ ...eventDraft, applicationDeadline });
  };

  const handleApplicationDeadlineTimeChange = (newTimeDayjs: Dayjs | null) => {
    if (!newTimeDayjs) {
      return;
    }
    const newTime = newTimeDayjs.toDate();
    const applicationDeadline = new Date(eventDraft.applicationDeadline);
    applicationDeadline.setHours(newTime.getHours());
    applicationDeadline.setMinutes(newTime.getMinutes());
    setEventDraft({ ...eventDraft, applicationDeadline });
  };

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Typography variant='h2' sx={{ mb: 4 }}>
          イベント作成
        </Typography>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction='column' spacing={4}>
              <TextField
                label='イベント名'
                required
                fullWidth
                value={eventDraft.title}
                onChange={(e) =>
                  setEventDraft({ ...eventDraft, title: e.target.value })
                }
              />
              <TextField
                label='イベント説明'
                required
                multiline
                value={eventDraft.description}
                onChange={(e) =>
                  setEventDraft({ ...eventDraft, description: e.target.value })
                }
              />
              <Stack direction='row' spacing={2} flexGrow={1}>
                <TextField
                  label='募集人数'
                  required
                  type='number'
                  fullWidth
                  value={eventDraft.participantCount}
                  onChange={(e) =>
                    setEventDraft({
                      ...eventDraft,
                      participantCount: parseInt(e.target.value),
                    })
                  }
                />
                <TextField
                  label='1人あたりの報酬額'
                  required
                  type='number'
                  fullWidth
                  value={eventDraft.unitPrice}
                  onChange={(e) =>
                    setEventDraft({
                      ...eventDraft,
                      unitPrice: parseInt(e.target.value),
                    })
                  }
                />
                <Box sx={{ width: 200 }}>
                  <Stack
                    direction='column'
                    sx={{ height: '100%' }}
                    justifyContent='center'
                  >
                    <Typography variant='body2' gutterBottom>
                      合計費用
                    </Typography>
                    <Typography variant='h3'>
                      {eventDraft.participantCount * eventDraft.unitPrice}円
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <Stack direction='row' spacing={2} flexGrow={1}>
                <DatePicker
                  label='開催日'
                  sx={{ width: '100%' }}
                  onChange={handleStartDateChange}
                  views={['year', 'month', 'day']}
                />
                <TimePicker
                  label='開始時刻'
                  sx={{ width: '100%' }}
                  onChange={handleStartTimeChange}
                  views={['hours', 'minutes']}
                />
                <TimePicker
                  label='終了時刻'
                  sx={{ width: '100%' }}
                  onChange={handleEndTimeChange}
                  views={['hours', 'minutes']}
                />
              </Stack>
              <Stack direction='row' spacing={2} flexGrow={1}>
                <DatePicker
                  label='募集締切日'
                  sx={{ width: '100%' }}
                  onChange={handleApplicationDeadlineDateChange}
                  views={['year', 'month', 'day']}
                />
                <TimePicker
                  label='締切時刻'
                  sx={{ width: '100%' }}
                  onChange={handleApplicationDeadlineTimeChange}
                  views={['hours', 'minutes']}
                />
              </Stack>
            </Stack>
          </LocalizationProvider>
        </div>
      </Box>
    </Paper>
  );
};

export default CreateEventInput;
