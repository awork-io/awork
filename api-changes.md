---
description: >-
  This page contains a list of past and upcoming changes of our API. We try our
  best to prevent breaking changes, but sometimes we can't avoid it in order to
  release a new awesome feature 🚀
---

# API Changes

{% hint style="info" %}
[Subscribe](https://form.123formbuilder.com/form-6455567/api-newsletter-signup) to Updates and other Developer News
{% endhint %}

## Upcoming changes

This section shows upcoming changes. Breaking changes are additionally marked with 🚨.

### ResourceVersion property removed 🚨

We are going to remove the `ResourceVersion` property from all API models.

These changes are happening in the API in the future, release date tbd.

## Recent changes

This section shows you recent changes that are already live in our API.

#### Domain changed to awork.com: clients need to update URLs 🚨

We have recently switched our primary domain from `awork.io` to `awork.com`. The application and website remain available at both domains for the time being, by end of January 2024, clients must have updated to `awork.com` to continue using the awork API.

### Projects, Tasks and Users: Key and NumberCount properties removed 🚨

The `Key` property of Projects, Tasks and Users as well as the `NumberCount` property of Tasks have been removed. These properties were never used in the awork web app, so we're removing them from the API models as well.

These changes are happening in the API on **26.05.2023 in the evening**.

### Tasks: EntityId is deprecated 🚨

The `EntityId` in the Task model is deprecated and will be removed in the future. Use `UserId` for private tasks and `ProjectId` for project tasks instead.

These changes are happening in the API on **05.05.2023 in the evening**.

### Tasks: several nested fields removed 🚨

The following nested fields have been removed from the model for performance reasons:

```
Task.Project.Teams
Task.Project.Tags
Task.Company.Tags
Task.Assignees.Teams
Task.Assignees.Tags
```

These changes are happening in the API on **05.05.2023 in the evening**.

### Subtasks become Checklists 🚨

We are adding a new feature called Subtasks, therefore we are renaming the currently existing Subtasks to Checklists. The new Subtasks will be more powerful and bring a new level of planning to awork.

In the following endpoints, `subtasks` will be renamed to `checklists`. The functionality remains the same.

<figure><img src=".gitbook/assets/Screenshot 2023-01-17 at 15.47.53.png" alt=""><figcaption></figcaption></figure>

This change is happening in the API on **03.03.2023 in the evening**.

### API Rate Limits for API clients  🚨

We are introducing API rate limits that will limit the number of requests external API clients can make to a workspace. These limits depend on the plan of the workspace. The limits are shared by all external client applications across the workspace. Please see [Rate Limits](rate-limits.md) for details.

This change is happening in the API on **03.03.2023 in the evening**.

### Workload calculation - Single user calculation removal  🚨

We are deprecating the endpoint&#x20;

`GET /users/{userId}/workload`&#x20;

in favour of the new one:&#x20;

`GET /users/workload`&#x20;

This new endpoint will provide multiple user results in a single call, plus it has the option to fetch the details of the workload calculation.

The legacy endpoint will still be active up to **01.01.2023.** \
Then it will be removed.

### Project Member Capacity - Endpoints removal 🚨

With the introduction of the project time bookings, we are migrating all the project member capacities to them.&#x20;

As such, all the related endpoints are being deprecated and will not have any meaningful effect on the workload calculations:

* `GET /projects/{projectId}/members/{projectMemberId}/capacity`
* `PUT /projects/{projectId}/members/{projectMemberId}/capacity`
* `GET /projects/{projectId}/members/capacities`

We will remove those endpoints and the related data starting from **01.01.2023**

### User Capacity - Property Removed New Endpoint 🚨

The `User` model currently has a `CapacityPerWeek` property, which we're removing soon. This property is getting it's own endpoint: `/users/{userId}/capacity`

This endpoint has `GET` and `PUT` methods to retrieve and edit the user's weekly capacity. The `GET` model looks like this:

```javascript
{
  "userId": "b9fd0955-9252-4746-aba5-f6b82ba24d56",
  "capacityPerWeek": 144000
}
```

For a short time, both the property and the new endpoints will exist in parallel to be backward-compatible. We will remove the old property starting in **March 2022**. Please update your API client accordingly.

### Project Templates - Auto Billability 🚨

Currently, projects have one property called `IsBillableByDefault` ,which decides whether time entries created on that project are marked as billable or not. This is either set by the project template, or if no project template was used for creation, by whether the project has a company or not. In the case of a company, the times are marked as billed, otherwise the times are marked as not billable.

The problem is, that the project template always overrules this company rule. We need to have more flexibility here, so we change the `IsBillableByDefault` property on the project template from a `boolean` to a `string` field with the possible values: `on, off, auto`.

When the `auto` option is set, the `IsBillableByDefault` of the project on project creation will be set according to the company rule, so `true` if a company is set and `false` if no company is set.

### Multi-User Assignment - 18.09.21 🚨

This release adds the highly requested feature to assign multiple users to the same task. As a result, we reworked the endpoints that allow assigning multiple users to tasks and task templates as well as automations.

If you want to use this feature, please enable the task setting "Allow multi-user assignment" in awork in the workspace settings page. Alternatively, you can activate the setting by calling the tasks/settings endpoint from below with the setting name `allow-multi-user-assignment`.

#### Removed endpoints

```
POST /tasks/assignUsers
```

```
POST /tasks/unassignUsers
```

#### Added endpoints

{% swagger baseUrl="https://api.awork.io/v1/" path="tasks/{taskId}/setAssignees" method="post" summary="tasks/{taskId}/setAssignees" %}
{% swagger-description %}
This method is used to assign users to a task. You always need to pass all users you want to assign. If an already assigned user is not in the passed user id list, he/she gets unassigned.

\




\


The user ids are passed in the body as an array of strings.
{% endswagger-description %}

{% swagger-parameter in="path" name="taskId" type="string" %}
The id of the task.
{% endswagger-parameter %}

{% swagger-response status="204" description="Successfully assigned all users." %}
```
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://api.awork.io/v1/" path="taskTemplates/{tasktemplateId}/setAssignees" method="post" summary="taskTemplates/{taskTemplateId}/setAssignees" %}
{% swagger-description %}
This method is used to assign users to a task template that belongs to a task bundle. You always need to pass all users you want to assign. If an already assigned user is not in the passed user id list, he/she gets unassigned.

\


Users need write permissions for the feature 

`task-manage-config`

.

\




\


The user ids are passed in the body as an array of strings.
{% endswagger-description %}

{% swagger-parameter in="path" name="taskTemplateId" type="string" %}
The id of the task template.
{% endswagger-parameter %}

{% swagger-response status="204" description="" %}
```
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://api.awork.io/v1/" path="tasks/settings" method="post" summary="tasks/settings" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="enabled" type="boolean" %}
Whether the setting is active or not.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="type" type="string" %}
The setting type. For multi-user assignment: 

