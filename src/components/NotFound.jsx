import React from "react";
import error from "../assets/404.png";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <img src={error} alt="404 Not Found" />
    </div>
  );
};

export default NotFound;
