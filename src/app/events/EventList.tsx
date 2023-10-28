import { formatDate, formatDurationDate } from '@/lib/formatDate';
import { Alert, AlertTitle, Chip, Paper, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
  GridValueGetterParams,
} from '@mui/x-data-grid';

type EventListProps = {
  events: SafaEvent[] | undefined;
  error: Error | undefined;
};

const EventList = ({ events, error }: EventListProps) => {
  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: 'ステータス',
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
          <Chip
            sx={{
              backgroundColor: params.row.status.color,
              color: 'black',
              padding: '4px 8px',
              width: '100%',
            }}
            label={params.row.status.label}
          />
        );
      },
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
  ];

  return (
    <Paper sx={{ p: 4 }} elevation={0}>
      <Typography variant='h2' sx={{ mb: 4 }}>
        イベント一覧
      </Typography>
      {error && (
        <Alert severity='error' sx={{ mb: 4 }}>
          <AlertTitle>データを取得できませんでした</AlertTitle>
          {error.message}
        </Alert>
      )}
      <DataGrid
        rows={events || []}
        columns={columns}
        sx={{
          border: 'none',
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
    </Paper>
  );
};

export default EventList;