`allow-multi-user-assignment`

 
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
{
  "type": "allow-multi-user-assignment",
  "enabled": true,
  "workspaceId": "00000000-0000-0000-0000-000000000000"
}
```
{% endswagger-response %}
{% endswagger %}

#### Changed endpoints

{% swagger baseUrl="https://api.awork.io/v1/" path="tasks/batch/{operation}" method="post" summary="tasks/batch/assignusers 🚨" %}
{% swagger-description %}
Batch endpoint to assign users to multiple tasks. Used to be 

`assignuser`

.  Set 

`removeOldAssignments`

 to false if you want to keep existing task assignments.
{% endswagger-description %}

{% swagger-parameter in="path" name="operation" type="string" %}
assignusers
{% endswagger-parameter %}

{% swagger-parameter in="body" name="removeOldAssignments" type="boolean" %}
Whether to keep existing assignments or replace them. Default = true.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="userIds" type="array" %}
List of user ids to assign to the tasks.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="taskIds" type="array" %}
List of task ids to assign the users to.
{% endswagger-parameter %}

{% swagger-response status="207" description="" %}
```
```
{% endswagger-response %}
{% endswagger %}

Additionally, these automation models were changed 🚨

For the action `assign-user-to-task`, there is now an additional `ActionValue` `removeOldAssignments`. In order to assign multiple users to a task, you need the set this value to `false`. You can also add multiple `assign-user-to-task` actions to an automation in order to assign multiple users for a single trigger.

For the actions `task-create-project` and `task-create-private`, the `task` `ActionValue` now has an array `assigneeIds` instead of a single `assigneeId`. However, you cannot assign multiple users to private tasks.

### Project Templates - 18.07.21 🚨

This feature is part of our big Einhorn release, which brought a bunch of awesome features and an updated UI framework 🦄

Project Templates used to be the Project Types, which now have a secondary role, similar to the Type of Work found on Tasks, to make it easier to understand for our users and remove some restrictions like creating a project without a Project Template.

Due to these complex changes, we completely reworked the existing Project Type endpoints and added new endpoints for Project Templates.

#### Added endpoints

CRUD endpoints for project templates

{% swagger baseUrl="https://api.awork.io/v1/" path="projectTemplates" method="get" summary="projectTemplates" %}
{% swagger-description %}
Get all project templates of the workspace.
{% endswagger-description %}

{% swagger-response status="200" description="" %}
```
[
  {
    "id": "7ad71c10-4de6-4003-93b6-6800809c0a72",
    "description": "Project Template 1 is super awesome.",
    "createdOn": "2021-08-27T12:01:29.6292403Z",
    "createdBy": "c49a541a-2839-43c6-a446-c84e71a5f80e",
    "updatedOn": "2021-08-27T12:01:29.6292415Z",
    "updatedBy": "f1d285e6-bf28-4679-b991-ec6728757777",
    "name": "Template 1",
    "isBillableByDefault": true,
    "defaultTaskListIdForEmails": "f9e3f851-83cc-4335-bebe-7a2f7409c9df",
    "projectStatuses": [
      {
        "id": "e278a9d8-a83f-4f57-ba4e-30ba32b650ef",
        "name": "Running",
        "type": "progress",
        "order": 1,
        "createdOn": "2021-08-25T12:01:29.6292449Z",
        "createdBy": "4f889671-84c5-492a-b6b7-a082b1da361f",
        "updatedOn": "2021-08-27T12:01:29.6292462Z",
        "projectTemplateId": null,
        "projectId": "7756e117-4625-4c05-9dce-f323b1a798fa",
        "updatedBy": "9640d6cd-6959-4b60-9e50-3f8d700cd190"
      }
    ],
    "hasImage": false
  }
]
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://api.awork.io/v1/" path="projectTemplates/{projectTemplateId}" method="get" summary="projectTemplates/{projectTemplateId}" %}
{% swagger-description %}
Get a specific project template by id.
{% endswagger-description %}

