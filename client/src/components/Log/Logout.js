import React from "react";

const Logout = () => {
  const logout = () => {
    localStorage.removeItem("jwt")
    window.location = "/my-social-network"
  };

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
