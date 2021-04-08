import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";

export default function Home() {
  return (
    <Layout>
      <AppContainer active="today">This is the content of today</AppContainer>
    </Layout>
  );
}
