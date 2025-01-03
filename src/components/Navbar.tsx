import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex flex-col">
      <div className="border-b p-4 py-3">
        <p className="font-bold text-gray-600 text-xl">Drala Explorer</p>
      </div>
      <nav className="border-b p-2">
        <ul className="flex items-center gap-2">
          <li>
            <Button variant={"link"} asChild>
              <Link href={"/"}>Home</Link>
            </Button>
          </li>
          <li>
            <Button variant={"link"} asChild>
              <Link href={"/balance"}>Balances</Link>
            </Button>
          </li>
          <li>
            <Button variant={"link"} asChild>
              <Link href={"/blocks"}>Blocks</Link>
            </Button>
          </li>
          <li>
            <Button variant={"link"} asChild>
              <Link href={"/transactions"}>Transactions</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
