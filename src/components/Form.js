import React from "react";

export default function Form({ value, setValue, handleSubmit }) {
  // * input에 입력한 내용 이벤트
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form className="mt-3" style={{ display: "flex" }} onSubmit={handleSubmit}>
      <input
        type="text"
        name="value"
        className="w-full px-3 py-2 mr-4 text-gray-500 border rounded"
        placeholder="해야 할 일"
        value={value}
        onChange={handleChange}
      />
      <input
        type="submit"
        value="입력"
        className="w-full px-2 shadow bg-gray-600 rounded text-white"
        style={{ flex: 1 }}
      />
    </form>
  );
}
