import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { IoCalendarClearSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
function App() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
      {/* Search Bar */}
      <div className="bg-white p-2 md:p-4 rounded-full flex gap-2 md:gap-4 items-center w-full shadow-md border">
        <div className="relative w-full">
          <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
          <Input
            className="pl-10 rounded-full focus-visible:ring-2 focus-visible:ring-primary transition w-full"
            type="search"
            placeholder="Search GitHub username..."
          />
        </div>
        <Button className="rounded-full px-6 font-semibold">Search</Button>
      </div>

      {/* User Profile Card */}
      <div className="bg-white p-6 w-full rounded-2xl border mt-8 shadow-sm space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 md:gap-6">
          <div className="flex md:flex-row flex-col items-center gap-5">
            <img
              src="https://i.ibb.co.com/QjxD8myQ/image.png"
              className="w-24 h-24 rounded-full border shadow-sm"
              alt="profile"
            />
            <div>
              <h3 className="text-xl font-semibold">Rakib Hossen</h3>
              <p className="text-gray-500">@rakibhossen</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <IoCalendarClearSharp /> Joined: 10 April 2025
          </p>
        </div>

        <hr />

        {/* Stats Section */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 text-center">
          <div className="border rounded-sm py-5 shadow-sm hover:shadow-md transition">
            <p className="text-2xl font-bold text-violet-700">80+</p>
            <h4 className="text-gray-600 mt-1">Repositories</h4>
          </div>
          <div className="border rounded-sm py-5 shadow-sm hover:shadow-md transition">
            <p className="text-2xl font-bold text-violet-700">60+</p>
            <h4 className="text-gray-600 mt-1">Followers</h4>
          </div>
          <div className="border rounded-sm py-5 shadow-sm hover:shadow-md transition">
            <p className="text-2xl font-bold text-violet-700">70+</p>
            <h4 className="text-gray-600 mt-1">Following</h4>
          </div>
        </div>

        <hr />

        {/* Info Section */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <CiLocationOn className="text-lg" />
            <p>Comilla, Bangladesh</p>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineEmail className="text-lg" />
            <p>rakib@gmail.com</p>
          </div>
          <div className="flex items-center gap-2">
            <FaLink className="text-lg" />
            <a
              href="https://rakibhossen.vercel.app/"
              className="hover:underline text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              rakibhossen.vercel.app
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
