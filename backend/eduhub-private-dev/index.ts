import { dbInsertGroup, dbInsertGroupUser, dbInsertMessage, dbInsertUser, dbSelectGroup, dbSelectGroups, dbSelectMessage, dbSelectMessages, dbSelectUser, dbSelectUsers, dbSelectUsersInGroup } from "./src/db";

export async function handler(event: any, context: any) {
  console.log(event);

  const fieldName = event.info.fieldName;
  const args = event.arguments;
  const sub = event.identity.sub;

  if (fieldName === "createUser") {
    const email = args.email;
    const firstName = args.firstName;
    const lastName = args.lastName;

    const createdUserId = await dbInsertUser(sub, email, firstName, lastName);

    return {
      id: createdUserId,
      email,
      firstName,
      lastName
    }
  } else if (fieldName === "getUserInfo") {
    return await dbSelectUser(sub);
  } else if (fieldName === "createGroup") {
    const name = args.name as string;
    const description = args.description as string;
    const userIds = args.userIds as string;
    
    let userIdsSplit;

    if (userIds) {
      if (userIds.includes(',')) {
        userIdsSplit = userIds.split(',').map((userId: string) => parseInt(userId));
      } else {
        userIdsSplit = [parseInt(userIds)];
      }
    }

    const user = await dbSelectUser(sub);
    const createdGroupId = await dbInsertGroup(name, description || null);

    await dbInsertGroupUser(createdGroupId, user.id);

    for (let userId of userIdsSplit) {
      await dbInsertGroupUser(createdGroupId, userId)
    }

    const group = await dbSelectGroup(createdGroupId);
    return group
  } else if (fieldName === "listGroups") {
    const userId = args.userId;

    return await dbSelectGroups(userId);
  } else if (fieldName === "createMessage") {
    const groupId = args.groupId;
    const message = args.message;

    const user = await dbSelectUser(sub);
    const createdMessageId = await dbInsertMessage(groupId, user.id, message);

    return await dbSelectMessage(createdMessageId);
  } else if (fieldName === "listMessages") {
    const groupId = args.groupId;
    console.log(groupId);

    return await dbSelectMessages(groupId);
  } else if (fieldName === "listUsers") {
    const search = args.search;

    return await dbSelectUsers(search);
  } else if (fieldName === "listUsersInGroup") {
    const groupId = args.groupId;

    return await dbSelectUsersInGroup(groupId);
  }

  return event
}