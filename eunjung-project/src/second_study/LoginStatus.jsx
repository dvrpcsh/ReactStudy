import React, { useEffect, useState } from 'react';

const LoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 후 사용자 토큰 저장 함수
  const login = () => {
    localStorage.setItem('userToken', 'abcdef123456');
    setIsLoggedIn(true);
  };

 // 로그아웃
  const logOut = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  // 새로고침 후 사용자 토큰 확인 함수
  const checkLoginStatus = () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  // 컴포넌트가 마운트될 때 로그인 상태 확인
  useEffect(() => {
    console.log("useEffect");
    checkLoginStatus();
  }, []);

  return (
    <>
        <div>
            <h1>{isLoggedIn ? '사용자가 로그인된 상태입니다.' : '로그인되지 않았습니다.'}</h1>
        </div>
        <div>
        {!isLoggedIn &&
        <button onClick={login}>로그인</button>
        } 
        </div>
        <div>
        {isLoggedIn &&
        <button onClick={logOut}>로그아웃</button>
        }
        </div>
    </>
  );
};

export default LoginStatus;