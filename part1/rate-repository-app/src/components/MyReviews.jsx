import useMyReviews from "../hooks/useMyReviews";
import { format, parseISO } from 'date-fns'
import { View, FlatList, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const size = 48;
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  rating: {
    borderColor: theme.colors.primary,
    borderStyle: 'solid',
    borderWidth: 2,
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingNumber: {
    fontSize: 20
  },
  reviewBox: {
    backgroundColor: 'white',
    padding: 20
  },
  topBox: {
    padding: 10,
    flexDirection: 'row'
  },
  texts: {
    paddingLeft: 20,
    maxWidth: '80%' 
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const parseDate = (dateString) => {
  const date = parseISO(dateString)
  const formatted = format(date, 'dd.MM.yyyy')
  return formatted
}

const ReviewItem = ({ item }) => {
  const rawdate = item.createdAt
  return(
    <View style={styles.reviewBox}>
      <View style={styles.topBox}>
        <View style={styles.rating}>
          <Text color='primary' style={styles.ratingNumber}>
            {item.rating}
          </Text>
        </View>
        <View style={styles.texts}>
          <Text fontSize='subheading' fontWeight='bold'>{item.repository.fullName}</Text>
          <Text color='textSecondary'>{parseDate(rawdate)}</Text>
          <View style={{marginTop: 10}}>
            <Text>{item.text}</Text>
          </View>
          
        </View>
      </View>
      
    </View>
  )
}


const MyReviews = () => {
  const {reviews, loading} = useMyReviews();
  const reviewNodes = reviews
  ? reviews.edges.map((edge) => edge.node)
  : [];

  console.log(reviewNodes)
  if (loading || !reviews) {
    return(
      <Text>Loading...</Text>
    )
  }

  return (

    <FlatList 
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <ReviewItem item={item}/>
      )}
    />


  )
}

export default MyReviews;