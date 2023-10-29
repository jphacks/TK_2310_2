import {
  Alert,
  AlertTitle,
  Box,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

type Props = {
  eventDraft: SafaEventDraft;
  setEventDraft: (eventDraft: SafaEventDraft) => void;
};

const validateEventDraft = (eventDraft: SafaEventDraft) => {
  if (!eventDraft.title) {
    return 'イベント名を入力してください';
  }
  if (!eventDraft.description) {
    return 'イベント説明を入力してください';
  }
  if (!eventDraft.participantCount) {
    return '募集人数を入力してください';
  }
  if (!eventDraft.unitPrice) {
    return '報酬額を入力してください';
  }
  if (!eventDraft.willStartAt) {
    return '開始日時を入力してください';
  }
  if (!eventDraft.willCompleteAt) {
    return '終了時刻を入力してください';
  }
  if (!eventDraft.applicationDeadline) {
    return '応募締め切り日時を入力してください';
  }
  return true;
};

const EventConfig = ({ eventDraft, setEventDraft }: Props) => {
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

  const validationMessage = validateEventDraft(eventDraft);

  return (
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
            rows={3}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>人</InputAdornment>
                ),
              }}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>¥</InputAdornment>
                ),
              }}
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
              value={dayjs(eventDraft.willStartAt)}
              onChange={handleStartDateChange}
              views={['year', 'month', 'day']}
            />
            <TimePicker
              label='開始時刻'
              sx={{ width: '100%' }}
              value={dayjs(eventDraft.willStartAt)}
              onChange={handleStartTimeChange}
              views={['hours', 'minutes']}
            />
            <TimePicker
              label='終了時刻'
              sx={{ width: '100%' }}
              value={dayjs(eventDraft.willCompleteAt)}
              onChange={handleEndTimeChange}
              views={['hours', 'minutes']}
            />
          </Stack>
          <Stack direction='row' spacing={2} flexGrow={1}>
            <DatePicker
              label='募集締切日'
              sx={{ width: '100%' }}
              value={dayjs(eventDraft.applicationDeadline)}
              onChange={handleApplicationDeadlineDateChange}
              views={['year', 'month', 'day']}
            />
            <TimePicker
              label='締切時刻'
              sx={{ width: '100%' }}
              value={dayjs(eventDraft.applicationDeadline)}
              onChange={handleApplicationDeadlineTimeChange}
              views={['hours', 'minutes']}
            />
            <Box sx={{ width: '100%' }} />
          </Stack>
          {validationMessage !== true && (
            <Alert severity='error'>
              <AlertTitle>{validationMessage}</AlertTitle>
            </Alert>
          )}
        </Stack>
      </LocalizationProvider>
    </div>
  );
};

export default EventConfig;
