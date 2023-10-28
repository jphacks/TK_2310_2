import { initializeApp, getApps } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import config from '../../firebase-config.json';

if (!getApps()?.length) {
  initializeApp(config);
}

export const auth = getAuth();
