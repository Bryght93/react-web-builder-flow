import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Phone, 
  Target, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Filter, 
  Download, 
  Eye, 
  DollarSign,
  Activity,
  Zap,
  Settings,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";

export default function AIFollowUpAnalytics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("7d");

  const overviewStats = [
    { 
      name: "Total Messages Sent", 
      value: "24,847", 
      change: "+18.4%", 
      trend: "up", 
      icon: MessageSquare, 
      color: "text-blue-600" 
    },
    { 
      name: "Response Rate", 
      value: "32.7%", 
      change: "+4.2%", 
      trend: "up", 
      icon: TrendingUp, 
      color: "text-green-600" 
    },
    { 
      name: "Conversion Rate", 
      value: "8.9%", 
      change: "+1.8%", 
      trend: "up", 
      icon: Target, 
      color: "text-purple-600" 
    },
    { 
      name: "Revenue Generated", 
      value: "$127,450", 
      change: "+23.1%", 
      trend: "up", 
      icon: DollarSign, 
      color: "text-green-600" 
    }
  ];

  const channelAnalytics = [
    {
      name: "Email",
      icon: Mail,
      color: "bg-blue-500",
      sent: 12847,
      delivered: 12234,
      opened: 3456,
      clicked: 892,
      converted: 247,
      revenue: "$45,620",
      deliveryRate: "95.2%",
      openRate: "28.3%",
      clickRate: "7.3%",
      conversionRate: "1.9%",
      roas: "3.2x"
    },
    {
      name: "SMS",
      icon: Smartphone,
      color: "bg-green-500",
      sent: 5678,
      delivered: 5567,
      opened: 4234,
      clicked: 567,
      converted: 156,
      revenue: "$32,890",
      deliveryRate: "98.0%",
      openRate: "76.1%",
      clickRate: "10.2%",
      conversionRate: "2.7%",
      roas: "4.8x"
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "bg-pink-500",
      sent: 2345,
      delivered: 2234,
      opened: 1567,
      clicked: 234,
      converted: 78,
      revenue: "$18,750",
      deliveryRate: "95.3%",
      openRate: "70.2%",
      clickRate: "10.5%",
      conversionRate: "3.3%",
      roas: "2.9x"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700",
      sent: 1234,
      delivered: 1198,
      opened: 789,
      clicked: 156,
      converted: 67,
      revenue: "$24,180",
      deliveryRate: "97.1%",
      openRate: "65.9%",
      clickRate: "12.6%",
      conversionRate: "5.4%",
      roas: "5.7x"
    },
    {
      name: "WhatsApp",
      icon: MessageSquare,
      color: "bg-green-600",
      sent: 890,
      delivered: 876,
      opened: 723,
      clicked: 189,
      converted: 89,
      revenue: "$28,650",
      deliveryRate: "98.4%",
      openRate: "82.5%",
      clickRate: "21.2%",
      conversionRate: "10.0%",
      roas: "6.4x"
    }
  ];

  const workflowPerformance = [
    {
      id: 1,
      name: "New Lead Nurture",
      channels: ["Email", "SMS", "Instagram"],
      activeLeads: 487,
      completedLeads: 1234,
      conversionRate: "12.8%",
      avgResponseTime: "2.4h",
      revenue: "$67,890",
      trend: "up"
    },
    {
      id: 2,
      name: "Abandoned Cart Recovery",
      channels: ["Email", "SMS", "WhatsApp"],
      activeLeads: 234,
      completedLeads: 567,
      conversionRate: "24.7%",
      avgResponseTime: "1.8h",
      revenue: "$45,230",
      trend: "up"
    },
    {
      id: 3,
      name: "Post-Purchase Follow-up",
      channels: ["Email", "SMS", "Instagram"],
      activeLeads: 156,
      completedLeads: 789,
      conversionRate: "18.6%",
      avgResponseTime: "3.2h",
      revenue: "$32,780",
      trend: "down"
    },
    {
      id: 4,
      name: "Re-engagement Campaign",
      channels: ["Email", "Facebook", "Instagram"],
      activeLeads: 89,
      completedLeads: 456,
      conversionRate: "9.4%",
      avgResponseTime: "4.1h",
      revenue: "$18,950",
      trend: "up"
    }
  ];

  const timeBasedAnalytics = [
    { time: "6 AM", email: 24, sms: 45, social: 12, total: 81 },
    { time: "9 AM", email: 67, sms: 89, social: 34, total: 190 },
    { time: "12 PM", email: 123, sms: 67, social: 45, total: 235 },
    { time: "3 PM", email: 89, sms: 56, social: 67, total: 212 },
    { time: "6 PM", email: 156, sms: 78, social: 89, total: 323 },
    { time: "9 PM", email: 234, sms: 123, social: 56, total: 413 }
  ];

  const audienceInsights = [
    { 
      segment: "High-Value Prospects", 
      size: 1247, 
      responseRate: "45.2%", 
      conversionRate: "18.7%", 
      revenue: "$89,560",
      preferredChannel: "LinkedIn"
    },
    { 
      segment: "New Subscribers", 
      size: 2456, 
      responseRate: "32.8%", 
      conversionRate: "8.9%", 
      revenue: "$34,670",
      preferredChannel: "Email"
    },
    { 
      segment: "Returning Customers", 
      size: 567, 
      responseRate: "67.3%", 
      conversionRate: "28.4%", 
      revenue: "$67,890",
      preferredChannel: "SMS"
    },
    { 
      segment: "Cold Leads", 
      size: 3456, 
      responseRate: "12.4%", 
      conversionRate: "3.2%", 
      revenue: "$12,340",
      preferredChannel: "Instagram"
    }
  ];

  const getTrendIcon = (trend) => {
    switch(trend) {
      case "up": return <ArrowUp className="w-4 h-4 text-green-500" />;
      case "down": return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Follow-Up Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights across all channels and workflows</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="timing">Timing</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="roi">ROI</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {overviewStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(stat.trend)}
                    <span className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last period
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Channel Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channelAnalytics.slice(0, 3).map((channel) => (
                    <div key={channel.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 ${channel.color} rounded-lg flex items-center justify-center`}>
                          <channel.icon className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{channel.name}</div>
                          <div className="text-sm text-muted-foreground">{channel.sent.toLocaleString()} sent</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{channel.conversionRate}</div>
                        <div className="text-sm text-muted-foreground">conversion</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflowPerformance.slice(0, 3).map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{workflow.name}</div>
                        <div className="text-sm text-muted-foreground">{workflow.activeLeads} active leads</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{workflow.conversionRate}</span>
                          {getTrendIcon(workflow.trend)}
                        </div>
                        <div className="text-sm text-muted-foreground">{workflow.revenue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Channel Deep Dive</h2>
            <p className="text-muted-foreground">Detailed performance metrics for each communication channel</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {channelAnalytics.map((channel) => (
              <Card key={channel.name} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${channel.color} rounded-lg flex items-center justify-center`}>
                        <channel.icon className="w-4 h-4 text-white" />
                      </div>
                      <CardTitle className="text-lg">{channel.name}</CardTitle>
                    </div>
                    <Badge variant="outline">{channel.roas}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{channel.sent.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Messages Sent</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{channel.revenue}</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Delivery Rate</span>
                        <span className="font-medium">{channel.deliveryRate}</span>
                      </div>
                      <Progress value={parseFloat(channel.deliveryRate)} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Open Rate</span>
                        <span className="font-medium">{channel.openRate}</span>
                      </div>
                      <Progress value={parseFloat(channel.openRate)} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Click Rate</span>
                        <span className="font-medium">{channel.clickRate}</span>
                      </div>
                      <Progress value={parseFloat(channel.clickRate)} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Conversion Rate</span>
                        <span className="font-medium text-green-600">{channel.conversionRate}</span>
                      </div>
                      <Progress value={parseFloat(channel.conversionRate)} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Workflow Performance</h2>
            <p className="text-muted-foreground">Analyze the effectiveness of your multi-channel sequences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workflowPerformance.map((workflow) => (
              <Card key={workflow.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{workflow.conversionRate}</Badge>
                      {getTrendIcon(workflow.trend)}
                    </div>
                  </div>
                  <CardDescription className="flex items-center space-x-2">
                    <span>{workflow.channels.join(", ")}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{workflow.activeLeads}</div>
                        <div className="text-xs text-muted-foreground">Active</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{workflow.completedLeads}</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{workflow.revenue}</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="text-sm text-muted-foreground">
                        Avg Response: {workflow.avgResponseTime}
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timing" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Timing Analysis</h2>
            <p className="text-muted-foreground">Optimize send times based on engagement patterns</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Best Send Times</CardTitle>
              <CardDescription>Response rates by time of day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeBasedAnalytics.map((timeSlot) => (
                  <div key={timeSlot.time} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 text-center">
                        <div className="font-medium">{timeSlot.time}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Email: {timeSlot.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">SMS: {timeSlot.sms}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                          <span className="text-sm">Social: {timeSlot.social}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{timeSlot.total}</div>
                      <div className="text-sm text-muted-foreground">Total</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Audience Insights</h2>
            <p className="text-muted-foreground">Understand your audience segments and their preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {audienceInsights.map((segment) => (
              <Card key={segment.segment} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{segment.segment}</CardTitle>
                  <CardDescription>{segment.size.toLocaleString()} contacts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{segment.responseRate}</div>
                        <div className="text-xs text-muted-foreground">Response Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{segment.conversionRate}</div>
                        <div className="text-xs text-muted-foreground">Conversion Rate</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <div className="text-sm text-muted-foreground">Preferred Channel</div>
                        <div className="font-medium">{segment.preferredChannel}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{segment.revenue}</div>
                        <div className="text-sm text-muted-foreground">Revenue</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">ROI Analysis</h2>
            <p className="text-muted-foreground">Track return on investment across all channels</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$189,930</div>
                <p className="text-xs text-muted-foreground">+28% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average ROAS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2x</div>
                <p className="text-xs text-muted-foreground">+0.8x from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cost per Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$23.50</div>
                <p className="text-xs text-muted-foreground">-$4.20 from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Channel ROI Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channelAnalytics.map((channel) => (
                  <div key={channel.name} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 ${channel.color} rounded-lg flex items-center justify-center`}>
                        <channel.icon className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{channel.name}</div>
                        <div className="text-sm text-muted-foreground">{channel.sent.toLocaleString()} messages</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="font-medium">{channel.revenue}</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{channel.roas}</div>
                        <div className="text-xs text-muted-foreground">ROAS</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{channel.conversionRate}</div>
                        <div className="text-xs text-muted-foreground">Conversion</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}