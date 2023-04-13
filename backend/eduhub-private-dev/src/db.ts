import { OkPacket } from "mysql2";
import { getDBConnection } from "./connection";

export async function dbInsertUser(
  sub: string,
  email: string,
  firstName: string,
  lastName: string
) {
  const connection = await getDBConnection();

  const result = (
    await connection.execute(
      `
        INSERT INTO User (
          sub,
          email,
          firstName,
          lastName
        )
        VALUES (
          ?,
          ?,
          ?,
          ?
        )
      `,
      [sub, email, firstName, lastName]
    )
  )[0] as OkPacket;

  if (result.affectedRows === 0) {
    throw new Error("Error inserting User");
  }

  return result.insertId;
}

export async function dbSelectUser(sub: string) {
  const connection = await getDBConnection();

  const rows = (
    await connection.execute(
      `
        SELECT
        userId AS id,
        email,
        firstName,
        lastName
        FROM User
        WHERE sub = ?
      `,
      [sub]
    )
  )[0] as {
    id: number;
    emailAddress: string;
    firstName: string;
    lastName: string;
  }[];

  return rows.length ? rows[0] : null;
}

export async function dbSelectUsersInGroup(groupId: number) {
  const connection = await getDBConnection();

  const rows = (
    await connection.execute(
      `
      SELECT
      u.userId AS id,
      u.email,
      u.firstName,
      u.lastName
      FROM GroupUsers
      INNER JOIN User ON User.userId = GroupUsers.userId
      WHERE groupId = ?
    `,
      [groupId]
    )
  )[0] as {
    id: number;
    emailAddress: string;
    firstName: string;
    lastName: string;
  }[];

  return rows;
}

export async function dbInsertGroup(name: string, description: string) {
  const connection = await getDBConnection();

  const result = (
    await connection.execute(
      `
      INSERT INTO \`Group\` (
        groupName,
        description
      )
      VALUES (
        ?,
        ?
      )
    `,
      [name, description]
    )
  )[0] as OkPacket;

  if (result.affectedRows === 0) {
    throw new Error("Error inserting group");
  }

  return result.insertId;
}

export async function dbInsertGroupUser(groupId: number, userId: number) {
  const connection = await getDBConnection();

  const result = (
    await connection.execute(
      `
        INSERT INTO GroupUsers (
          groupId,
          userId
        )
        VALUES (
          ?,
          ?
        )
      `,
      [groupId, userId]
    )
  )[0] as OkPacket;

  if (result.affectedRows === 0) {
    throw new Error("Error inserting group user.");
  }

  return result.insertId;
}

export async function dbSelectGroups(userId: number) {
  const connection = await getDBConnection();

  const rows = (
    await connection.execute(
      `
        SELECT
        g.groupId AS id,
        g.groupName AS name,
        g.description,
        IF (
          gu.groupUserId IS NOT NULL,
          CAST(
            CONCAT(
              "[",
              GROUP_CONCAT(
                JSON_OBJECT(
                  "id", u.userId,
                  "email", u.email,
                  "firstName", u.firstName,
                  "lastName", u.lastName
                )
              ),
              "]"
            ) AS JSON
          ),
          JSON_ARRAY()
        ) AS users,
        g.createdDateTime
        FROM \`Group\` g
        LEFT JOIN GroupUsers gu ON gu.groupId = g.groupId
        LEFT JOIN User u ON u.userId = gu.userId
        ${userId ? `WHERE gu.userId = ?` : ""}
        GROUP BY g.groupId
      `,
      userId ? [userId] : []
    )
  )[0] as {
    id: number;
    name: string;
    description: string;
    users: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      profilePictureUri: string | null;
    }[];
    createdDateTime: string;
  }[];

  return rows;
}

export async function dbSelectGroup(groupId: number) {
  const connection = await getDBConnection();

  const rows = (
    await connection.execute(
      `
        SELECT
        g.groupId AS id,
        g.groupName AS name,
        g.description,
        IF (
          gu.groupUserId IS NOT NULL,
          CAST(
            CONCAT(
              "[",
              GROUP_CONCAT(
                JSON_OBJECT(
                  "id", u.userId,
                  "email", u.email,
                  "firstName", u.firstName,
                  "lastName", u.lastName
                )
              ),
              "]"
            ) AS JSON
          ),
          JSON_ARRAY()
        ) AS users,
        g.createdDateTime
        FROM \`Group\` g
        LEFT JOIN GroupUsers gu ON gu.groupId = g.groupId
        LEFT JOIN User u ON u.userId = gu.userId
        WHERE g.groupId = ?
        GROUP BY g.groupId
      `,
      [groupId]
    )
  )[0] as {
    id: number;
    name: string;
    description: string;
    users: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      profilePictureUri: string | null;
    }[];
    createdDateTime: string;
  }[];

  return rows.length > 0 ? rows[0] : null;
}

export async function dbInsertMessage(
  groupId: number,
  userId: number,
  message: string
) {
  const connection = await getDBConnection();

  const result = (
    await connection.execute(
      `
        INSERT INTO Chat (
          groupId,
          userId,
          message
        )
        VALUES (
          ?,
          ?,
          ?
        )
      `,
      [groupId, userId, message]
    )
  )[0] as OkPacket;

  if (result.affectedRows === 0) {
    throw new Error("Error inserting message.");
  }

  return result.insertId;
}

export async function dbSelectMessages(groupId: number) {
  const connection = await getDBConnection();

  const rows = (
    await connection.execute(
      `
        SELECT
        c.chatId AS id,
        c.groupId,
        c.message,
        JSON_OBJECT(
          'id', u.userId,
          'email', u.email,
          'firstName', u.firstName,
          'lastName', u.lastName
        ) AS user,
        c.createdDateTime
        FROM Chat c
        INNER JOIN User u ON u.userId = c.userId
        WHERE groupId = ?
        GROUP BY c.chatId
        ORDER BY c.createdDateTime ASC
      `,
      [groupId]
    )
  )[0] as {
    id: number;
    groupId: number;
    userId: number;
    message: string;
    createdDateTime: string;
  }[];

  return rows;
}

export async function dbSelectMessage(messageId: number) {
  const connection = await getDBConnection();

  const rows = (
    await connection.execute(
      `
        SELECT 
        c.chatId AS id,
        c.groupId,
        c.message,
        JSON_OBJECT(
          'id', u.userId,
          'email', u.email,
          'firstName', u.firstName,
          'lastName', u.lastName
        ) AS user,
        c.createdDateTime
        FROM Chat c
        INNER JOIN User u ON u.userId = c.userId
        WHERE chatId = ?
        GROUP BY c.chatId
      `,
      [messageId]
    )
  )[0] as {
    id: number;
    groupId: number;
    userId: number;
    message: string;
    createdDateTime: string;
  }[];

  return rows.length > 0 ? rows[0] : null;
}

export async function dbSelectUsers(search?: string) {
  const connection = await getDBConnection();

  let sql = `
    SELECT
    userId AS id,
    email,
    firstName,
    lastName
    FROM User
  `;

  let values = [];

  if (search) {
    sql += `
      WHERE firstName LIKE ?
      AND lastName LIKE ?
    `;
    values.push(`%${search}%`);
    values.push(`%${search}%`);
  }

  const rows = (await connection.execute(sql, values))[0] as {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  }[];

  return rows;
}
