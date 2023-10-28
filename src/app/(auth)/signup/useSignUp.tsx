import { auth } from '@/firebase/client';
import fetchApi from '@/lib/fetch';
import { createUserWithEmailAndPassword } from '@firebase/auth';

type AuthSignUpPostRequest = {
  company_id: string | undefined;
  display_name: string;
  icon_url: string | undefined;
};

type AuthSignUpPostResponse = {
  user_id: string;
  company_id: string;
  display_name: string;
  icon_url: string;
};

const useSignUp = () => {
  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const token = await userCredential.user.getIdToken();

    return { token };
  };

  const createProfile = async (
    token: string,
    profile: {
      companyId: string;
      displayName: string;
      iconFile: File | undefined;
    },
  ) => {
    // TODO: Firebase storageにアイコンをアップロード

    const response = await fetchApi<
      AuthSignUpPostRequest,
      AuthSignUpPostResponse
    >(token, 'POST', '/auth/signup', {
      company_id: profile.companyId,
      display_name: profile.displayName,
      icon_url: '',
    });

    if (response.status !== 200) {
      // TODO: SAFA APIからのエラーをハンドリングする
      throw new Error('Error in createProfile');
    }
  };

  return { signUp, createProfile };
};

export default useSignUp;
