import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Mail, 
  BarChart3, 
  Plus,
  ArrowUpRight,
  Target,
  MessageSquare,
  Calendar,
  Filter
} from "lucide-react";

const metrics = [
  {
    title: "Total Leads",
    value: "2,847",
    change: "+23%",
    trend: "up",
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Conversion Rate",
    value: "18.5%",
    change: "+5.2%",
    trend: "up", 
    icon: TrendingUp,
    color: "text-success"
  },
  {
    title: "Active Funnels",
    value: "12",
    change: "+3",
    trend: "up",
    icon: Zap,
    color: "text-warning"
  },
  {
    title: "Email Opens",
    value: "64.3%",
    change: "+8.1%",
    trend: "up",
    icon: Mail,
    color: "text-accent"
  }
];

const recentLeads = [
  { name: "Sarah Johnson", email: "sarah@example.com", source: "LinkedIn Quiz", status: "hot", time: "2 min ago" },
  { name: "Mike Chen", email: "mike@example.com", source: "Facebook Lead Magnet", status: "warm", time: "15 min ago" },
  { name: "Emma Davis", email: "emma@example.com", source: "Instagram Story", status: "cold", time: "1 hour ago" },
  { name: "James Wilson", email: "james@example.com", source: "Website Form", status: "hot", time: "2 hours ago" },
  { name: "Lisa Brown", email: "lisa@example.com", source: "WhatsApp", status: "warm", time: "3 hours ago" }
];

const activeFunnels = [
  { name: "Fitness Challenge eBook", leads: 234, conversion: 24.5, status: "active" },
  { name: "Real Estate Quiz", leads: 189, conversion: 31.2, status: "active" },
  { name: "Business Checklist", leads: 156, conversion: 18.7, status: "paused" },
  { name: "Health Assessment", leads: 98, conversion: 42.1, status: "active" }
];

function getStatusColor(status: string) {
  switch (status) {
    case "hot": return "bg-red-500/10 text-red-600 border-red-200";
    case "warm": return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
    case "cold": return "bg-blue-500/10 text-blue-600 border-blue-200";
    default: return "bg-gray-500/10 text-gray-600 border-gray-200";
  }
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your leads.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="gradient" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Funnel
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-soft hover:shadow-strong transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <div className="flex items-center space-x-1">
                      <ArrowUpRight className="w-4 h-4 text-success" />
                      <span className="text-sm text-success font-medium">{metric.change}</span>
                      <span className="text-sm text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center ${metric.color}`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Leads */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Leads</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {recentLeads.map((lead, index) => (
                    <div key={index} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{lead.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Target className="w-4 h-4 mr-3" />
                  Create Lead Magnet
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <MessageSquare className="w-4 h-4 mr-3" />
                  AI Quiz Builder
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Mail className="w-4 h-4 mr-3" />
                  Email Sequence
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar className="w-4 h-4 mr-3" />
                  Schedule Follow-up
                </Button>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-accent" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm text-foreground font-medium mb-1">
                    🔥 Peak engagement time detected
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your leads are most active between 2-4 PM. Schedule your next campaign!
                  </p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <p className="text-sm text-foreground font-medium mb-1">
                    📈 Conversion optimization tip
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Quiz funnels are performing 2.3x better than static forms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Active Funnels */}
        <Card className="border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Active Funnels</CardTitle>
            <Button variant="gradient" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Funnel
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeFunnels.map((funnel, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:shadow-soft transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground text-sm">{funnel.name}</h4>
                    <Badge variant={funnel.status === "active" ? "default" : "secondary"}>
                      {funnel.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Leads</span>
                      <span className="font-medium">{funnel.leads}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Conversion</span>
                      <span className="font-medium text-success">{funnel.conversion}%</span>
                    </div>
                    <Progress value={funnel.conversion} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}