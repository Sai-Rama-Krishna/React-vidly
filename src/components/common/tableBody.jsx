import React from "react";
import _ from "lodash";
import ReactLoading from "react-loading";

class TableBody extends React.Component {
  state = {
    isLoading: true,
  };
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createkey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  constructor() {
    super();
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    const { data, colums } = this.props;
    return this.state.isLoading ? (
      <div>
        <ReactLoading type="bars" color="#aaaa" height={"30%"} width={"30%"} />
      </div>
    ) : (
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
