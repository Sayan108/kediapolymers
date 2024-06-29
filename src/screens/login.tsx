import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useAuthService from '../hooks/useAuthServices';
import {Alert, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button, Text, TextInput, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootState} from '../redux';

const LoginScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const {handleLogIn} = useAuthService();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }
    const data = {username: email, password, loginMethod: 'password_based'};
    handleLogIn(data, navigation);
    navigation.navigate('home');
  };

  return (
    <View style={styles.view}>
      <View style={styles.headerView}>
        <Text variant="titleMedium">Log in</Text>
      </View>

      <View style={styles.loginPageTextContainer}>
        <View style={{marginTop: 10}}>
          <TextInput
            maxLength={100}
            value={email}
            label="Username"
            mode="outlined"
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={{flex: 1}}
              maxLength={100}
              value={password}
              label="Password"
              mode="outlined"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              right={
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                  color={'gray'}
                  size={24}
                />
              }
            />
          </View>
          <View style={{paddingTop: 50}}>
            <Button
              mode="contained"
              onPress={handleLogin}
              // loading={isLoading}
              // disabled={isLoading}
              style={styles.button}>
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignSelf: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    flex: 1,
    gap: 16,
  },
  headerView: {
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 16,
  },
  loginPageTextContainer: {
    width: 300,
    gap: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
});

export default LoginScreen;
