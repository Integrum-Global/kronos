import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../src/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../src/components/ui/Card";
import { TrendingUp, Shield, Clock, Target, Users, Award } from "lucide-react";

export default function LandingPage() {
    const navigate = useNavigate();

    const features = [
        {
            icon: <TrendingUp className="h-8 w-8 text-primary" />,
            title: "Automated Growth",
            description: "Professional-grade investment strategies that work 24/7 to grow your wealth",
            personas: ["Busy Professional", "Passive Wealth Builder"]
        },
        {
            icon: <Shield className="h-8 w-8 text-primary" />,
            title: "Risk Management",
            description: "Personalized risk assessment and portfolio protection for every life stage",
            personas: ["Retirement Planner", "Conservative Saver"]
        },
        {
            icon: <Clock className="h-8 w-8 text-primary" />,
            title: "Set & Forget",
            description: "Spend just 5 minutes setting up, then let automation handle the rest",
            personas: ["Busy Professional", "Young Investor"]
        },
        {
            icon: <Target className="h-8 w-8 text-primary" />,
            title: "Goal-Based Planning",
            description: "Whether it's retirement, a home, or wealth building - we'll get you there",
            personas: ["Retirement Planner", "Young Investor"]
        },
        {
            icon: <Users className="h-8 w-8 text-primary" />,
            title: "Values-Aligned Investing",
            description: "ESG and sustainable investment options that match your principles",
            personas: ["Ethical Investor"]
        },
        {
            icon: <Award className="h-8 w-8 text-primary" />,
            title: "Global Access",
            description: "Multi-currency support and international compliance for global professionals",
            personas: ["International Professional"]
        }
    ];

    const testimonials = [
        {
            name: "Sarah C.",
            role: "Software Engineer",
            quote: "Finally, an investment platform that works as hard as I do. Set it up in 10 minutes and haven't looked back.",
            persona: "Busy Professional"
        },
        {
            name: "Robert W.",
            role: "Manager",
            quote: "The retirement planning tools gave me confidence that I'm on track for a comfortable retirement.",
            persona: "Retirement Planner"
        },
        {
            name: "Maria R.",
            role: "Marketing Coordinator",
            quote: "Started with just $50 and learned so much. The education features are amazing for beginners.",
            persona: "Young Investor"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold text-gray-900">Kronos</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</a>
                        <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Reviews</a>
                        <Button variant="outline" onClick={() => navigate("/login")}>
                            Sign In
                        </Button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    Build Wealth
                    <span className="text-primary block">Automatically</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Professional investment management for everyone. Start with any amount,
                    set your goals, and let our AI-powered system grow your wealth while you focus on life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="text-lg px-8 py-4"
                        onClick={() => navigate("/onboarding")}
                    >
                        Get Started Free
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="text-lg px-8 py-4"
                    >
                        Watch Demo
                    </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    No minimum investment • SIPC insured • Cancel anytime
                </p>
            </section>

            {/* Features Section */}
            <section id="features" className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Whether you're just starting out or planning retirement,
                        our platform adapts to your unique situation and goals.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    {feature.icon}
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base mb-3">
                                    {feature.description}
                                </CardDescription>
                                <div className="flex flex-wrap gap-1">
                                    {feature.personas.map((persona, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                        >
                                            {persona}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Simple. Smart. Automated.
                        </h2>
                        <p className="text-lg text-gray-600">
                            Get started in minutes with our personalized approach
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-primary">1</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Tell Us About You</h3>
                            <p className="text-gray-600">
                                Quick assessment of your goals, timeline, and risk tolerance
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-primary">2</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">We Build Your Portfolio</h3>
                            <p className="text-gray-600">
                                AI-powered allocation based on modern portfolio theory and your preferences
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-primary">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Watch It Grow</h3>
                            <p className="text-gray-600">
                                Automatic rebalancing, tax optimization, and progress tracking
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Trusted by Thousands
                    </h2>
                    <p className="text-lg text-gray-600">
                        See what our users say about their investment journey
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index}>
                            <CardContent className="pt-6">
                                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                                <div className="flex items-center space-x-2">
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-primary-foreground py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Start Building Wealth?
                    </h2>
                    <p className="text-lg mb-8 opacity-90">
                        Join thousands of investors who are already on their path to financial freedom
                    </p>
                    <Button
                        size="lg"
                        variant="secondary"
                        className="text-lg px-8 py-4"
                        onClick={() => navigate("/onboarding")}
                    >
                        Start Your Journey Today
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <TrendingUp className="h-6 w-6" />
                                <span className="text-xl font-bold">Kronos</span>
                            </div>
                            <p className="text-gray-400">
                                Automated investment management for the modern investor.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Features</a></li>
                                <li><a href="#" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">Security</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">About</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                                <li><a href="#" className="hover:text-white">Legal</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Kronos. All rights reserved. SIPC insured.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
} 