import FileUploadButton from '@/app/_components/FileUpload';
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

type Profile = {
  companyId: string;
  displayName: string;
  iconFile: File | undefined;
};

type Props = {
  createProfile: (profile: Profile) => Promise<void>;
};

const CreateProfileView = ({ createProfile }: Props) => {
  const [profile, setProfile] = useState<Profile>({
    companyId: '',
    displayName: '',
    iconFile: undefined,
  });

  const [apiError, setApiError] = useState<string | undefined>(undefined);

  const onCreateButtonClick = async () => {
    try {
      await createProfile(profile);
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
        return;
      }
      setApiError('不明なエラーが発生しました');
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ pt: 8 }}>
        <Typography variant='h2' align='center' sx={{ mb: 8 }}>
          プロフィールを作成
        </Typography>
        <Stack direction='column' spacing={4} justifyContent='center'>
          <TextField
            label='企業ID'
            value={profile.companyId}
            onChange={(e) =>
              setProfile({ ...profile, companyId: e.target.value })
            }
          />

          <TextField
            label='名前'
            value={profile.displayName}
            onChange={(e) =>
              setProfile({ ...profile, displayName: e.target.value })
            }
          />

          <FileUploadButton
            label='アイコンをアップロード'
            file={profile.iconFile}
            setFile={(file) => setProfile({ ...profile, iconFile: file })}
          />

          {apiError && <Alert severity='error'>{apiError}</Alert>}

          <Button
            variant='contained'
            color='primary'
            onClick={onCreateButtonClick}
          >
            登録を完了
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreateProfileView;
