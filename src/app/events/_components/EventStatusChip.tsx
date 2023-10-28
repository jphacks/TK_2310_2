import { Chip } from '@mui/material';

type Props = {
  label: string;
  color: string;
};

const EventStatusChop = ({ label, color }: Props) => {
  return (
    <Chip
      sx={{
        backgroundColor: color,
        color: 'black',
        padding: '4px 8px',
        width: '100%',
      }}
      label={label}
    />
  );
};

export default EventStatusChop;
