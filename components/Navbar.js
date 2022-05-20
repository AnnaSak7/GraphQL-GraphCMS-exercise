import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/disney.png";

const Navbar = ({ account }) => {
  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <Link href="/">
          <Image src={logo} alt="Disney Logo" width={90} height={50}></Image>
        </Link>
      </div>
      <div className="account-info">
        <p>Welcome {account.username}</p>
        <img className="avatar" src={account.avatar.url} alt="avatar" />
      </div>
    </div>
  );
};

export default Navbar;
