import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light'); // 초기 테마를 'light'로 설정

  // 테마를 localStorage에 저장
  const saveTheme = (theme) => {
    localStorage.setItem('theme', theme);
  };

  // 저장된 테마를 로드
  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme; // body에 테마 클래스 적용
    }
  };

  // 페이지가 로드될 때 저장된 테마 불러오기
  useEffect(() => {
    loadTheme();
  }, []);

  // 테마 변경 시
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    saveTheme(newTheme);
    document.body.className = newTheme;
  };

  return (
    <div>
      <button id="themeButton" onClick={toggleTheme}> 
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
      </button>
    </div>
  );
};

export default ThemeToggle;