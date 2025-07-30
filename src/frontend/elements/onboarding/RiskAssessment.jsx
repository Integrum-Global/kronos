import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../src/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../src/components/ui/Card";
import { Progress } from "../../src/components/ui/Progress";
import { useUserStore } from "../../src/stores/userStore";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

function LoadingSkeleton() {
    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <div className="h-8 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                </CardHeader>
                <CardContent className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-3">
                            <div className="h-6 bg-gray-200 rounded animate-pulse" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="h-16 bg-gray-200 rounded animate-pulse" />
                                <div className="h-16 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

const riskQuestions = [
    {
        id: "age",
        question: "What's your age range?",
        description: "Age helps determine your investment timeline",
        options: [
            { value: "18-25", label: "18-25 years", score: 5 },
            { value: "26-35", label: "26-35 years", score: 4 },
            { value: "36-45", label: "36-45 years", score: 3 },
            { value: "46-55", label: "46-55 years", score: 2 },
            { value: "55+", label: "55+ years", score: 1 },
        ],
    },
    {
        id: "timeline",
        question: "When do you plan to use this money?",
        description: "Your investment timeline affects risk capacity",
        options: [
            { value: "1-2", label: "1-2 years", score: 1 },
            { value: "3-5", label: "3-5 years", score: 2 },
            { value: "6-10", label: "6-10 years", score: 3 },
            { value: "11-20", label: "11-20 years", score: 4 },
            { value: "20+", label: "20+ years", score: 5 },
        ],
    },
    {
        id: "experience",
        question: "How would you describe your investment experience?",
        description: "Experience helps us tailor explanations and strategies",
        options: [
            { value: "none", label: "No experience", score: 1 },
            { value: "limited", label: "Limited experience", score: 2 },
            { value: "moderate", label: "Moderate experience", score: 3 },
            { value: "experienced", label: "Experienced", score: 4 },
            { value: "expert", label: "Very experienced", score: 5 },
        ],
    },
    {
        id: "volatility",
        question: "How would you react if your portfolio dropped 20% in a month?",
        description: "This helps us understand your emotional risk tolerance",
        options: [
            { value: "panic", label: "Panic and sell everything", score: 1, icon: <AlertTriangle className="h-5 w-5 text-red-500" /> },
            { value: "worried", label: "Feel very worried", score: 2, icon: <TrendingDown className="h-5 w-5 text-orange-500" /> },
            { value: "concerned", label: "Be concerned but hold", score: 3, icon: <AlertTriangle className="h-5 w-5 text-yellow-500" /> },
            { value: "calm", label: "Stay calm and wait", score: 4, icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
            { value: "buy-more", label: "Buy more at lower prices", score: 5, icon: <TrendingUp className="h-5 w-5 text-green-600" /> },
        ],
    },
    {
        id: "income",
        question: "How stable is your income?",
        description: "Income stability affects your ability to weather market downturns",
        options: [
            { value: "unstable", label: "Very unstable", score: 1 },
            { value: "somewhat-stable", label: "Somewhat stable", score: 2 },
            { value: "stable", label: "Stable", score: 3 },
            { value: "very-stable", label: "Very stable", score: 4 },
            { value: "multiple-sources", label: "Multiple stable sources", score: 5 },
        ],
    },
    {
        id: "emergency-fund",
        question: "Do you have an emergency fund covering 3-6 months of expenses?",
        description: "Emergency funds provide security for riskier investments",
        options: [
            { value: "none", label: "No emergency fund", score: 1 },
            { value: "partial", label: "1-2 months covered", score: 2 },
            { value: "adequate", label: "3-6 months covered", score: 4 },
            { value: "extensive", label: "6+ months covered", score: 5 },
        ],
    },
];

export default function RiskAssessment({ onNext }) {
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const { updateOnboardingData, setRiskProfile } = useUserStore();

    // Simulate API call for risk calculation
    const { isPending, error, data } = useQuery({
        queryKey: ['risk-calculation'],
        queryFn: () =>
            new Promise(resolve => setTimeout(() => resolve({ calculated: true }), 500)),
        enabled: false
    });

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const calculateRiskProfile = () => {
        const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0);
        const maxScore = riskQuestions.length * 5;
        const riskPercentage = (totalScore / maxScore) * 100;

        let riskLevel, allocation, description;

        if (riskPercentage <= 30) {
            riskLevel = "Conservative";
            allocation = { stocks: 30, bonds: 60, cash: 10 };
            description = "Focus on capital preservation with steady, modest growth";
        } else if (riskPercentage <= 50) {
            riskLevel = "Moderate Conservative";
            allocation = { stocks: 50, bonds: 40, cash: 10 };
            description = "Balanced approach with slight emphasis on stability";
        } else if (riskPercentage <= 70) {
            riskLevel = "Moderate";
            allocation = { stocks: 70, bonds: 25, cash: 5 };
            description = "Balanced growth and stability for long-term wealth building";
        } else if (riskPercentage <= 85) {
            riskLevel = "Moderate Aggressive";
            allocation = { stocks: 85, bonds: 15, cash: 0 };
            description = "Growth-focused with some stability for wealth accumulation";
        } else {
            riskLevel = "Aggressive";
            allocation = { stocks: 95, bonds: 5, cash: 0 };
            description = "Maximum growth potential for long-term wealth building";
        }

        return {
            level: riskLevel,
            score: totalScore,
            percentage: riskPercentage,
            allocation,
            description,
            answers,
        };
    };

    const handleNext = () => {
        if (currentQuestion < riskQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // All questions answered, calculate risk profile
            const riskProfile = calculateRiskProfile();
            setRiskProfile(riskProfile);
            updateOnboardingData({ riskAssessment: riskProfile });
            onNext(riskProfile);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const progress = ((currentQuestion + 1) / riskQuestions.length) * 100;
    const question = riskQuestions[currentQuestion];
    const currentAnswer = answers[question.id];

    if (isPending) return <LoadingSkeleton />;

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                        <CardTitle className="text-2xl">Risk Assessment</CardTitle>
                        <span className="text-sm text-gray-500">
                            {currentQuestion + 1} of {riskQuestions.length}
                        </span>
                    </div>
                    <Progress value={progress} className="mb-4" />
                    <CardDescription>
                        Help us understand your investment preferences to create the perfect portfolio for you
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">{question.question}</h3>
                            <p className="text-sm text-gray-600 mb-4">{question.description}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {question.options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleAnswer(question.id, option)}
                                    className={`p-4 text-left border rounded-lg transition-all hover:border-primary hover:bg-primary/5 ${currentAnswer?.value === option.value
                                            ? "border-primary bg-primary/10"
                                            : "border-gray-200"
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        {option.icon && option.icon}
                                        <div className="flex-1">
                                            <div className="font-medium">{option.label}</div>
                                        </div>
                                        {currentAnswer?.value === option.value && (
                                            <CheckCircle className="h-5 w-5 text-primary" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between pt-6">
                            <Button
                                variant="outline"
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                            >
                                Previous
                            </Button>

                            <Button
                                onClick={handleNext}
                                disabled={!currentAnswer}
                            >
                                {currentQuestion === riskQuestions.length - 1 ? "Calculate Profile" : "Next"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Progress indicator */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    This assessment takes about 3 minutes and helps us create your personalized investment strategy
                </p>
            </div>
        </div>
    );
} 