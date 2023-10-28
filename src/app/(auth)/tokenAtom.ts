import { atomWithStorage } from 'jotai/utils';

export const tokenAtom = atomWithStorage<string | undefined>(
  'token',
  undefined,
  undefined,
  { unstable_getOnInit: true },
);
