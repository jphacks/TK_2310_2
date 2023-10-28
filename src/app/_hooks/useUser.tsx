import { auth } from '@/firebase/client';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { atom, useAtom } from 'jotai';
import { tokenAtom } from '../(auth)/tokenAtom';
import fetchApi from '@/lib/fetch';
import { useEffect } from 'react';
import { atomWithStorage } from 'jotai/utils';
import { useRouter } from 'next/navigation';

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

const userIdAtom = atomWithStorage<string | undefined>(
  'user_id',
  undefined,
  undefined,
  { unstable_getOnInit: true },
);

const useUser = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [userId, setUserId] = useAtom(userIdAtom);

  const router = useRouter();

  const login = async (email: string, password: string) => {
    const { userId: currentUserId, token } = await _login(email, password);
    setToken(token);
    const user = await getUser(token, currentUserId);
    setUser(user);
    setUserId(currentUserId);
  };

  useEffect(() => {
    if (!token) return;
    if (!userId) return;
    getUser(token, userId).then((currentUser) => {
      setUser(currentUser);
    });
  }, [userId, token, setUser]);

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

const getUser = async (token: string, userId: string) => {
  // ユーザー情報を取得
  const response = await fetchApi<undefined, UserGetResponse>(
    token,
    'GET',
    `/user/${userId}`,
  );
  const body = response.data;
  const user: User = {
    id: body.id,
    companyId: body.company_id,
    userName: body.user_name,
    displayName: body.display_name,
    iconUrl: body.icon_url,
    sex: body.sex,
    age: body.age,
  };
  return user;
};
