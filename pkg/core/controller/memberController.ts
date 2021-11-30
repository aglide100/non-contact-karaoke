import { BaseController } from "../controller/baseController";
import { Handler, Request, Response } from "express";
import { MemberProps } from "../../../ui/common/MemberProps";
import * as uuid from "uuid";
import { MemberDao } from "../DAO/memberDao";

export type loginResultProps = {
  userId: string;
  userToken: string;
  error: Error | undefined;
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

    let daoResult: loginResultProps;
    const newUser: MemberProps = {
      member_no: userId,
      name: "",
      password: userPassword,
    };

    MemberDao.getInstance()
      .selectMember(newUser, (result: MemberProps, error: Error) => {
        if (error != null || result == null) {
          console.log("Can't Login new member" + error + result);
          daoResult = {
            userId: userId,
            userToken: "",
            error: error,
          };
          return daoResult;
        } else {
          const json = this.generateTokenJson(result);
          daoResult = {
            userId: userId,
            userToken: JSON.stringify(json),
            error: undefined,
          };
        }
      })
      .then(() => {
        console.log("Call callback function in login");
        callback(daoResult);
      });

    // return daoResult;
  }

  public join(): Handler {
    return (req: Request, res: Response) => {
      console.log("request member " + req.body.name + " join");

      const id = uuid.v4();
      const newUser: MemberProps = {
        member_no: req.body.member_no,
        name: req.body.name,
        password: req.body.password,
      };

      MemberDao.getInstance().insertMember(
        newUser,
        (result: MemberProps, error: Error) => {
          if (error != null || result == null) {
            console.log("Can't Insert new member" + error + result);
            res.status(400).send("error :" + error.message);
          } else {
            const json = this.generateTokenJson(result);
            res.status(200).send(JSON.stringify(json));
          }
        }
      );
    };
  }
}
