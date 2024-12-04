import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../features/TasksSlice.jsx";
import { TextField, Button } from "@mui/material";
import "./Task.css"; // Link to the CSS file

const Task = ({ task, onClose }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (task) {
      dispatch(editTask({ id: task.id, title, description, dueDate }));
    } else {
      dispatch(
        addTask({
          id: Date.now(),
          title,
          description,
          dueDate,
          completed: false,
        })
      );
    }
    onClose();
  };

  return (
    <div className="task-container">
      <div className="task-form">
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          className="task-input"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          className="task-input"
        />
        <TextField
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          className="task-input"
        />
        <Button
          onClick={handleSubmit}
          className="task-submit-button"
          variant="contained"
          color="primary"
        >
          {task ? "Edit Task" : "Add Task"}
        </Button>
      </div>
    </div>
  );
};

export default Task;
