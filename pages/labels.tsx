import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";
import TaskCollection from "../container/TaskCollection";
import { useTaskList } from "../context/taskListContext";
import toTitleCase from "../scripts/toTitleCase";

// in case someone created "unlabelled" label
const unlabelled = "egj9b39bn2217352b06a6178c0e95f431f30ej5ra";

const getLabelCollection = (taskList: any[]) => {
  const tempCollection = {
    [unlabelled]: [],
  };
  taskList.map((item) => {
    if (item.label) {
      for (let label of item.label.split(",")) {
        const key = label.trim();
        if (tempCollection[key]) tempCollection[key].push(item);
        else tempCollection[key] = [item];
      }
    } else {
      tempCollection[unlabelled].push(item);
    }
  });
  return tempCollection;
};

export default function Labels() {
  const taskList = useTaskList();
  const labelCollection = getLabelCollection(taskList);
  
  return (
    <Layout>
      <AppContainer active="labels">
        {Object.keys(labelCollection).map((item, idx) => {
          if (item !== unlabelled)
            return (
              <TaskCollection
                key={idx}
                data={labelCollection[item]}
                title={toTitleCase(item)}
                type="upcoming"
              />
            );
        })}
        <TaskCollection
          data={labelCollection[unlabelled]}
          title="Unlabelled"
          type="upcoming"
        />
      </AppContainer>
    </Layout>
  );
}
