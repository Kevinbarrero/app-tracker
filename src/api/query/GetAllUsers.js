import { gql } from '@apollo/client';
import { USER_PARTIAL_FRAGMENT } from '../fragments/user';

export const USERS = gql`
query users {
  users {
    ${USER_PARTIAL_FRAGMENT}
  }
}
`;
