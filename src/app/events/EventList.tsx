import { formatDate, formatDurationDate } from '@/lib/formatDate';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridTreeNodeWithRender,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import EventStatusChop from './_components/EventStatusChip';
import ApplicationProgress from './_components/ApplicationProgress';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

type EventListProps = {
  events: SafaEvent[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
};

const EventList = ({ events, error, isLoading }: EventListProps) => {
  const router = useRouter();
  const handleRowClick = (params: GridRowParams) => {
    router.push(`/events/${params.id}`);
  };

  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: 'ステータス',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <EventStatusChop
          label={params.row.status.label}
          color={params.row.status.color}
        />
      ),
    },
    { field: 'title', headerName: 'イベント名', width: 350 },
    {
      field: 'applicationDeadline',
      headerName: '申込締切日時',
      width: 180,
      valueGetter: (params: GridValueGetterParams) =>
        formatDate(params.row.applicationDeadline),
    },
    {
      field: 'willStartAt',
      headerName: '開催日時',
      width: 240,
      valueGetter: (params: GridValueGetterParams) =>
        formatDurationDate(params.row.willStartAt, params.row.willCompleteAt),
    },
    {
      field: 'applicationCount',
      headerName: '申込状況',
      width: 120,
      renderCell: (
        params: GridRenderCellParams<
          SafaEvent,
          undefined,
          undefined,
          GridTreeNodeWithRender
        >,
      ) => {
        return (
          <ApplicationProgress
            participantCount={params.row.participants.length}
            maxParticipantCount={params.row.participantCount}
            highlight={params.row.status.label === '募集中'}
          />
        );
      },
    },
  ];

  return (
    <Paper elevation={0}>
      {isLoading && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      <Box sx={{ p: 4 }}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h2' sx={{ mb: 4 }}>
            イベント一覧
          </Typography>
          <Link href='/events/create'>
            <Button variant='contained' startIcon={<AddIcon />}>
              イベントを作成する
            </Button>
          </Link>
        </Stack>
        {error && (
          <Alert severity='error' sx={{ mb: 4 }}>
            <AlertTitle>データを取得できませんでした</AlertTitle>
            {error.message}
          </Alert>
        )}
        <DataGrid
          rows={events || []}
          columns={columns}
          onRowClick={handleRowClick}
          sx={{
            border: 'none',
            '&:hover': {
              cursor: 'pointer',
            },
            // 横線を消す
            '& .MuiDataGrid-cell': {
              border: 'none',
            },
            fontSize: '1rem',
            // ヘッダーの文字色
            '& .MuiDataGrid-columnHeaderTitle': {
              color: 'gray',
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default EventList;
