// components/ListItem.js
import { appColors } from '@/themes/main';
import { Box, Typography, Chip } from '@mui/material';

type ListItemProps = {
  title: string;
  subtitle: string;
  days: string;
};

const ListItem = ({ title, subtitle, days }: ListItemProps) => {
  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderLeft: `5px solid ${appColors.primaryAccent}`,
        borderRadius: '5px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'white',
      }}
    >
      <Box>
        <Typography variant='body1' gutterBottom>
          {title}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {subtitle}
        </Typography>
      </Box>
      <Chip label={days} />
    </Box>
  );
};

export default ListItem;
