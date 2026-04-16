import * as yup from 'yup';
import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import theme from '../theme';
import useSignup from '../hooks/useSignup';
import useSignIn from '../hooks/useSignin';

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
    margin: 5

  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    padding: 10,
    alignItems: 'center',
    margin: 5
  },
  errorInput: {
    borderWidth: 2,
    borderColor: theme.colors.errorRed,
    borderRadius: 3,
    padding: 6,
    paddingLeft: 10,
    margin: 5

  }
})

const getInputStyle = (touched, error) => {
  if (touched && error) {
    return styles.errorInput
  } else {
    return styles.input
  }
}

const initialValues = {
  username: '',
  password: '',
  confirm: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string().required().min(5).max(30),
  password: yup
    .string().required().min(5).max(30),
  confirm: yup
    .string().required().oneOf([yup.ref('password')])
})


export const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })
  return (
    <View style={styles.bigBox}>
      <TextInput
        style={getInputStyle(formik.touched.username, formik.errors.username)} 
        placeholder='username'
        value={formik.values.username}
        onBlur={formik.handleBlur('username')}
        onChangeText={formik.handleChange('username')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{color:theme.colors.errorRed}}>{formik.errors.username}</Text>
      )}
      <TextInput
        secureTextEntry
        style={getInputStyle(formik.touched.password, formik.errors.password)} 
        placeholder='password'
        value={formik.values.password}
        onBlur={formik.handleBlur('password')}
        onChangeText={formik.handleChange('password')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{color:theme.colors.errorRed}}>{formik.errors.password}</Text>
      )}
      <TextInput
        secureTextEntry
        style={getInputStyle(formik.touched.confirm, formik.errors.confirm)} 
        placeholder='confirm password'
        value={formik.values.confirm}
        onBlur={formik.handleBlur('confirm')}
        onChangeText={formik.handleChange('confirm')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {formik.touched.confirm && formik.errors.confirm && (
        <Text style={{color:theme.colors.errorRed}}>{formik.errors.confirm}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <View style={styles.button}>
          <Text fontWeight={'bold'} color={'white'}>Sign up</Text>
        </View>

      </Pressable>


    </View>

  )
}

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignup();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    console.log(values)
    const { username, password } = values;
    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/')
    } catch (e) {
      console.log('error in sign up', e)
    }
  }
  return (
    <SignUpForm onSubmit={onSubmit}/>
  );
};

export default SignUp;