import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/queries";

import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN, {
    onCompleted: async (data) => {
      //console.log(data)
      //console.log('auth', data.authenticate)
      await authStorage.setAccessToken(data.authenticate)
      console.log('login complete')
      apolloClient.resetStore();
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