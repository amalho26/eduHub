"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbSelectUsers = exports.dbSelectMessage = exports.dbSelectMessages = exports.dbInsertMessage = exports.dbSelectGroup = exports.dbSelectGroups = exports.dbInsertGroupUser = exports.dbInsertGroup = exports.dbSelectUsersInGroup = exports.dbSelectUser = exports.dbInsertUser = void 0;
const connection_1 = require("./connection");
function dbInsertUser(sub, email, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.getDBConnection)();
        const result = (yield connection.execute(`
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
      `, [sub, email, firstName, lastName]))[0];
        if (result.affectedRows === 0) {
            throw new Error("Error inserting User");
        }
        return result.insertId;
    });
}
exports.dbInsertUser = dbInsertUser;
function dbSelectUser(sub) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.getDBConnection)();
        const rows = (yield connection.execute(`
        SELECT
        userId AS id,
        email,
        firstName,
        lastName
        FROM User
        WHERE sub = ?
      `, [sub]))[0];
        return rows.length ? rows[0] : null;
    });
}
exports.dbSelectUser = dbSelectUser;
function dbSelectUsersInGroup(groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.getDBConnection)();
        const rows = (yield connection.execute(`
      SELECT
      u.userId AS id,
      u.email,
      u.firstName,
      u.lastName
      FROM GroupUsers
      INNER JOIN User ON User.userId = GroupUsers.userId
      WHERE groupId = ?
    `, [groupId]))[0];
        return rows;
    });
}
exports.dbSelectUsersInGroup = dbSelectUsersInGroup;
function dbInsertGroup(name, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.getDBConnection)();
        const result = (yield connection.execute(`
      INSERT INTO \`Group\` (
        groupName,
        description
      )
      VALUES (
        ?,
        ?
      )
    `, [name, description]))[0];
        if (result.affectedRows === 0) {
            throw new Error("Error inserting group");
        }
        return result.insertId;
    });
}
exports.dbInsertGroup = dbInsertGroup;
function dbInsertGroupUser(groupId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.getDBConnection)();
        const result = (yield connection.execute(`
        INSERT INTO GroupUsers (
          groupId,
          userId
        )
        VALUES (
          ?,
          ?
        )
      `, [groupId, userId]))[0];
        if (result.affectedRows === 0) {
            throw new Error("Error inserting group user.");
        }
        return result.insertId;
    });
}
exports.dbInsertGroupUser = dbInsertGroupUser;
function dbSelectGroups(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.getDBConnection)();
        const rows = (yield connection.execute(`
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
      `, userId ? [userId] : []))[0];
        return rows;
    });
}
exports.dbSelectGroups = dbSelectGroups;
function dbSelectGroup(groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.getDBConnection)();
        const rows = (yield connection.execute(`
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
      `, [groupId]))[0];
        return rows.length > 0 ? rows[0] : null;
    });
}
exports.dbSelectGroup = dbSelectGroup;
function dbInsertMessage(groupId, userId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.getDBConnection)();
        const result = (yield connection.execute(`
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
      `, [groupId, userId, message]))[0];
        if (result.affectedRows === 0) {
            throw new Error("Error inserting message.");
        }
        return result.insertId;
    });
}
exports.dbInsertMessage = dbInsertMessage;
function dbSelectMessages(groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.getDBConnection)();
        const rows = (yield connection.execute(`
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
      `, [groupId]))[0];
        return rows;
    });
}
exports.dbSelectMessages = dbSelectMessages;
function dbSelectMessage(messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.getDBConnection)();
        const rows = (yield connection.execute(`
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
      `, [messageId]))[0];
        return rows.length > 0 ? rows[0] : null;
    });
}
exports.dbSelectMessage = dbSelectMessage;
function dbSelectUsers(search) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.getDBConnection)();
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
        const rows = (yield connection.execute(sql, values))[0];
        return rows;
    });
}
exports.dbSelectUsers = dbSelectUsers;
