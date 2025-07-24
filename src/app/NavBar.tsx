"use client";

import Link from "next/link";
import React from "react";
import { GiRadarSweep } from "react-icons/gi";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <GiRadarSweep />
      </Link>

      <ul className="flex space-x-6">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            className={classNames({
              "text-gray-500": pathname !== href,
              "text-gray-900": pathname === href,
              "hover:text-gray-800 transition-colors": true,
            })}
            href={href}
          >
            {label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
