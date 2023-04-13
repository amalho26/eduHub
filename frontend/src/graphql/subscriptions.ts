/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onNewMessage = /* GraphQL */ `
  subscription OnNewMessage($groupId: Int!) {
    onNewMessage(groupId: $groupId) {
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
