import { useContext, useState } from "react";
import { CounterContext } from "./App";

const Counter = () => {
  const counter = useContext(CounterContext);
  const [count, setCount] = useState(0);

  const handleClickGet = async () => {
    try {
      console.log("trigger get count");
      const currentCount = await counter.counter();
      setCount(currentCount.toString());
    } catch (e) {
      console.log(e);
    }
  };
  const handleClickIncrement = async () => {
    try {
      console.log("trigger + count");
      const tx = await counter.increment();
      await tx.wait();
       console.log("resolved + count");
      const currentCount = await counter.counter();
      setCount(currentCount.toString());
    } catch (e) {
      console.log(e);
    }
  };
  const handleClickDecrement = async () => {
    try {
      console.log("trigger - count");
      const tx = await counter.decrement();
      await tx.wait();
      console.log("resolved - count");
      const currentCount = await counter.counter();
      setCount(currentCount.toString());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Counter</h1>
      <p>count: {count}</p>
      <button onClick={handleClickGet}>get count</button>
      <button onClick={handleClickIncrement}>+</button>
      <button onClick={handleClickDecrement}>-</button>
    </>
  );
};

export default Counter;
