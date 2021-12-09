# Non-contact-karaoke


## 1. Purpose

본 프로젝트는 webrtc를 이용하여 간단히 비디오, 오디오 및 간단한 파일을 스트림해보는 간단한 예제입니다.

## 2. How to run

```
docker-compose build && docker-compose up -d
```

or

```
    cd cmd/db/
    docker-compose build && docker-compose up -d
    cd ../..
    ./ run-dev.sh
```

## 3. Dependancy
본 프로젝트는 `NodeJs`기반으로 구동되며, 구조가 `apid`, `socketd`, `webd`으로 나누어지며,

- `apid`는 http 메소드를 이용하여 간단히 로그인 및 회원가입처리를 합니다.
- `socketd`은 socket통신을 이용하여 간단히 rtcpeer통신을 위한 프로세스를 담고 있습니다.
- `webd`은 `ui`디렉터리에 있는 react를 static으로 변환 후 서브하는 처리를 합니다.