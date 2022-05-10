import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/disney.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link href="/">
        <Image src={logo} alt="Disney Logo" width={90} height={50}></Image>
      </Link>
    </div>
  );
};

export default Navbar;
