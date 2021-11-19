import React from "react";
import _ from "lodash";
// import UserTable from "./usersTable";
// import Pagination from "./common/pagination";
// import { paginate } from "../utils/paginate";
// import { getCustomers } from "../services/customersService";
import ReactLoading from "react-loading";
// import TableBody from "./common/tableBody";

import get_customers from "../redux/actions/customerslistAction";
import { connect } from "react-redux";

class Customers extends React.Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  state = {
    customers: [],
    colums: [
      { path: "name", label: "Customer" },
      { path: "phone", label: "Phone No." },
    ],
    pageSize: 4,
    currentPage: 1,
    isLoading: true,
    sortColumn: { path: "name", order: "asc" },
  };

  constructor() {
    super();
    this.state.isLoading = true;
  }

  async componentDidMount() {
    if (!this.props.getcustomerslist) {
      await get_customers();
    }

    const ss = (await this.props) && this.props.getcustomerslist;
    // console.log(ss);
    // if (!ss) this.setState({ customers: [] });
    // console.log(ss);
    ss
      ? await this.setState({ customers: ss.customers })
      : this.setState({ customers: [] });

    this.setState({ isLoading: false });
  }

  // handlePageChange = (page) => {
  //   this.setState({ currentPage: page });
  // };
  // handleSort = (sortColumn) => {
  //   this.setState({ sortColumn });
  // };
  // getPageData = () => {
  //   const {
  //     pageSize,
  //     currentPage,
  //     customers: allcustomers,
  //     sortColumn,
  //   } = this.state;

  //   let filtered = allcustomers;

  //   const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  //   const customers = paginate(sorted, currentPage, pageSize);
  //   return { totalCount: filtered.length, data: customers };
  // };

  createkey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    // const { pageSize, currentPage, sortColumn,customers } = this.state;
    // const { totalCount, data: customers } = this.getPageData();
    const { colums } = this.state;

    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr className="table-secondary">
            {colums.map((column) => (
              <th scope="col" key={column.path || column.key}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
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
              height={"20%"}
              width={"20%"}
            />
          </div>
        ) : (
          ""
        )}
        {/* <TableBody colums={colums} data={customers} /> */}
        <tbody>
          {this.state.customers.map((item) => (
            <tr key={item._id} className="table-secondary">
              {this.state.colums.map((column) => (
                <td
                  key={this.createkey(item, column)}
                  className="table-secondary"
                >
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      // <div className="row mt-5">
      //   <div className="col">
      //     <UserTable
      //       customers={customers}
      //       sortColumn={sortColumn}
      //       onSort={this.handleSort}
      //     />
      //     <Pagination
      //       itemsCount={totalCount}
      //       pageSize={pageSize}
      //       currentPage={currentPage}
      //       onPageChange={this.handlePageChange}
      //     />
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getcustomerslist: state.getcustomerslist,
    //  entities : state.entities
  };
};

export default connect(mapStateToProps)(Customers);
