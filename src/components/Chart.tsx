import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface RepoData {
  name: string;
  commit_count: number;
}

interface ChartProps {
  username: string;
}

const Chart: React.FC<ChartProps> = ({ username }) => {
  const [repoData, setRepoData] = useState<RepoData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!username) {
        setError("GitHub username is missing!");
        return;
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();
        const repoDetails = await Promise.all(
          repos.map(async (repo: any) => {
            const commitsResponse = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/commits`
            );
            const commits = await commitsResponse.json();
            return {
              name: repo.name,
              commit_count: commits.length,
            };
          })
        );

        setRepoData(repoDetails);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setRepoData([]);
      }
    };

    fetchData();
  }, [username]);
  console.log("repoData", repoData);
  return (
    <div className="w-full h-[400px] p-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={repoData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="commit_count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
