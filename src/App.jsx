import React, { useState, useEffect } from "react";
import Form from "./components/Form/Form";

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

  // 生年月日を表示するフォーム
  return (
    <div>
      <Form birthDate={birthDate} onBirthDateChange={handleBirthDateChange} />
      <div>{remainingSeconds}</div>
    </div>
  );
}

export default App;
