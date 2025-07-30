import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../src/components/ui/Card";
import { Button } from "../../src/components/ui/Button";
import { 
  Plus, 
  ArrowUpRight, 
  RefreshCw, 
  Settings, 
  Calculator,
  FileText,
  HelpCircle,
  Phone
} from "lucide-react";

export default function QuickActions({ isMobile = false }) {
  const actions = [
    {
      icon: Plus,
      label: "Add Money",
      description: "Make a deposit",
      color: "text-green-600 bg-green-100 hover:bg-green-200",
      action: () => console.log("Add money")
    },
    {
      icon: ArrowUpRight,
      label: "Withdraw",
      description: "Transfer funds out",
      color: "text-blue-600 bg-blue-100 hover:bg-blue-200",
      action: () => console.log("Withdraw")
    },
    {
      icon: RefreshCw,
      label: "Rebalance",
      description: "Adjust portfolio",
      color: "text-purple-600 bg-purple-100 hover:bg-purple-200",
      action: () => console.log("Rebalance")
    },
    {
      icon: Calculator,
      label: "Calculator",
      description: "Plan investments",
      color: "text-yellow-600 bg-yellow-100 hover:bg-yellow-200",
      action: () => console.log("Calculator")
    },
    {
      icon: FileText,
      label: "Statements",
      description: "View documents",
      color: "text-gray-600 bg-gray-100 hover:bg-gray-200",
      action: () => console.log("Statements")
    },
    {
      icon: Settings,
      label: "Settings",
      description: "Account preferences",
      color: "text-indigo-600 bg-indigo-100 hover:bg-indigo-200",
      action: () => console.log("Settings")
    }
  ];

  const supportActions = [
    {
      icon: HelpCircle,
      label: "Help Center",
      description: "Find answers",
      action: () => console.log("Help Center")
    },
    {
      icon: Phone,
      label: "Contact Support",
      description: "Get personal help",
      action: () => console.log("Contact Support")
    }
  ];

  if (isMobile) {
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold px-2">Quick Actions</h3>
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <div className={`p-2 rounded-lg ${action.color}`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{action.label}</p>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </button>
          );
        })}
        
        <div className="border-t mt-4 pt-4">
          <h4 className="text-md font-semibold px-2 mb-2">Support</h4>
          {supportActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <IconComponent className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">{action.label}</p>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>
          Common tasks and tools
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all text-left group ${
                  index < 2 ? 'col-span-1' : 'col-span-1'
                }`}
              >
                <div className={`p-2 rounded-lg mb-2 inline-block ${action.color} group-hover:scale-105 transition-transform`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <p className="font-medium text-sm">{action.label}</p>
                <p className="text-xs text-gray-600">{action.description}</p>
              </button>
            );
          })}
        </div>

        {/* Support Section */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold mb-3">Need Help?</h4>
          <div className="space-y-2">
            {supportActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-auto p-2"
                  onClick={action.action}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{action.label}</p>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}