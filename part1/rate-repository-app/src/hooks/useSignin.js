import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/queries";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
        console.log('login complete')
    },
    onError: (error) => {
        console.log('error',error);
    }
  });

  const signIn = async ({ username, password }) => {
    return mutate({ variables: {credentials:{ username, password }} })
  };

  return [signIn, result];
};

export default useSignIn;