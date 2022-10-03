import React, { Component } from "react";

class Preloader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchSuccess: false
    };
  }
  componentDidMount() {
    window.addEventListener("load", () => {
      this.setState({
        fetchSuccess: true
      });
    });
  }
  render() {
    const hidden = this.state.fetchSuccess ? " hidden" : "";
    return (
      <div className={`acr-preloader${hidden}`}>
        <img src={process.env.PUBLIC_URL + "/assets/img/loader.gif"} alt="logo" />
      </div>
    );
  }
}

export default Preloader;
