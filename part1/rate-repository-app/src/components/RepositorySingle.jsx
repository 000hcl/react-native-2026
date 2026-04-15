import RepositoryItem from "./RepositoryItem";
import { View, FlatList, StyleSheet } from "react-native";
import { format, parseISO } from 'date-fns'
import Text from "./Text";
import theme from "../theme";
import useRepository from "../hooks/useRepository";
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
          <Text fontSize='subheading' fontWeight='bold'>{item.user.username}</Text>
          <Text color='textSecondary'>{parseDate(rawdate)}</Text>
          <View style={{marginTop: 10}}>
            <Text>{item.text}</Text>
          </View>
          
        </View>
      </View>
      
    </View>
  )
}

export const RepositorySingle = () => {
  const { repository, loading } = useRepository();
  const reviews = repository
  ? repository.reviews.edges.map((edge) => edge.node)
  : [];

  if (loading || !repository) {
    return(
      <Text>Loading...</Text>
    )
  }

  return (

    <FlatList 
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <ReviewItem item={item}/>
      )}
      ListHeaderComponent={() => <RepositoryItem item={repository} isSingle={true}/>}
    />


  )
  
}

export default RepositorySingle;