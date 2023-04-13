export interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  profilePictureUri: string | null
}

export interface Group {
  id: string,
  name: string,
  description: string | null,
  users: User[],
  createdDateTime: string
}

export interface Message {
  id: string,
  message: string,
  groupId: number,
  userId: number
}