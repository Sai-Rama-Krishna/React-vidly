import React from "react";
import Table from "./common/table";

class UserTable extends React.Component {
  colums = [
    { path: "name", label: "Customer" },
    { path: "phone", label: "Phone No." },
    { path: "gold", label: "Gold" },
  ];
  render() {
    const { customers, sortColumn, onSort } = this.props;

    return (
      <div>
        <h2> Customers </h2>
        <Table
          colums={this.colums}
          data={customers}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default UserTable;
