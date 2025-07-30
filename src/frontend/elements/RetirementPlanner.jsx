import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../src/stores/userStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../src/components/ui/Card";
import { Button } from "../src/components/ui/Button";
import { Progress } from "../src/components/ui/Progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { 
  Target, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Calculator,
  AlertTriangle,
  CheckCircle,
  PiggyBank,
  Clock,
  Zap
} from "lucide-react";

const RetirementSkeleton = () => (
  <div className="space-y-6">
    {[1,2,3].map(i => (
      <Card key={i}>
        <CardHeader>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function RetirementPlanner() {
  const { profile } = useUserStore();
  const [selectedScenario, setSelectedScenario] = React.useState("current");

  const { isPending, error, data: retirementData } = useQuery({
    queryKey: ['retirement-planning'],
    queryFn: () =>
      fetch('/api/retirement/planning').then((res) => {
        if (!res.ok) throw new Error('Failed to fetch retirement data');
        return res.json();
      }),
    // Mock data for development
    initialData: {
      currentSituation: {
        age: 55,
        targetRetirementAge: 65,
        yearsToRetirement: 10,
        currentSavings: 387500,
        monthlyContribution: 2000,
        targetRetirementIncome: 80000,
        socialSecurityEstimate: 24000,
        requiredSavings: 1400000,
        onTrackProbability: 72
      },
      projections: {
        current: [
          { age: 55, savings: 387500, income: 0 },
          { age: 56, savings: 426800, income: 0 },
          { age: 57, savings: 468200, income: 0 },
          { age: 58, savings: 512000, income: 0 },
          { age: 59, savings: 558400, income: 0 },
          { age: 60, savings: 607600, income: 0 },
          { age: 61, savings: 659800, income: 0 },
          { age: 62, savings: 715200, income: 0 },
          { age: 63, savings: 774000, income: 0 },
          { age: 64, savings: 836400, income: 0 },
          { age: 65, savings: 902600, income: 54200 },
          { age: 70, savings: 1125000, income: 67500 },
          { age: 75, savings: 1287500, income: 77250 },
          { age: 80, savings: 1405000, income: 84300 },
          { age: 85, savings: 1456250, income: 87375 },
          { age: 90, savings: 1421875, income: 85312 }
        ],
        optimized: [
          { age: 55, savings: 387500, income: 0 },
          { age: 56, savings: 438200, income: 0 },
          { age: 57, savings: 492400, income: 0 },
          { age: 58, savings: 550300, income: 0 },
          { age: 59, savings: 612100, income: 0 },
          { age: 60, savings: 678000, income: 0 },
          { age: 61, savings: 748200, income: 0 },
          { age: 62, savings: 822900, income: 0 },
          { age: 63, savings: 902300, income: 0 },
          { age: 64, savings: 986600, income: 0 },
          { age: 65, savings: 1076000, income: 64560 },
          { age: 70, savings: 1387500, income: 83250 },
          { age: 75, savings: 1678125, income: 100687 },
          { age: 80, savings: 1893750, income: 113625 },
          { age: 85, savings: 2021875, income: 121312 },
          { age: 90, savings: 2043750, income: 122625 }
        ]
      },
      scenarios: [
        {
          id: "current",
          name: "Current Path",
          description: "Continue with current contribution rate",
          monthlyContribution: 2000,
          probability: 72,
          projectedSavings: 902600,
          annualIncome: 54200,
          status: "caution"
        },
        {
          id: "optimized",
          name: "Recommended Path",
          description: "Increase contributions for better outcomes",
          monthlyContribution: 2800,
          probability: 89,
          projectedSavings: 1076000,
          annualIncome: 64560,
          status: "good"
        },
        {
          id: "aggressive",
          name: "Accelerated Path",
          description: "Maximum catch-up contributions",
          monthlyContribution: 3500,
          probability: 95,
          projectedSavings: 1245000,
          annualIncome: 74700,
          status: "excellent"
        }
      ],
      recommendations: [
        {
          id: 1,
          type: "contribution",
          priority: "high",
          title: "Increase Monthly Contributions",
          description: "Consider increasing your monthly contribution from $2,000 to $2,800 to improve your retirement readiness.",
          impact: "Increases success probability from 72% to 89%",
          action: "Update contribution amount"
        },
        {
          id: 2,
          type: "catchup",
          priority: "high",
          title: "Maximize Catch-Up Contributions",
          description: "At 55, you're eligible for catch-up contributions. Consider maximizing your 401(k) and IRA contributions.",
          impact: "Additional $7,000 annually in tax-advantaged growth",
          action: "Review contribution limits"
        },
        {
          id: 3,
          type: "allocation",
          priority: "medium",
          title: "Optimize Asset Allocation",
          description: "Consider a glide path strategy that gradually reduces risk as you approach retirement.",
          impact: "Better risk-adjusted returns",
          action: "Review portfolio allocation"
        },
        {
          id: 4,
          type: "healthcare",
          priority: "medium",
          title: "Plan for Healthcare Costs",
          description: "Healthcare costs can significantly impact retirement. Consider a Health Savings Account (HSA).",
          impact: "Tax-advantaged healthcare fund",
          action: "Explore HSA options"
        }
      ],
      milestones: [
        {
          age: 60,
          target: 600000,
          current: 387500,
          onTrack: false,
          description: "5 years to retirement checkpoint"
        },
        {
          age: 62,
          target: 750000,
          current: 387500,
          onTrack: false,
          description: "Early retirement eligibility"
        },
        {
          age: 65,
          target: 1000000,
          current: 387500,
          onTrack: false,
          description: "Full retirement age goal"
        }
      ]
    }
  });

  if (isPending) return <RetirementSkeleton />;

  if (error) return (
    <div className="text-center text-red-600">
      Error loading retirement planning data: {error.message}
    </div>
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'caution': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const selectedScenarioData = retirementData.scenarios.find(s => s.id === selectedScenario);
  const projectionData = retirementData.projections[selectedScenario];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Retirement Planning</h1>
              <p className="text-gray-600 mt-1">
                Plan and optimize your path to retirement
              </p>
            </div>
            <Button>
              <Calculator className="h-4 w-4 mr-2" />
              Retirement Calculator
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Situation Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Years to Retirement</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {retirementData.currentSituation.yearsToRetirement}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Savings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(retirementData.currentSituation.currentSavings)}
                  </p>
                </div>
                <PiggyBank className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Target Income</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(retirementData.currentSituation.targetRetirementIncome)}
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Probability</p>
                  <p className={`text-2xl font-bold ${
                    retirementData.currentSituation.onTrackProbability >= 80 
                      ? 'text-green-600' 
                      : retirementData.currentSituation.onTrackProbability >= 60
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
                    {retirementData.currentSituation.onTrackProbability}%
                  </p>
                </div>
                {retirementData.currentSituation.onTrackProbability >= 80 ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scenario Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Retirement Scenarios</CardTitle>
            <CardDescription>
              Compare different contribution strategies and their outcomes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {retirementData.scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedScenario === scenario.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{scenario.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(scenario.status)}`}>
                      {scenario.probability}% success
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Monthly:</span>
                      <span className="font-medium">{formatCurrency(scenario.monthlyContribution)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>At 65:</span>
                      <span className="font-medium">{formatCurrency(scenario.projectedSavings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Income:</span>
                      <span className="font-medium">{formatCurrency(scenario.annualIncome)}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Projection Chart */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Projected Savings Growth - {selectedScenarioData.name}
              </h4>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis 
                    tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      formatCurrency(value),
                      name === 'savings' ? 'Total Savings' : 'Annual Income'
                    ]}
                    labelFormatter={(label) => `Age ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="#3B82F6" 
                    fill="#3B82F6"
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#10B981" 
                    fill="#10B981"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>
                Actions to improve your retirement readiness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {retirementData.recommendations.map((rec) => (
                  <div 
                    key={rec.id}
                    className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{rec.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        rec.priority === 'high' 
                          ? 'bg-red-100 text-red-800'
                          : rec.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {rec.priority} priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{rec.description}</p>
                    <p className="text-sm font-medium text-primary mb-3">{rec.impact}</p>
                    <Button size="sm" variant="outline">
                      <Zap className="h-4 w-4 mr-2" />
                      {rec.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>Retirement Milestones</CardTitle>
              <CardDescription>
                Key checkpoints on your retirement journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {retirementData.milestones.map((milestone, index) => {
                  const progress = (milestone.current / milestone.target) * 100;
                  const isOnTrack = progress >= 75; // Consider on track if 75% of target
                  
                  return (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isOnTrack ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {isOnTrack ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <Clock className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">Age {milestone.age}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(milestone.target)}</p>
                          <p className="text-sm text-gray-600">target</p>
                        </div>
                      </div>
                      
                      <div className="ml-11">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">
                            Current: {formatCurrency(milestone.current)}
                          </span>
                          <span className="text-sm font-medium">
                            {progress.toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}