import { createContext, useState } from "react";

// 編集アイコンが押された時どのタスクが選択されたか保持するためにstateを作る。
export const StateContext = createContext();

export default function StateContextProvider(props) {
  const [selectedTask, setSelectedTask] = useState({ id: 0, title: "" });
  // ラップした要素全てがchilderenに入る
  return (
    <StateContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
}
