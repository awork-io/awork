// you can use any http client, for this example we use Axios: https://github.com/axios/axios
import axios from "axios";

// [ Optional ] Create a client to avoid redundant code
const client = axios.create({
  baseURL: "https://api.awork.io/api/v1",
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

// example of getting subtasks for a task with id taskId
client
  .get(`/tasks/${taskId}/subtasks`)
  .then((response) => {
    // returns a list of the subtasks for the task
    const subtasksForTask = response.data;
  })
  .catch((error) => {
    // handle errors
  });

// example of creating a subtask belonging to a task
client
  .post(`/tasks/${taskId}/subtasks`, {
    // the status of the subtask
    isDone: false,
    // the name of the subtask
    name: "Do some subtasky stuff",
    // in what order will it appear -> if a subtask exists with this order this will place it before that subtask
    order: 0,
  })
  .then((response) => {
    // returns the created task
    const createdTask = response.data;
  })
  .catch((error) => {
    // handle errors
  });
