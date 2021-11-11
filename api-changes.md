---
description: >-
  This page contains a list of past and upcoming changes of our API. We try our
  best to prevent breaking changes, but sometimes we need them in order to
  release a new awesome feature 🚀
---

# API Changes

## Upcoming changes

{% hint style="info" %}
In this section you find upcoming changes. Breaking changes are marked additionally 🚨
{% endhint %}

### Project Templates - Auto Billability 🚨

Currently, projects have one property called `IsBillableByDefault `,which decides whether time entries created on that project are marked as billable or not. This is either set by the project template, or if no project template was used for creation, by whether the project has a company or not. In the case of a company, the times are marked as billed, otherwise the times are marked as not billable.

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

For the actions `task-create-project` and `task-create-private`, the `task` `ActionValue` now has an array `assigneeIds` instead of a single` assigneeId`. However, you cannot assign multiple users to private tasks.

## Recent changes

{% hint style="info" %}
This section shows you past changes that are already live in our API
{% endhint %}

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
Older changes can be found in the release articles on our roadmap [https://www.awork.io/roadmap/](https://www.awork.io/roadmap/) 🕵🏻‍♂️
{% endhint %}
