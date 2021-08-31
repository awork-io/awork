---
description: "This page contains a list of past and upcoming changes of our API. We try our best to prevent breaking changes, but sometimes we need them in order to release a new awesome feature \U0001F680"
---

# API Changes

## Upcoming changes

{% hint style="info" %}
In this section you find upcoming changes. Breaking changes are marked additionally 🚨
{% endhint %}

### Multi User Assignment - 18.09.21 🚨

This release adds the highly requested feature to assign multiple users to the same task. As a result, we reworked the endpoints that allow assigning multiple users to tasks and task templates as well as automations.

If you want to use this feature, please enable the task setting "Allow multi user assignment" in awork in the workspace settings page. Alternatively you can activate the setting by calling the tasks/settings endpoint from below with the setting name `allow-multi-user-assignment`.

#### Removed endpoints

```text
POST /tasks/assignUsers
```

```text
POST /tasks/unassignUsers
```

#### Added endpoints

{% api-method method="post" host="https://api.awork.io/v1/" path="tasks/{taskId}/setAssignees" %}
{% api-method-summary %}
tasks/{taskId}/setAssignees
{% endapi-method-summary %}

{% api-method-description %}
This method is used to assign users to a task. You always need to pass all users you want to assign. If an already assigned user is not in the passed user id list, he/she gets unassigned.  
  
The user ids are passed in the body as an array of strings.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="taskId" type="string" required=true %}
The id of the task.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=204 %}
{% api-method-response-example-description %}
Successfully assigned all users.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="https://api.awork.io/v1/" path="taskTemplates/{tasktemplateId}/setAssignees" %}
{% api-method-summary %}
taskTemplates/{taskTemplateId}/setAssignees
{% endapi-method-summary %}

{% api-method-description %}
This method is used to assign users to a task template that belongs to a task bundle. You always need to pass all users you want to assign. If an already assigned user is not in the passed user id list, he/she gets unassigned.  
Users need write permissions for the feature `task-manage-config`.  
  
The user ids are passed in the body as an array of strings.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="taskTemplateId" type="string" required=true %}
The id of the task template.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=204 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="https://api.awork.io/v1/" path="tasks/settings" %}
{% api-method-summary %}
tasks/settings
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="enabled" type="boolean" required=true %}
Whether the setting is active or not.
{% endapi-method-parameter %}

{% api-method-parameter name="type" type="string" required=true %}
The setting type. For multi-user assignment: `allow-multi-user-assignment` 
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  "type": "allow-multi-user-assignment",
  "enabled": true,
  "workspaceId": "00000000-0000-0000-0000-000000000000"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

#### Changed endpoints

{% api-method method="post" host="https://api.awork.io/v1/" path="tasks/batch/{operation}" %}
{% api-method-summary %}
tasks/batch/assignusers 🚨
{% endapi-method-summary %}

{% api-method-description %}
Batch endpoint to assign users to multiple tasks. Used to be `assignuser`.  Set `removeOldAssignments` to false if you want to keep existing task assignments.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="operation" type="string" required=true %}
assignusers
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-body-parameters %}
{% api-method-parameter name="removeOldAssignments" type="boolean" required=false %}
Whether to keep existing assignments or replace them. Default = true.
{% endapi-method-parameter %}

{% api-method-parameter name="userIds" type="array" required=true %}
List of user ids to assign to the tasks.
{% endapi-method-parameter %}

{% api-method-parameter name="taskIds" type="array" required=true %}
List of task ids to assign the users to.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=207 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

Additionally these automation models were changed 🚨

For the action `assign-user-to-task` there is now an additional `ActionValue` `removeOldAssignments`. In order to assign multiple users to a task, you need the set this value to `false`. You can also add multiple `assign-user-to-task` actions to an automation, in order to assign multiple users for a single trigger.

For the actions `task-create-project` and `task-create-private` the `task` `ActionValue` now has an array `assigneeIds` instead of a single `assigneeId`. However, you cannot assign multiple users to private tasks.

## Recent changes

{% hint style="info" %}
This section shows you past changes that are already live in our API
{% endhint %}

### Project Templates - 18.07.21 🚨

This feature is part of our big Einhorn release which brought a bunch of awesome features and an updated UI framework 🦄

Project Templates used to be the Project Types, which now have a secondary role, similar to the Type of Work found on Tasks, to make it easier to understand for our users and remove some restrictions like creating a project without a Project Template.

Due to these complex changes, we reworked the existing Project Type endpoints completely and added new endpoints for Project Templates.

#### Added endpoints

CRUD endpoints for project templates

{% api-method method="get" host="https://api.awork.io/v1/" path="projectTemplates" %}
{% api-method-summary %}
projectTemplates
{% endapi-method-summary %}

{% api-method-description %}
Get all project templates of the workspace.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

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
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://api.awork.io/v1/" path="projectTemplates/{projectTemplateId}" %}
{% api-method-summary %}
projectTemplates/{projectTemplateId}
{% endapi-method-summary %}

{% api-method-description %}
Get a specific project template by id.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="projectTemplateId" type="string" required=true %}
The id of the project template.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

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
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="put" host="https://api.awork.io/v1/" path="projectTemplates/{projectTemplateId}" %}
{% api-method-summary %}
projectTemplates/{projectTemplateId}
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="projectTemplateId" type="string" required=true %}
The id of the project template.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

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
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="https://api.awork.io/v1/" path="projectTemplates" %}
{% api-method-summary %}
projectTemplates
{% endapi-method-summary %}

{% api-method-description %}
Create a new project template for the workspace
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="isBillableByDefault" type="boolean" required=false %}
Whether time entries should be billable by default. Default = false.
{% endapi-method-parameter %}

{% api-method-parameter name="name" type="string" required=false %}
The name of the project template.
{% endapi-method-parameter %}

{% api-method-parameter name="description" type="string" required=false %}
The description of the project template.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

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
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="delete" host="https://api.awork.io/v1/" path="projectTemplates/{projectTemplateId}" %}
{% api-method-summary %}
projectTemplates/{projectTemplateId}
{% endapi-method-summary %}

{% api-method-description %}
Deletes an existing project template.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="projectTemplateId" type="string" required=true %}
The id of the project template.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=204 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% hint style="info" %}
Older changes can be found in the release articles on our roadmap [https://www.awork.io/roadmap/](https://www.awork.io/roadmap/) 🕵🏻‍♂️
{% endhint %}

