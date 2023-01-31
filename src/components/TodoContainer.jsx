import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import AddList from "./AddList";
import { useSelector, useDispatch } from "react-redux";
import { handleDrag, moveItem } from "../store/slices/todoSlice";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
const TodoContainer = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleDragEnd = (e) => {
    const { draggableId, destination, source, type } = e;
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    let temp = {};
    let tempList = {};
    state.todo.forEach((s) => {
      s.items.forEach((item, i) => {
        if (item.id === +draggableId) temp = item;
      });
    });
    if (destination.droppableId !== source.droppableId) {
      dispatch(handleDrag({ draggableId, destination, source, temp }));
    }

    if (type === "list") {
      state.todo.forEach((s) => {
        if (s.id === +source.index + 1) tempList = s;
      });
      dispatch(moveItem({ source, destination, tempList }));
    }
  };

  return (
    <div className="flex p-8">
      <DragDropContext onDragEnd={(e) => handleDragEnd(e)}>
        <Droppable droppableId="app" type="list" direction="horizontal">
          {(provided) => (
            <div
              className="flex flex-nowrap gap-1"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {state.todo.map((todo, i) => (
                <div className="mx-3" key={todo.id}>
                  <TodoCard
                    items={todo.items}
                    title={todo.title}
                    dragId={todo.id}
                    id={i}
                  />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="relative">
        <AddList />
      </div>
    </div>
  );
};

export default TodoContainer;
