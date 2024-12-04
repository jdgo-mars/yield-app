import { AppPieChart } from "./pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// TODO: Extract strings to props
const PortfolioCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Assets</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$15,231.89</div>
        <p className="text-xs text-muted-foreground">+5.1% from last month</p>
      </CardContent>
    </Card>
  );
};

export const Portfolio = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">Portfolio</h2>
      <div className="grid gap-4 pt-4 xl:grid-cols-2 lg:grid-cols-2 grid-col-1">
        <PortfolioCard />
        <PortfolioCard />
        <div>
          <AppPieChart />
        </div>
      </div>
    </div>
  );
};
