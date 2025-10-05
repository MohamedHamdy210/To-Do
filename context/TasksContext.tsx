// context/AuthContext.tsx
"use client";
import { subscribeToTasks, Task } from "@/lib/tasks";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";


// Define a type for the user object (customize as needed)


// Define the context value type


interface TasksContextType {
  tasks: Task[] | null;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[] | null>([]);
  

  useEffect(() => {
     const unsubscribe = subscribeToTasks(setTasks);
      
    return () => unsubscribe();
  }, []);

  return (
    <TasksContext.Provider value={{ tasks }}>
      {children}
    </TasksContext.Provider>
  )
}
export function useTasks()  {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  const tasks = context.tasks ?? [];
  const notStartedTasks = tasks.filter((task) => task.status === "Not Started");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  const todaysTasks = tasks.filter((task) => task.createdAt === new Date().toLocaleDateString("en-GB"));
  const importantTasks = tasks.filter((task) => task.priority === "Extreme");
  return {
    tasks,
    notStartedTasks,
    inProgressTasks,
    completedTasks,
    todaysTasks,
    importantTasks
  };

}