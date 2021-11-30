import { BaseController } from "../controller/baseController";
import { Handler, Request, Response } from "express";
import { MemberProps } from "../../../ui/common/MemberProps";
import * as uuid from "uuid";
import { MemberDao } from "../DAO/memberDao";

export type loginResultProps = {
  userId: string;
  userName: string;
  userToken: string;
};

export class MemberController extends BaseController {
  constructor() {
    super();
  }

  public list(): Handler {
    return (req: Request, res: Response) => {
      console.log("returns Member list");

      MemberDao.getInstance().selectAllMember(function (result: any) {
        res.send(JSON.stringify(result));
      });
    };
  }

  public async login(userId: string, userPassword: string, callback: Function) {
    console.log("request member " + userId + " login");

    const newUser: MemberProps = {
      member_no: userId,
      name: "",
      password: userPassword,
    };

    MemberDao.getInstance().selectMember(
      newUser,
      (result: MemberProps, error: Error) => {
        const json = this.generateTokenJson(newUser);
        let data = {
          userId: userId,
          userName: result.name,
          userToken: json,
        };

        callback(data, error);
      }
    );
  }

  public join(
    userId: string,
    userPassword: string,
    userName: string,
    callback: Function
  ) {
    console.log("request member " + userId + " join");

    const id = uuid.v4();
    const newUser: MemberProps = {
      member_no: userId,
      name: userName,
      password: userPassword,
    };

    MemberDao.getInstance().insertMember(
      newUser,
      (result: MemberProps, error: Error) => {
        if (error != null || result == null) {
          console.log("Can't Insert new member" + error + result);
          callback(null, error);
        } else {
          console.log("!!!!!!!!!!!!!!!", newUser);
          const json = this.generateTokenJson(newUser);
          let data = {
            userId: userId,
            userName: userName,
            userToken: json,
          };
          callback(data, null);
        }
      }
    );
  }
}
