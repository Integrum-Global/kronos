import React from "react";
import { useQuery } from "@tanstack/react-query";
import { portfolioAPI, createQueryKey, handleApiError } from "../../src/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../src/components/ui/Card";
import { Button } from "../../src/components/ui/Button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Activity, Eye, EyeOff } from "lucide-react";

const PortfolioSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="animate-pulse space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </CardContent>
  </Card>
);

export default function PortfolioOverview() {
  const [balanceVisible, setBalanceVisible] = React.useState(true);
  
  const { isPending, error, data: portfolioData } = useQuery({
    queryKey: createQueryKey('portfolio/overview'),
    queryFn: async () => {
      try {
        const response = await portfolioAPI.getOverview();
        return response.data;
      } catch (err) {
        const apiError = handleApiError(err);
        throw new Error(apiError.error);
      }
    },
    // Mock data for development
    initialData: {
      totalValue: 125847.32,
      dayChange: 1247.89,
      dayChangePercent: 1.02,
      totalGain: 8947.32,
      totalGainPercent: 7.65,
      performanceData: [
        { date: '2024-01', value: 100000 },
        { date: '2024-02', value: 102500 },
        { date: '2024-03', value: 98750 },
        { date: '2024-04', value: 105200 },
        { date: '2024-05', value: 108900 },
        { date: '2024-06', value: 112400 },
        { date: '2024-07', value: 125847 },
      ],
      allocation: [
        { name: 'Stocks', value: 70, amount: 88092.12, color: '#3B82F6' },
        { name: 'Bonds', value: 25, amount: 31461.83, color: '#10B981' },
        { name: 'Cash', value: 5, amount: 6293.37, color: '#F59E0B' },
      ]
    }
  });

  if (isPending) return <PortfolioSkeleton />;

  if (error) return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center text-red-600">
          Error loading portfolio data: {error.message}
        </div>
      </CardContent>
    </Card>
  );

  const formatCurrency = (amount) => {
    if (!balanceVisible) return '****';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const isPositive = portfolioData.dayChange >= 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Portfolio Overview</CardTitle>
            <CardDescription>
              Your investment performance and allocation
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setBalanceVisible(!balanceVisible)}
          >
            {balanceVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-gray-600">Total Value</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(portfolioData.totalValue)}
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-gray-600">Today</p>
            <p className={`text-2xl font-bold flex items-center justify-center md:justify-start ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? <TrendingUp className="h-5 w-5 mr-1" /> : <TrendingDown className="h-5 w-5 mr-1" />}
              {formatCurrency(Math.abs(portfolioData.dayChange))}
            </p>
            <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(portfolioData.dayChangePercent)}
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-gray-600">Total Gain</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(portfolioData.totalGain)}
            </p>
            <p className="text-sm text-green-600">
              {formatPercent(portfolioData.totalGainPercent)}
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-gray-600">Actions</p>
            <div className="flex space-x-2 mt-1 justify-center md:justify-start">
              <Button size="sm" variant="outline">
                <DollarSign className="h-4 w-4 mr-1" />
                Deposit
              </Button>
              <Button size="sm" variant="outline">
                <Activity className="h-4 w-4 mr-1" />
                Rebalance
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Chart and Allocation */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Performance (6 months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={portfolioData.performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis 
                  tickFormatter={(value) => balanceVisible ? `$${(value/1000).toFixed(0)}k` : '***k'}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Portfolio Value']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Asset Allocation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Asset Allocation</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={portfolioData.allocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.allocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${value}% (${formatCurrency(props.payload.amount)})`,
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {portfolioData.allocation.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold">{item.value}%</span>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}