import React from "react";
import { Provider } from "react-redux";
import Layout from "@/layout";
import store from "@/store/store";
import "@/styles/globals.css";
// import { AuthProvider } from "@/context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    
      <Component {...pageProps} />
    
  );
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <MyApp Component={Component} pageProps={pageProps} />
      </Layout>
    </Provider>
  );
}
