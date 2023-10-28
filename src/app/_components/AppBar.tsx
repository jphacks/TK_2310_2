import { Avatar, Box, Paper, Typography } from '@mui/material';
import useUser from '../_hooks/useUser';

const AppBar = () => {
  const { user } = useUser();
  return (
    <>
      <Box
        sx={{
          p: 2,
          position: 'fixed',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          boxSizing: 'border-box',
          backdropFilter: 'blur(2px)',
          zIndex: 100,
        }}
      >
        <div>
          <Typography variant='h1' color='secondary'>
            SAFA
          </Typography>
          <Typography variant='h3' color='secondary'>
            ビジネスダッシュボード
          </Typography>
        </div>
        <Paper
          sx={{
            py: 1,
            px: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: 'fit-content',
            gap: '1rem',
          }}
          elevation={0}
        >
          <Avatar alt={user?.displayName} src={user?.iconUrl} />
          <Typography>{user?.displayName}</Typography>
        </Paper>
      </Box>
      <Box sx={{ height: 100 }} />
    </>
  );
};

export default AppBar;
