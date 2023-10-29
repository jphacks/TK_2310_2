// pages/index.js
import { Paper, Typography } from '@mui/material';
import ListItem from './Task';
import { Stack } from '@mui/system';
import { mainTheme } from '@/themes/main';

export default function TodoList() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 4,
        background: mainTheme.palette.secondary.light,
        width: '400px',
      }}
    >
      <div>
        <Typography variant='h2' gutterBottom>
          やることリスト
        </Typography>
        <Stack spacing={2}>
          <ListItem
            title='リーダーを指名してください'
            subtitle='エコ・ウォーター & クリーンアップ活動#2'
            days='あと3日'
          />
          <ListItem
            title='リーダーを指名してください'
            subtitle='【ハロィン対抗】渋谷クリーン大作戦'
            days='あと4日'
          />
        </Stack>
      </div>
    </Paper>
  );
}
