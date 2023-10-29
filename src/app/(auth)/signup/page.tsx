'use client';

import { Box, Container, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { appColors } from '@/themes/main';
import useSignUp from './useSignUp';
import SignUpView from './_components/SignupView';
import Carousel from '@/app/_components/Carousel';
import CreateProfileView from './_components/CreateProfileView';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { tokenAtom } from '../tokenAtom';
const SignUpPage = () => {
  const [token, setToken] = useAtom(tokenAtom);

  const [progress, setProgress] = useState(false);

  const { signUp, createProfile } = useSignUp();

  const [step, setStep] = useState(0);

  const router = useRouter();

  const onFirebaseSignUp = async (email: string, password: string) => {
    setProgress(true);
    const { token } = await signUp(email, password);
    setToken(token);
    setTimeout(() => {
      setStep(1);
      setProgress(false);
    }, 100);
  };

  const onProfileCreate = async (profile: {
    companyId: string;
    displayName: string;
    iconFile: File | undefined;
  }) => {
    if (!token) {
      // TokenがSetされてからプロフィール登録ページが表示されるので、本来ここには入らない
      console.error('Token is not set');
      return;
    }
    setProgress(true);
    await createProfile(token, profile);
    setProgress(false);
    router.push('/');
  };

  return (
    <Box sx={{ background: appColors.bgOrange, minHeight: '100vh' }}>
      {progress && <LinearProgress />}
      <Container component='main' maxWidth='xs' sx={{}}>
        <Carousel pageIndex={step}>
          <SignUpView signUp={onFirebaseSignUp} />
          <CreateProfileView createProfile={onProfileCreate} />
        </Carousel>
      </Container>
    </Box>
  );
};

export default SignUpPage;
