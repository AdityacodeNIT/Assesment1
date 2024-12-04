import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  toggleComplete,
  editTask,
} from "../features/TasksSlice.jsx";
import "./Dashboard.css"; // Reuse styles

const TaskList = ({ filter }) => {
  const tasks = useSelector((state) => state.tasks.tasks); // Access tasks array properly
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // Ensure tasks is an array before applying .filter()
  if (!Array.isArray(tasks)) {
    return <p>Error: Tasks data is not an array.</p>;
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    if (filter === "overdue") return new Date(task.dueDate) < new Date();
    return true;
  });

  // Handle task edit action
  const handleEdit = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setUpdatedTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
    });
  };

  // Handle form submission for editing the task
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    dispatch(editTask({ ...updatedTask, id: currentTask.id }));
    setIsEditing(false);
    setCurrentTask(null);
  };

  return (
    <div className="task-list-container">
      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
            <p className="task-due-date">Due Date: {task.dueDate}</p>
            <div className="task-actions">
              <button
                className={`action-button complete ${
                  task.completed ? "completed" : ""
                }`}
                onClick={() => dispatch(toggleComplete(task.id))}
              >
                {task.completed ? "Completed" : "Mark as Complete"}
              </button>
              <button
                className="action-button edit"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
              <button
                className="action-button delete"
                onClick={() => dispatch(deleteTask(task.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Edit Form Modal */}
      {isEditing && (
        <div className="edit-modal">
          <div className="edit-form">
            <button className="close-btn" onClick={() => setIsEditing(false)}>
              &times;
            </button>
            <form onSubmit={handleSubmitEdit}>
              <h2>Edit Task</h2>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={updatedTask.title}
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  value={updatedTask.description}
                  onChange={(e) =>
                    setUpdatedTask({
                      ...updatedTask,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>Due Date:</label>
                <input
                  type="date"
                  value={updatedTask.dueDate}
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, dueDate: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <button type="submit" className="action-button save">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="action-button cancel"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
