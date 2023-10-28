'use client';

import { appColors } from '@/themes/main';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Background = ({ children }: Props) => {
  return (
    <div style={{ background: appColors.bgGray, minHeight: '100vh' }}>
      {children}
    </div>
  );
};

export default Background;
