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
exports.handler = void 0;
const db_1 = require("./src/db");
function handler(event, context) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(event);
        const fieldName = event.info.fieldName;
        const args = event.arguments;
        const sub = event.identity.sub;
        if (fieldName === "createUser") {
            const email = args.email;
            const firstName = args.firstName;
            const lastName = args.lastName;
            const createdUserId = yield (0, db_1.dbInsertUser)(sub, email, firstName, lastName);
            return {
                id: createdUserId,
                email,
                firstName,
                lastName
            };
        }
        else if (fieldName === "getUserInfo") {
            return yield (0, db_1.dbSelectUser)(sub);
        }
        else if (fieldName === "createGroup") {
            const name = args.name;
            const description = args.description;
            const userIds = args.userIds;
            let userIdsSplit;
            if (userIds) {
                if (userIds.includes(',')) {
                    userIdsSplit = userIds.split(',').map((userId) => parseInt(userId));
                }
                else {
                    userIdsSplit = [parseInt(userIds)];
                }
            }
            const user = yield (0, db_1.dbSelectUser)(sub);
            const createdGroupId = yield (0, db_1.dbInsertGroup)(name, description || null);
            yield (0, db_1.dbInsertGroupUser)(createdGroupId, user.id);
            for (let userId of userIdsSplit) {
                yield (0, db_1.dbInsertGroupUser)(createdGroupId, userId);
            }
            const group = yield (0, db_1.dbSelectGroup)(createdGroupId);
            return group;
        }
        else if (fieldName === "listGroups") {
            const userId = args.userId;
            return yield (0, db_1.dbSelectGroups)(userId);
        }
        else if (fieldName === "createMessage") {
            const groupId = args.groupId;
            const message = args.message;
            const user = yield (0, db_1.dbSelectUser)(sub);
            const createdMessageId = yield (0, db_1.dbInsertMessage)(groupId, user.id, message);
            return yield (0, db_1.dbSelectMessage)(createdMessageId);
        }
        else if (fieldName === "listMessages") {
            const groupId = args.groupId;
            console.log(groupId);
            return yield (0, db_1.dbSelectMessages)(groupId);
        }
        else if (fieldName === "listUsers") {
            const search = args.search;
            return yield (0, db_1.dbSelectUsers)(search);
        }
        else if (fieldName === "listUsersInGroup") {
            const groupId = args.groupId;
            return yield (0, db_1.dbSelectUsersInGroup)(groupId);
        }
        return event;
    });
}
exports.handler = handler;
