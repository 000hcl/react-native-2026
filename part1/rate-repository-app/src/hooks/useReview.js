import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/queries";

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onCompleted: async (data) => {
      console.log('review', data);
      
    },
    onError: (error) => {
      console.log('create review error:', error)
    }

  });
  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    return mutate({variables: {review: { ownerName, rating, repositoryName, text }}})
  };
  return [createReview, result];
};

export default useReview