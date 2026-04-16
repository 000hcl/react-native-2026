import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

//CREATED_AT, RATING_AVERAGE, ASC, DESC
const useRepositories = (sortState) => {
  const [repositories, setRepositories] = useState();
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC')
  const changeSorting = () => {
    switch (sortState) {
      case ('highest'):
        setOrderBy('RATING_AVERAGE')
        setOrderDirection('DESC')
        break
      case ('lowest'):
        setOrderBy('RATING_AVERAGE')
        setOrderDirection('ASC')
        break
      default:
        setOrderBy('CREATED_AT')
        setOrderDirection('DESC')
        break
    }
  }



  const { data, error, loading } = useQuery(GET_REPOSITORIES, {variables: {orderBy: orderBy, orderDirection: orderDirection }});
  
  if (error) {
    // eslint-disable-next-line no-undef
    console.log(error)
  };
  useEffect(() => {
    if (data) {
      changeSorting();
      setRepositories(data.repositories);
    }
  }, [data, sortState]);


  return { repositories, loading };
};

export default useRepositories;