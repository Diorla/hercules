import { useState, useEffect, createContext, useContext } from "react";
import watchData from "../../scripts/watchData";
import TaskProps from "../taskContext/TaskProps";
import { useUser } from "../userContext";

export const TaskListContext = createContext<TaskProps[]>([]);

export default function TaskListContextWrapper({ children }) {
  const [taskList, setTaskList] = useState([]);
  const { loadingUser, user } = useUser();

  useEffect(() => {
    if (user && user.uid)
      watchData(`user/${user.uid}/tasks`, setTaskList)
        .then(() => console.log("done"))
        .catch((err) => console.log({ err }));
  }, [loadingUser]);

  return (
    <TaskListContext.Provider value={taskList}>
      {children}
    </TaskListContext.Provider>
  );
}

export const useTaskList = () => useContext(TaskListContext);
