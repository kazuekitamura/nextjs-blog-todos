import fetch from "node-fetch";

//fetchを使ってApiのエンドポイントにアクセスする
export async function getAllTasksData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const tasks = await res.json();
  //取得後に投稿順に並び変える。ビルド時にサーバーサイドで実行される関数、blog-pageのgetStaticPropsから呼び出される
  const staticfilterdTasks = tasks.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return staticfilterdTasks;
}

// idの一覧を取得
export async function getAllTaskIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const tasks = await res.json();
  // tasksを展開してidの要素だけparamsと命名して取り出す
  return tasks.map((task) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });
}

// 指定されたIdに基づいて特定のタスクのデータを取得する.受け取ったtaskは返り値にする
export async function getTaskData(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`)
  );
  const task = await res.json();
  // return {
  //   post,
  // };
  return task;
}
