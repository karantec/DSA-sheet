import React, { useState, useEffect } from "react";
import {
  Shield,
  Code,
  Play,
  CheckCircle,
  Eye,
  Monitor,
  Lock,
  ArrowRight,
  Sparkles,
  Terminal,
  Users,
  Trophy,
  Brain,
  ChevronLeft,
  ChevronRight,
  Award,
  Zap,
  Globe,
} from "lucide-react";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Carousel slides data
  const slides = [
    {
      id: 1,
      badge: "Next-Gen Coding Platform",
      title: ["Cheat-Proof", "Coding", "Contests"],
      titleColors: [
        "from-white via-blue-100 to-indigo-200",
        "text-white",
        "from-indigo-400 to-purple-400",
      ],
      subtitle:
        "Host secure coding competitions and conduct company assessments with our advanced AI-powered anti-cheating technology.",
      primaryButton: "Start Coding Now",
      secondaryButton: "Learn About Security",
      features: [
        { icon: Shield, text: "AI-Powered Proctoring", color: "text-blue-400" },
        { icon: Eye, text: "Live Monitoring", color: "text-green-400" },
        { icon: Monitor, text: "Screen Recording", color: "text-purple-400" },
        { icon: Lock, text: "Secure Environment", color: "text-orange-400" },
      ],
      stats: [
        { number: "99.9%", label: "Cheat Detection Rate", icon: Shield },
        { number: "10K+", label: "Secure Assessments", icon: CheckCircle },
        { number: "500+", label: "Companies Trust Us", icon: Code },
        { number: "24/7", label: "Monitoring", icon: Eye },
      ],
      bgGradient: "from-gray-900 via-blue-900 to-indigo-900",
    },
    {
      id: 2,
      badge: "Enterprise Solutions",
      title: ["Scale Your", "Technical", "Hiring"],
      titleColors: [
        "from-white via-green-100 to-emerald-200",
        "text-white",
        "from-emerald-400 to-teal-400",
      ],
      subtitle:
        "Streamline your recruitment process with comprehensive coding assessments, real-time analytics, and detailed candidate insights.",
      primaryButton: "Get Enterprise Demo",
      secondaryButton: "View Pricing",
      features: [
        { icon: Users, text: "Team Collaboration", color: "text-emerald-400" },
        { icon: Brain, text: "AI-Powered Insights", color: "text-blue-400" },
        { icon: Trophy, text: "Custom Challenges", color: "text-yellow-400" },
        { icon: Award, text: "Skill Assessment", color: "text-purple-400" },
      ],
      stats: [
        { number: "50K+", label: "Developers Assessed", icon: Users },
        { number: "200+", label: "Enterprise Clients", icon: Trophy },
        { number: "95%", label: "Accuracy Rate", icon: Brain },
        { number: "60%", label: "Faster Hiring", icon: Zap },
      ],
      bgGradient: "from-gray-900 via-emerald-900 to-teal-900",
    },
    {
      id: 3,
      badge: "Global Community",
      title: ["Join The", "Coding", "Revolution"],
      titleColors: [
        "from-white via-purple-100 to-pink-200",
        "text-white",
        "from-purple-400 to-pink-400",
      ],
      subtitle:
        "Connect with developers worldwide, participate in global competitions, and showcase your skills on our secure platform.",
      primaryButton: "Join Community",
      secondaryButton: "Explore Contests",
      features: [
        { icon: Globe, text: "Global Competitions", color: "text-purple-400" },
        { icon: Trophy, text: "Leaderboards", color: "text-yellow-400" },
        { icon: Users, text: "Community Support", color: "text-blue-400" },
        { icon: Award, text: "Skill Badges", color: "text-green-400" },
      ],
      stats: [
        { number: "100K+", label: "Active Developers", icon: Users },
        { number: "1M+", label: "Code Submissions", icon: Code },
        { number: "50+", label: "Countries", icon: Globe },
        { number: "24/7", label: "Global Support", icon: Shield },
      ],
      bgGradient: "from-gray-900 via-purple-900 to-pink-900",
    },
  ];

  // Code snippets for different programming languages
  const codeSnippets = [
    {
      language: "Python",
      title: "Two Sum Problem",
      code: [
        "def two_sum(nums, target):",
        "    hash_map = {}",
        "    for i, num in enumerate(nums):",
        "        complement = target - num",
        "        if complement in hash_map:",
        "            return [hash_map[complement], i]",
        "        hash_map[num] = i",
        "    return []",
      ],
    },
    {
      language: "JavaScript",
      title: "Binary Search",
      code: [
        "function binarySearch(arr, target) {",
        "    let left = 0, right = arr.length - 1;",
        "    while (left <= right) {",
        "        const mid = Math.floor((left + right) / 2);",
        "        if (arr[mid] === target) return mid;",
        "        if (arr[mid] < target) left = mid + 1;",
        "        else right = mid - 1;",
        "    }",
        "    return -1;",
        "}",
      ],
    },
    {
      language: "Java",
      title: "Quick Sort",
      code: [
        "public static void quickSort(int[] arr, int low, int high) {",
        "    if (low < high) {",
        "        int pi = partition(arr, low, high);",
        "        quickSort(arr, low, pi - 1);",
        "        quickSort(arr, pi + 1, high);",
        "    }",
        "}",
        "",
        "private static int partition(int[] arr, int low, int high) {",
        "    // Implementation here...",
        "}",
      ],
    },
  ];

  const currentSlideData = slides[currentSlide];

  // Event handlers
  const handleStartCoding = () => {
    console.log("Navigating to coding contest...");
  };

  const handleLearnMore = () => {
    console.log("Showing more information...");
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, [autoPlay]);

  // Typing animation effect
  useEffect(() => {
    const currentSnippet = codeSnippets[currentCodeIndex];
    const currentCodeLine = currentSnippet.code[currentLine] || "";

    if (typingText.length < currentCodeLine.length) {
      const timer = setTimeout(() => {
        setTypingText(currentCodeLine.slice(0, typingText.length + 1));
      }, 50 + Math.random() * 50);
      return () => clearTimeout(timer);
    } else if (currentLine < currentSnippet.code.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
        setTypingText("");
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentCodeIndex((prev) => (prev + 1) % codeSnippets.length);
        setCurrentLine(0);
        setTypingText("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [typingText, currentLine, currentCodeIndex]);

  const currentSnippet = codeSnippets[currentCodeIndex];

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br ${currentSlideData.bgGradient} overflow-hidden transition-all duration-1000`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white bg-opacity-5 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 text-white p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 text-white p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Main Heading */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-indigo-300">
                <Sparkles className="h-6 w-6 animate-pulse" />
                <span className="text-lg font-semibold tracking-wide">
                  {currentSlideData.badge}
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                {currentSlideData.title.map((line, index) => (
                  <React.Fragment key={index}>
                    <span
                      className={`bg-gradient-to-r ${currentSlideData.titleColors[index]} bg-clip-text text-transparent`}
                    >
                      {line}
                    </span>
                    {index < currentSlideData.title.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>

              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-2xl">
                {currentSlideData.subtitle}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {currentSlideData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20 transform hover:scale-105 transition-all duration-300"
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  <span className="text-sm font-medium text-white">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleStartCoding}
                className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Play className="h-6 w-6 group-hover:animate-pulse" />
                  <span>{currentSlideData.primaryButton}</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </button>

              <button
                onClick={handleLearnMore}
                className="group bg-white bg-opacity-10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white border-opacity-30 hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Shield className="h-6 w-6" />
                  <span>{currentSlideData.secondaryButton}</span>
                </div>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {currentSlideData.stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center transform hover:scale-110 transition-all duration-300"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-8 w-8 text-indigo-400" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Code Editor Mockup */}
          <div className="relative">
            {/* Code Editor Window */}
            <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden transform hover:scale-105 transition-all duration-300">
              {/* Editor Header */}
              <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Terminal className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300 text-sm font-medium">
                        {currentSnippet.title} - {currentSnippet.language}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-green-600 bg-opacity-20 px-2 py-1 rounded">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs font-medium">
                        Monitored
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm">
                {/* Language indicator */}
                <div className="flex items-center space-x-2 mb-4">
                  <Code className="h-4 w-4 text-indigo-400" />
                  <span className="text-indigo-400 font-semibold">
                    {currentSnippet.language}
                  </span>
                </div>

                {/* Code lines */}
                <div className="space-y-2">
                  {currentSnippet.code.map((line, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <span className="text-gray-500 text-xs w-6 text-right">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        {index < currentLine ? (
                          <span className="text-gray-300">{line}</span>
                        ) : index === currentLine ? (
                          <span className="text-gray-300">
                            {typingText}
                            <span className="bg-indigo-400 w-2 h-5 inline-block ml-1 animate-pulse"></span>
                          </span>
                        ) : (
                          <span className="text-gray-600">{line}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Security overlay indicators */}
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div className="flex items-center space-x-2 text-green-400">
                      <Eye className="h-3 w-3" />
                      <span>Monitored</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-400">
                      <Monitor className="h-3 w-3" />
                      <span>Recorded</span>
                    </div>
                    <div className="flex items-center space-x-2 text-purple-400">
                      <Shield className="h-3 w-3" />
                      <span>Secured</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Security Indicators */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
              <Shield className="h-4 w-4 inline mr-2" />
              Live Monitoring
            </div>

            <div className="absolute -bottom-4 -left-4 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              <Lock className="h-4 w-4 inline mr-2" />
              Cheat-Proof
            </div>

            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-20 -z-10 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
