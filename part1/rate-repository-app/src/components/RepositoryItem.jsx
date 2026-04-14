import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  logo: {
    width: 66,
    height: 58,
    borderRadius: 5
  },
  usercontainer: {
    flexDirection: 'row',
    padding: 5
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 4
  },
  topInfo: {
    paddingLeft: 10,
    gap: 5
  },
  bigBox: {
    backgroundColor: 'white',
    marginBottom: 5,
    padding: 5,
    flexDirection: 'column'
  },
  statBlock: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5
  },
  statBox: {
    alignItems: 'center'
  }
});

const format = (num) => {
  return (
    new Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(num)
  )

}



const StatBox = ({text, count}) => {
  // console.log(format(count));
  
  return (
    <View style={styles.statBox}>
      <Text fontWeight={'bold'} >{format(count)}</Text>
      <Text color={'textSecondary'}>{text}</Text>
      
    </View>
  )
}

const RepositoryItem = ({item}) => {

  return(
    <View testID="repositoryItem" style={styles.bigBox}>
      <View style={styles.usercontainer}>
        <Image source={{uri: item.ownerAvatarUrl}} style={styles.logo}/>
        <View style={styles.topInfo}>
          <Text fontWeight={'bold'}>{item.fullName}</Text>
          <Text color={'textSecondary'}>{item.description}</Text>
          <View style={styles.language}>
             <Text color={'white'}>{item.language}</Text>
          </View>

        </View>

        
      </View>
      
      <View style={styles.statBlock}>
        <StatBox text={'Stars'} count={item.stargazersCount}/>
        <StatBox text={'Forks'} count={item.forksCount}/>
        <StatBox text={'Reviews'} count={item.reviewCount}/>
        <StatBox text={'Rating'} count={item.ratingAverage}/>
      </View>

    </View>
  )
}

export default RepositoryItem;