import React, { Component, Fragment } from "react";
import Listingwrapper from "./Listingwrapper";
import Search from "../homefour/Search";

class Content extends Component {
  render() {
    return (
      <Fragment>
        <Listingwrapper />
        <Search />
      </Fragment>
    );
  }
}

export default Content;
