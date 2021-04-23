import React, { useEffect, useState } from "react";
import { MdAddBox, MdCheck } from "react-icons/md";
import { toast } from "react-toastify";
import styled from "styled-components";
import { v4 } from "uuid";
import Layout from "../container/Layout";
import { useUser } from "../context/userContext";
import createData from "../scripts/createData";
import watchData from "../scripts/watchData";

const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  align-items: center;
  box-shadow: 0 0 0.2rem silver;
  margin: 0.4rem;
  background: ${({ disabled }) => (disabled ? "silver" : "white")};
  & > div {
    display: flex;
    align-items: center;
  }
  & svg {
    margin-left: 2rem;
    color: beige;
    background: ${({ theme }) => theme.palette.primary.dark};
    border-radius: 50%;
    cursor: pointer;
  }
`;

const Add = styled.div`
  display: flex;
  align-items: center;
  & svg {
    margin-right: 0.4rem;
    font-size: 3.2rem;
  }
`;
export default function Rewards() {
  const [rewards, setRewards] = useState([] as any[]);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [value, setValue] = useState({ name: "", cost: 0 });
  const { user } = useUser();
  const { points } = user;
  useEffect(() => {
    user &&
      watchData(`user/${user.uid}/rewards`, (e) => setRewards(e)).catch((err) =>
        toast.error(err)
      );
  }, [user]);

  const useReward = ({
    id,
    done,
    cost,
    name,
  }: {
    id: string;
    done: number[];
    cost: number;
    name: number;
  }) => {
    if (points > cost)
      createData("user", `${user.uid}/rewards/${id}`, {
        done: [...done, Date.now()],
      })
        .then(() => {
          createData("user", user.uid, {
            points: points - cost,
          });
          toast.info(`${name} done`);
        })
        .catch((err) => toast.error(err));
  };

  const createNewReward = () => {
    const id = v4();
    createData("user", `${user.uid}/rewards/${id}`, {
      id,
      done: [],
      ...value,
    })
      .then(() => {
        setValue({ name: "", cost: 0 });
        setIsAddVisible(false);
        toast.success("New reward created");
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <Layout activePath="rewards">
      <h2>Points: {points}</h2>
      <Add onClick={() => setIsAddVisible(!isAddVisible)}>
        <MdAddBox /> Add
      </Add>
      {isAddVisible && (
        <div>
          <input
            onChange={(e) => setValue({ ...value, name: e.target.value })}
            placeholder="Name"
          />
          <input
            onChange={(e) =>
              setValue({ ...value, cost: Number(e.target.value) })
            }
            placeholder="Cost"
            type="number"
          />
          <button onClick={createNewReward}>Create</button>
        </div>
      )}
      {rewards
        .sort((prev, next) => (prev.cost < next.cost ? -1 : 1))
        .map((item, idx) => (
          <Wrapper key={idx} disabled={points < item.cost}>
            <h4>{item.name}</h4>
            <div>
              {item.cost}
              <MdCheck onClick={() => useReward(item)} />
            </div>
          </Wrapper>
        ))}
    </Layout>
  );
}
