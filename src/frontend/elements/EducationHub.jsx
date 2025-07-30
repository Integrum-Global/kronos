import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../src/stores/userStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../src/components/ui/Card";
import { Button } from "../src/components/ui/Button";
import { Progress } from "../src/components/ui/Progress";
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  Award,
  TrendingUp,
  Calculator,
  PieChart,
  DollarSign,
  Shield,
  Target,
  Star,
  ArrowRight
} from "lucide-react";

const EducationSkeleton = () => (
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
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function EducationHub() {
  const { profile } = useUserStore();
  const [activeCategory, setActiveCategory] = React.useState("getting_started");

  const { isPending, error, data: educationData } = useQuery({
    queryKey: ['education-content'],
    queryFn: () =>
      fetch('/api/education/content').then((res) => {
        if (!res.ok) throw new Error('Failed to fetch education data');
        return res.json();
      }),
    // Mock data for development
    initialData: {
      userProgress: {
        totalLessons: 24,
        completedLessons: 8,
        currentStreak: 5,
        totalPoints: 1250,
        currentLevel: "Intermediate Investor"
      },
      categories: [
        {
          id: "getting_started",
          name: "Getting Started",
          description: "Investment basics for beginners",
          icon: BookOpen,
          color: "text-blue-600 bg-blue-100",
          lessons: 6,
          completed: 4,
          estimatedTime: "2 hours"
        },
        {
          id: "portfolio_building",
          name: "Portfolio Building",
          description: "Learn to construct balanced portfolios",
          icon: PieChart,
          color: "text-green-600 bg-green-100",
          lessons: 8,
          completed: 3,
          estimatedTime: "3 hours"
        },
        {
          id: "risk_management",
          name: "Risk Management",
          description: "Understanding and managing investment risk",
          icon: Shield,
          color: "text-red-600 bg-red-100",
          lessons: 5,
          completed: 1,
          estimatedTime: "2.5 hours"
        },
        {
          id: "retirement_planning",
          name: "Retirement Planning",
          description: "Long-term wealth building strategies",
          icon: Target,
          color: "text-purple-600 bg-purple-100",
          lessons: 5,
          completed: 0,
          estimatedTime: "2 hours"
        }
      ],
      lessons: {
        getting_started: [
          {
            id: 1,
            title: "What is Investing?",
            description: "Learn the fundamentals of investing and why it matters",
            duration: 15,
            type: "video",
            completed: true,
            difficulty: "Beginner"
          },
          {
            id: 2,
            title: "Risk vs Return",
            description: "Understanding the relationship between risk and potential returns",
            duration: 20,
            type: "interactive",
            completed: true,
            difficulty: "Beginner"
          },
          {
            id: 3,
            title: "Compound Interest Magic",
            description: "How compound interest can grow your wealth over time",
            duration: 18,
            type: "calculator",
            completed: true,
            difficulty: "Beginner"
          },
          {
            id: 4,
            title: "Index Funds Explained",
            description: "Why index funds are popular with beginners",
            duration: 25,
            type: "video",
            completed: true,
            difficulty: "Beginner"
          },
          {
            id: 5,
            title: "Dollar-Cost Averaging",
            description: "A strategy to reduce timing risk",
            duration: 22,
            type: "simulation",
            completed: false,
            difficulty: "Beginner"
          },
          {
            id: 6,
            title: "Common Beginner Mistakes",
            description: "Avoid these costly investment mistakes",
            duration: 30,
            type: "article",
            completed: false,
            difficulty: "Beginner"
          }
        ]
      },
      achievements: [
        {
          id: 1,
          title: "First Steps",
          description: "Complete your first lesson",
          icon: Star,
          unlocked: true,
          earnedAt: "2024-07-25"
        },
        {
          id: 2,
          title: "Consistent Learner",
          description: "5-day learning streak",
          icon: Award,
          unlocked: true,
          earnedAt: "2024-07-29"
        },
        {
          id: 3,
          title: "Quiz Master",
          description: "Score 100% on 3 quizzes",
          icon: Target,
          unlocked: false
        }
      ]
    }
  });

  if (isPending) return <EducationSkeleton />;

  if (error) return (
    <div className="text-center text-red-600">
      Error loading education content: {error.message}
    </div>
  );

  const selectedCategory = educationData.categories.find(cat => cat.id === activeCategory);
  const lessons = educationData.lessons[activeCategory] || [];

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video': return Play;
      case 'interactive': return TrendingUp;
      case 'calculator': return Calculator;
      case 'simulation': return PieChart;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Education Hub</h1>
              <p className="text-gray-600 mt-1">
                Build your investment knowledge at your own pace
              </p>
            </div>
            <Button>
              <TrendingUp className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Progress Overview */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-gray-600">
                        {educationData.userProgress.completedLessons}/{educationData.userProgress.totalLessons}
                      </span>
                    </div>
                    <Progress 
                      value={(educationData.userProgress.completedLessons / educationData.userProgress.totalLessons) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {educationData.userProgress.currentStreak}
                      </p>
                      <p className="text-sm text-gray-600">Day Streak</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {educationData.userProgress.totalPoints}
                      </p>
                      <p className="text-sm text-gray-600">Points</p>
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <p className="font-semibold text-primary">
                      {educationData.userProgress.currentLevel}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {educationData.categories.map((category) => {
                    const IconComponent = category.icon;
                    const isActive = activeCategory === category.id;
                    const progress = (category.completed / category.lessons) * 100;
                    
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          isActive 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${category.color}`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {category.lessons} lessons • {category.estimatedTime}
                            </p>
                            <Progress value={progress} className="h-1" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-3 rounded-lg ${selectedCategory.color}`}>
                  <selectedCategory.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedCategory.name}</h2>
                  <p className="text-gray-600">{selectedCategory.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{selectedCategory.lessons} lessons</span>
                <span>•</span>
                <span>{selectedCategory.estimatedTime}</span>
                <span>•</span>
                <span>{selectedCategory.completed} completed</span>
              </div>
            </div>

            {/* Lessons Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {lessons.map((lesson) => {
                const LessonIcon = getLessonIcon(lesson.type);
                
                return (
                  <Card key={lesson.id} className={`transition-all hover:shadow-md ${
                    lesson.completed ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 rounded-lg ${
                          lesson.completed 
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <LessonIcon className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
                            {lesson.difficulty}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {lesson.duration}m
                          </div>
                        </div>
                      </div>

                      <h3 className="font-semibold text-lg mb-2">{lesson.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {lesson.description}
                      </p>

                      <Button 
                        className="w-full" 
                        variant={lesson.completed ? "outline" : "default"}
                      >
                        {lesson.completed ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Review Lesson
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Lesson
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Achievements */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
                <CardDescription>
                  Celebrate your learning milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {educationData.achievements.map((achievement) => {
                    const AchievementIcon = achievement.icon;
                    
                    return (
                      <div 
                        key={achievement.id}
                        className={`p-4 rounded-lg border text-center ${
                          achievement.unlocked
                            ? 'border-yellow-200 bg-yellow-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className={`p-3 rounded-full inline-block mb-3 ${
                          achievement.unlocked
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <AchievementIcon className="h-6 w-6" />
                        </div>
                        <h4 className={`font-semibold mb-1 ${
                          achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${
                          achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.earnedAt && (
                          <p className="text-xs text-yellow-600 mt-2">
                            Earned {new Date(achievement.earnedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}