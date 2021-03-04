using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft;

namespace ExampleApi.Services
{  
    class ApiClient
    {
        private HttpClient _httpClient = new HttpClient();

        // This example uses httpclient from System.Net.Http
        public ApiClient(string apiKey, string baseUrl)
        {
            this._httpClient.BaseAddress = new Uri(baseUrl);
            this._httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer ${apiKey}");
        }

        // example getting subtasks for a task
        public async void GetSubTasksForTaskAsync(string taskId)
        {
            try
            {
                var response = await this._httpClient.GetAsync($"/tasks/{taskId}/subtasks");
                if (response.IsSuccessStatusCode)
                {
                    // do something with the response
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
        }

        public async void CreateSubtasksForTaskAsync(string taskId, Subtask subtask) 
        {
            try
            {
                var response = await this._httpClient.PostAsJsonAsync($"/tasks/{taskId}/subtasks", subtask);

                if (response.IsSuccessStatusCode)
                {
                    // do something with the response
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
        }

        public async void GetWithPagination(int pageLimit, string projectId) 
        {
            var tasks = new List();
            bool hasNext = true;

            while (hasNext) 
            {
                var response = await this._httpClient.GetAsync($"/projects/${projectId}/projecttasks?page={page}&pageSize={pageLimit}");
                var currentPage = response.Headers.GetValues("aw-page");
                var totalItems = response.Headers.GetValues("aw-totalitems");
                // the number of pages is the number of total items divided by the pageSize provided in the querystring plus 1
                hasNext = currentPage < totalItems / pageLimit + 1;
                var json = await response.Content.ReadAsStringAsync();

                // we use Newtonsoft's JsonConvert to parse the response JSON to a C# object
                var newTasks = JsonConvert.DeserializeObject<List<MyDetail>>(json);
                tasks.AddRange(newTasks);
            }

            return tasks;
        }
    }
}