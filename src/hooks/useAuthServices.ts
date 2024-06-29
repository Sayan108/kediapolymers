import {useDispatch} from 'react-redux';
import {authRequested, authSuccess, logOut} from '../redux/silces/auth.silce';

import {IUserDetails} from '../redux/redux.constants';
import {login} from '../services';
import {clearCart} from '../redux/silces/cart.slice';
import {clearOrder} from '../redux/silces/order.slice';
import {clearProductS} from '../redux/silces/product.slice';

const useAuthService = () => {
  const dispatch = useDispatch();

  const handleLogIn = async (payload: any, navigation: any) => {
    navigation.navigate('home');
    dispatch(authRequested());
    //console.log('here');

    try {
      //console.log('trying');
      const response = await login(payload);
      //  //console.log(response?.data, 'here');
      const data = response?.data?.data;

      const userObject: IUserDetails = {
        userID: data.userId ?? '',
        //userName: username??'',
        fullname: data.fullname ?? '',
        accessToken: data.accessToken,
        userName: data.username ?? '',
        phoneNumber: data?.phoneNumber,
      };
      //console.log(userObject, 'getting data');
      dispatch(authSuccess(userObject));

      navigation.navigate('home');
    } catch (error: any) {
      // dispatch(authFailed(error[0].value));
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