{% swagger-parameter in="path" name="projectTemplateId" type="string" %}
The id of the project template.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
{
    "id": "7ad71c10-4de6-4003-93b6-6800809c0a72",
    "description": "Project Template 1 is super awesome.",
    "createdOn": "2021-08-27T12:01:29.6292403Z",
    "createdBy": "c49a541a-2839-43c6-a446-c84e71a5f80e",
    "updatedOn": "2021-08-27T12:01:29.6292415Z",
    "updatedBy": "f1d285e6-bf28-4679-b991-ec6728757777",
    "name": "Template 1",
    "isBillableByDefault": true,
    "defaultTaskListIdForEmails": "f9e3f851-83cc-4335-bebe-7a2f7409c9df",
    "projectStatuses": [
      {
        "id": "e278a9d8-a83f-4f57-ba4e-30ba32b650ef",
        "name": "Running",
        "type": "progress",
        "order": 1,
        "createdOn": "2021-08-25T12:01:29.6292449Z",
        "createdBy": "4f889671-84c5-492a-b6b7-a082b1da361f",
        "updatedOn": "2021-08-27T12:01:29.6292462Z",
        "projectTemplateId": null,
        "projectId": "7756e117-4625-4c05-9dce-f323b1a798fa",
        "updatedBy": "9640d6cd-6959-4b60-9e50-3f8d700cd190"
      }
    ],
    "hasImage": false
  }
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://api.awork.io/v1/" path="projectTemplates/{projectTemplateId}" method="put" summary="projectTemplates/{projectTemplateId}" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="projectTemplateId" type="string" %}
The id of the project template.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
{
    "id": "7ad71c10-4de6-4003-93b6-6800809c0a72",
    "description": "Project Template 1 is super awesome.",
    "createdOn": "2021-08-27T12:01:29.6292403Z",
    "createdBy": "c49a541a-2839-43c6-a446-c84e71a5f80e",
    "updatedOn": "2021-08-27T12:01:29.6292415Z",
    "updatedBy": "f1d285e6-bf28-4679-b991-ec6728757777",
    "name": "Template 1",
    "isBillableByDefault": true,
    "defaultTaskListIdForEmails": "f9e3f851-83cc-4335-bebe-7a2f7409c9df",
    "projectStatuses": [
      {
        "id": "e278a9d8-a83f-4f57-ba4e-30ba32b650ef",
        "name": "Running",
        "type": "progress",
        "order": 1,
        "createdOn": "2021-08-25T12:01:29.6292449Z",
        "createdBy": "4f889671-84c5-492a-b6b7-a082b1da361f",
        "updatedOn": "2021-08-27T12:01:29.6292462Z",
        "projectTemplateId": null,
        "projectId": "7756e117-4625-4c05-9dce-f323b1a798fa",
        "updatedBy": "9640d6cd-6959-4b60-9e50-3f8d700cd190"
      }
    ],
    "hasImage": false
  }
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://api.awork.io/v1/" path="projectTemplates" method="post" summary="projectTemplates" %}
{% swagger-description %}
Create a new project template for the workspace
{% endswagger-description %}

