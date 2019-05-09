import React, { Component } from "react";
import { Select, Box } from "grommet";
import _ from "lodash";
export default class Selector extends Component {
  state = {
    listOpen: false,
    value: ""
  };

  handleChange = selectedOption => {
    this.setState({ value: selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const list = this.props.columns;

    return (
      <Box gridArea="main">
        <Box
          direction="row"
          alignContent="around"
          justify="end"
          margin={{ left: "medium", right: "medium" }}
        >
          <Select
            margin={{ bottom: "10px" }}
            placeholder="Choose a variable"
            options={list}
            value={_.capitalize(this.state.value)}
            fill="true"
            align="right"
            width="medium"
            onChange={({ option }) => {
              this.props.filter(option);
              this.setState({ value: option });
            }}
          />
        </Box>
      </Box>
    );
  }
}
