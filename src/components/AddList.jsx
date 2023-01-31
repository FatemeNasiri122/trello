import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addTodoCard } from "../store/slices/todoSlice";
const AddList = () => {
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(true);
  const [error, setShowError] = useState(false);
  const [input, setInput] = useState("");
  let [id, setId] = useState(3);
  const addTodo = () => {
    setId(() => (id += 1));
    if (input !== "") {
      dispatch(addTodoCard({ input, id }));
      setShowError(false);
    } else {
      setShowError(true);
    }
    setShowList(true);
    setInput("");
  };

  return (
    <div className="w-52 absolute">
      {showList ? (
        <div
          className="flex items-center bg-[#EBECF0] p-2 rounded-lg cursor-pointer"
          onClick={() => setShowList(!showList)}
        >
          <AiOutlinePlus />
          <p className="p-2"> Add another list</p>
        </div>
      ) : (
        <div className="flex flex-col bg-[#EBECF0] p-4 rounded-md">
          <h3 className="font-bold mb-2">Add list</h3>
          <input
            placeholder="Enter list title..."
            className="border-2 transition duration-500 placeholder-neutral-700 focus:placeholder-transparent border-neutral-400  p-2 bg-transparent rounded-sm focus:outline-none "
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="w-full bg-black text-white rounded-md uppercase p-2 bg-blue-700 mt-3"
            onClick={() => addTodo()}
          >
            add list
          </button>
        </div>
      )}
      {error && <p className="text-red-600">the field can not be empty</p>}
    </div>
  );
};

export default AddList;
