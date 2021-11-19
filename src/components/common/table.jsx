import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableheader";
import ReactLoading from "react-loading";

class Table extends React.Component {
  state = {
    isLoading: true,
  };

  constructor() {
    super();
    this.state.isLoading = true;
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    const { colums, sortColumn, onSort, data } = this.props;
    return (
      <div>
        <table className="table">
          <TableHeader
            colums={colums}
            sortColumn={sortColumn}
            onSort={onSort}
          />
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
                height={"50%"}
                width={"20%"}
              />
            </div>
          ) : (
            ""
          )}
          <TableBody colums={colums} data={data} />
        </table>
      </div>
    );
  }
}

export default Table;

// const Table = ({ colums, sortColumn, onSort, data }) => {

//   return (
//     <table className="table">
//       <TableHeader colums={colums} sortColumn={sortColumn} onSort={onSort} />
//       <ReactLoading
//               type="bars"
//               color="#aaaa"
//               height={"20%"}
//               width={"20%"}
//             />
//       <TableBody colums={colums} data={data} />
//     </table>
//   );
// };

// export default Table;
