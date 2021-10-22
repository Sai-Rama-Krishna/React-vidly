import React from "react";

class TableHeader extends React.Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <div>
        <thead>
          <tr>
            {this.props.colums.map((column) => (
              <th> {column.label}</th>
            ))}
          </tr>
        </thead>
      </div>
    );
  }
}

export default TableHeader;
