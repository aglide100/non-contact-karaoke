import { BaseController } from "./baseController";
import { Handler, Request, Response } from "express";
import { MemberProps } from "../../common/MemberProps";
import * as uuid from "uuid";
import { MemberDao } from "../DAO/memberDao";

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

  public login(): Handler {
    return (req: Request, res: Response) => {
      console.log("request member " + req.body.member_no + " login");
      const newUser: MemberProps = {
        member_no: req.body.member_no,
        name: "",
        password: req.body.password,
      };

      MemberDao.getInstance().selectMember(
        newUser,
        (result: MemberProps, error: Error) => {
          if (error != null || result == null) {
            console.log("Can't Login new member" + error + result);
            res.status(400).send("user not found");
          } else {
            const json = this.generateTokenJson(result);
            res.status(200).send(JSON.stringify(json));
          }
        }
      );
    };
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
