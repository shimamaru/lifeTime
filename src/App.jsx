import React, { useState, useEffect } from "react";
import Form from "./components/Form/Form";
import "./App.css";
function App() {
  // state として、現在の残りの秒数を管理します。
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  // state として、生年月日を管理します。
  const [birthDate, setBirthDate] = useState(new Date("1990-01-01"));

  const lifeExpectancyInMilliseconds = 80 * 365.25 * 24 * 60 * 60 * 1000;

  // 残りの秒数を更新する関数
  const updateRemainingSeconds = () => {
    const now = new Date();
    const diffInMilliseconds = now - birthDate;
    const remainingLifeInMilliseconds =
      lifeExpectancyInMilliseconds - diffInMilliseconds;
    const remainingLifeInSeconds = Math.floor(
      remainingLifeInMilliseconds / 1000
    );
    setRemainingSeconds(remainingLifeInSeconds);
  };

  // コンポーネントがマウントされた時に 1 秒ごとに残りの時間を更新するように設定します。
  useEffect(() => {
    updateRemainingSeconds();
    const intervalId = setInterval(updateRemainingSeconds, 1000);
    return () => clearInterval(intervalId);
  }, [birthDate]);

  // 生年月日を変更する関数
  const handleBirthDateChange = (event) => {
    setBirthDate(new Date(event.target.value));
  };

  // 秒数を年・月・週・日・時・分・秒に変換する関数
  const secondsToYMDHMS = (seconds) => {
    const year = Math.floor(seconds / 31536000);
    const month = Math.floor((seconds % 31536000) / 2592000);
    const week = Math.floor(((seconds % 31536000) % 2592000) / 604800);
    const day = Math.floor((((seconds % 31536000) % 2592000) % 604800) / 86400);
    const hour = Math.floor(
      ((((seconds % 31536000) % 2592000) % 604800) % 86400) / 3600
    );
    const minute = Math.floor(
      (((((seconds % 31536000) % 2592000) % 604800) % 86400) % 3600) / 60
    );
    const second =
      (((((seconds % 31536000) % 2592000) % 604800) % 86400) % 3600) % 60;
    return { year, month, week, day, hour, minute, second };
  };

  const { year, month, week, day, hour, minute, second } =
    secondsToYMDHMS(remainingSeconds);

  // 生年月日を表示するフォーム
  return (
    <div>
      <Form birthDate={birthDate} onBirthDateChange={handleBirthDateChange} />
      <div className="time-wrapper">
        <h1 className="second">{second} seconds</h1>
        <h2 className="minute">{minute} minutes</h2>
        <h3 className="hour">{hour} hours</h3>
        <h4 className="day">{day} days</h4>
        <h5 className="week">{week} weeks</h5>
        <h6 className="month">{month} months</h6>
        <h7 className="year">{year} years</h7>
      </div>
    </div>
  );
}

export default App;
