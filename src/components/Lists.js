import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { List } from "./List";
//rafce로 ㄷㅏ시..
// props를 간단하게 가져오는 방법 {todoData}
export default function Lists({ todoData, setTodoData }) {
  console.log("Lists component");
  return (
    <div>
      <DragDropContext>
        <Droppable droppableId="todo">
          {(provided) => (
            // container area
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-slate-300"
            >
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
