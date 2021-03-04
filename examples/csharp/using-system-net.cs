using System;
using System.Net;

class AworkApiClientExample 
{
    private HttpClient _httpClient = new HttpClient();

    public AworkApiClientExample(string baseUrl, string apiToken) 
    {
        this._httpClient.BaseAddress = new Uri(baseUrl);
        this._httpClient.HttpHeaders.Add("Authorization", $"Bearer {apiToken}");
    }

    public async Task<SubTask> GetSubTaskForTaskAsync(string taskId) 
    {
       // example of getting subtasks for a task with id taskId -> this will get all the tasks from page 1 and limit the number of items of by 10 for each page
       var response = await this._httpClient.GetAsync($"/tasks/{taskId}/subtask?page=1&pageSize=10");

       // then we can handle the response the way we want, using newtonsoft's JSONConverter for example  
    } 

    public async Task<SubTask> CreateSubTaskForTaskAsync(string taskId, Subtask subtask) 
    {
       var response = await this._httpClient.PostAsJsonAsync($"/tasks/{taskId}/subtask", subtask);

       // then we can handle the response the way we want, using newtonsoft's JSONConverter for example
    } 
}