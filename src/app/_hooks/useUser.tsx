import { auth } from '@/firebase/client';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { atom, useAtom } from 'jotai';
import { tokenAtom } from '../(auth)/tokenAtom';
import fetchApi from '@/lib/fetch';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const userAtom = atom<User | undefined>(undefined);

type UserGetResponse = {
  id: string;
  age: number;
  company_id: string | undefined;
  display_name: string;
  icon_url: string;
};

const useUser = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [user, setUser] = useAtom(userAtom);

  const router = useRouter();

  const login = async (email: string, password: string) => {
    const { token } = await _login(email, password);
    setToken(token);
    const user = await getUser(token);
    setUser(user);
  };

  useEffect(() => {
    if (!token) return;
    (async () => {
      // トークンの有効期限が切れていたらトークンを更新
      const newToken = await getNewTokenIfNeed(token);
      if (newToken && newToken !== token) {
        setToken(newToken);
      }
      const user = await getUser(token);
      setUser(user);
    })();
  }, [token, setUser, setToken]);

  const logout = () => {
    auth.signOut();
    setToken(undefined);
    setUser(undefined);
    router.push('/login');
  };

  return { login, logout, user, token };
};

export default useUser;

const _login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const token = await userCredential.user.getIdToken();

  const userId = userCredential.user.uid;

  return { token, userId };
};

const getUser = async (token: string) => {
  // ユーザー情報を取得
  const response = await fetchApi<undefined, UserGetResponse>(
    token,
    'GET',
    '/user',
  );
  const body = response.data;
  const user: User = {
    id: body.id,
    companyId: body.company_id,
    displayName: body.display_name,
    iconUrl: body.icon_url,
    age: body.age,
  };
  return user;
};

const getNewTokenIfNeed = async (token: string) => {
  const user = auth.currentUser;
  if (!user) return;
  const tokenResult = await user.getIdTokenResult();
  const expirationTime = tokenResult.expirationTime; // トークンの有効期限
  const currentTime = new Date();

  // 有効期限が2分未満になっていたらトークンを更新
  if (new Date(expirationTime).getTime() - currentTime.getTime() < 120000) {
    return await user.getIdToken(true);
  }
  return token;
};
