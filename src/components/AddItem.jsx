import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { editItem, changePriority } from "../store/slices/todoSlice";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
const AddItem = ({ item }) => {
  const dispatch = useDispatch();
  const [showSelect, setShowSelect] = useState(false);
  const [input, setInput] = useState("");
  const editingItem = (item) => {
    dispatch(editItem({ item, input }));
  };
  const choosePriority = (num) => {
    dispatch(changePriority({ item, num }));
    setShowSelect(false);
  };
  return (
    <div
      className={`${
        (item.priority === 1 && "bg-red-400") ||
        (item.priority === 2 && "bg-fuchsia-50") ||
        (item.priority === 3 && "bg-blue-400")
      } px-4 py-2 flex justify-between my-2`}
    >
      <div>
        {!item.showInput && <span>{item.name}</span>}
        {showSelect && (
          <AnimatePresence>
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ul className="flex flex-col cursor-pointer mt-2">
                <li className="text-red-900" onClick={() => choosePriority(1)}>
                  High
                </li>
                <li className="my-2" onClick={() => choosePriority(2)}>
                  Normal
                </li>
                <li className="text-blue-800" onClick={() => choosePriority(3)}>
                  Low
                </li>
              </ul>{" "}
            </motion.div>{" "}
          </AnimatePresence>
        )}
      </div>
      <div className="cursor-pointer" onClick={() => setShowSelect(true)}>
        <CiEdit />
      </div>
    </div>
  );
};

export default AddItem;
