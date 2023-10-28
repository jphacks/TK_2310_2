import { useAtomValue } from 'jotai';
import { tokenAtom } from '@/app/(auth)/tokenAtom';

const useAuth = () => {
  const token = useAtomValue(tokenAtom);

  const isLoggedIn = !!token;

  return { isLoggedIn };
};

export default useAuth;
