import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../src/stores/userStore";
import { Progress } from "../src/components/ui/Progress";
import { Button } from "../src/components/ui/Button";
import { ArrowLeft, TrendingUp } from "lucide-react";

// Import onboarding step components
import Registration from "./onboarding/Registration";
import PersonalInfo from "./onboarding/PersonalInfo";
import RiskAssessment from "./onboarding/RiskAssessment";
import GoalSetting from "./onboarding/GoalSetting";
import PortfolioReview from "./onboarding/PortfolioReview";
import AccountFunding from "./onboarding/AccountFunding";
import Welcome from "./onboarding/Welcome";

const onboardingSteps = [
    { path: "register", title: "Create Account", component: Registration },
    { path: "personal", title: "Personal Info", component: PersonalInfo },
    { path: "risk", title: "Risk Assessment", component: RiskAssessment },
    { path: "goals", title: "Investment Goals", component: GoalSetting },
    { path: "portfolio", title: "Portfolio Review", component: PortfolioReview },
    { path: "funding", title: "Fund Account", component: AccountFunding },
    { path: "welcome", title: "Welcome", component: Welcome },
];

export default function OnboardingFlow() {
    const navigate = useNavigate();
    const location = useLocation();
    const { onboardingStep, updateOnboardingStep } = useUserStore();

    const currentStepIndex = onboardingSteps.findIndex(
        step => location.pathname.includes(step.path)
    );

    const progress = ((currentStepIndex + 1) / onboardingSteps.length) * 100;

    const handleBack = () => {
        if (currentStepIndex > 0) {
            const prevStep = onboardingSteps[currentStepIndex - 1];
            navigate(`/onboarding/${prevStep.path}`);
            updateOnboardingStep(currentStepIndex - 1);
        } else {
            navigate("/");
        }
    };

    const handleNext = (stepData = {}) => {
        if (currentStepIndex < onboardingSteps.length - 1) {
            const nextStep = onboardingSteps[currentStepIndex + 1];
            navigate(`/onboarding/${nextStep.path}`);
            updateOnboardingStep(currentStepIndex + 1);
        } else {
            // Onboarding complete, redirect to dashboard
            navigate("/dashboard");
        }
    };

    // If no specific step is in the URL, redirect to first step
    React.useEffect(() => {
        if (location.pathname === "/onboarding" || location.pathname === "/onboarding/") {
            navigate("/onboarding/register");
        }
    }, [location.pathname, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleBack}
                                className="rounded-full"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="h-6 w-6 text-primary" />
                                <span className="text-xl font-bold text-gray-900">Kronos</span>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                Step {currentStepIndex + 1} of {onboardingSteps.length}
                            </span>
                            <div className="w-32">
                                <Progress value={progress} />
                            </div>
                        </div>
                    </div>

                    {/* Mobile progress */}
                    <div className="md:hidden mt-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">
                                Step {currentStepIndex + 1} of {onboardingSteps.length}
                            </span>
                            <span className="text-sm text-gray-600">
                                {Math.round(progress)}% complete
                            </span>
                        </div>
                        <Progress value={progress} />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <Routes>
                    {onboardingSteps.map((step, index) => {
                        const StepComponent = step.component;
                        return (
                            <Route
                                key={step.path}
                                path={step.path}
                                element={
                                    <StepComponent
                                        onNext={handleNext}
                                        onBack={handleBack}
                                        stepIndex={index}
                                        isLastStep={index === onboardingSteps.length - 1}
                                    />
                                }
                            />
                        );
                    })}
                </Routes>
            </main>

            {/* Step indicator for larger screens */}
            <div className="hidden lg:block fixed bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-white rounded-full shadow-lg px-6 py-3">
                    <div className="flex items-center space-x-2">
                        {onboardingSteps.map((step, index) => (
                            <div
                                key={step.path}
                                className={`w-3 h-3 rounded-full transition-colors ${index <= currentStepIndex
                                        ? "bg-primary"
                                        : "bg-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 