import React, { useState } from "react";

export const List = React.memo(
  ({ id, title, completed, todoData, setTodoData, provided, snapshot }) => {
    // 수정한 값을 담을 state
    const [isEditing, setisEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    // const btnStyle = {
    //   color: "#fff",
    //   border: "none",
    //   padding: "5px 9px",
    //   borderRadius: "50%",
    //   cursor: "pointer",
    //   float: "right",
    // };

    // const getStyle = (completed) => {
    //   return {
    //     padding: "10px",
    //     borderBottom: "1px #ccc dotted",
    //     textDecoration: completed ? "line-through" : "none",
    //   };
    // };

    const handleClick = (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      // * setState : todoData를 다시 그려줌
      // this.setState({ todoData: newTodoData });
      setTodoData(newTodoData);
    };

    const handleCompleteChange = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      // this.setState({ todoData: setTodoData });
      setTodoData(newTodoData);
    };

    const handleEditChange = (e) => {
      setEditedTitle(e.target.value);
    };
    //save 버튼 클릭 이벤트
    const handleSubmit = (e) => {
      e.preventDefault();

      let newTodoData = todoData.map((data) => {
        // id값은 자동으로 주나보다..
        console.log("id", id, "data id", data.id);
        // * todoData안에 있는 id중에 내가 클릭한 id값과 같을 경우 title 바꿔주기.
        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });

      setTodoData(newTodoData);
      setisEditing(false);
    };

    if (isEditing) {
      return (
        <div className="flex items-center justify-between mt-4 px-4 py-1 text-gray-600 bg-gray-100 rounded">
          <div className="w-full flex items-center justify-between" key={id}>
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  value={editedTitle}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                />
              </form>
            </div>
            <div>
              <button
                className="text-stone-400 px-2 py-2 float-right"
                onClick={() => setisEditing(false)}
              >
                x
              </button>
              <button
                onClick={handleSubmit}
                className="text-stone-400 px-2 py-2 float-right"
                type="submit"
              >
                save
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            key={id}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            className="flex items-center justify-between mt-4 px-4 py-1 text-gray-600 bg-gray-100 rounded"
          >
            <div className="w-full flex items-center justify-between" key={id}>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={completed}
                  onChange={() => handleCompleteChange(id)}
                />
                <span className={completed ? "line-through" : ""}>{title}</span>
              </div>
              <div>
                <button
                  className="text-stone-400 px-2 py-2 float-right"
                  onClick={() => handleClick(id)}
                >
                  x
                </button>
                <button
                  className="text-stone-400 px-2 py-2 float-right"
                  onClick={() => setisEditing(true)}
                >
                  edit
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  },
);
