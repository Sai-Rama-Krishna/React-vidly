import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableheader";

const Table = ({ colums, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader colums={colums} sortColumn={sortColumn} onSort={onSort} />
      <TableBody colums={colums} data={data} />
    </table>
  );
};

export default Table;
