import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import DashboardCard from "@/components/DashboardCard";
import TodoList from "@/components/TodoList";



export default function Homepage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground rounded-lg">
              <DashboardCard
                heading="Total Revenue"
                number="$45,231.89"
                text="+20.1% from last month"
              />

      </div>
      <div className="bg-primary-foreground rounded-lg">
      <DashboardCard
        heading="Active Users"
        number="12,234"
        text="+19% from last month"
      />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg"> <AppBarChart /> </div>
      <div className="bg-primary-foreground p-4 rounded-lg"><AppAreaChart/></div>
      
      <div className="bg-primary-foreground p-4 rounded-lg"><AppPieChart /> </div>
      
      <div className="bg-primary-foreground p-4 rounded-lg"><CardList title="Latest Transactions" /></div>
      <div className="bg-primary-foreground p-4 rounded-lg"><TodoList /></div>
      <div className="bg-primary-foreground p-4 rounded-lg"><CardList title="Popular Content" /></div>

      
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2">Test</div>
      
      

    </div>
  );
}
