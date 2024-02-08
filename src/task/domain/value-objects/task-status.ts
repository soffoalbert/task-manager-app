export class TaskStatus {
    constructor(readonly value: "complete" | "not_complete") {}
  
    equals(status: TaskStatus) {
      return this.value === status.value;
    }
  }