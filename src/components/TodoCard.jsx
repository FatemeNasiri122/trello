import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import AddItem from "./AddItem";
import { AiOutlinePlus } from "react-icons/ai";
import { addItem, editTitle, deleteList } from "../store/slices/todoSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const TodoCard = ({ title, id, dragId, items }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [inputTitle, setInputTitle] = useState(title);
  const [showOptions, setShowOptions] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showInputTitle, setShowInputTitle] = useState(false);
  const priority = 1;
  const addTodo = () => {
    dispatch(addItem({ input, title, priority }));
    setShowInput(false);
  };
  const editingTitle = () => {
    dispatch(editTitle({ id, inputTitle }));
    setShowInputTitle(false);
  };
  const deletingItem = () => {
    dispatch(deleteList({ id }));
    setShowInputTitle(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editingTitle();
  };
  const handleSubmitInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  return (
    <Draggable draggableId={`${dragId}`} index={id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="w-64 bg-[#EBECF0] p-2 rounded-lg relative "
        >
          <div
            {...provided.dragHandleProps}
            className="flex justify-between  mb-2sp"
          >
            {showInputTitle && (
              <>
                <form
                  className="flex-col"
                  action=""
                  onSubmit={(event) => handleSubmit(event)}
                >
                  <input
                    value={inputTitle}
                    className="border-2 transition duration-500 placeholder-neutral-700 focus:placeholder-transparent border-neutral-400  p-2 bg-transparent rounded-sm focus:outline-none z-10"
                    onChange={(e) => setInputTitle(e.target.value)}
                  />
                  <button
                    className="flex items-center w-full bg-[#1D4ED8] text-white rounded-md  p-2 bg-blue-700 mt-3"
                    onClick={() => editingTitle()}
                  >
                    edit title name
                  </button>
                </form>
              </>
            )}
            {!showInputTitle && <span className="font-semibold ">{title}</span>}
            <BsThreeDots
              className="cursor-pointer mt-1"
              onClick={() => setShowOptions(!showOptions)}
            />
            {showOptions && (
              <ul className="absolute rounded-md z-10 bg-slate-300 p-2 w-1/2 h-24 [&>*]:cursor-pointer top-[15%] inset-x-1/2 top-8">
                <li
                  onClick={() => {
                    setShowInputTitle(true);
                    setShowOptions(false);
                  }}
                >
                  edit title name
                </li>
                <li onClick={() => deletingItem()}>delete card</li>
              </ul>
            )}
          </div>
          <div>
            {state.todo.map((items, i) => {
              if (i === id)
                return (
                  <div key={i}>
                    <div>
                      <Droppable droppableId={`${items.id}`} type="item">
                        {(provided) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {items.items.map((item, i) => (
                                <Draggable
                                  draggableId={`${item.id}`}
                                  index={i}
                                  key={item.id}
                                >
                                  {(provided) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <AddItem
                                          item={item}
                                          key={i}
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    </div>
                  </div>
                );
            })}
          </div>
          <div className="flex flex-col">
            <form
              className="mt-4"
              action=""
              onSubmit={(event) => handleSubmitInput(event)}
            >
              {showInput && (
                <input
                  placeholder="Enter list title..."
                  className="w-full border-2 border-neutral-500 transition duration-500 placeholder-neutral-700 focus:placeholder-transparent  p-2 bg-transparent rounded-sm focus:outline-none z-10"
                  onChange={(e) => setInput(e.target.value)}
                />
              )}
              {!showInput ? (
                <button
                  className="w-full items-center flex bg-[#1D4ED8] text-white rounded-md  p-2 bg-blue-700 mt-3"
                  onClick={() => setShowInput(!showInput)}
                >
                  <AiOutlinePlus />
                  Add a card
                </button>
              ) : (
                <button
                  className="w-full flex items-center bg-[#1D4ED8] text-white rounded-md  p-2 bg-blue-700 mt-3"
                  onClick={() => addTodo()}
                >
                  <AiOutlinePlus />
                  Add card
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoCard;
