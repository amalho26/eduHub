/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(email: $email, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
      email
      profilePictureUri
    }
  }
`;
export const createGroup = /* GraphQL */ `
  mutation CreateGroup($name: String!, $description: String, $userIds: String) {
    createGroup(name: $name, description: $description, userIds: $userIds) {
      id
      name
      description
      users {
        id
        firstName
        lastName
        email
        profilePictureUri
      }
      createdDateTime
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage($groupId: Int!, $message: String!) {
    createMessage(groupId: $groupId, message: $message) {
      id
      groupId
      message
      user {
        id
        firstName
        lastName
        email
        profilePictureUri
      }
      createdDateTime
    }
  }
`;
