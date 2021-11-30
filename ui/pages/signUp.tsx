import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { InputField, ValidationResult } from "../components/InputField";
import { useRouter } from "next/router";
import * as ws_manager from "../utils/ws_manager";
import { setCookie } from "../utils/cookie";

let client: ws_manager.WsManager;

function SignUpPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userID, setUserID] = useState("");
  const [userIDErrorMsg, setUserIDErrorMsg] = useState("");
  const [userIDInvalid, setUserIDInvalid] =
    useState<ValidationResult["isInvalid"]>("none");

  const [userPassword, setUserPassword] = useState("");
  const [userPasswordErrorMsg, setUserPasswordErrorMsg] = useState("");
  const [userPasswordInvalid, setUserPasswordInvalid] =
    useState<ValidationResult["isInvalid"]>("none");

  const [userName, setUserName] = useState<string>("");
  const [userNameErrorMsg, setUserNameErrorMsg] = useState("");
  const [userNameInvalid, setUserNameInvalid] =
    useState<ValidationResult["isInvalid"]>("none");

  const router = useRouter();

  const onUserNameHandle = (UserName) => {
    if (UserName == undefined || UserName == null) {
      return {
        isInvalid: true,
        errorMessage: "이름을 입력해주십시오.",
      };
    }

    if (UserName.length > 15) {
      return {
        isInvalid: true,
        errorMessage: "너무 깁니다.",
      };
    }

    return { isInvalid: false };
  };

  const onUserIDHandle = (userID) => {
    if (userID.length < 3) {
      return {
        isInvalid: true,
        errorMessage: "너무 짧습니다.",
      };
    }

    if (userID.length > 64) {
      return {
        isInvalid: true,
        errorMessage: "너무 깁니다.",
      };
    }

    return { isInvalid: false };
  };

  const onUserPasswordHandle = (userPassword) => {
    if (userPassword.length < 3) {
      return {
        isInvalid: true,
        errorMessage: "너무 짧습니다.",
      };
    }

    if (userPassword.length > 64) {
      return {
        isInvalid: true,
        errorMessage: "너무 깁니다.",
      };
    }

    return { isInvalid: false };
  };

  async function connSocket() {
    var clientTemp = await ws_manager.WsManager.getInstance();
    return clientTemp;
  }

  useEffect(() => {
    if (!isLoaded) {
      connSocket()
        .then(function (clientTemp) {
          setIsLoaded(true);
          clientTemp.on("res-join-user", () => {
            setCookie("userId", clientTemp.getUserID());
            setCookie("userName", clientTemp.getUserName());
            setCookie("userToken", clientTemp.getUserToken());
            alert("회원가입 되었습니다!");
            document.location.href = "/";
          });
          clientTemp.on("res-join-error", () => {
            alert("It looks like error?");
          });
          return (client = clientTemp);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  const isItValidForm = (): Boolean => {
    if (userPasswordInvalid) {
      return false;
    }

    if (userIDInvalid) {
      return false;
    }

    return true;
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    client.join(userID, userPassword, userName);
  };

  return (
    <div className="w-full flex flex-row justify-center">
      <div>
        <div className="text-4xl">SignUp</div>
        <div className="flex flex-col justify-around">
          <div className="mt-3">
            <InputField
              type="text"
              name="id"
              placeholder="ID"
              label="ID"
              isAutocomplete={false}
              validationErrorMsg={userIDErrorMsg}
              isInvalid={userIDInvalid}
              onChange={(UserID) => {
                const { isInvalid, errorMessage } = onUserIDHandle(UserID);
                setUserID(UserID);
                setUserIDErrorMsg(errorMessage);
                setUserIDInvalid(isInvalid);
              }}
            ></InputField>
          </div>
          <div className="mt-3">
            <InputField
              type="text"
              name="text"
              placeholder="이름"
              label="이름"
              isAutocomplete={false}
              validationErrorMsg={userNameErrorMsg}
              isInvalid={false}
              onChange={(userName) => {
                const { isInvalid, errorMessage } = onUserNameHandle(userName);
                setUserName(userName);
                setUserNameErrorMsg(errorMessage);
                setUserNameInvalid(isInvalid);
              }}
            ></InputField>
          </div>
          <div className="mt-3">
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              label="Password"
              isAutocomplete={false}
              validationErrorMsg={userPasswordErrorMsg}
              isInvalid={userPasswordInvalid}
              onChange={(UserPassword) => {
                const { isInvalid, errorMessage } =
                  onUserPasswordHandle(UserPassword);
                setUserPassword(UserPassword);
                setUserPasswordErrorMsg(errorMessage);
                setUserPasswordInvalid(isInvalid);
              }}
            ></InputField>
          </div>
        </div>
        <Button
          size="medium"
          type="button"
          color="white"
          isDisabled={!isItValidForm()}
          onClick={(e) => {
            onSubmitHandler(e);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default SignUpPage;
