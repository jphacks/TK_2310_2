import { appColors } from '@/themes/main';
import { Chip, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type Props = {
  participants: Participant[];
  isLoading?: boolean;
};

const ParticipantsList = ({ participants }: Props) => {
  const rows = participants.map((participant) => ({
    id: participant.userId,
    userName: participant.userName,
    status: participant.status,
  }));

  const columns: GridColDef[] = [
    {
      field: 'userName',
      headerName: 'ユーザー名',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'ステータス',
      width: 200,
      renderCell: (params) => {
        switch (params.row.status) {
          case 'completed':
            return (
              <Chip
                label='参加報告済み'
                sx={{ background: appColors.chipGreen }}
              />
            );
          case 'absent':
            return (
              <Chip
                label='参加報告なし'
                sx={{ background: appColors.chipRed }}
              />
            );
          case 'not_reported':
            return (
              <Chip
                label='参加報告待ち'
                sx={{ background: appColors.chipYellow }}
              />
            );
          default:
            return <Chip label={params.row.status} />;
        }
      },
    },
  ];

  return (
    <Paper elevation={0} sx={{ p: 4, flexGrow: 1 }}>
      <Typography variant='h2' color='secondary' gutterBottom>
        申し込み一覧
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          '& .MuiDataGrid-cell': {
            fontSize: '1rem',
          },
        }}
      />
    </Paper>
  );
};

export default ParticipantsList;
