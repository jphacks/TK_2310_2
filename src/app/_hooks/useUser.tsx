import { auth } from '@/firebase/client';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { atom, useAtom } from 'jotai';
import { tokenAtom } from '../auth/tokenAtom';
import fetchApi from '@/lib/fetch';

const userAtom = atom<User | undefined>(undefined);

type UserGetResponse = {
  id: string;
  company_id: string | undefined;
  user_name: string;
  display_name: string;
  sex: string;
  age: number;
  icon_url: string;
};

const useUser = () => {
  const [, setToken] = useAtom(tokenAtom);
  const [user, setUser] = useAtom(userAtom);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const token = await userCredential.user.getIdToken();
    setToken(token);
    const userId = userCredential.user.uid;

    // ユーザー情報を取得
    const response = await fetchApi<undefined, UserGetResponse>(
      token,
      'GET',
      `/user/${userId}`,
    );
    const body = response.data;

    setUser({
      id: body.id,
      companyId: body.company_id,
      userName: body.user_name,
      displayName: body.display_name,
      iconUrl: body.icon_url,
      sex: body.sex,
      age: body.age,
    });
    return userCredential.user;
  };

  const logout = () => {
    auth.signOut();
    setToken(undefined);
    setUser(undefined);
  };

  return { login, logout, user };
};

export default useUser;
