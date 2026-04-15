import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { REPO_BY_ID } from '../graphql/queries';
import { useParams } from "react-router-native";

const useRepository = () => {
  const { id } = useParams();
  console.log('params:', id);
  
  const [repository, setRepository] = useState();
  console.log('id @useRepository', id);
  console.log('type of id is', typeof id)
  

  const { data, error, loading } = useQuery(REPO_BY_ID, {variables: { id:id },fetchPolicy: 'cache-and-network'});
  if (error) {
    // eslint-disable-next-line no-undef
    console.log(error)
  };
  useEffect(() => {
    if (data) {
      console.log('data:', data);
      
      setRepository(data.repository)
    }
  }, [data]);

  return { repository, loading };
}
export default useRepository;