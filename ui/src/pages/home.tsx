import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
        <a className="flex items-center justify-center" href="#">
          <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="ml-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Yield
          </span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            href="#"
          >
            Features
          </a>
          <a
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            href="#"
          >
            Pricing
          </a>
          <a
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            href="#"
          >
            About
          </a>
          <a
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            href="#"
          >
            Contact
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="justify-center container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                  Maximize Your Investment Potential with Yield
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300">
                  Intelligent portfolio management for the modern investor.
                  Optimize your returns with our advanced algorithms and expert
                  insights.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-100 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center  py-12 md:py-24 lg:py-32 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-indigo-600 dark:text-indigo-400">
              Key Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
              {[
                {
                  icon: BarChart3,
                  title: "Advanced Analytics",
                  description:
                    "In-depth market analysis and performance tracking",
                },
                {
                  icon: PieChart,
                  title: "Diversification Tools",
                  description:
                    "Optimize your portfolio across various asset classes",
                },
                {
                  icon: TrendingUp,
                  title: "Automated Rebalancing",
                  description: "Keep your investments aligned with your goals",
                },
                {
                  icon: Users,
                  title: "Expert Advisors",
                  description: "Access to professional financial guidance",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-indigo-200 dark:border-indigo-800"
                >
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mb-2" />
                    <CardTitle className="text-indigo-600 dark:text-indigo-400">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-indigo-600 dark:text-indigo-400">
              What Our Clients Say
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  name: "Alex Johnson",
                  role: "Entrepreneur",
                  quote:
                    "Yield has transformed how I manage my investments. The insights are invaluable.",
                },
                {
                  name: "Sarah Lee",
                  role: "Retired Teacher",
                  quote:
                    "I feel more confident about my financial future thanks to Yield's expert guidance.",
                },
                {
                  name: "Michael Chen",
                  role: "Tech Executive",
                  quote:
                    "The automated rebalancing feature has saved me time and improved my returns.",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200 dark:border-purple-800"
                >
                  <CardHeader>
                    <CardTitle className="text-purple-600 dark:text-purple-400">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="italic text-gray-700 dark:text-gray-300">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-indigo-600 dark:text-indigo-400">
              Pricing Plans
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  name: "Basic",
                  price: "$9.99",
                  features: [
                    "Portfolio Tracking",
                    "Basic Analytics",
                    "Email Support",
                  ],
                },
                {
                  name: "Pro",
                  price: "$29.99",
                  features: [
                    "Advanced Analytics",
                    "Automated Rebalancing",
                    "Priority Support",
                  ],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  features: [
                    "Dedicated Advisor",
                    "Custom Integrations",
                    "24/7 Support",
                  ],
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className="flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-pink-200 dark:border-pink-800"
                >
                  <CardHeader>
                    <CardTitle className="text-pink-600 dark:text-pink-400">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {plan.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center text-gray-700 dark:text-gray-300"
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                      Choose Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
        <div className="container px-4 md:px-6 flex flex-col gap-2 sm:flex-row items-center">
          <p className="text-xs text-gray-700 dark:text-gray-300">
            © 2024 Yield. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <a
              className="text-xs text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-xs text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              href="#"
            >
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
