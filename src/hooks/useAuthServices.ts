import {useDispatch} from 'react-redux';
import {
  authFailed,
  authRequested,
  authSuccess,
  logOut,
  otpFailed,
  otpRequested,
  otpSuccess,
} from '../redux/silces/auth.silce';

import {IUserDetails} from '../redux/redux.constants';
import {login} from '../services';
import {AxiosResponse} from 'axios';

const useAuthService = () => {
  const dispatch = useDispatch();

  const handleLogIn = async (payload: any, navigation: any) => {
    dispatch(authRequested());
    try {
      const {
        data: {data},
      }: AxiosResponse = await login(payload);

      const userObject: IUserDetails = {
        userID: data.userId ?? '',
        //userName: username??'',
        fullname: data.fullname ?? '',
        accessToken: data.accessToken,
        userName: '',
        phoneNumber: data?.phoneNumber,
      };
      // console.log(userObject, 'getting data');
      dispatch(authSuccess(userObject));
      navigation.navigate('home');
    } catch (error) {
      dispatch(authFailed(error));
    }
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return {
    handleLogIn,
    handleLogOut,
  };
};

export default useAuthService;
