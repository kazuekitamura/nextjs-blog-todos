import fetch from "node-fetch";

// fetchを使ってApiのエンドポイントにアクセスする
export async function getAllPostsData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts = await res.json();
  //取得後にブログの投稿順に並び変える。ビルド時にサーバーサイドで実行される関数、blog-pageのgetStaticPropsから呼び出される
  const filterdPosts = posts.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return filterdPosts;
}

// idの一覧を取得
export async function getAllPostIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts = await res.json();
  // postを展開してidの要素だけparamsと命名して取り出す
  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
}

// 指定されたIdに基づいて特定のブログ記事のデータを取得する.受け取ったpostは返り値にする
export async function getPostData(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`)
  );
  const post = await res.json();
  // return {
  //   post,
  // };
  return post;
}
