import { initializeApp, getApps } from 'firebase/app';
import config from '../../firebase-config.json';

import { getAuth } from 'firebase/auth';

if (!getApps()?.length) {
  initializeApp(config);
}

export const auth = getAuth();
