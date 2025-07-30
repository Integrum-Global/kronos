import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../src/components/ui/Card";
import { Button } from "../../src/components/ui/Button";
import { Progress } from "../../src/components/ui/Progress";
import { Plus, Target, Home, GraduationCap, Heart, Plane, TrendingUp, Calendar } from "lucide-react";

const GoalSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="animate-pulse space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="p-4 border rounded-lg space-y-3">
            <div className="flex justify-between">
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const goalIcons = {
  retirement: Target,
  home: Home,
  education: GraduationCap,
  wedding: Heart,
  vacation: Plane,
  emergency: TrendingUp,
  general: Target
};

export default function GoalTracker() {
  const { isPending, error, data: goalsData } = useQuery({
    queryKey: ['goals'],
    queryFn: () =>
      fetch('/api/goals').then((res) => {
        if (!res.ok) throw new Error('Failed to fetch goals data');
        return res.json();
      }),
    // Mock data for development
    initialData: [
      {
        id: 1,
        name: "Retirement Fund",
        type: "retirement",
        targetAmount: 1000000,
        currentAmount: 125847,
        targetDate: "2054-12-31",
        monthlyContribution: 2000,
        onTrack: true,
        priority: "high"
      },
      {
        id: 2,
        name: "House Down Payment",
        type: "home",
        targetAmount: 80000,
        currentAmount: 32400,
        targetDate: "2026-06-01",
        monthlyContribution: 1500,
        onTrack: true,
        priority: "medium"
      },
      {
        id: 3,
        name: "Emergency Fund",
        type: "emergency",
        targetAmount: 30000,
        currentAmount: 18750,
        targetDate: "2025-12-31",
        monthlyContribution: 500,
        onTrack: false,
        priority: "high"
      }
    ]
  });

  if (isPending) return <GoalSkeleton />;

  if (error) return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center text-red-600">
          Error loading goals data: {error.message}
        </div>
      </CardContent>
    </Card>
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateTimeToGoal = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
    
    if (diffYears <= 1) {
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      return `${diffMonths} months`;
    }
    return `${diffYears} years`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Investment Goals</CardTitle>
            <CardDescription>
              Track your progress toward financial milestones
            </CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goalsData.map((goal) => {
            const IconComponent = goalIcons[goal.type] || Target;
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
            const timeToGoal = calculateTimeToGoal(goal.targetDate);
            
            return (
              <div
                key={goal.id}
                className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                  goal.priority === 'high' ? 'border-primary/30 bg-primary/5' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      goal.onTrack ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{goal.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Target className="h-4 w-4 mr-1" />
                          {formatCurrency(goal.targetAmount)}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(goal.targetDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                      goal.onTrack 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {goal.onTrack ? 'On Track' : 'Behind'}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      {formatCurrency(goal.currentAmount)} saved
                    </span>
                    <span className="text-sm text-gray-600">
                      {progress.toFixed(1)}% complete
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Additional Info */}
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-600">
                    <span className="font-medium">{formatCurrency(goal.monthlyContribution)}/month</span>
                    <span className="mx-1">•</span>
                    <span>{timeToGoal} remaining</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Adjust
                  </Button>
                </div>

                {/* Progress Indicator */}
                {!goal.onTrack && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Suggestion:</strong> Increase monthly contribution by{' '}
                      {formatCurrency(Math.ceil(goal.monthlyContribution * 0.2))} to get back on track.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Goal Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Goal Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Total Target</p>
              <p className="font-semibold">
                {formatCurrency(goalsData.reduce((sum, goal) => sum + goal.targetAmount, 0))}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Total Saved</p>
              <p className="font-semibold">
                {formatCurrency(goalsData.reduce((sum, goal) => sum + goal.currentAmount, 0))}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Monthly Total</p>
              <p className="font-semibold">
                {formatCurrency(goalsData.reduce((sum, goal) => sum + goal.monthlyContribution, 0))}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}