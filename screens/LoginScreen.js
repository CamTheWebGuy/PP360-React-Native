import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { Text, Input, Button } from 'galio-framework';

import { useDispatch } from 'react-redux';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from 'axios';
import { LOGIN_SUCCESS, USER_LOADED } from '../actions/types';

const LoginScreen = ({
  auth: { user, isAuthenticated, loading, token },
  navigation
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const loginHandler = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({
      email: formData.email,
      password: formData.password
    });

    const res = await axios.post(
      'https://poolpro360.com/api/auth',
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    try {
      const user = await axios.get('https://poolpro360.com/api/auth', {
        headers: {
          'x-auth-token': res.data.token
        }
      });

      dispatch({
        type: USER_LOADED,
        payload: user.data
      });

      setFormData({
        email: '',
        password: ''
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (user && token && isAuthenticated) {
    navigation.navigate({
      routeName: 'Dashboard'
    });
  }

  return (
    <ImageBackground
      source={require('../images/login-bg-1.png')}
      style={styles.image}
    >
      <View style={styles.screen}>
        {/* <Text style={styles.title} h1>
          Login To PP360
        </Text> */}
        <Image
          source={require('../images/logolight.png')}
          style={styles.logo}
        />

        <View style={styles.card}>
          <Input
            placeholder='Email'
            right
            icon='user'
            family='antdesign'
            iconSize={14}
            iconColor='black'
            topHelp
            help='Email:'
            value={formData.email}
            onChangeText={email => setFormData({ ...formData, email })}
          />
          <Input
            placeholder='Password'
            password
            viewPass
            topHelp
            help='Password:'
            value={formData.password}
            onChangeText={password => setFormData({ ...formData, password })}
          />
          <Button style={styles.button} color='success' onPress={loginHandler}>
            Sign In
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center'
  },
  logo: {
    width: '100%',
    height: 60,
    marginVertical: 40
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  button: {
    width: '100%',
    backgroundColor: '#2dce89',
    marginHorizontal: 0
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(LoginScreen);
