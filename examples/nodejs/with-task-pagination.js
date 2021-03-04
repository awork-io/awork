import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

// store your secrets in env vars
const apiKey = process.env.API_KEY;

// create a client to avoid redundant code
const client = axios.create({
  baseURL: "https://api.awork.io/api/v1",
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

// example of getting paginated tasks -> we would get the page 1 with a limit of 5 items per page
async function getTasksForProject(projectId, pageLimit) {
  let page = 1;
  let hasNext = true;
  let tasks = [];
  while (hasNext) {
    const response = await client.get(
      `/projects/${projectId}/projecttasks?page=${page}&pageSize=${pageLimit}`
    );

    tasks = [...tasks, ...response.data];
    // we can get pagination information from the headers
    const currentPage = response.headers["aw-page"];
    const totalItems = response.headers["aw-totalitems"];
    // the number of pages is the number of total items divided by the pageSize provided in the querystring plus 1
    hasNext = currentPage < totalItems / pageLimit + 1;
    page++;
  }

  return tasks;
}

(async function () {
  const projectId = "your-project-id";
  // we're limiting the results by 5 items per page
  const pageLimit = 5;
  const resultTasks = await getTasksForProject(projectId, pageLimit);

  console.log(resultTasks.length);
})();
