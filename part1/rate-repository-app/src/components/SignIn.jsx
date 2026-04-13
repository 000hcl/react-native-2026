import * as yup from 'yup';
import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import useSignIn from '../hooks/useSignin';
import AuthStorage from '../utils/authStorage';

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
  password: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string().required(),
  password: yup
    .string().required()
})

//  {formik.touched.mass && formik.errors.mass && (
//   <Text style={{ color: 'red' }}>{formik.errors.mass}</Text>
//  )}

const SignInForm = ({ onSubmit }) => {
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
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{color:theme.colors.errorRed}}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <View style={styles.button}>
          <Text fontWeight={'bold'} color={'white'}>Sign in</Text>
        </View>

      </Pressable>


    </View>

  )
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;
    
    try {
      const { data } = await signIn({ username, password });
      const storage = new AuthStorage('token');
      await storage.setAccessToken(data.authenticate);
      const token = await storage.getAccessToken();


      console.log('on signin.jsx', data, 'token: ', token)
    } catch (e) {
      console.log(e);
    }
  };
  return <SignInForm onSubmit={onSubmit}/>
};

export default SignIn;

// const doShopping = async () => {
//   const shoppingCartA = new ShoppingCartStorage('shoppingCartA');
//   const shoppingCartB = new ShoppingCartStorage('shoppingCartB');

//   await shoppingCartA.addProduct('chips');
//   await shoppingCartA.addProduct('soda');

//   await shoppingCartB.addProduct('milk');

//   const productsA = await shoppingCartA.getProducts();
//   const productsB = await shoppingCartB.getProducts();

//   console.log(productsA, productsB);

//   await shoppingCartA.clearProducts();
//   await shoppingCartB.clearProducts();
// };