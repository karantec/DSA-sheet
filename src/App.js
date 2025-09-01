import { useEffect, useState, useMemo } from "react";

export default function App() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  useEffect(() => {
    const fetchSheet = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBVyDooYoIPC19s9sLqaQMbbBnAu_VR_DX4OnZiFLI8NMeBYJMeSfJlowGan_fvw/pub?gid=451760203&single=true&output=csv"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const csvText = await res.text();

        const parseCSV = (text) => {
          const lines = text.split("\n").filter((line) => line.trim());
          const result = [];

          for (let line of lines) {
            const row = [];
            let current = "";
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
              const char = line[i];
              const nextChar = line[i + 1];

              if (char === '"') {
                if (inQuotes && nextChar === '"') {
                  current += '"';
                  i++;
                } else {
                  inQuotes = !inQuotes;
                }
              } else if (char === "," && !inQuotes) {
                row.push(current.trim());
                current = "";
              } else {
                current += char;
              }
            }

            row.push(current.trim());

            if (row.some((cell) => cell !== "")) {
              result.push(row);
            }
          }

          return result;
        };

        const parsedRows = parseCSV(csvText);
        setRows(parsedRows);
      } catch (err) {
        console.error("Error fetching sheet:", err);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSheet();
  }, []);

  const filteredAndPaginatedData = useMemo(() => {
    if (rows.length === 0)
      return {
        data: [],
        totalPages: 0,
        totalItems: 0,
        topics: [],
        difficulties: [],
      };

    const headers = rows[0] || [];
    const dataRows = rows.slice(1);

    // Extract unique topics and difficulties for filter options
    const topics = [
      ...new Set(
        dataRows
          .map((row) => {
            // Look for topic column (common headers: Topic, Category, Type, Subject)
            const topicIndex = headers.findIndex(
              (header) =>
                (header && header.toLowerCase().includes("topic")) ||
                (header && header.toLowerCase().includes("category")) ||
                (header && header.toLowerCase().includes("type")) ||
                (header && header.toLowerCase().includes("subject")) ||
                (header && header.toLowerCase().includes("tag"))
            );
            return topicIndex !== -1
              ? String(row[topicIndex] || "").trim()
              : "";
          })
          .filter((topic) => topic !== "")
      ),
    ].sort();

    const difficulties = [
      ...new Set(
        dataRows
          .map((row) => {
            // Look for difficulty column (common headers: Difficulty, Level, Hard/Medium/Easy)
            const difficultyIndex = headers.findIndex(
              (header) =>
                (header && header.toLowerCase().includes("difficulty")) ||
                (header && header.toLowerCase().includes("level")) ||
                (header && header.toLowerCase().includes("hard")) ||
                (header && header.toLowerCase().includes("medium")) ||
                (header && header.toLowerCase().includes("easy"))
            );
            return difficultyIndex !== -1
              ? String(row[difficultyIndex] || "").trim()
              : "";
          })
          .filter((difficulty) => difficulty !== "")
      ),
    ].sort();

    // Apply filters
    const filtered = dataRows.filter((row) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        row.some((cell) =>
          String(cell || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );

      // Topic filter
      const topicIndex = headers.findIndex(
        (header) =>
          (header && header.toLowerCase().includes("topic")) ||
          (header && header.toLowerCase().includes("category")) ||
          (header && header.toLowerCase().includes("type")) ||
          (header && header.toLowerCase().includes("subject")) ||
          (header && header.toLowerCase().includes("tag"))
      );
      const matchesTopic =
        topicFilter === "" ||
        (topicIndex !== -1 &&
          String(row[topicIndex] || "").trim() === topicFilter);

      // Difficulty filter
      const difficultyIndex = headers.findIndex(
        (header) =>
          (header && header.toLowerCase().includes("difficulty")) ||
          (header && header.toLowerCase().includes("level")) ||
          (header && header.toLowerCase().includes("hard")) ||
          (header && header.toLowerCase().includes("medium")) ||
          (header && header.toLowerCase().includes("easy"))
      );
      const matchesDifficulty =
        difficultyFilter === "" ||
        (difficultyIndex !== -1 &&
          String(row[difficultyIndex] || "").trim() === difficultyFilter);

      return matchesSearch && matchesTopic && matchesDifficulty;
    });

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filtered.slice(startIndex, endIndex);

    return {
      headers,
      data: paginatedData,
      totalPages,
      totalItems,
      topics,
      difficulties,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalItems),
    };
  }, [
    rows,
    currentPage,
    itemsPerPage,
    searchTerm,
    topicFilter,
    difficultyFilter,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage, topicFilter, difficultyFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
  };

  const getPaginationButtons = () => {
    const { totalPages } = filteredAndPaginatedData;
    const buttons = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 mx-1 text-sm font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
        >
          ← Previous
        </button>
      );
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span
            key="ellipsis1"
            className="px-3 py-2 mx-1 text-gray-500 font-bold"
          >
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
            currentPage === i
              ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
              : "text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span
            key="ellipsis2"
            className="px-3 py-2 mx-1 text-gray-500 font-bold"
          >
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 mx-1 text-sm font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
        >
          Next →
        </button>
      );
    }

    return buttons;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-center bg-white/95 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-white/20">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 opacity-20 animate-pulse"></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Loading DSA Training Data
          </h2>
          <p className="text-gray-600 text-lg">
            Fetching student progress and results...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-orange-800 flex items-center justify-center">
        <div className="text-center bg-white/95 backdrop-blur-sm p-12 rounded-3xl shadow-2xl max-w-lg border border-white/20">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Connection Error
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const {
    headers,
    data,
    totalPages,
    totalItems,
    topics,
    difficulties,
    startIndex,
    endIndex,
  } = filteredAndPaginatedData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                🚀 DesiQNA Training Program
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Personalized DSA Training & 1-1 Mentoring Program
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">
                    1158+
                  </div>
                  <div className="text-white">Students Placed</div>
                  <div className="text-blue-200 text-sm">20+ LPA Offers</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div className="text-3xl font-bold text-green-300 mb-2">
                    2100+
                  </div>
                  <div className="text-white">LeetCode Rating</div>
                  <div className="text-blue-200 text-sm">Top 1% Worldwide</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div className="text-3xl font-bold text-pink-300 mb-2">
                    851
                  </div>
                  <div className="text-white">Training Hours</div>
                  <div className="text-blue-200 text-sm">24/7 Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Feature 1 */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Daily Live Classes
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Mon-Sun DSA classes with online tests, interview prep, competitive
              programming, and doubt sessions by Kumar K Sir (SDE @ Amazon)
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              1-1 Mentoring
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Personalized mentoring sessions to resolve your specific issues
              and accelerate your growth with individual attention from expert
              mentors
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Specialized Batches
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Separate cohorts for college students, freshers, working
              professionals, and non-IT graduates with tailored curriculum for
              each group
            </p>
          </div>
        </div>

        {/* Student Data Section */}
        {rows.length === 0 ? (
          <div className="text-center bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-16 border border-white/20">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Student Data Loading
            </h3>
            <p className="text-gray-600 text-lg">
              Please wait while we fetch the latest student progress data...
            </p>
          </div>
        ) : (
          <>
            {/* Advanced Controls Panel */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
              {/* Search Bar */}
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  🔍 Search Questions
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-6 w-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by question name, company, description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 border-2 border-purple-200 rounded-2xl leading-5 bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg"
                  />
                </div>
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                {/* Topic Filter */}
                <div>
                  <label
                    htmlFor="topicFilter"
                    className="block text-lg font-semibold text-gray-700 mb-3"
                  >
                    📚 Filter by Topic
                  </label>
                  <select
                    id="topicFilter"
                    value={topicFilter}
                    onChange={(e) => setTopicFilter(e.target.value)}
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 font-medium"
                  >
                    <option value="">All Topics</option>
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label
                    htmlFor="difficultyFilter"
                    className="block text-lg font-semibold text-gray-700 mb-3"
                  >
                    ⭐ Filter by Difficulty
                  </label>
                  <select
                    id="difficultyFilter"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="w-full border-2 border-green-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 font-medium"
                  >
                    <option value="">All Levels</option>
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Items per page */}
                <div>
                  <label
                    htmlFor="itemsPerPage"
                    className="block text-lg font-semibold text-gray-700 mb-3"
                  >
                    📄 Rows per page
                  </label>
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/80 font-medium"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>

              {/* Filter Summary & Clear */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-lg text-gray-700 font-medium">
                    Showing {startIndex} to {endIndex} of {totalItems} questions
                  </div>

                  {/* Active Filters */}
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium flex items-center gap-1">
                        Search: "{searchTerm}"
                        <button
                          onClick={() => setSearchTerm("")}
                          className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
                        >
                          ✕
                        </button>
                      </span>
                    )}
                    {topicFilter && (
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium flex items-center gap-1">
                        Topic: {topicFilter}
                        <button
                          onClick={() => setTopicFilter("")}
                          className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
                        >
                          ✕
                        </button>
                      </span>
                    )}
                    {difficultyFilter && (
                      <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-medium flex items-center gap-1">
                        Level: {difficultyFilter}
                        <button
                          onClick={() => setDifficultyFilter("")}
                          className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
                        >
                          ✕
                        </button>
                      </span>
                    )}
                  </div>
                </div>

                {/* Clear All Filters */}
                {(searchTerm || topicFilter || difficultyFilter) && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setTopicFilter("");
                      setDifficultyFilter("");
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    <tr>
                      {headers.map((header, i) => (
                        <th
                          key={i}
                          className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                            {header || `Column ${i + 1}`}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {data.map((row, i) => (
                      <tr
                        key={i}
                        className={`transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:transform hover:scale-[1.01] ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50/70"
                        }`}
                      >
                        {row.map((cell, j) => {
                          const cellValue =
                            cell !== null && cell !== undefined
                              ? String(cell)
                              : "";

                          // Check if cell contains a URL
                          const isURL =
                            cellValue &&
                            (cellValue.startsWith("http://") ||
                              cellValue.startsWith("https://") ||
                              cellValue.includes("leetcode.com") ||
                              cellValue.includes("geeksforgeeks.org") ||
                              cellValue.includes("codechef.com") ||
                              cellValue.includes("codeforces.com") ||
                              cellValue.includes("hackerrank.com") ||
                              cellValue.includes("github.com"));

                          return (
                            <td
                              key={j}
                              className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-900"
                            >
                              <div className="max-w-xs">
                                {cellValue ? (
                                  isURL ? (
                                    <a
                                      href={
                                        cellValue.startsWith("http")
                                          ? cellValue
                                          : `https://${cellValue}`
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200 hover:underline group"
                                      title={`Open: ${cellValue}`}
                                    >
                                      <span className="truncate max-w-[200px]">
                                        {cellValue
                                          .replace(/^https?:\/\//, "")
                                          .replace(/^www\./, "")}
                                      </span>
                                      <svg
                                        className="w-4 h-4 flex-shrink-0 group-hover:transform group-hover:scale-110 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                      </svg>
                                    </a>
                                  ) : (
                                    <span className="text-gray-800 truncate block">
                                      {cellValue}
                                    </span>
                                  )
                                ) : (
                                  <span className="text-gray-400 italic">
                                    —
                                  </span>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty search results */}
              {data.length === 0 &&
                (searchTerm || topicFilter || difficultyFilter) && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      No Questions Found
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      No questions match your current filters
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setTopicFilter("");
                        setDifficultyFilter("");
                      }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 px-8 py-6 mt-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-lg font-semibold text-gray-700">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {getPaginationButtons()}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join 1158+ students who cracked 20+ LPA offers with our personalized
            training program
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Start Your Journey
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-200 transform hover:scale-105">
              Book 1-1 Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
