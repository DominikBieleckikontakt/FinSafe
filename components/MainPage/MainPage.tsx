import { Circles } from "..";

const MainPage = () => {
  return (
    <div className="h-[calc(100vh-10rem)] overflow-x-hidden overflow-y-hidden flex justify-center items-center">
      <div className="flex justify-center items-center h-full">
        <Circles />
      </div>
    </div>
  );
};

export default MainPage;
