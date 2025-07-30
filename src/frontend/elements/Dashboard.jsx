import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../src/stores/userStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../src/components/ui/Card";
import { Button } from "../src/components/ui/Button";
import PortfolioOverview from "./dashboard/PortfolioOverview";
import GoalTracker from "./dashboard/GoalTracker";
import RecentActivity from "./dashboard/RecentActivity";
import MarketInsights from "./dashboard/MarketInsights";
import PersonaWidget from "./dashboard/PersonaWidget";
import QuickActions from "./dashboard/QuickActions";
import { 
  TrendingUp, 
  Bell, 
  Settings, 
  Menu,
  X,
  User,
  LogOut
} from "lucide-react";

export default function Dashboard() {
  const { user, profile, logout } = useUserStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);

  // Get user's persona to customize dashboard
  const getUserPersona = () => {
    const age = profile.dateOfBirth ? 
      new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear() : 30;
    
    if (age < 30) return "Young Investor";
    if (age > 50) return "Retirement Planner";
    if (profile.investmentGoals?.includes("retirement")) return "Retirement Planner";
    if (profile.preferences?.busyProfessional) return "Busy Professional";
    return "Passive Wealth Builder";
  };

  const persona = getUserPersona();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2 ml-2 md:ml-0">
                <TrendingUp className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-gray-900">Kronos</span>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </div>

              {/* User Menu */}
              <div className="relative group">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="hidden md:block">
                    {profile.firstName || "User"}
                  </span>
                </Button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </div>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 px-2 space-y-1">
                <QuickActions isMobile={true} />
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile.firstName || "Investor"}
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your investments today
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Portfolio Overview */}
            <PortfolioOverview />
            
            {/* Goal Tracker */}
            <GoalTracker />
            
            {/* Recent Activity */}
            <RecentActivity />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Persona-specific Widget */}
            <PersonaWidget persona={persona} />
            
            {/* Quick Actions */}
            <div className="hidden md:block">
              <QuickActions />
            </div>
            
            {/* Market Insights */}
            <MarketInsights />
          </div>
        </div>
      </main>
    </div>
  );
}