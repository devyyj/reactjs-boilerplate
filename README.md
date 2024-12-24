# 사용자 인증

## 로그인

1. 로그인 버튼을 누른다.
2. 인증을 정상적으로 마치고 로그인 페이지로 리다이렉트 된다.
3. 이때, 액세스 토큰은 쿼리 파라미터로 리프레시 토큰은 쿠키로 설정된다.
4. 로그인 페이지가 로드될 때 쿼리 파라미터에 액세스 토큰이 있으면 Redux 전역 변수로 저장하고 메인 페이지로 이동한다.

## 로그아웃

1. 로그아웃 버튼을 누른다.
2. 로그아웃 처리를 끝내고 로그인 페이지로 리다이렉트 된다.
3. 이때, 로그인 페이지의 쿼리 파라미터에 logout이 있으면 리프레시 토큰(쿠키) 삭제를 요청하는 API를 호출한다.
    1. 리프레시 토큰은 Http Only 설정이기 때문에 클라이언트가 삭제할 수 없다.

## 회원 가입

로그인 절차를 진행하면 자동으로 회원으로 가입된다.

## 회원 탈퇴

서비스 DB에서 회원 정보를 삭제하고 서비스와 OAuth 계정 간의 연결을 끊는다.

## 백엔드 API 호출

백엔드 API를 호출하기 전에 Redux에 저장된 액세스 토큰을 확인하여 토큰이 존재하면 헤더에 포함하여 호출한다.

액세스 토큰은 다음과 같은 형식으로 헤더에 포함한다.

```text
Authorization : Bearer <액세스 토큰>
```

## 토큰 만료

백엔드 API를 호출했으나 액세스 토큰이 만료되어 401 응답과 함께 'JWT expired' 메시지를 받았을 경우에는 토큰 재발급 API(/auth/reissue-token)를 호출하여 재발급 받는다.

(토큰 재발급 API는 쿠키에 저장된 리프레시 토큰을 참조한다.)

응답받은 액세스 코드를 Redux에 저장한 뒤에 기존에 호출하려고 했던 백엔드 API를 호출한다.

만약, 쿠키에 저장된 리프레시 토큰도 만료됐을 경우에는 쿠키 삭제 API(/auth/refresh-token)를 호출하여 토큰을 삭제하고 로그인 페이지로 이동한다.

## 새로고침

액세스 토큰은 메모리 변수로 관리되기 때문에 웹 페이지를 새로고침하면 초기화 된다.

새로고침을 해도 인증상태를 유지해야 하므로 애플리케이션이 시작될 때 액세스 토큰 재발급 API를 호출한다.

리프레시 토큰이 없는 경우는 아무런 처리를 하지 않으며, 만료된 경우에는 토큰을 삭제한다.