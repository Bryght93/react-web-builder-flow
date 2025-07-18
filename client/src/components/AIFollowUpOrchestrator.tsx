import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, 
  MessageSquare, 
  Users, 
  Target, 
  Zap, 
  Play, 
  Pause, 
  BarChart3, 
  PlusCircle, 
  Edit, 
  Settings, 
  Clock, 
  TrendingUp, 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Bot, 
  Layers, 
  GitBranch, 
  Filter, 
  Search,
  Smartphone,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Phone,
  Send,
  Eye,
  Heart,
  Star,
  ArrowRight,
  Workflow,
  Split,
  Merge
} from "lucide-react";

export default function AIFollowUpOrchestrator() {
  const [activeTab, setActiveTab] = useState("workflows");
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);

  const multiChannelWorkflows = [
    {
      id: 1,
      name: "New Lead Nurture Sequence",
      status: "Active",
      channels: ["Email", "SMS", "Instagram", "LinkedIn"],
      steps: 12,
      activeLeads: 487,
      completionRate: "78.4%",
      conversionRate: "12.8%",
      avgResponseTime: "2.4 hours",
      lastActivity: "5 min ago"
    },
    {
      id: 2,
      name: "Abandoned Cart Recovery",
      status: "Active",
      channels: ["Email", "SMS", "WhatsApp"],
      steps: 8,
      activeLeads: 234,
      completionRate: "89.2%",
      conversionRate: "24.7%",
      avgResponseTime: "1.8 hours",
      lastActivity: "12 min ago"
    },
    {
      id: 3,
      name: "Post-Purchase Follow-up",
      status: "Active",
      channels: ["Email", "SMS", "Instagram"],
      steps: 10,
      activeLeads: 156,
      completionRate: "92.1%",
      conversionRate: "18.6%",
      avgResponseTime: "3.2 hours",
      lastActivity: "1 hour ago"
    },
    {
      id: 4,
      name: "Webinar Promotion Sequence",
      status: "Paused",
      channels: ["Email", "LinkedIn", "Facebook"],
      steps: 15,
      activeLeads: 0,
      completionRate: "0%",
      conversionRate: "0%",
      avgResponseTime: "N/A",
      lastActivity: "2 days ago"
    }
  ];

  const channelPerformance = [
    { 
      name: "Email", 
      icon: Mail, 
      color: "bg-blue-500", 
      sent: 12847, 
      delivered: 12234, 
      opened: 3456, 
      clicked: 892, 
      converted: 247,
      deliveryRate: "95.2%",
      openRate: "28.3%",
      clickRate: "7.3%",
      conversionRate: "1.9%"
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
      deliveryRate: "98.0%",
      openRate: "76.1%",
      clickRate: "10.2%",
      conversionRate: "2.7%"
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
      deliveryRate: "95.3%",
      openRate: "70.2%",
      clickRate: "10.5%",
      conversionRate: "3.3%"
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
      deliveryRate: "97.1%",
      openRate: "65.9%",
      clickRate: "12.6%",
      conversionRate: "5.4%"
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
      deliveryRate: "98.4%",
      openRate: "82.5%",
      clickRate: "21.2%",
      conversionRate: "10.0%"
    }
  ];

  const automationRules = [
    {
      id: 1,
      name: "Smart Channel Selection",
      description: "Automatically choose the best channel based on user preference and engagement history",
      status: "Active",
      triggers: 847,
      success: "89.2%"
    },
    {
      id: 2,
      name: "Optimal Timing",
      description: "Send messages when users are most likely to engage based on their activity patterns",
      status: "Active",
      triggers: 1234,
      success: "76.8%"
    },
    {
      id: 3,
      name: "Response Prioritization",
      description: "Prioritize follow-ups based on lead score and engagement level",
      status: "Active",
      triggers: 567,
      success: "94.1%"
    },
    {
      id: 4,
      name: "Fatigue Management",
      description: "Prevent over-messaging by spacing out communications intelligently",
      status: "Active",
      triggers: 234,
      success: "82.4%"
    }
  ];

  const workflowTemplates = [
    {
      id: 1,
      name: "Lead Nurture Pro",
      description: "Comprehensive 14-step nurture sequence across email, SMS, and social",
      channels: ["Email", "SMS", "Instagram", "LinkedIn"],
      steps: 14,
      conversionRate: "18.7%",
      category: "Nurture"
    },
    {
      id: 2,
      name: "Quick Convert",
      description: "Fast-track high-intent leads with immediate multi-channel outreach",
      channels: ["SMS", "WhatsApp", "Phone"],
      steps: 6,
      conversionRate: "34.2%",
      category: "Conversion"
    },
    {
      id: 3,
      name: "Re-engagement Blast",
      description: "Win back dormant leads with strategic cross-platform messaging",
      channels: ["Email", "Instagram", "Facebook"],
      steps: 10,
      conversionRate: "12.4%",
      category: "Re-engagement"
    },
    {
      id: 4,
      name: "VIP Treatment",
      description: "Premium experience for high-value prospects with personal touch",
      channels: ["Email", "SMS", "LinkedIn", "Phone"],
      steps: 18,
      conversionRate: "42.1%",
      category: "VIP"
    }
  ];

  const getChannelIcon = (channel) => {
    switch(channel) {
      case "Email": return Mail;
      case "SMS": return Smartphone;
      case "Instagram": return Instagram;
      case "LinkedIn": return Linkedin;
      case "Facebook": return Facebook;
      case "Twitter": return Twitter;
      case "WhatsApp": return MessageSquare;
      case "Phone": return Phone;
      default: return MessageSquare;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Workflow className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Follow-Up Orchestrator</h1>
          <p className="text-muted-foreground">Master control center for multi-channel follow-up automation</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Multi-Channel Workflows</h2>
              <p className="text-muted-foreground">Orchestrate complex follow-up sequences across all channels</p>
            </div>
            <Button onClick={() => setShowWorkflowBuilder(true)}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Workflow
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {multiChannelWorkflows.map((workflow) => (
              <Card key={workflow.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <Badge variant={workflow.status === "Active" ? "default" : "secondary"}>
                      {workflow.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {workflow.channels.map((channel) => {
                        const Icon = getChannelIcon(channel);
                        return <Icon key={channel} className="w-4 h-4" />;
                      })}
                    </div>
                    <span>{workflow.channels.join(", ")}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{workflow.activeLeads}</div>
                        <div className="text-xs text-muted-foreground">Active Leads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{workflow.steps}</div>
                        <div className="text-xs text-muted-foreground">Steps</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Completion Rate</span>
                        <span className="font-medium">{workflow.completionRate}</span>
                      </div>
                      <Progress value={parseFloat(workflow.completionRate)} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Conversion Rate</span>
                        <span className="font-medium text-green-600">{workflow.conversionRate}</span>
                      </div>
                      <Progress value={parseFloat(workflow.conversionRate)} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        <div>Avg Response: {workflow.avgResponseTime}</div>
                        <div>Last Activity: {workflow.lastActivity}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {workflow.status === "Active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Channel Performance</h2>
            <p className="text-muted-foreground">Monitor and optimize performance across all communication channels</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {channelPerformance.map((channel) => (
              <Card key={channel.name} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${channel.color} rounded-lg flex items-center justify-center`}>
                        <channel.icon className="w-4 h-4 text-white" />
                      </div>
                      <CardTitle className="text-lg">{channel.name}</CardTitle>
                    </div>
                    <Badge variant="outline">{channel.sent.toLocaleString()}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Delivered</div>
                        <div className="text-lg font-bold">{channel.delivered.toLocaleString()}</div>
                        <div className="text-xs text-green-600">{channel.deliveryRate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Opened</div>
                        <div className="text-lg font-bold">{channel.opened.toLocaleString()}</div>
                        <div className="text-xs text-blue-600">{channel.openRate}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Clicked</div>
                        <div className="text-lg font-bold">{channel.clicked.toLocaleString()}</div>
                        <div className="text-xs text-purple-600">{channel.clickRate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Converted</div>
                        <div className="text-lg font-bold">{channel.converted.toLocaleString()}</div>
                        <div className="text-xs text-green-600">{channel.conversionRate}</div>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Optimize
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Automation Rules</h2>
            <p className="text-muted-foreground">AI-powered rules that optimize your follow-up sequences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {automationRules.map((rule) => (
              <Card key={rule.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rule.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{rule.success}</Badge>
                      <Switch defaultChecked={rule.status === "Active"} />
                    </div>
                  </div>
                  <CardDescription>{rule.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{rule.triggers}</div>
                        <div className="text-xs text-muted-foreground">Triggers</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{rule.success}</div>
                        <div className="text-xs text-muted-foreground">Success</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Workflow Templates</h2>
              <p className="text-muted-foreground">Pre-built multi-channel sequences for different scenarios</p>
            </div>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workflowTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {template.channels.map((channel) => {
                          const Icon = getChannelIcon(channel);
                          return <Icon key={channel} className="w-4 h-4" />;
                        })}
                      </div>
                      <span className="text-sm text-muted-foreground">{template.channels.join(", ")}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-lg font-bold">{template.steps}</div>
                        <div className="text-xs text-muted-foreground">Steps</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{template.conversionRate}</div>
                        <div className="text-xs text-muted-foreground">Conversion</div>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm" className="flex-1">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Use Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Orchestrator Analytics</h2>
            <p className="text-muted-foreground">Comprehensive insights across all channels and workflows</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,847</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16.8%</div>
                <p className="text-xs text-muted-foreground">+2.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1h</div>
                <p className="text-xs text-muted-foreground">-0.4h from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Channel Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {channelPerformance.map((channel) => (
                    <div key={channel.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 ${channel.color} rounded-full`}></div>
                        <span className="text-sm font-medium">{channel.name}</span>
                      </div>
                      <div className="text-sm font-medium">{channel.sent.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workflow Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {multiChannelWorkflows.slice(0, 3).map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{workflow.name}</div>
                        <div className="text-sm text-muted-foreground">{workflow.activeLeads} leads</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{workflow.conversionRate}</div>
                        <div className="text-sm text-muted-foreground">conversion</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}