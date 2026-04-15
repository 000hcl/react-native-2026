import RepositoryItem from "./RepositoryItem";
import { Text, View } from "react-native";
import useRepository from "../hooks/useRepository";

export const RepositorySingle = () => {
  const { repository, loading } = useRepository();

  if (loading || !repository) {
    return(
      <Text>Loading...</Text>
    )
  }

  return (
    <View>
      <RepositoryItem item={repository} isSingle={true}/>
    </View>

  )
  
}

export default RepositorySingle;