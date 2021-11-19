import React from "react";
// import Table from "./common/table";
import ReactLoading from "react-loading";
import TableBody from "./common/tableBody";
import _ from "lodash";
import get_users from "../redux/actions/userslistAction";
import { connect } from "react-redux";

class Users extends React.Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  state = {
    isLoading: true,
    colums: [
      {
        path: "name",
        label: "Username",
      },

      { path: "email", label: "Email" },
      { path: "isAdmin", label: "Admin" },
    ],
    users: [],
  };

  createkey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  constructor() {
    super();
    this.state.isLoading = true;
  }

  async componentDidMount() {
    if (!this.props.getuserslist) {
      await get_users();
    }

    const ss = (await this.props) && this.props.getuserslist;

    ss
      ? await this.setState({ users: ss.users })
      : this.setState({ users: [] });
    // this.setState({ users: ss.users });
    this.setState({ isLoading: false });
  }
  render() {
    const { colums, users } = this.state;
    return (
      <div>
        <table className="table table-light">
          <thead>
            <tr>
              {colums.map((column) => (
                <th scope="col" key={column.path || column.key}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <TableBody colums={colums} data={users} />
          {/* <tbody>
          {this.state.users.map((item) => (
            <tr key={item._id}>
              {this.state.colums.map((column) => (
                <td key={this.createkey(item, column)}>
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody> */}
        </table>
        {this.state.isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
              height: "100vh",
            }}
          >
            <ReactLoading
              type="bars"
              color="#aaaa"
              height={"10%"}
              width={"10%"}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getuserslist: state.getuserslist,
    //  entities : state.entities
  };
};

export default connect(mapStateToProps)(Users);
