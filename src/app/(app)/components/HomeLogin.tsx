import Link from "next/link";

function HomeLogin() {
  return (
    <div className="flex justify-start w-full px-5 lg:px-10">
      <Link
        href={"/login"}
        className="border-2 p-2 px-10 border-green1 rounded-md">
        Login
      </Link>
    </div>
  );
}

export default HomeLogin;