{% swagger-parameter in="body" name="isBillableByDefault" type="boolean" %}
Whether time entries should be billable by default. Default = false.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="name" type="string" %}
The name of the project template.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="description" type="string" %}
The description of the project template.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
{
    "id": "7ad71c10-4de6-4003-93b6-6800809c0a72",
    "description": "Project Template 1 is super awesome.",
    "createdOn": "2021-08-27T12:01:29.6292403Z",
    "createdBy": "c49a541a-2839-43c6-a446-c84e71a5f80e",
    "updatedOn": "2021-08-27T12:01:29.6292415Z",
    "updatedBy": "f1d285e6-bf28-4679-b991-ec6728757777",
    "name": "Template 1",
    "isBillableByDefault": true,
    "defaultTaskListIdForEmails": "f9e3f851-83cc-4335-bebe-7a2f7409c9df",
    "projectStatuses": [
      {
        "id": "e278a9d8-a83f-4f57-ba4e-30ba32b650ef",
        "name": "Running",
        "type": "progress",
        "order": 1,
        "createdOn": "2021-08-25T12:01:29.6292449Z",
        "createdBy": "4f889671-84c5-492a-b6b7-a082b1da361f",
        "updatedOn": "2021-08-27T12:01:29.6292462Z",
        "projectTemplateId": null,
        "projectId": "7756e117-4625-4c05-9dce-f323b1a798fa",
        "updatedBy": "9640d6cd-6959-4b60-9e50-3f8d700cd190"
      }
    ],
    "hasImage": false
  }
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://api.awork.io/v1/" path="projectTemplates/{projectTemplateId}" method="delete" summary="projectTemplates/{projectTemplateId}" %}
{% swagger-description %}
Deletes an existing project template.
{% endswagger-description %}

{% swagger-parameter in="path" name="projectTemplateId" type="string" %}
The id of the project template.
{% endswagger-parameter %}

{% swagger-response status="204" description="" %}
```
```
{% endswagger-response %}
{% endswagger %}

{% hint style="info" %}
Older changes can be found in the release articles on our roadmap [https://www.awork.com/roadmap/](https://www.awork.com/roadmap) 🕵🏻‍♂️
{% endhint %}
