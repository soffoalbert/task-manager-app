import { Injectable } from "@nestjs/common";
import { randomInt, randomUUID } from "crypto";
import { Task } from "../task";
import { TaskStatus } from "../value-objects/task-status";

@Injectable()
export class TaskFactory {
  create(title: string, description: string, status: string) {
    const taskId = randomInt(100000);
    const taskStatus = new TaskStatus(status as TaskStatus["value"]);
    return new Task(taskId, title, description, taskStatus);
  }
}