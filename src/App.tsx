import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { IoCalendarClearSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
function App() {
  const [userName, setUserName] = useState("");

  const { data, refetch, isFetching, isError } = useQuery({
    queryKey: ["data", userName],
    queryFn: async () => {
      if (!userName.trim()) return null;
      const res = await axios.get(`https://api.github.com/users/${userName}`);
      return res.data;
    },
    enabled: false,
  });

  const {
    data: repos,
    refetch: refetchRepos,
    isFetching: isFetchingRepos,
  } = useQuery({
    queryKey: ["repos", userName],
    queryFn: async () => {
      if (!userName.trim()) return [];
      const res = await axios.get(
        `https://api.github.com/users/${userName}/repos`
      );
      return res.data;
    },
    enabled: false,
  });
  console.log(repos);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // setUserName(userName);
    refetch();
    refetchRepos();
  };
  return (
    <div className="max-w-[1200ox] w-11/12 mx-auto px-4 py-10 flex flex-col items-center">
      {/* Search Bar */}
      <div className="grid md:grid-cols-12 grid-cols-1 gap-5 w-full">
        <div className="md:col-span-8 w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-2 md:p-4 flex gap-2 md:gap-4 items-center w-full shadow-md border">
              <div className="relative w-full">
                <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                <Input
                  onChange={(e) => setUserName(e.target.value)}
                  className="pl-10 rounded-none focus-visible:ring-2 focus-visible:ring-primary transition w-full"
                  type="search"
                  value={userName}
                  placeholder="Search GitHub username..."
                />
              </div>
              <Button className="rounded-none px-6 font-semibold cursor-pointer">
                Search
              </Button>
            </div>
          </form>

          {/* {data && ( */}
          <div className="bg-white p-6 w-full  border mt-5 shadow-sm space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 md:gap-6">
              <div className="flex md:flex-row flex-col items-center gap-5">
                <img
                  src={
                    data?.avatar_url ||
                    "https://i.ibb.co.com/QjxD8myQ/image.png"
                  }
                  className="w-24 h-24 rounded-full border shadow-sm"
                  alt="profile"
                />
                <div>
                  <h3 className="text-xl font-semibold">
                    {data?.name || "No Name"}
                  </h3>
                  <p className="text-gray-500">@{data?.login || "noname"}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <IoCalendarClearSharp /> Joined:{" "}
                {new Date(data?.created_at).toDateString() || "Not available"}
              </p>
            </div>

            <hr />

            {/* Stats Section */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 text-center">
              <div className="border  py-5 shadow-sm hover:shadow-md transition">
                <p className="text-2xl font-bold text-violet-700">
                  {data?.public_repos || "0"}
                </p>
                <h4 className="text-gray-600 mt-1">Repositories</h4>
              </div>
              <div className="border  py-5 shadow-sm hover:shadow-md transition">
                <p className="text-2xl font-bold text-violet-700">
                  {data?.followers || "0"}
                </p>
                <h4 className="text-gray-600 mt-1">Followers</h4>
              </div>
              <div className="border  py-5 shadow-sm hover:shadow-md transition">
                <p className="text-2xl font-bold text-violet-700">
                  {data?.following || "0"}
                </p>
                <h4 className="text-gray-600 mt-1">Following</h4>
              </div>
            </div>

            <hr />

            {/* Info Section */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <CiLocationOn className="text-lg" />
                <p>{data?.location || "Not available"}</p>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineEmail className="text-lg" />
                <p>{data?.email || "Not available"}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaLink className="text-lg" />
                {data?.blog ? (
                  <a
                    href={data.blog}
                    className="hover:underline text-violet-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.blog}
                  </a>
                ) : (
                  <p>Not available</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-4 border shadow p-4 w-full">
          <h3 className="text-2xl pb-2 border-b">All Repositories</h3>
          <div className="flex flex-col gap-3 p-2 mt-1 max-h-[600px] overflow-x-scroll">
            {isFetchingRepos ? (
              <p>Loading repositories...</p>
            ) : repos && repos.length > 0 ? (
              repos.map((repo: any) => (
                <div
                  key={repo.id}
                  className="border p-3 rounded hover:shadow transition"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-violet-700 hover:underline"
                  >
                    {repo.name}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    {repo.description || "No description"}
                  </p>
                  <div className="text-sm text-gray-500 mt-2 flex gap-4">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🧑‍💻 {repo.language || "Unknown"}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No repositories found or user not found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
