import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="my-4">
      <div className="flex justify-between items-center max-w-[1100px] w-11/12  mx-auto bg-white p-2.5  border border-gray-200 rounded-full shadow-lg">
        <div className="lg:ml-5 flex items-center gap-2 relative">
          <h3 className="md:text-3xl text-2xl font-semibold text-violet-700  ">
            Gitview
          </h3>
        </div>
        <Button className="rounded-full">Search Profile</Button>
      </div>
    </div>
  );
};

export default Navbar;
