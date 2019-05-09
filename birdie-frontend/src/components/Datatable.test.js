import React from "react";
import ReactDOM from "react-dom";
import Datatable from "./Datatable";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Datatable
      data={{
        sorted: {
          "10th grade": 42809,
          "11th grade": 41904
        },
        average_age: {
          "10th grade": 38.4441,
          "11th grade": 35.4045
        }
      }}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
