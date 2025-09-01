import React from "react";

export default function MentorHeader() {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white py-8 shadow-lg">
      <section className="py-20 bg-black bg-opacity-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 px-4 sm:px-6">
            <div className="container mx-auto">
              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-4 leading-snug">
                Best Interview DSA Sheet (DSA + OA + CP) in India
              </h1>

              {/* Sub-heading */}
              <p className="text-base sm:text-lg md:text-xl text-center opacity-90 max-w-3xl mx-auto">
                Comprehensive Data Structures &amp; Algorithms Structured Course
                by <br />
                Kumar K (SDE @ Amazon)
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://training.desiqna.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-green-600 text-primary px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 text-center text-sm sm:text-base"
                >
                  <i className="fas fa-graduation-cap mr-2"></i>
                  Join Premium 850 Hour Course →
                </a>
              </div>
            </div>

            {/* Mentor Section */}
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 mt-10">
              Meet Your Mentor
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-yellow-300 mt-6">
              Kumar K (Karan Kumar)
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold">
              SDE @ Amazon
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
                <div className="stats-card">
                  <div className="text-2xl font-bold text-yellow-300">
                    1200+
                  </div>
                  <div className="text-sm">Students Mentored</div>
                </div>
                <div className="stats-card">
                  <div className="text-2xl font-bold text-yellow-300">1158</div>
                  <div className="text-sm">Crack 20+LPA Offer from PBCs</div>
                </div>
                <div className="stats-card">
                  <div className="text-2xl font-bold text-yellow-300">
                    1Lakh
                  </div>
                  <div className="text-sm">Followers</div>
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Achievement 1 */}
              <div className="achievement-item bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 card-hover border border-white border-opacity-20">
                <a href="https://leetcode.com/u/godiswithme/">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-trophy text-black text-xl"></i>
                    </div>
                    <div className="text-yellow-300 font-bold text-lg">
                      LeetCode Champion(Guardian)
                    </div>
                  </div>
                </a>
                <p className="text-gray-200">
                  2100+ rated on LeetCode (Top 1% in world)
                </p>
              </div>

              {/* Achievement 2 */}
              <div className="achievement-item bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 card-hover border border-white border-opacity-20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fab fa-youtube text-white text-xl"></i>
                  </div>
                  <div className="text-red-400 font-bold text-lg">
                    DSA + OA+ CP Mentor
                  </div>
                </div>
                <a href="https://www.linkedin.com/in/kumark1/">
                  <p className="text-gray-200">
                    YouTube &amp; LinkedIn (1 Lakh+ followers)
                  </p>
                </a>
              </div>

              {/* Achievement 3 */}
              <div className="achievement-item bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 card-hover border border-white border-opacity-20">
                <a href="https://www.linkedin.com/in/kumark1/">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <i className="fab fa-linkedin text-white text-xl"></i>
                    </div>
                    <div className="text-blue-400 font-bold text-lg">
                      Industry Expert
                    </div>
                  </div>
                  <p className="text-gray-200">
                    YouTube &amp; LinkedIn (1 Lakh+ followers)
                  </p>
                </a>
              </div>

              {/* Achievement 4 */}
              <div className="achievement-item bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 card-hover border border-white border-opacity-20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-code text-white text-xl"></i>
                  </div>
                  <div className="text-blue-400 font-bold text-lg">
                    Google CodeJam + KickStart
                  </div>
                </div>
                <p className="text-gray-200">
                  All India Rank 12 in CodeJam and World Rank 360 in KickStart
                </p>
              </div>

              {/* Achievement 5 */}
              <div className="achievement-item bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 card-hover border border-white border-opacity-20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-medal text-white text-xl"></i>
                  </div>
                  <div className="text-purple-400 font-bold text-lg">
                    HackerEarth
                  </div>
                </div>
                <p className="text-gray-200">
                  All India Rank 15 out of 200,000
                </p>
              </div>

              {/* Achievement 6 */}
              <div className="achievement-item bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 card-hover border border-white border-opacity-20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-star text-white text-xl"></i>
                  </div>
                  <div className="text-orange-400 font-bold text-lg">
                    Contest Expert
                  </div>
                </div>
                <p className="text-gray-200">
                  All India Rank 26 in LeetCode Weekly Contest
                </p>
              </div>
            </div>

            {/* Story Section */}
          </div>
        </div>
      </section>
    </header>
  );
}
