import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { InputField, ValidationResult } from "../components/InputField";
import { useRouter } from "next/router";
import { setCookie } from "../utils/cookie";
import { WsManager } from "../utils/ws_manager";
let client: WsManager;

function SignInpage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userID, setUserID] = useState("");
  const [userIDErrorMsg, setUserIDErrorMsg] = useState("");
  const [userIDInvalid, setUserIDInvalid] =
    useState<ValidationResult["isInvalid"]>("none");

  const [userPassword, setUserPassword] = useState("");
  const [userPasswordErrorMsg, setUserPasswordErrorMsg] = useState("");
  const [userPasswordInvalid, setUserPasswordInvalid] =
    useState<ValidationResult["isInvalid"]>("none");

  const router = useRouter();

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

  async function getWsManager() {
    var clientTemp = await WsManager.getInstance();
    return clientTemp;
  }

  useEffect(() => {
    if (!isLoaded) {
      getWsManager()
        .then(function (clientTemp) {
          setIsLoaded(true);
          clientTemp.on("res-login-user", () => {
            setCookie("userId", clientTemp.getUserID());
            setCookie("userName", clientTemp.getUserName());
            setCookie("userToken", clientTemp.getUserToken());
            alert("로그인 되었습니다!");
            document.location.href = "/";
          });
          clientTemp.on("res-login-error", () => {
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

    client.login(userID, userPassword);
  };

  return (
    <div className="w-full flex flex-row justify-center">
      <div>
        <div className="text-4xl">Login</div>
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
          SignIn
        </Button>
        <Button
          size="medium"
          type="button"
          color="white"
          onClick={(e) => {
            e.preventDefault();
            router.push("/signUp");
          }}
        >
          SignUp
        </Button>
      </div>
    </div>
  );
}

export default SignInpage;
