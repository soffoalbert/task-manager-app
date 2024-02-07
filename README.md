# Task Management System

This Task Manager application is built with NestJS and provides a command-line interface for managing tasks. It utilizes the `yargs` package to handle CLI commands and NestJS for the application framework.

## Getting Started

To get started with the Task Manager application, you first need to ensure that you have Node.js installed on your machine. After that, follow the steps below to set up and run the application.

### Installation

Clone the repository and navigate into the project directory:

```bash
git clone <repository-url>
cd task-manager-app
```

### Install the required npm packages:

```npm install```

### Install PostgresSQL

Follow instructions for your operating system to download and install PostgreSQL. Once installed, create a DB called task-db

and also create and populate the .env file in the root directory of the application and add the following config:

POSTGRES_HOST=localhost
POSTGRES_PORT=<port>
POSTGRES_USER=<user name>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=task-db


### Running the Application
The application can be run directly via an npm script that has been set up in the package.json. To run the application and interact with the CLI, use the following command:

```npm run start:cli```

## CLI Commands

### List all tasks: Lists all the tasks currently managed by the application.

```npm run start:cli -- list```

### Add a new task: Adds a new task with a title and description.

```npm run start:cli -- add "<title>" "<description>"```

### Update a task: Updates an existing task's title, description, and status.

```npm run start:cli -- update <id> "<newTitle>" "<newDescription>" <newStatus>```

### Delete a task: Deletes a task by its ID.

```npm run start:cli -- delete <id>```


## Benefits of Using NestJS

NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It offers several benefits for developers:

Extensible: NestJS provides a modular structure that allows developers to easily use third-party modules or create their own.

Versatile: It supports various types of server-side applications, including REST APIs, GraphQL APIs, microservices, and more.

TypeScript-Based: NestJS leverages TypeScript, offering improved code quality and robustness through static typing.

Dependency Injection: Its powerful dependency injection container helps to maintain modularity and testability.
Out-of-the-Box Application Architecture: NestJS comes with a well-thought-out application architecture, providing a solid foundation for developers to build upon.
Comprehensive Documentation: The framework is well-documented, making it easier for new developers to get started and for existing developers to find the information they need.

By utilizing NestJS, this Task Manager application benefits from the framework's robustness, scalability, and ease of maintenance, making it a solid choice for enterprise-grade applications.

