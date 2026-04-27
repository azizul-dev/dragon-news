"use client";

import Link from "next/link";
import React from "react";
import userAvatar from "@/assets/user.png";
import Image from "next/image";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";

const NavBar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <div className=" container mx-auto flex justify-between mt-6 ga4">
      <div></div>
      <ul className=" flex justify-between items-center gap-4 text-gray-600">
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          <NavLink href="/about">About</NavLink>
        </li>
        <li>
          <NavLink href="/career">Career</NavLink>
        </li>
      </ul>

      {isPending ? (
        "Loading..."
      ) : user ? (
        <div className=" flex items-center gap-2">
          <h2>Hello, {user.name}</h2>
          <Image
            src={user.image || userAvatar}
            alt="User Avatar"
            width={50}
            height={50}
          ></Image>
          <button
            onClick={async () => await authClient.signOut()}
            className=" btn btn-secondary"
          >
            Logout
          </button>
        </div>
      ) : (
        <button className=" btn btn-secondary">
          <Link href="/login">Login</Link>
        </button>
      )}
    </div>
  );
};

export default NavBar;
