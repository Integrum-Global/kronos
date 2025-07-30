import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../src/components/ui/Card";
import { Button } from "../../src/components/ui/Button";
import { TrendingUp, TrendingDown, ExternalLink, AlertCircle, Info } from "lucide-react";

const InsightsSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="animate-pulse space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function MarketInsights() {
  const { isPending, error, data: marketData } = useQuery({
    queryKey: ['market-insights'],
    queryFn: () =>
      fetch('/api/market/insights').then((res) => {
        if (!res.ok) throw new Error('Failed to fetch market data');
        return res.json();
      }),
    // Mock data for development
    initialData: {
      marketSummary: {
        sp500: { value: 4547.31, change: 1.24, changePercent: 0.027 },
        nasdaq: { value: 15129.09, change: -23.47, changePercent: -0.15 },
        dow: { value: 35459.29, change: 45.23, changePercent: 0.13 }
      },
      insights: [
        {
          id: 1,
          type: 'market_update',
          title: 'Markets Mixed on Fed Commentary',
          summary: 'Stocks showed mixed results as investors digest latest Federal Reserve minutes.',
          impact: 'neutral',
          timestamp: '2024-07-30T09:30:00Z',
          relevance: 'high'
        },
        {
          id: 2,
          type: 'opportunity',
          title: 'Rebalancing Opportunity Detected',
          summary: 'Your portfolio has drifted 4.2% from target allocation. Consider rebalancing.',
          impact: 'positive',
          timestamp: '2024-07-30T08:00:00Z',
          relevance: 'personal'
        },
        {
          id: 3,
          type: 'education',
          title: 'Dollar-Cost Averaging in Volatile Markets',
          summary: 'Learn how consistent investing can help smooth out market volatility.',
          impact: 'educational',
          timestamp: '2024-07-29T12:00:00Z',
          relevance: 'medium'
        }
      ],
      personalizedTip: {
        title: "Market Timing Reminder",
        content: "Based on your investment timeline of 25+ years, short-term market fluctuations have minimal impact on your long-term goals. Stay the course!",
        type: "reassurance"
      }
    }
  });

  if (isPending) return <InsightsSkeleton />;

  if (error) return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center text-red-600 text-sm">
          Error loading market data
        </div>
      </CardContent>
    </Card>
  );

  const formatPercent = (percent) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  const formatValue = (value) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      case 'neutral': return 'text-blue-600 bg-blue-100';
      case 'educational': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'positive': return TrendingUp;
      case 'negative': return TrendingDown;
      case 'educational': return Info;
      default: return AlertCircle;
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Market Insights</CardTitle>
            <CardDescription>
              Latest updates and opportunities
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Market Summary */}
        <div className="grid grid-cols-1 gap-2 text-sm">
          {Object.entries(marketData.marketSummary).map(([key, data]) => {
            const isPositive = data.change >= 0;
            return (
              <div key={key} className="flex items-center justify-between py-1">
                <span className="font-medium uppercase text-gray-600">
                  {key === 'sp500' ? 'S&P 500' : key.toUpperCase()}
                </span>
                <div className="text-right">
                  <div className="font-semibold">{formatValue(data.value)}</div>
                  <div className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercent(data.changePercent)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Personalized Tip */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-1">
            💡 {marketData.personalizedTip.title}
          </h4>
          <p className="text-sm text-blue-800">
            {marketData.personalizedTip.content}
          </p>
        </div>

        {/* Insights */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Recent Insights</h4>
          {marketData.insights.map((insight) => {
            const IconComponent = getImpactIcon(insight.impact);
            const colorClass = getImpactColor(insight.impact);
            
            return (
              <div
                key={insight.id}
                className="p-3 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-1.5 rounded-full ${colorClass} flex-shrink-0`}>
                    <IconComponent className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-gray-900 mb-1">
                      {insight.title}
                    </h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {insight.summary}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        insight.relevance === 'high' 
                          ? 'bg-red-100 text-red-800'
                          : insight.relevance === 'personal'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {insight.relevance === 'personal' ? 'For You' : insight.relevance}
                      </span>
                      <span className="text-xs text-gray-400">
                        {getTimeAgo(insight.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More */}
        <div className="pt-2 border-t">
          <Button variant="ghost" size="sm" className="w-full text-primary">
            <ExternalLink className="h-4 w-4 mr-2" />
            View All Market Updates
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}