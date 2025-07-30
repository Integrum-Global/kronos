import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../src/components/ui/Card";
import { Button } from "../../src/components/ui/Button";
import { Progress } from "../../src/components/ui/Progress";
import { 
  GraduationCap, 
  Target, 
  Clock, 
  DollarSign, 
  Globe, 
  Heart,
  TrendingUp,
  BookOpen,
  Calculator,
  PiggyBank
} from "lucide-react";

const PersonaWidgetSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-2 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    </CardContent>
  </Card>
);

const personaConfigs = {
  "Young Investor": {
    icon: GraduationCap,
    color: "text-blue-600 bg-blue-100",
    title: "Learning & Growing",
    features: ["Investment Education", "Goal Setting", "Risk Learning"],
    tips: [
      "Start small and invest consistently",
      "Focus on long-term growth",
      "Learn about compound interest",
      "Consider index funds for beginners"
    ],
    actions: [
      { label: "Take Learning Quiz", icon: BookOpen },
      { label: "Set First Goal", icon: Target }
    ]
  },
  "Busy Professional": {
    icon: Clock,
    color: "text-green-600 bg-green-100",
    title: "Automated Investing",
    features: ["Set & Forget", "Auto-Rebalancing", "Tax Optimization"],
    tips: [
      "Maximize automation features",
      "Set up recurring investments",
      "Use tax-loss harvesting",
      "Review quarterly, not daily"
    ],
    actions: [
      { label: "Review Settings", icon: Clock },
      { label: "Increase Automation", icon: TrendingUp }
    ]
  },
  "Retirement Planner": {
    icon: Target,
    color: "text-purple-600 bg-purple-100",
    title: "Retirement Focus",
    features: ["Glide Path", "Income Planning", "Risk Management"],
    tips: [
      "Review asset allocation annually",
      "Consider catch-up contributions",
      "Plan for healthcare costs",
      "Diversify income sources"
    ],
    actions: [
      { label: "Retirement Calculator", icon: Calculator },
      { label: "Review Strategy", icon: Target }
    ]
  },
  "Passive Wealth Builder": {
    icon: DollarSign,
    color: "text-yellow-600 bg-yellow-100",
    title: "Wealth Building",
    features: ["Tax Efficiency", "Portfolio Growth", "Diversification"],
    tips: [
      "Maximize tax-advantaged accounts",
      "Consider real estate exposure",
      "Rebalance regularly",
      "Think generational wealth"
    ],
    actions: [
      { label: "Tax Strategy", icon: DollarSign },
      { label: "Portfolio Review", icon: TrendingUp }
    ]
  },
  "Conservative Saver": {
    icon: PiggyBank,
    color: "text-indigo-600 bg-indigo-100",
    title: "Safe Growth",
    features: ["Capital Preservation", "Gradual Growth", "Low Risk"],
    tips: [
      "Start with conservative allocation",
      "Understand FDIC insurance",
      "Learn about bond basics",
      "Build emergency fund first"
    ],
    actions: [
      { label: "Risk Assessment", icon: Target },
      { label: "Education Center", icon: BookOpen }
    ]
  },
  "Ethical Investor": {
    icon: Heart,
    color: "text-pink-600 bg-pink-100",
    title: "Values-Based Investing",
    features: ["ESG Screening", "Impact Tracking", "Sustainable Funds"],
    tips: [
      "Research ESG fund options",
      "Track impact metrics",
      "Balance values with returns",
      "Consider shareholder advocacy"
    ],
    actions: [
      { label: "ESG Options", icon: Heart },
      { label: "Impact Report", icon: Globe }
    ]
  },
  "International Professional": {
    icon: Globe,
    color: "text-teal-600 bg-teal-100",
    title: "Global Investing",
    features: ["Multi-Currency", "International Compliance", "Tax Treaties"],
    tips: [
      "Understand tax implications",
      "Consider currency hedging",
      "Review compliance regularly",
      "Plan for relocations"
    ],
    actions: [
      { label: "Currency Settings", icon: Globe },
      { label: "Tax Planning", icon: Calculator }
    ]
  }
};

export default function PersonaWidget({ persona }) {
  const config = personaConfigs[persona] || personaConfigs["Passive Wealth Builder"];
  const IconComponent = config.icon;

  const { isPending, error, data: personaData } = useQuery({
    queryKey: ['persona-progress', persona],
    queryFn: () =>
      fetch(`/api/persona/progress?type=${persona}`).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch persona data');
        return res.json();
      }),
    // Mock data for development
    initialData: {
      completionScore: 75,
      nextMilestone: "Complete risk assessment update",
      achievedMilestones: 3,
      totalMilestones: 5,
      suggestion: "Consider increasing your monthly contribution by $200 to reach your retirement goal faster."
    }
  });

  if (isPending) return <PersonaWidgetSkeleton />;

  if (error) return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center text-red-600 text-sm">
          Error loading persona data
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${config.color}`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">{config.title}</CardTitle>
            <CardDescription className="text-sm">
              {persona} Profile
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Profile Completion</span>
            <span className="text-sm text-gray-600">
              {personaData.completionScore}%
            </span>
          </div>
          <Progress value={personaData.completionScore} className="h-2" />
          <p className="text-xs text-gray-600 mt-1">
            {personaData.achievedMilestones} of {personaData.totalMilestones} milestones completed
          </p>
        </div>

        {/* Next Step */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold mb-1">Next Step</h4>
          <p className="text-sm text-gray-700">
            {personaData.nextMilestone}
          </p>
        </div>

        {/* Key Features */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Your Features</h4>
          <div className="space-y-1">
            {config.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Tip */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-1">
            💡 Tip for {persona}s
          </h4>
          <p className="text-sm text-blue-800">
            {personaData.suggestion}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          {config.actions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <Button 
                key={index}
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
              >
                <ActionIcon className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            );
          })}
        </div>

        {/* Learn More */}
        <div className="pt-2 border-t">
          <Button variant="ghost" size="sm" className="w-full text-primary">
            <BookOpen className="h-4 w-4 mr-2" />
            Learn More About {persona} Strategy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}