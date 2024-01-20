import React from "react";
import Link from "next/link";

const NotLoggedIn = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white">
        Please login to see this page.
      </h2>
      <Link
        href="/login"
        className="text-md text-primary-darker hover:text-primary duration-300"
      >
        Click to go to the login page
      </Link>
    </div>
  );
};

export default NotLoggedIn;
