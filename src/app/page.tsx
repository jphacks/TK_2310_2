// import { AppBar } from '@mui/material';

import { Box, Button, Paper, Typography } from '@mui/material';
import AppBar from './_components/AppBar';

const HomePage = () => {
  return (
    <main>
      <AppBar></AppBar>

      <Button variant='contained' color='primary'>
        Button
      </Button>
      <Button variant='contained' color='secondary'>
        Button
      </Button>
      <Button variant='outlined' color='primary'>
        Button
      </Button>
      <Button variant='outlined' color='secondary'>
        Button
      </Button>

      <Box m={2}>
        <Paper elevation={0}>
          <Typography variant='h1'>SAFA 機械 h1</Typography>
          <Typography variant='h2'>SAFA 機械 h2</Typography>
          <Typography variant='h3'>SAFA 機械 h3</Typography>
          <Typography variant='subtitle1'>SAFA 機械 subtitle1</Typography>
          <Typography variant='body1'>SAFA 機械 body1</Typography>
          <Typography variant='body2' color='gray'>
            SAFA 機械 body2
          </Typography>
        </Paper>
      </Box>
    </main>
  );
};

export default HomePage;
