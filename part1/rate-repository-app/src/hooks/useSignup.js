import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/queries";

const useSignup = () => {
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      // eslint-disable-next-line no-undef
      console.log('error in useSignup', error)
    }
  });

  const signUp = async ({ username, password }) => {
    return mutate({ variables: {user: {username, password }}})
  };
  return [signUp, result];
};

export default useSignup;