import React, { Component } from "react";

import API from "./API";
import "./App.css";
import Selector from "./components/Selector";
import { Grommet, Box } from "grommet";
import Datatable from "./components/Datatable";

class App extends Component {
  state = {
    columns: [],
    filter: "",
    data: {}
  };

  addColumnsToState = () => {
    API.getColumns().then(columns => {
      console.log(columns);
      this.setState({ columns: columns["output"] });
    });
  };

  chooseFilter = event => {
    this.setState({ filter: event });
    API.getData(event).then(data => this.setState({ data: data }));
  };

  componentDidMount() {
    this.setState({ columns: [] });
    this.addColumnsToState();
  }
  render() {
    return (
      <Grommet>
        <h1>Census Explorer</h1>
        <Selector columns={this.state.columns} filter={this.chooseFilter} />
        <Box margin={{ left: "large", right: "large" }}>
          <Datatable filter={this.state.filter} data={this.state.data} />
        </Box>
      </Grommet>
    );
  }
}

export default App;
