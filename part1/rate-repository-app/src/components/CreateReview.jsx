import * as yup from 'yup';
import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import useReview from '../hooks/useReview';
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
  owner: '',
  name: '',
  rating: '',
  review: ''
}


validationSchema = yup.object().shape({
  owner: yup
    .string().required(),
  name: yup
    .string().required(),
  rating: yup
    .number().lessThan(101).moreThan(-1).required(),
  review: yup
    .string()
})

const CreateReviewForm = ({onSubmit}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })
  return (
    <View style={styles.bigBox}>
      <TextInput
        style={getInputStyle(formik.touched.owner, formik.errors.owner)} 
        placeholder='repository owner name'
        value={formik.values.owner}
        onBlur={formik.handleBlur('owner')}
        onChangeText={formik.handleChange('owner')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {formik.touched.owner && formik.errors.owner && (
        <Text style={{color:theme.colors.errorRed}}>{formik.errors.owner}</Text>
      )}
      <TextInput
        style={getInputStyle(formik.touched.name, formik.errors.name)} 
        placeholder='repository name'
        value={formik.values.name}
        onBlur={formik.handleBlur('name')}
        onChangeText={formik.handleChange('name')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {formik.touched.name && formik.errors.name && (
        <Text style={{color:theme.colors.errorRed}}>{formik.errors.name}</Text>
      )}
      <TextInput
        style={getInputStyle(formik.touched.rating, formik.errors.rating)} 
        placeholder='rating between 0 and 100'
        value={formik.values.rating}
        onBlur={formik.handleBlur('rating')}
        onChangeText={formik.handleChange('rating')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{color:theme.colors.errorRed}}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={getInputStyle(formik.touched.review, formik.errors.review)} 
        placeholder='review'
        multiline='true'
        value={formik.values.review}
        onBlur={formik.handleBlur('review')}
        onChangeText={formik.handleChange('review')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={{color:theme.colors.errorRed}}>{formik.errors.review}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <View style={styles.button}>
          <Text fontWeight={'bold'} color={'white'}>Submit</Text>
        </View>

      </Pressable>
    </View>
  )
}

const CreateReview = () => {
  const [createReview] = useReview();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    console.log('submit', values)
    const {owner, rating, name, review} = values
    try {
      const { data } = await createReview({
        ownerName: owner,
        rating: Number(rating),
        repositoryName: name,
        text: review
      });
      //console.log('data found', data.createReview.repository.id)
      const id = data.createReview.repository.id
      navigate(`/repository/${id}`)
    } catch (e) {
      console.log('error in createreview',e)
    }

  }
  return (
    <CreateReviewForm onSubmit={onSubmit}/>
  )
}

export default CreateReview;