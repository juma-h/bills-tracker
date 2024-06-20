"use client";
import React, { useState } from "react";
import Example from "../components/PieChart";
import TableData from "../components/TableFormat";

export default function Home() {
  const [visualization, setVisualization] = useState("charts");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 lg:p-24 bg-black dark:bg-black">
      <div className="z-10 w-full flex flex-col items-center lg:flex-row lg:justify-between font-mono text-sm">
        <div className="lg:w-1/2 lg:text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
            Finance Bill Data
          </h1>
        </div>

        <div className="max-w-sm mx-auto lg:mx-0 lg:w-1/2 mb-4 lg:mb-0">
          <form className="lg:text-right">
            <select
              id="visualization"
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={visualization}
              onChange={(e) => setVisualization(e.target.value)}
            >
              <option value="charts">Charts</option>
              <option value="table">Table</option>
            </select>
          </form>
        </div>
      </div>

      <div className="w-full lg:w-3/4 mx-auto mt-8 lg:mt-16 my-5">
        <p className="text-gray-700">
          The Kenyan Finance Bill is a legislative proposal that outlines the
          government&apos;s revenue-raising measures and spending plans for the
          fiscal year 2024/2025. This bill is a critical component of the
          national budgetary process, aiming to fund public services,
          infrastructure development, and various government programs.
        </p>

        <div className="bg-black p-6 rounded-lg shadow-lg">
          <h2 className="text-white  mb-4">Resources for Finance Bill 2024</h2>
          <ul className="text-gray-300 list-disc">
            <li className="mb-4">
              <a
                className="text-orange-600 hover:underline"
                href="https://chatgpt.com/g/g-JBq7D0E5x-finance-bill-gpt"
                target="_blank"
                rel="noopener noreferrer"
              >
                Finance Bill GPT
              </a>{" "}
              By Kelvin Onkundi. Get to understand the Kenya Finance Bill 2024.
            </li>
            <li className="mb-4">
              <a
                className="text-orange-600 hover:underline"
                href="https://globaltaxnews.ey.com/news/2024-1032-kenya-proposes-tax-changes-under-the-finance-bill-2024"
                target="_blank"
                rel="noopener noreferrer"
              >
                Summary of the Finance Bill 2023
              </a>
            </li>
          </ul>
        </div>

        <h2 className="text-center font-semibold">Finance Bill Votes</h2>
        <p className="text-sm  text-center italic text-red-300 mb-2">
          The current data of 2024 does not have a tally of complete votes but
          will be updated soon!
        </p>

        {visualization === "charts" && <Example />}
        {visualization === "table" && <TableData />}
      </div>
    </main>
  );
}
