import {useDispatch} from 'react-redux';
import {
  authFailed,
  authRequested,
  authSuccess,
  logOut,
} from '../redux/silces/auth.silce';

import {IUserDetails} from '../redux/redux.constants';
import {login} from '../services';
import {clearCart} from '../redux/silces/cart.slice';
import {clearOrder} from '../redux/silces/order.slice';
import {clearProductS} from '../redux/silces/product.slice';
import {Alert} from 'react-native';

const useAuthService = () => {
  const dispatch = useDispatch();

  const handleLogIn = async (payload: any, navigation: any) => {
    navigation.navigate('home');
    dispatch(authRequested());

    try {
      const response = await login(payload);

      const data = response?.data?.data;

      const userObject: IUserDetails = {
        userID: data.userId ?? '',
        //userName: username??'',
        fullname: data.fullname ?? '',
        accessToken: data.accessToken,
        userName: data.username ?? '',
        phoneNumber: data?.phoneNumber,
        email: data?.email ?? '',
      };
      dispatch(authSuccess(userObject));

      navigation.navigate('home');
    } catch (error: any) {
      dispatch(authFailed('Something went wrong'));
      Alert.alert('Something went wrong');
      console.error(error);
    }
  };

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(clearCart());
    dispatch(clearOrder());
    dispatch(clearProductS());
  };

  return {
    handleLogIn,
    handleLogOut,
  };
};

export default useAuthService;
