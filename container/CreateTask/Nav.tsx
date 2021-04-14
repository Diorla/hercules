import React from "react";
import styled from "styled-components";
import { useTaskState } from "../../context/taskContext";
import {
  ReminderIcon,
  LabelIcon,
  PriorityIcon,
  DifficultyIcon,
  ProjectIcon,
} from "./Icon";

const priorityColours = {
  1: "#329b52",
  2: "#17b0f1",
  3: "#7843bc",
  4: "#ffac03",
  5: "#e83c3d",
};

const difficultyColours = {
  1: "rgb(76, 175, 80)",
  2: "#ffac03",
  3: "#e83c3d",
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ProjectWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 16px;
`;

// ?TODO: update Reminder.active
/**
 * Use some validation to see if the reminder is valid
 * And then return boolean
 */
export default function Nav({ currentSection, setCurrentSection }) {
  const { difficulty, label, priority, project, time } = useTaskState();

  return (
    <Wrapper>
      <ReminderIcon
        colour="#87bc43"
        active={!!time}
        onClick={() => {
          currentSection === "DueDate"
            ? setCurrentSection("")
            : setCurrentSection("DueDate");
        }}
      />
      <LabelIcon
        colour="#ffac03"
        active={!!label}
        onClick={() => {
          currentSection === "Label"
            ? setCurrentSection("")
            : setCurrentSection("Label");
        }}
      />
      <PriorityIcon
        colour={priorityColours[priority]}
        active={!!priority}
        onClick={() => {
          currentSection === "Priority"
            ? setCurrentSection("")
            : setCurrentSection("Priority");
        }}
      />
      <DifficultyIcon
        colour={difficultyColours[difficulty]}
        active={!!difficulty}
        onClick={() => {
          currentSection === "Difficulty"
            ? setCurrentSection("")
            : setCurrentSection("Difficulty");
        }}
      />
      <ProjectWrapper>
        <ProjectIcon
          colour="#7843bc"
          active={project !== "Unsorted"}
          onClick={() => {
            currentSection === "Project"
              ? setCurrentSection("")
              : setCurrentSection("Project");
          }}
        />
        {project !== "Unsorted" && project}
      </ProjectWrapper>
    </Wrapper>
  );
}
