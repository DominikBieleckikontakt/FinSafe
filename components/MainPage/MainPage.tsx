import Link from "next/link";
import { Circles } from "..";

const MainPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-x-hidden overflow-y-hidden">
      <div className="text-white text-3xl pt-10 text-center sm:pl-24 sm:text-left font-light italic">
        <Link href="/">
          Fin<span className="font-normal text-primary">Safe</span>
        </Link>
      </div>
      <div className="flex justify-center items-center h-full">
        <Circles />
      </div>
    </div>
  );
};

export default MainPage;
