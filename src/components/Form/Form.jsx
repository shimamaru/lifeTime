import React from "react";

function Form({ birthDate, onBirthDateChange }) {
  return (
    <label>
      date of birth:
      <input
        type="date"
        value={birthDate.toISOString().substr(0, 10)}
        onChange={onBirthDateChange}
      />
    </label>
  );
}

export default Form;
