import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',


  },
  text: {
    fontWeight: '700',
    color: 'white',
    margin: 10
  }

});

const Tab = ({children}) => {
  return (
    <Pressable>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const AppBar = () => {
  return (
  <View style={styles.container}>
    <Tab>Repositories</Tab>
  </View>);
};

export default AppBar;