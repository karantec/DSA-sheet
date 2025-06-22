import { useState, useEffect } from "react";

const DetailedFeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    // Auto-rotate features every 5 seconds
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: "ai-monitoring",
      icon: "🤖",
      title: "Advanced AI Monitoring",
      subtitle: "Real-time Behavioral Analysis",
      description:
        "Our cutting-edge AI algorithms continuously monitor candidate behavior throughout the assessment, detecting suspicious patterns, unusual mouse movements, and potential cheating attempts with 99.7% accuracy.",
      benefits: [
        "Real-time anomaly detection with machine learning",
        "Behavioral pattern analysis across 50+ data points",
        "Instant alerts for suspicious activities",
        "Comprehensive fraud scoring system",
        "Historical data comparison for accuracy",
      ],
      stats: [
        { label: "Detection Accuracy", value: "99.7%" },
        { label: "Response Time", value: "<100ms" },
        { label: "False Positives", value: "<0.3%" },
      ],
      gradient: "from-blue-500 to-cyan-500",
      bgIcon: "🔍",
    },
    {
      id: "live-proctoring",
      icon: "👁️",
      title: "Intelligent Live Proctoring",
      subtitle: "Human + AI Supervision",
      description:
        "Combine the reliability of human oversight with AI efficiency. Our certified proctors work alongside intelligent systems to ensure comprehensive monitoring without compromising candidate experience.",
      benefits: [
        "Certified professional proctors available 24/7",
        "AI-assisted focus on high-risk candidates",
        "Multi-camera angle monitoring",
        "Real-time intervention capabilities",
        "Detailed session recordings and reports",
      ],
      stats: [
        { label: "Proctor Response", value: "<30sec" },
        { label: "Session Coverage", value: "100%" },
        { label: "Intervention Rate", value: "2.1%" },
      ],
      gradient: "from-cyan-400 to-blue-500",
      bgIcon: "👥",
    },
    {
      id: "browser-security",
      icon: "🔒",
      title: "Fortress Browser Lockdown",
      subtitle: "Impenetrable Security Environment",
      description:
        "Transform any browser into a secure assessment environment. Our lockdown technology prevents access to external resources, applications, and communication channels while maintaining system performance.",
      benefits: [
        "Complete browser isolation and control",
        "Blocks copy-paste, screenshots, and recordings",
        "Prevents access to external websites and applications",
        "Disables developer tools and inspect elements",
        "Real-time system monitoring and alerts",
      ],
      stats: [
        { label: "Security Level", value: "Military Grade" },
        { label: "Bypass Attempts", value: "0%" },
        { label: "Performance Impact", value: "<5%" },
      ],
      gradient: "from-blue-600 to-indigo-600",
      bgIcon: "🛡️",
    },
    {
      id: "code-analysis",
      icon: "🧠",
      title: "Intelligent Code Analysis",
      subtitle: "Plagiarism & AI Detection",
      description:
        "State-of-the-art code analysis engine that detects plagiarism, AI-generated code, and suspicious coding patterns. Compare submissions against millions of code samples and detect even sophisticated cheating attempts.",
      benefits: [
        "Advanced plagiarism detection algorithms",
        "AI-generated code identification",
        "Cross-platform code comparison",
        "Syntax and style pattern analysis",
        "Real-time similarity scoring",
      ],
      stats: [
        { label: "Code Database", value: "50M+" },
        { label: "Detection Speed", value: "<2sec" },
        { label: "Pattern Recognition", value: "95%+" },
      ],
      gradient: "from-slate-600 to-blue-600",
      bgIcon: "💻",
    },
    {
      id: "identity-verification",
      icon: "🆔",
      title: "Multi-Layer Identity Verification",
      subtitle: "Biometric Authentication",
      description:
        "Ensure the right person takes the assessment with our comprehensive identity verification system featuring facial recognition, document verification, and continuous authentication throughout the session.",
      benefits: [
        "Government ID document verification",
        "Facial recognition and liveness detection",
        "Continuous identity monitoring during assessment",
        "Biometric template matching",
        "Anti-spoofing protection mechanisms",
      ],
      stats: [
        { label: "Verification Accuracy", value: "99.9%" },
        { label: "Processing Time", value: "<10sec" },
        { label: "Fraud Prevention", value: "100%" },
      ],
      gradient: "from-indigo-600 to-blue-700",
      bgIcon: "🔐",
    },
    {
      id: "time-management",
      icon: "⏰",
      title: "Precision Time Management",
      subtitle: "Anti-Manipulation Controls",
      description:
        "Advanced time tracking and management system with built-in anti-manipulation measures. Ensure fair assessment timing while preventing time-based cheating attempts and system gaming.",
      benefits: [
        "Atomic clock synchronization for precision",
        "Tamper-proof time tracking mechanisms",
        "Automatic session pause/resume controls",
        "Time zone normalization and fairness",
        "Detailed time analytics and reporting",
      ],
      stats: [
        { label: "Time Accuracy", value: "±1ms" },
        { label: "Manipulation Detection", value: "100%" },
        { label: "System Reliability", value: "99.99%" },
      ],
      gradient: "from-blue-700 to-cyan-600",
      bgIcon: "⚡",
    },
  ];

  const currentFeature = features[activeFeature];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-slate-900 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center bg-blue-500 bg-opacity-20 rounded-full px-6 py-2 mb-6">
            <span className="text-blue-300 text-sm font-semibold">
              🚀 PLATFORM FEATURES
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight">
            Comprehensive Security Arsenal
          </h2>
          <p className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
            Every feature engineered for one purpose: creating an impenetrable
            barrier against cheating while maintaining an exceptional user
            experience.
          </p>
        </div>

        {/* Feature Navigation */}
        <div
          className={`mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(index)}
                className={`group relative flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFeature === index
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-800 bg-opacity-60 text-blue-200 hover:bg-opacity-80 hover:text-white"
                }`}
              >
                <span className="text-lg mr-2">{feature.icon}</span>
                <span className="text-sm">{feature.title}</span>
                {activeFeature === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Feature Display */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Feature Content */}
            <div className="space-y-8">
              {/* Feature Header */}
              <div className="space-y-4">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${currentFeature.gradient} rounded-3xl text-3xl shadow-lg`}
                >
                  {currentFeature.icon}
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-white mb-2">
                    {currentFeature.title}
                  </h3>
                  <p className="text-blue-300 text-lg font-medium">
                    {currentFeature.subtitle}
                  </p>
                </div>
                <p className="text-blue-200 text-lg leading-relaxed">
                  {currentFeature.description}
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                <h4 className="text-white text-xl font-semibold flex items-center">
                  <span className="text-2xl mr-2">✨</span>
                  Key Capabilities
                </h4>
                <ul className="space-y-3">
                  {currentFeature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-blue-200">
                      <svg
                        className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {currentFeature.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-blue-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Visualization */}
            <div className="relative">
              <div className="relative bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-3xl p-8 border border-gray-600 border-opacity-30">
                {/* Background Icon */}
                <div className="absolute top-8 right-8 text-6xl opacity-10">
                  {currentFeature.bgIcon}
                </div>

                {/* Interactive Dashboard Mockup */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h5 className="text-white font-semibold">
                      Live Monitoring Dashboard
                    </h5>
                    <div className="flex items-center text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Active
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-blue-200 mb-2">
                        <span>Security Level</span>
                        <span>98%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${currentFeature.gradient} animate-pulse`}
                          style={{ width: "98%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-blue-200 mb-2">
                        <span>Active Sessions</span>
                        <span>247</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-blue-200 mb-2">
                        <span>Threat Detection</span>
                        <span>100%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 animate-pulse"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Feed */}
                  <div className="space-y-3">
                    <h6 className="text-white text-sm font-medium">
                      Recent Activity
                    </h6>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center text-blue-200">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        Assessment started - Candidate #1247
                      </div>
                      <div className="flex items-center text-blue-200">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        Identity verified - All parameters passed
                      </div>
                      <div className="flex items-center text-blue-200">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                        Monitoring alert - Tab switch detected
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-gray-800 bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 border border-gray-600 border-opacity-30 max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-white mb-4">
              Ready to Experience Unbreakable Security?
            </h4>
            <p className="text-blue-200 mb-6">
              See how our comprehensive security features work together to
              create the most secure coding assessment platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50">
                Start Free Trial
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-blue-400 text-blue-300 font-semibold rounded-full hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 hover:scale-105">
                View All Features
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default DetailedFeaturesSection;
