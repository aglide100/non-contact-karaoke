"use strict";
// import * as connDB from "../../DAO/connDB";
// export type userProps = {
//   userID: string;
//   socket: WebSocket;
//   roomID: string;
// };
// export class User {
//   private static instance: User;
//   private static user: userProps;
//   private db;
//   constructor() {
//     this.db = new connDB.ConnDB();
//   }
//   public static getInstance(): User {
//     if (!User.instance) {
//       console.log("create user instance...");
//       User.instance = new User();
//     }
//     return User.instance;
//   }
//   public getUser(): userProps {
//     this.db.getTable();
//     return User.user;
//   }
//   public setUser(userID: string) {
//     User.user.userID = userID;
//   }
//   public setUserInRoomID(roomID: string) {
//     User.user.roomID = roomID;
//   }
// }
