import { appColors } from '@/themes/main';
import { Box, LinearProgress, linearProgressClasses } from '@mui/material';

type Props = {
  participantCount: number;
  maxParticipantCount: number;
  highlight?: boolean;
};

const ApplicationProgress = ({
  participantCount,
  maxParticipantCount,
  highlight,
}: Props) => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        color='secondary'
        variant='determinate'
        value={(participantCount / maxParticipantCount) * 100}
        sx={{
          height: 10,
          borderRadius: 1,
          background: appColors.bgGray,
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 1,
            background: highlight ? appColors.primaryAccent : 'secondary.main',
          },
        }}
      />
    </Box>
  );
};

export default ApplicationProgress;
