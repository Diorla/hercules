import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../../context/userContext";
import createData from "../../scripts/createData";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import fetchData from "../../scripts/fetchData";
import uniqueArray from "../../scripts/uniqueArray";
import { useTaskState, useTaskDispatch } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import initialState from "../../context/taskContext/initialState";
import getValidState from "../../scripts/getValidState";

export const Button = styled.button`
  font-size: 1.6rem;
  font-family: monospace;
  border: none;
  background: purple;
  color: white;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
  }
`;

const trim = (str: string) => str.trim();

const removeEmpty = (str: string) => !!str;

export default function TaskButton() {
  const data = useTaskState();
  const { loadingUser, user } = useUser();
  const [labels, setLabels] = useState([]);
  const { name, labels: dataLabels } = data;
  const taskDispatch = useTaskDispatch();

  useEffect(() => {
    fetchData("user", `${user.uid}`)
      .then((data) => {
        if (data) {
          const { labels } = data;
          labels && setLabels(labels);
        }
      })
      .catch((err) => toast.error(err));
  }, []);

  const uploadTask = () => {
    const { message, isValid } = getValidState(data);

    if (!isValid) {
      toast.error(message);
      return 0;
    }

    const labelList = dataLabels
      .split(",")
      .map(trim)
      .filter(removeEmpty)
      .map((item: any) => item);

    createData("user", user.uid, {
      labels: uniqueArray([...labels, ...labelList]),
    })
      .then(() => {
        const id = data.id || v4();
        createData("user", `${user.uid}/tasks/${id}`, {
          ...data,
          modified: Date.now(),
          id,
        });
      })
      .then(() => {
        taskDispatch(
          addTask({
            ...initialState,
          })
        );
      })
      .then(() => {
        if (data.id) toast.success("Task updated");
        else toast.success("Task created");
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };
  if (loadingUser) return null;
  return (
    <>
      <Button onClick={uploadTask}>Save</Button>
    </>
  );
}
