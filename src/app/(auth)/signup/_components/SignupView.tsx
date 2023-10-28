import {
  Box,
  Stack,
  Typography,
  TextField,
  Alert,
  AlertTitle,
  Button,
} from '@mui/material';
import { FirebaseError } from 'firebase/app';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  signUp: (email: string, password: string) => Promise<void>;
};

const SignUpView = ({ signUp }: Props) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const [emailValidationError, setEmailValidationError] = useState<string>();
  const [passwordValidationError, setPasswordValidationError] =
    useState<string>();

  const [loginError, setLoginError] = useState<string | undefined>(undefined);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    if (!isValid) {
      return;
    }
    try {
      await signUp(email, password);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          setLoginError('このメールアドレスは既に登録されています');
          return;
        }
        if (error.code === 'auth/weak-password') {
          setLoginError('パスワードが脆弱です');
          return;
        }
        console.log(error.message);
        console.log(error.code);
        setLoginError('不明なエラーが発生しました');
        return;
      }
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    const validationMessage = getErrorEmail(email);
    setEmailValidationError(validationMessage);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    const validationMessage = getErrorPassword(password);
    setPasswordValidationError(validationMessage);
  };

  const isValid = !getErrorEmail(email) && !getErrorPassword(password);

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ pt: 8 }}>
        <Stack direction='column' spacing={2} justifyContent='center'>
          <Typography variant='h1' align='center' sx={{ fontSize: '3rem' }}>
            SAFA
          </Typography>
          <Typography variant='h2' align='center'>
            ビジネスダッシュボード
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Image
              src='/safa_logo_filled.png'
              alt='logo'
              width={200}
              height={200}
              priority
            />
          </Box>
          <Typography variant='h2' align='center' mb={8}>
            新規登録
          </Typography>
          <Box component='form' onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              label='メールアドレス'
              autoComplete='email'
              autoFocus
              value={email || ''}
              onChange={onEmailChange}
              error={!!emailValidationError}
              helperText={emailValidationError}
            />
            <TextField
              value={password || ''}
              margin='normal'
              required
              fullWidth
              label='パスワード'
              type='password'
              autoComplete='new-password'
              onChange={onPasswordChange}
              error={!!passwordValidationError}
              helperText={passwordValidationError}
            />
            {loginError && (
              <Alert severity='error'>
                <AlertTitle>アカウントを作成できませんでした</AlertTitle>
                {loginError}
              </Alert>
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              登録する
            </Button>
            <Link href='/login'>
              <Typography variant='body2' align='center'>
                既にアカウントをお持ちの方はこちら
              </Typography>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignUpView;

const getErrorEmail = (email: string | undefined) => {
  if (!email) {
    return 'メールアドレスを入力してください';
  }
  if (!email.match(/.+@.+\..+/)) {
    return 'メールアドレスの形式が正しくありません';
  }
  return undefined;
};

const getErrorPassword = (password: string | undefined) => {
  if (!password) {
    return 'パスワードを入力してください';
  }
  return undefined;
};
