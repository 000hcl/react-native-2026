import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
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

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal style={styles.scroll}>
      <Tab link={'/'} text={'Repositories'}/>
      <Tab link={'/signin'} text={'Sign in'}/>
    </ScrollView>

  </View>);
};

export default AppBar;