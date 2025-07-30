import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../src/components/ui/Card";
import { Button } from "../../src/components/ui/Button";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  DollarSign, 
  TrendingUp,
  Clock,
  ExternalLink
} from "lucide-react";

const ActivitySkeleton = () => (
  <Card>
    <CardHeader>
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="animate-pulse space-y-4">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex items-center space-x-4 p-3 border rounded">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const activityIcons = {
  deposit: ArrowDownLeft,
  withdrawal: ArrowUpRight,
  rebalance: RefreshCw,
  dividend: DollarSign,
  buy: TrendingUp,
  sell: ArrowUpRight
};

const activityColors = {
  deposit: 'text-green-600 bg-green-100',
  withdrawal: 'text-red-600 bg-red-100',
  rebalance: 'text-blue-600 bg-blue-100',
  dividend: 'text-yellow-600 bg-yellow-100',
  buy: 'text-green-600 bg-green-100',
  sell: 'text-red-600 bg-red-100'
};

export default function RecentActivity() {
  const { isPending, error, data: activityData } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: () =>
      fetch('/api/activity/recent').then((res) => {
        if (!res.ok) throw new Error('Failed to fetch activity data');
        return res.json();
      }),
    // Mock data for development
    initialData: [
      {
        id: 1,
        type: 'deposit',
        description: 'Monthly automatic investment',
        amount: 2000.00,
        timestamp: '2024-07-29T10:30:00Z',
        status: 'completed',
        details: 'Recurring deposit from checking account'
      },
      {
        id: 2,
        type: 'rebalance',
        description: 'Portfolio rebalancing',
        amount: null,
        timestamp: '2024-07-28T14:15:00Z',
        status: 'completed',
        details: 'Automatic rebalancing triggered by drift threshold'
      },
      {
        id: 3,
        type: 'dividend',
        description: 'VTSAX dividend payment',
        amount: 45.67,
        timestamp: '2024-07-27T09:00:00Z',
        status: 'completed',
        details: 'Quarterly dividend automatically reinvested'
      },
      {
        id: 4,
        type: 'buy',
        description: 'Purchased VTIAX',
        amount: 1500.00,
        timestamp: '2024-07-26T11:20:00Z',
        status: 'completed',
        details: 'International stock fund purchase'
      },
      {
        id: 5,
        type: 'deposit',
        description: 'One-time deposit',
        amount: 5000.00,
        timestamp: '2024-07-25T16:45:00Z',
        status: 'completed',
        details: 'Bonus investment deposit'
      },
      {
        id: 6,
        type: 'rebalance',
        description: 'Monthly rebalancing',
        amount: null,
        timestamp: '2024-07-24T12:00:00Z',
        status: 'completed',
        details: 'Scheduled monthly portfolio rebalancing'
      }
    ]
  });

  if (isPending) return <ActivitySkeleton />;

  if (error) return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center text-red-600">
          Error loading activity data: {error.message}
        </div>
      </CardContent>
    </Card>
  );

  const formatCurrency = (amount) => {
    if (!amount) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Recent Activity</CardTitle>
            <CardDescription>
              Your latest transactions and portfolio changes
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activityData.map((activity) => {
            const IconComponent = activityIcons[activity.type] || Clock;
            const iconColorClass = activityColors[activity.type] || 'text-gray-600 bg-gray-100';
            
            return (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
              >
                {/* Icon */}
                <div className={`p-2 rounded-full ${iconColorClass}`}>
                  <IconComponent className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 truncate">
                      {activity.description}
                    </p>
                    {activity.amount && (
                      <p className={`font-semibold ${
                        ['deposit', 'dividend', 'buy'].includes(activity.type)
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {['deposit', 'dividend', 'buy'].includes(activity.type) && '+'}
                        {formatCurrency(activity.amount)}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-500 truncate">
                      {activity.details}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400 ml-4">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(activity.timestamp)}</span>
                      <span>•</span>
                      <span>{formatTime(activity.timestamp)}</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : activity.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {activity.status}
                </div>
              </div>
            );
          })}
        </div>

        {/* Activity Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">This Month's Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Deposits</p>
              <p className="font-semibold text-green-600">
                {formatCurrency(
                  activityData
                    .filter(a => a.type === 'deposit')
                    .reduce((sum, a) => sum + (a.amount || 0), 0)
                )}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Dividends</p>
              <p className="font-semibold text-green-600">
                {formatCurrency(
                  activityData
                    .filter(a => a.type === 'dividend')
                    .reduce((sum, a) => sum + (a.amount || 0), 0)
                )}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Rebalances</p>
              <p className="font-semibold">
                {activityData.filter(a => a.type === 'rebalance').length}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Transactions</p>
              <p className="font-semibold">
                {activityData.length}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}