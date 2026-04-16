import { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const useMyReviews = () => {
  const [reviews, setReviews] = useState();
    const { data, loading, error } = useQuery(ME, {
    variables: {includeReviews: true}
  })
  if (error) {
    // eslint-disable-next-line no-undef
    console.log(error)
  }
  useEffect(() => {
    if (data) {
      setReviews(data.me.reviews)
    }
  }, [data])

  return { reviews, loading };
}
export default useMyReviews;