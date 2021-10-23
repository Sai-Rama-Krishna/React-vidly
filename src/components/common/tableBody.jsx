import React from "react";
import _ from "lodash";

class TableBody extends React.Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createkey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, colums } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {colums.map((column) => (
              <td key={this.createkey(item, column)}>
                {" "}
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
