import { auth } from '@/firebase/client';
import fetchApi from '@/lib/fetch';
import { createUserWithEmailAndPassword } from '@firebase/auth';

type AuthSignUpPostRequest = {
  company_id: string | undefined;
  user_name: string;
  display_name: string;
  icon_url: string | undefined;
};

type AuthSignUpPostResponse = {
  user_id: string;
  company_id: string;
  user_name: string;
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

    // ユーザー情報をバックエンドへ登録
    const response = await fetchApi<
      AuthSignUpPostRequest,
      AuthSignUpPostResponse
    >(token, 'POST', '/auth/signup', {
      company_id: 'string',
      user_name: 'string',
      display_name: 'string',
      icon_url: 'string',
    });
    console.log(response);
    return userCredential.user;
  };

  return { signUp };
};

export default useSignUp;
