/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type User = {
  __typename: "User",
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  profilePictureUri?: string | null,
};

export type Group = {
  __typename: "Group",
  id: string,
  name: string,
  description?: string | null,
  users:  Array<User | null >,
  createdDateTime: string,
};

export type Message = {
  __typename: "Message",
  id: string,
  groupId: number,
  message: string,
  user: User,
  createdDateTime: string,
};

export type CreateUserMutationVariables = {
  email: string,
  firstName: string,
  lastName: string,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePictureUri?: string | null,
  } | null,
};

export type CreateGroupMutationVariables = {
  name: string,
  description?: string | null,
  userIds?: string | null,
};

export type CreateGroupMutation = {
  createGroup?:  {
    __typename: "Group",
    id: string,
    name: string,
    description?: string | null,
    users:  Array< {
      __typename: "User",
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      profilePictureUri?: string | null,
    } | null >,
    createdDateTime: string,
  } | null,
};

export type CreateMessageMutationVariables = {
  groupId: number,
  message: string,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id: string,
    groupId: number,
    message: string,
    user:  {
      __typename: "User",
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      profilePictureUri?: string | null,
    },
    createdDateTime: string,
  } | null,
};

export type GetUserInfoQuery = {
  getUserInfo?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePictureUri?: string | null,
  } | null,
};

export type ListGroupsQueryVariables = {
  userId?: number | null,
};

export type ListGroupsQuery = {
  listGroups?:  Array< {
    __typename: "Group",
    id: string,
    name: string,
    description?: string | null,
    users:  Array< {
      __typename: "User",
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      profilePictureUri?: string | null,
    } | null >,
    createdDateTime: string,
  } | null > | null,
};

export type ListMessagesQueryVariables = {
  groupId: number,
};

export type ListMessagesQuery = {
  listMessages?:  Array< {
    __typename: "Message",
    id: string,
    groupId: number,
    message: string,
    user:  {
      __typename: "User",
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      profilePictureUri?: string | null,
    },
    createdDateTime: string,
  } | null > | null,
};

export type ListUsersQueryVariables = {
  search?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  Array< {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePictureUri?: string | null,
  } | null > | null,
};

export type ListUsersInGroupQueryVariables = {
  groupId?: number | null,
};

export type ListUsersInGroupQuery = {
  listUsersInGroup?:  Array< {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePictureUri?: string | null,
  } | null > | null,
};

export type OnNewMessageSubscriptionVariables = {
  groupId: number,
};

export type OnNewMessageSubscription = {
  onNewMessage?:  {
    __typename: "Message",
    id: string,
    groupId: number,
    message: string,
    user:  {
      __typename: "User",
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      profilePictureUri?: string | null,
    },
    createdDateTime: string,
  } | null,
};
