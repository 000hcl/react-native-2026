import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';

const styles = StyleSheet.create({
  bigBox: {
    backgroundColor: 'white',
    padding: 10
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.textSecondary,
    borderRadius: 3,
    padding: 6,
    paddingLeft: 10,
    marginBottom:10
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    padding: 10,
    alignItems: 'center'
  }
})

const initialValues = {
  username: '',
  password: ''
}

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit
  })
  return (
    <View style={styles.bigBox}>
      <TextInput
        style={styles.input} 
        placeholder='username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
      secureTextEntry
      style={styles.input} 
      placeholder='password'
      value={formik.values.password}
      onChangeText={formik.handleChange('password')}
      />
      <View style={styles.button}>
        <Pressable onPress={formik.handleSubmit}>
          <Text fontWeight={'bold'} color={'white'}>Sign in</Text>
        </Pressable>
      </View>

    </View>

  )
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return <SignInForm onSubmit={onSubmit}/>
};

export default SignIn;