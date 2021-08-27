---
description: "This page contains a list of past and upcoming changes of our API. We try our best to prevent breaking changes, but sometimes we need them in order to release a new awesome feature \U0001F680"
---

# API Changes

## Upcoming changes

{% hint style="info" %}
In this section you find upcoming changes. Breaking changes are marked additionally 🚨
{% endhint %}

### Multi user assignment - 18.09.21 🚨

This release adds the highly requested feature to assign multiple users to the same task. As a result, we reworked the endpoints to assign users to tasks and task templates as well as automations.

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
User needs to have write permissions for the task.  
  
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
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

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
Batch endpoint to assign users to multiple tasks.
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
{% api-method-response-example httpCode=200 %}
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

