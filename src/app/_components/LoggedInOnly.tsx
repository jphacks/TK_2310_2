import { ReactNode, useEffect } from 'react';
import useAuth from '../_hooks/useAuth';
import { useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
};
const LoggedInOnly = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) return;
    router.push('/login');
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export default LoggedInOnly;
