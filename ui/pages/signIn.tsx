import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { InputField, ValidationResult } from "../components/InputField";
import { useRouter } from "next/router";
import { setCookie } from "../utils/cookie";
import * as axios from "axios";

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
    });
    const axiosObj = axios.default;

    axiosObj
      .post("https://api.non-contact-karaoke.xyz/api/member/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Successfully posted data! get data!" + response);
        setCookie("accessToken", response.data.accessToken);
        setCookie("user_name", response.data.user);
        setCookie("user_id", userID);

        document.location.href = "/";
      })
      .catch((error) => {
        alert("데이터를 전송하지 못했습니다!" + error);
      });
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
