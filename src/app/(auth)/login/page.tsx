'use client';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { appColors } from '@/themes/main';
import Image from 'next/image';
import { FirebaseError } from 'firebase/app';
import useUser from '../../_hooks/useUser';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const [emailValidationError, setEmailValidationError] = useState<string>();
  const [passwordValidationError, setPasswordValidationError] =
    useState<string>();

  const [loginError, setLoginError] = useState<string | undefined>(undefined);

  const [progress, setProgress] = useState(false);

  const router = useRouter();

  const { login } = useUser();

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    if (!isValid) {
      return;
    }
    setProgress(true);
    try {
      await login(email, password);
    } catch (error: unknown) {
      setProgress(false);
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-login-credentials') {
          setLoginError('メールアドレスまたはパスワードが間違っています');
          return;
        }
        console.log(error.message);
        console.log(error.code);
        setLoginError('不明なエラーが発生しました');
        return;
      }
    }
    // ログイン成功
    router.push('/');
  };

  return (
    <Box sx={{ background: appColors.bgOrange, minHeight: '100vh' }}>
      {progress && <LinearProgress />}
      <Container component='main' maxWidth='xs' sx={{}}>
        <Box>
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
                ログイン
              </Typography>
              <Box
                component='form'
                onSubmit={onSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
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
                  autoComplete='current-password'
                  onChange={onPasswordChange}
                  error={!!passwordValidationError}
                  helperText={passwordValidationError}
                />
                {loginError && (
                  <Alert severity='error'>
                    <AlertTitle>ログイン失敗</AlertTitle>
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
                  ログイン
                </Button>
                <Link href='/signup' style={{ color: 'black' }}>
                  <Typography variant='body2' align='center'>
                    アカウントをお持ちでない場合はこちら
                  </Typography>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
