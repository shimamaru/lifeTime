import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const birthDate = new Date("1990-01-01"); // 例として1990年1月1日を生まれた日とします
  const lifeExpectancyInMilliseconds = 80 * 365.25 * 24 * 60 * 60 * 1000; // 80歳を予想寿命とした場合のミリ秒数を計算します

  const [remainingYears, setRemainingYears] = useState(0);
  const [remainingMonths, setRemainingMonths] = useState(0);
  const [remainingWeeks, setRemainingWeeks] = useState(0);
  const [remainingDays, setRemainingDays] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const updateRemainingTime = () => {
    const now = new Date(); // 現在の日付を取得します
    const diffInMilliseconds = now - birthDate; // 生まれた日からの経過ミリ秒数を計算します
    const remainingLifeInMilliseconds =
      lifeExpectancyInMilliseconds - diffInMilliseconds; // 残りのミリ秒数を計算します

    // 残りの時間を計算して各 state を更新します
    setRemainingYears(
      Math.floor(remainingLifeInMilliseconds / (365.25 * 24 * 60 * 60 * 1000))
    );
    setRemainingMonths(
      Math.floor(
        (remainingLifeInMilliseconds % (365.25 * 24 * 60 * 60 * 1000)) /
          (30.44 * 24 * 60 * 60 * 1000)
      )
    );
    setRemainingWeeks(
      Math.floor(
        (remainingLifeInMilliseconds % (365.25 * 24 * 60 * 60 * 1000)) /
          (7 * 24 * 60 * 60 * 1000)
      )
    );
    setRemainingDays(
      Math.floor(
        (remainingLifeInMilliseconds % (365.25 * 24 * 60 * 60 * 1000)) /
          (24 * 60 * 60 * 1000)
      )
    );
    setRemainingHours(
      Math.floor(
        (remainingLifeInMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      )
    );
    setRemainingMinutes(
      Math.floor((remainingLifeInMilliseconds % (60 * 60 * 1000)) / (60 * 1000))
    );
    setRemainingSeconds(
      Math.floor((remainingLifeInMilliseconds % (60 * 1000)) / 1000)
    );
  };

  // 残りの時間を更新する interval を設定します
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <div>
        <p>残りの時間:</p>
        <p>
          {remainingYears}年 {remainingMonths}ヶ月 {remainingWeeks}週間{" "}
          {remainingDays}日 {remainingHours}時間 {remainingMinutes}分{" "}
          {remainingSeconds}秒
        </p>
      </div>
    </div>
  );
}

export default App;
