import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../theme';

import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from "@apollo/client";
import { useQuery } from '@apollo/client/react';
import { ME } from '../graphql/queries';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: 'row',


  },
  text: {
    fontWeight: '700',
    color: 'white',
    margin: 10
  },
  scroll: {
    flexDirection: 'row'
  }

});

const Tab = ({text, link}) => {
  return (
    <Pressable>
      <Link to={link}>
        <Text style={styles.text}>{text}</Text>
      </Link>
      
    </Pressable>
  )
}

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const onPress = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
    } catch (e) {
      console.log('signout',e)
    }

  };
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.text}>Sign out</Text>
    </Pressable>
  )
}

const SignInOrOut = () => {
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });
  console.log(data, loading, error);
  
  if (data?.me) {
    return <SignOut/>
  } else {
    return <Tab link={'/signin'} text={'Sign in'}/>
  }
}

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal style={styles.scroll}>
      <Tab link={'/'} text={'Repositories'}/>
      <SignInOrOut />
    </ScrollView>

  </View>);
};

export default AppBar;