import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network'});
  if (error) {
    console.log(error)
  };
  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);


  return { repositories, loading };
};

export default useRepositories;