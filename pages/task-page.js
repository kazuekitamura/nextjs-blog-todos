import { useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTasksData } from "../lib/tasks";
import Task from "../components/Task";
import useSWR from "swr";
import StateContextProvider from "../context/StateContext";
import TaskForm from "../components/TaskForm";

// エンドポイントのurlを引数に受け取ってレスポンスをjsonのフォーマットに変換
const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

export default function TaskPage({ staticfilterdTasks }) {
  // useSWRの第３引数にinitialData（ビルド時に取得したデータ）を渡す(Userが最初に目にする画面)。返り値としてdata: tasksを返す
  // mutate関数,いろんなところで実行することでデータのキャッシュの内容を最新にしてくれる
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticfilterdTasks,
  });
  // 最新順にソートをかける.時間がたった後に最新のfilterdTasksに書き換わる
  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  // タスクページがマウントされた時にキャッシュの内容が更新されるようにuseEffectを使う,useSWRで取得するキャッシュを最新にすることができる
  useEffect(() => {
    mutate();
  }, []);
  // <StateContextProvider>でラップされた全てでStateを使うことができる
  return (
    <StateContextProvider>
      <Layout title="Task page">
        <TaskForm taskCreated={mutate} />
        {/* データをmapで展開 taskDeleted={mutate}のmutateをpropsで渡していく*/}
        <ul>
          {filteredTasks &&
            filteredTasks.map((task) => (
              <Task key={task.id} task={task} taskDeleted={mutate} />
            ))}
        </ul>
        <Link href="/main-page">
          <div className="flex cursor-pointer mt-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            <span>Back to main page</span>
          </div>
        </Link>
      </Layout>
    </StateContextProvider>
  );
}
// ビルド時に呼び出されてサーバーサイドで実行される関数
export async function getStaticProps() {
  const staticfilterdTasks = await getAllTasksData();

  return {
    props: { staticfilterdTasks },
    revalidate: 3,
  };
}
