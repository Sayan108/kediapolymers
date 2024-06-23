import {endPoints} from './constants';
import {authClient} from './services.clients';

export const login = (payload: any) => {
  return authClient.post(endPoints.logIn, payload);
};
