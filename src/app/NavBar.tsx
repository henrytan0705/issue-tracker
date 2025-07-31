"use client";

import Link from "next/link";
import React from "react";
import { GiRadarSweep } from "react-icons/gi";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

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
          <li key={href}>
            <Link
              className={classNames({
                "text-gray-500": pathname !== href,
                "text-gray-900": pathname === href,
                "hover:text-gray-800 transition-colors": true,
              })}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Box>
        {status === "authenticated" ? (
          <Link href="/api/auth/signout">Log Out</Link>
        ) : (
          <Link href="/api/auth/signin">Log In</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
