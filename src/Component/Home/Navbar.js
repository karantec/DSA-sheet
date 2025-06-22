import React, { useState } from "react";
import {
  Shield,
  Home,
  Trophy,
  BookOpen,
  User,
  Bell,
  Settings,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const Navbar = ({ activeTab, setActiveTab, user, notifications = 3 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "contests", label: "Contests", icon: Trophy },
    { id: "assessments", label: "OA Portal", icon: BookOpen },
    { id: "dashboard", label: "Dashboard", icon: User },
  ];

  const mockNotifications = [
    {
      id: 1,
      title: "Contest Starting Soon",
      message: "Weekly Algorithm Challenge starts in 15 minutes",
      time: "5m ago",
      unread: true,
    },
    {
      id: 2,
      title: "Assessment Completed",
      message: "Your TechCorp assessment has been submitted successfully",
      time: "1h ago",
      unread: true,
    },
    {
      id: 3,
      title: "New Contest Available",
      message: "Google Summer Challenge is now open for registration",
      time: "2h ago",
      unread: false,
    },
  ];

  const mockUser = user || {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "AJ",
    role: "Participant",
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-xl relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="h-8 w-8 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight">
                  Code Legal
                </span>
                <div className="text-xs text-indigo-200 -mt-1">
                  Cheat-Proof Platform
                </div>
              </div>
            </div>

            {/* Anti-cheat Status Badge */}
            <div className="hidden md:flex items-center space-x-2 bg-green-500 bg-opacity-20 px-3 py-1 rounded-full border border-green-300 border-opacity-30">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-200 font-medium">
                Anti-Cheat Active
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-white bg-opacity-20 text-white shadow-lg transform scale-105"
                    : "text-indigo-100 hover:bg-white hover:bg-opacity-10 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right Side - Notifications, User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-indigo-100 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {mockNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                          notification.unread ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-3 text-indigo-100 hover:text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm font-semibold">
                  {mockUser.avatar}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium">{mockUser.name}</div>
                  <div className="text-xs text-indigo-200">{mockUser.role}</div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {mockUser.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {mockUser.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {mockUser.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <User className="h-4 w-4" />
                      <span>Profile Settings</span>
                    </button>
                    <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Preferences</span>
                    </button>
                    <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Shield className="h-4 w-4" />
                      <span>Security</span>
                    </button>
                  </div>
                  <div className="border-t border-gray-100 py-2">
                    <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-indigo-100 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-indigo-500 border-opacity-30 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-white bg-opacity-20 text-white"
                      : "text-indigo-100 hover:bg-white hover:bg-opacity-10 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Anti-cheat Status */}
            <div className="mt-4 pt-4 border-t border-indigo-500 border-opacity-30">
              <div className="flex items-center space-x-2 px-4">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-200 font-medium">
                  Anti-Cheat System Active
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(isProfileDropdownOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileDropdownOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </nav>
  );
};
export default Navbar;
