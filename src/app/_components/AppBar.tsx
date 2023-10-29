import { Avatar, Box, Menu, MenuItem, Paper, Typography } from '@mui/material';
import useUser from '../_hooks/useUser';
import { useState } from 'react';

const AppBar = () => {
  const { user, logout } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            Business Dashboard
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
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={handleClick}
          elevation={0}
        >
          <Avatar alt={user?.displayName} src={user?.iconUrl} />
          <Typography>{user?.displayName}</Typography>
        </Paper>
      </Box>
      <Box sx={{ height: 100 }} />
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => logout()}>ログアウト</MenuItem>
      </Menu>
    </>
  );
};

export default AppBar;
