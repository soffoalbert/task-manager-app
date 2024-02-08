# Task Manager Application

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

### Running the Application
The application can be run directly via an npm script that has been set up in the package.json. To run the application and interact with the CLI, use the following command:

```npm run start:cli```

## CLI Commands

### List all tasks: Lists all the tasks currently managed by the application.

```npm run start:cli -- list```

### Add a new task: Adds a new task with a title and description.

```npm run start:cli -- add "<title>" "<description>"```

### Update a task: Updates an existing task's title, description, and status.

```npm run start:cli -- complete <id>```

### Delete a task: Deletes a task by its ID.

```npm run start:cli -- remove <id>```


## Benefits of Using NestJS

NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It offers several benefits for developers:

Extensible: NestJS provides a modular structure that allows developers to easily use third-party modules or create their own.

Versatile: It supports various types of server-side applications, including REST APIs, GraphQL APIs, microservices, and more.

TypeScript-Based: NestJS leverages TypeScript, offering improved code quality and robustness through static typing.

Dependency Injection: Its powerful dependency injection container helps to maintain modularity and testability.
Out-of-the-Box Application Architecture: NestJS comes with a well-thought-out application architecture, providing a solid foundation for developers to build upon.
Comprehensive Documentation: The framework is well-documented, making it easier for new developers to get started and for existing developers to find the information they need.

By utilizing NestJS, this Task Manager application benefits from the framework's robustness, scalability, and ease of maintenance, making it a solid choice for enterprise-grade applications.

## Hexagonal Architecture

Hexagonal Architecture, also known as Ports and Adapters Architecture, is a software design pattern that aims to create loosely coupled application components that can be easily connected to their software environment through ports and adapters. This architecture emphasizes the separation of concerns by isolating the core logic of the application from external elements like databases, web interfaces, or other services.

### Benefits of Hexagonal Architecture include:
Improved Testability: By decoupling the core logic from external components, it becomes easier to test the application in isolation, leading to more reliable software.
Flexibility and Scalability: Changes to external services or databases do not impact the core application logic, making it easier to update or replace those external components.

Enhanced Maintainability: The clear separation of concerns and the isolation of the application's core logic simplify understanding and maintaining the codebase.
Facilitates Continuous Deployment: With a decoupled design, parts of the system can be independently deployed or updated, supporting continuous integration and deployment practices.

Overall, Hexagonal Architecture allows for creating more maintainable, scalable, and adaptable software applications by promoting loose coupling and emphasizing the separation between the application's core logic and external concerns.

