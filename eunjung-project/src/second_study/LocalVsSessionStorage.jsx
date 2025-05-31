/** 
[ Scope of `localStorage VS. sessionStorage` ]

  1. Lifetime
  - localStorage: Data persists across browser sessions. It remains available after the browser is closed and reopened.
  - sessionStorage: Data is only available for the duration of the page session. It is deleted when the browser tab is closed.

  2. Scope
  - localStorage: Data is shared across all tabs and windows of the same origin.(same protocol, domain, and port) It is accessible from any tab/window on the website.
  - sessionStorage: Data is specific to the tab/window. Each tab or window has its own separate sessionStorage. Data cannot be shared across different tabs, even if they are on the same domain.
*/


import React, { useState, useEffect } from 'react';

function LocalVsSessionStorage() {
  const [localName, setLocalName] = useState('');
  const [sessionMessage, setSessionMessage] = useState('');

  // 저장된 값 불러오기 (마운트 시)
  useEffect(() => {
    const savedName = localStorage.getItem('name');
    if (savedName) {
      setLocalName(savedName);
    }

    const savedMessage = sessionStorage.getItem('message');
    if (savedMessage) {
      setSessionMessage(savedMessage);
    }
  }, []);

  // localStorage 값 변경
  const handleLocalChange = (e) => {
    const value = e.target.value;
    setLocalName(value);
    localStorage.setItem('name', value);
  };

  // sessionStorage 값 변경
  const handleSessionChange = (e) => {
    const value = e.target.value;
    setSessionMessage(value);
    sessionStorage.setItem('message', value);
  };

  // localStorage 초기화
  const clearLocalStorage = () => {
    localStorage.removeItem('name');
    setLocalName('');
  };

  // sessionStorage 초기화
  const clearSessionStorage = () => {
    sessionStorage.removeItem('message');
    setSessionMessage('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📦 localStorage vs sessionStorage 예제</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>🗂 localStorage</h3>
        <input
          type="text"
          value={localName}
          onChange={handleLocalChange}
          placeholder="이름 입력"
        />
        <p>저장된 이름 (브라우저 꺼도 유지됨): {localName || '없음'}</p>
        <button onClick={clearLocalStorage}>localStorage 값 초기화</button>
      </div>

      <div>
        <h3>🧾 sessionStorage</h3>
        <input
          type="text"
          value={sessionMessage}
          onChange={handleSessionChange}
          placeholder="메시지 입력"
        />
        <p>저장된 메시지 (탭 닫으면 사라짐): {sessionMessage || '없음'}</p>
        <button onClick={clearSessionStorage}>sessionStorage 값 초기화</button>
      </div>
    </div>
  );
}

export default LocalVsSessionStorage;
