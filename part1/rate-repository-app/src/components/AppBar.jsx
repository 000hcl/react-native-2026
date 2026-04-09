import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../theme';

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

const AppBar = () => {
  return (
  <View style={styles.container}>

    <Tab link={'/'} text={'Repositories'}/>
    <Tab link={'/signin'} text={'Sign in'}/>

    
  </View>);
};

export default AppBar;