import React from "react";
import ReactLoading from "react-loading";

const loading = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={"50%"} width={"50%"} />
);

export default loading;
