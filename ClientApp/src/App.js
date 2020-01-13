import React, { Component } from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { FetchData } from "./components/FetchData";
import SegmentsPage from "./components/Segments/Components/SegmentsPage";

import "./custom.css";

const navItems = [
  {
    link: "/segments",
    title: "Odcinki"
    // icon: <p></p>
  },
  {
    link: "/points",
    title: "Punkty"
    // icon: <p></p>
  }
];

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <>
        <Layout navItems={navItems}>
          <Route exact path="/" component={HomePage} />
          <Route path="/segments" component={SegmentsPage} />
          <Route path="/fetch-data" component={FetchData} />
        </Layout>
      </>
    );
  }
}
