// components/InfoCard.tsx
import React from 'react';
import { CardContent, Grid, Paper, Typography } from '@mui/material';

interface InfoCardProps {
  title: string;
  totalAmount: number;
  daysAmount: number;
  price: number;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  totalAmount,
  daysAmount,
  price,
}) => {
  return (
    <Paper elevation={0} sx={{ minWidth: 275, padding: 2 }}>
      <CardContent>
        <Typography variant='h3' component='div' sx={{ mb: 4 }}>
          {title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='h3' color='textSecondary' gutterBottom>
              合計動員数
            </Typography>
            <Typography variant='h1' color='secondary' gutterBottom>
              {totalAmount}人
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h3' color='textSecondary' gutterBottom>
              総開催時間
            </Typography>
            <Typography variant='h1' color='secondary' gutterBottom>
              {daysAmount}時間
            </Typography>
          </Grid>
        </Grid>
        <Typography variant='h3' color='textSecondary' gutterBottom>
          総費用
        </Typography>
        <Typography variant='h1' color='secondary'>
          ¥{price.toLocaleString()}
        </Typography>
      </CardContent>
    </Paper>
  );
};

export default InfoCard;
