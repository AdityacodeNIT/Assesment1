import React, { useState } from "react";
import { Select, MenuItem, Button } from "@mui/material";
import Task from "./Task";
import TaskList from "./TaskList";
import "./Dashboard.css"; // Link to the CSS file

const Dashboard = () => {
  const [filter, setFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Task Dashboard</h1>
        <div className="dashboard-controls">
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="dashboard-select"
            variant="outlined"
          >
            <MenuItem value="all">All Tasks</MenuItem>
            <MenuItem value="completed">Completed Tasks</MenuItem>
            <MenuItem value="pending">Pending Tasks</MenuItem>
            <MenuItem value="overdue">Overdue Tasks</MenuItem>
          </Select>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="dashboard-add-button"
            variant="contained"
            color="primary"
          >
            Add Task
          </Button>
        </div>
      </header>
      <main className="dashboard-main">
        <TaskList filter={filter} />
        {isFormOpen && <Task onClose={() => setIsFormOpen(false)} />}
      </main>
    </div>
  );
};

export default Dashboard;
