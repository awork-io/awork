# Permissions

### Basics

The Permissions allow you to define user access to certain features.\
To simplify this, we use a role-based approach that allows a collection of users to be handled by the same collection of permissions.

![](https://developers.awork.io/wp-content/uploads/2018/03/permissions-1024x335.png)

#### Permissions

In awork, we have two permissions: **read **and **manage**. With the **read **permissions of a feature, you have access to all _GET_ endpoints which are related to this feature.\
To get access to the _POST_,_PUT_, _DELETE,_ and Business Operation endpoints, **manage **permissions for this feature is required.

#### Features

A feature groups a functional area in awork to which permissions can be assigned. This simplifies configuration considerably.

With the permission on a function, you not only get access to one API endpoint but to all those who belong to this functional area.\
Let’s take the **project-planning data** feature as an example. This will give you access to the project task endpoints. You also get access to the comments endpoints, which allows you to leave comments on project tasks.

#### Roles

Roles connect users and features. They define which users are authorized to use the functions of the role.\
However, there is a difference between standard and project roles. A regular role defines the rights of a user in the entire application.\
Each user must belong to only one role.\
Project roles define the permissions of a user (project member) in a project.

In awork, there is always one admin role, and it must always contain at least one user. The users in the admin role have access to all features and can manage permissions for other users.
