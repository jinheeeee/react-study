import React, { useCallback, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

const initalTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

export default function App() {
  const [todoData, setTodoData] = useState(initalTodoData);
  // 첫 번째 인수 변수이름 // 두번 째 인수 State를 정하는 함수
  const [value, setValue] = useState("");

  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      // * setState : todoData를 다시 그려줌
      // this.setState({ todoData: newTodoData });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    },
    [setTodoData, todoData],
  );

  const hadleSubmit = (e) => {
    // * form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌.
    e.preventDefault();

    // * 새로운 할 일 데이터 추가
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // * 원래 할 일에 새로운 할 일 더해주기
    // this.setState({ todoData: [...todoData, newTodo], value: "" });
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));

    setValue("");
  };

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>

        <Lists
          handleClick={handleClick}
          todoData={todoData}
          setTodoData={setTodoData}
        />
        <Form handleSubmit={hadleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
