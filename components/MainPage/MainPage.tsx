import { Circles } from "..";

const MainPage = () => {
  return (
    <div className="max-sm:h-[calc(100vh-10rem)] sm:mt-10 sm:mb-10 overflow-x-hidden overflow-y-hidden flex justify-center items-center">
      <div className="flex justify-center items-center h-full">
        <Circles />
      </div>
    </div>
  );
};

export default MainPage;
