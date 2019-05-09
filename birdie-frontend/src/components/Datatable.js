import React, { Component } from "react";
import { Table, TableRow, TableBody, TableHeader, TableCell } from "grommet";
import _ from "lodash";
import ReactLoading from "react-loading";

export default class Datatable extends Component {
  render() {
    let count = 0;
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              #
            </TableCell>
            <TableCell scope="col" border="bottom">
              {_.capitalize(this.props.filter)}
            </TableCell>
            <TableCell scope="col" border="bottom">
              Count
            </TableCell>
            <TableCell scope="col" border="bottom">
              Average Age
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.props.data.sorted ? (
            Object.keys(this.props.data.sorted)
              .slice(0, 100)
              .map(item => {
                count++;
                return (
                  <TableRow key={count}>
                    <TableCell>{count}</TableCell>
                    <TableCell>{item}</TableCell>
                    <TableCell>{this.props.data.sorted[item]}</TableCell>
                    <TableCell>
                      {Math.round(this.props.data.average_age[item])}
                    </TableCell>
                  </TableRow>
                );
              })
          ) : (
            <ReactLoading
              type="bubbles"
              color="#000000"
              height={100}
              width={100}
            />
          )}
          {this.props.data.sorted &&
            Object.keys(this.props.data.sorted).length > 100 && (
              <TableRow>
                <TableCell>
                  {100 - Object.keys(this.props.data).length} Undisplayed rows
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    );
  }
}
