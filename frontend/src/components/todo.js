import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

function TodoList() {
  const classes = useStyles();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Task 1',
      description: 'This is task 1',
      completed: false,
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'This is task 2',
      completed: false,
    },
  ]);

  const handleAddTask = () => {
    if (!taskName) return;

    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      description: taskDescription,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setTaskDescription('');
  };

  const handleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Task Manager
      </Typography>

      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Task name"
              fullWidth
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Task description"
              fullWidth
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddTask}>
              Add Task
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {tasks.map((task) => (
        <Paper className={classes.paper} key={task.id}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">{task.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleTaskCompletion(task.id)}
                    color="primary"
                  />
                }
                label="Completed"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{task.description}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
}

export default TodoList;
