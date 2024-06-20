"use client";
import { useState, useMemo, ChangeEvent, useEffect } from "react";
import VotesData2023 from "../json-data/csv.json";
import VotesData2024 from "../json-data/fb24.json";

interface VoteData {
  name: string;
  vote: string;
  constituency?: string; // Make constituency optional
}

const TableData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [year, setYear] = useState<string>('2023');
  const itemsPerPage = 10;

  // Function to normalize data to the required structure
  const normalizeData = (rawData: any[]): VoteData[] => {
    return rawData.map(item => ({
      name: item.name || item.MP, // Use item.name or item.MP based on the data structure
      vote: item.vote,
      constituency: item.constituency || item.Constituency, // Use item.constituency or item.Constituency based on the data structure
    }));
  };

  const fetchData = (year: string) => {
    let rawData: any[] = [];
    if (year === '2023') {
      rawData = VotesData2023;
    } else if (year === '2024') {
      rawData = VotesData2024;
    }
    return normalizeData(rawData);
  };

  // Fetch the initial data based on the selected year
  const [data, setData] = useState<VoteData[]>(fetchData(year));

  // Update data when year changes
  useEffect(() => {
    setData(fetchData(year));
  }, [year]);

  // Filter and search logic
  const filteredData: VoteData[] = useMemo(() => {
    return data.filter((item: VoteData) =>
      item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  // Pagination logic
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getVoteClass = (vote: string): string => {
    if (vote === "YES") return "text-green-500";
    if (vote === "NO") return "text-red-500";
    if (vote === "ABSENT") return "text-orange-500";
    return "";
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="mb-4">
        <label htmlFor="year-select" className="mr-2">Select Year: </label>
        <select
          id="year-select"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="px-4 py-2 border rounded-lg text-black"
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-lg w-full text-black"
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Constituency
            </th>
            <th scope="col" className="px-6 py-3">
              Vote
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item: VoteData, index: number) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.constituency}</td>
              <td className={`px-6 py-4 ${getVoteClass(item.vote)}`}>
                {item.vote}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mx-1 px-3 py-1 border rounded ${
            currentPage === 1 ? "bg-gray-200" : "bg-none text-white"
          }`}
        >
          {"<"}
        </button>
  
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
          className={`mx-1 px-3 py-1 border rounded ${
            currentPage === pageCount ? "bg-gray-200" : "bg-none text-white"
          }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default TableData;
