import Layout from "../components/Layout";
import Image from "next/image";
import Auth from "../components/Auth";

export default function Home() {
  return (
    <Layout title="Login">
      <Auth />
    </Layout>
  );
}
