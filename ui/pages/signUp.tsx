import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { InputField, ValidationResult } from "../components/InputField";
import { useRouter } from "next/router";
import { setCookie } from "../utils/cookie";
import * as axios from "axios";

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

  useEffect(() => {
    if (!isLoaded) {
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

    const data = JSON.stringify({
      member_no: userID,
      password: userPassword,
      name: userName,
    });
    const axiosObj = axios.default;

    axiosObj
      .post("https://api.non-contact-karaoke.xyz/member/join", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Successfully posted data! get data!" + response);
        alert("회원가입에 성공하였습니다.");
        router.push("/");
      })
      .catch((error) => {
        alert("데이터를 전송하지 못했습니다!" + error);
      });
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
