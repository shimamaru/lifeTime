import React, { useState, useEffect } from "react";
import Form from "./components/Form/Form";
import Modal from "./components/Modal/Modal";
import { useRef } from "react";
import "./App.css";

function App() {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [birthDate, setBirthDate] = useState(new Date("1990-01-01"));
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // ページの読み込み完了時に実行される関数
  const onLoad = () => {
    setShowModal(true);
  };

  const updateRemainingSeconds = () => {
    const lifeExpectancyInMilliseconds = 80 * 365.25 * 24 * 60 * 60 * 1000;

    const now = new Date();
    const diffInMilliseconds = now - birthDate;
    const remainingLifeInMilliseconds =
      lifeExpectancyInMilliseconds - diffInMilliseconds;
    const remainingLifeInSeconds = Math.floor(
      remainingLifeInMilliseconds / 1000
    );
    setRemainingSeconds(remainingLifeInSeconds);
  };

  useEffect(() => {
    updateRemainingSeconds();
    const intervalId = setInterval(updateRemainingSeconds, 1000);
    return () => clearInterval(intervalId);
  }, [birthDate]);

  const handleBirthDateChange = (e) => {
    setBirthDate(new Date(e.target.value));
  };

  const secondsToYMDHMS = (seconds) => {
    const year = Math.floor(seconds / 31536000);
    const month = Math.floor((seconds % 31536000) / 2592000);
    const week = Math.floor((seconds % 604800) / 604800);
    const day = Math.floor((seconds % 86400) / 86400);
    const hour = Math.floor((seconds % 3600) / 3600);
    const minute = Math.floor((seconds % 60) / 60);
    const second = Math.floor(seconds % 60);
    return { year, month, week, day, hour, minute, second };
  };

  const { year, month, week, day, hour, minute, second } =
    secondsToYMDHMS(remainingSeconds);

  const loadListenerRef = useRef(null);

  useEffect(() => {
    loadListenerRef.current = onLoad;
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", loadListenerRef.current);
  }, []);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      <Modal show={showModal} onClose={handleCloseModal}>
        <Form birthDate={birthDate} onBirthDateChange={handleBirthDateChange} />
      </Modal>
      <div className="time-wrapper">
        <h1 className="second">{second} seconds</h1>
        <h2 className="minute">{minute} minutes</h2>
        <h3 className="hour">{hour} hours</h3>
        <h4 className="day">{day} days</h4>
        <h5 className="week">{week} weeks</h5>
        <h6 className="month">{month} months</h6>
        <p className="year">{year} years</p>
      </div>
    </div>
  );
}

export default App;
