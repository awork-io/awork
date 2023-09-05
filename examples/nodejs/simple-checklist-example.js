// you can use any http client, for this example we use Axios: https://github.com/axios/axios
import axios from "axios";

// [ Optional ] Create a client to avoid redundant code
const client = axios.create({
  baseURL: "https://api.awork.com/api/v1",
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

// example of getting checklistItems for a task with id taskId
client
  .get(`/tasks/${taskId}/checklistItems`)
  .then((response) => {
    // returns a list of the checklistItems for the task
    const checklistItemsForTask = response.data;
  })
  .catch((error) => {
    // handle errors
  });

// example of creating a checklistItem belonging to a task
client
  .post(`/tasks/${taskId}/checklistItems`, {
    // the status of the checklistItem
    isDone: false,
    // the name of the checklistItem
    name: "Do some fancy stuff",
    // in what order will it appear -> if a checklistItem exists with this order this will place it before that checklistItem
    order: 0,
  })
  .then((response) => {
    // returns the created task
    const createdTask = response.data;
  })
  .catch((error) => {
    // handle errors
  });
