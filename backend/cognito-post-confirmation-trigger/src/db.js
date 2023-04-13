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
exports.dbInsertUser = exports.dbUpdateUserSub = void 0;
const connection_1 = require("./connection");
function dbUpdateUserSub(sub, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.getDBConnection)();
        const result = (yield connection.execute(`
        UPDATE User
        SET sub = ?
        WHERE email = ?
      `, [sub, email]))[0];
        if (result.affectedRows === 0) {
            throw new Error('Error updating User');
        }
        return "SUCCESS";
    });
}
exports.dbUpdateUserSub = dbUpdateUserSub;
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
        return result.insertId;
    });
}
exports.dbInsertUser = dbInsertUser;
