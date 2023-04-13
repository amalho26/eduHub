/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserInfo = /* GraphQL */ `
  query GetUserInfo {
    getUserInfo {
      id
      firstName
      lastName
      email
      profilePictureUri
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups($userId: Int) {
    listGroups(userId: $userId) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages($groupId: Int!) {
    listMessages(groupId: $groupId) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers($search: String) {
    listUsers(search: $search) {
      id
      firstName
      lastName
      email
      profilePictureUri
    }
  }
`;
export const listUsersInGroup = /* GraphQL */ `
  query ListUsersInGroup($groupId: Int) {
    listUsersInGroup(groupId: $groupId) {
      id
      firstName
      lastName
      email
      profilePictureUri
    }
  }
`;
