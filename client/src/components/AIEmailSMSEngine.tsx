import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Mail, MessageSquare, Users, Target, Zap, Play, Pause, BarChart3, Filter, PlusCircle, Edit, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AIEmailSMSEngine() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showSegmentBuilder, setShowSegmentBuilder] = useState(false);

  const campaigns = [
    {
      id: 1,
      name: "Welcome Series",
      type: "Email",
      status: "Active",
      emails: 5,
      opens: "24.5%",
      clicks: "8.2%",
      subscribers: 1247
    },
    {
      id: 2,
      name: "Abandoned Cart Recovery",
      type: "Email + SMS",
      status: "Active",
      emails: 3,
      opens: "32.1%",
      clicks: "12.8%",
      subscribers: 892
    },
    {
      id: 3,
      name: "Product Launch Sequence",
      type: "Email",
      status: "Draft",
      emails: 7,
      opens: "0%",
      clicks: "0%",
      subscribers: 0
    }
  ];

  const emailTemplates = [
    {
      id: 1,
      name: "Welcome Email #1",
      subject: "Welcome to our community! 🎉",
      type: "Welcome",
      opens: "42.3%",
      clicks: "15.7%"
    },
    {
      id: 2,
      name: "Nurture Email #1",
      subject: "The #1 mistake people make with...",
      type: "Nurture",
      opens: "28.9%",
      clicks: "9.4%"
    },
    {
      id: 3,
      name: "Urgency Email",
      subject: "Only 24 hours left!",
      type: "Scarcity",
      opens: "38.2%",
      clicks: "18.9%"
    }
  ];

  const segments = [
    {
      id: 1,
      name: "Engaged Subscribers",
      criteria: "Opened 3+ emails in last 30 days",
      count: 1456,
      color: "bg-green-500"
    },
    {
      id: 2,
      name: "Cold Leads",
      criteria: "No opens in last 30 days",
      count: 782,
      color: "bg-red-500"
    },
    {
      id: 3,
      name: "Recent Purchasers",
      criteria: "Made purchase in last 7 days",
      count: 234,
      color: "bg-blue-500"
    },
    {
      id: 4,
      name: "Video Watchers",
      criteria: "Clicked video link in last 14 days",
      count: 567,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Campaign Automation Engine</h1>
          <p className="text-muted-foreground">Intelligent email & SMS automation with smart segmentation</p>
          <div className="mt-2 text-sm text-muted-foreground">
            💡 Create beautiful emails in the <strong>Email Designer</strong>, then automate campaigns here
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Active Campaigns</h2>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-2">
                    {campaign.type === "Email + SMS" ? (
                      <>
                        <Mail className="w-4 h-4" />
                        <MessageSquare className="w-4 h-4" />
                      </>
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                    <span>{campaign.type}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Emails: {campaign.emails}</span>
                      <span>Subscribers: {campaign.subscribers}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Open Rate</span>
                        <span className="font-medium">{campaign.opens}</span>
                      </div>
                      <Progress value={parseFloat(campaign.opens)} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Click Rate</span>
                        <span className="font-medium">{campaign.clicks}</span>
                      </div>
                      <Progress value={parseFloat(campaign.clicks)} className="h-2" />
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        {campaign.status === "Active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Email Templates</h2>
            <div className="flex space-x-2">
              <Button>
                <Zap className="w-4 h-4 mr-2" />
                Generate with AI
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/email-marketing'}>
                <Mail className="w-4 h-4 mr-2" />
                Open Email Designer
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {emailTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.type}</Badge>
                  </div>
                  <CardDescription>{template.subject}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Open Rate</span>
                        <div className="font-medium">{template.opens}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Click Rate</span>
                        <div className="font-medium">{template.clicks}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Template
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Smart Segments</h2>
            <Button onClick={() => setShowSegmentBuilder(true)}>
              <Filter className="w-4 h-4 mr-2" />
              Create Segment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {segments.map((segment) => (
              <Card key={segment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-4 h-4 rounded-full ${segment.color}`}></div>
                    <h3 className="font-semibold text-lg">{segment.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{segment.criteria}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{segment.count.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm">contacts</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Campaign
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Automation Rules</h2>
            <Button>
              <Zap className="w-4 h-4 mr-2" />
              Create Automation
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Voice Command Setup</CardTitle>
              <CardDescription>
                Enable voice commands for quick campaign management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Voice Commands</h4>
                  <p className="text-sm text-muted-foreground">
                    "Send urgency email to cold leads"
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Example Commands:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• "Send welcome email to new subscribers"</li>
                  <li>• "Create urgency campaign for cart abandoners"</li>
                  <li>• "Show me analytics for last week"</li>
                  <li>• "Pause the product launch campaign"</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Behavioral Triggers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email not opened → Resend with new subject</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Link clicked → Send follow-up sequence</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Purchase made → Send thank you + upsell</span>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Smart Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Optimal send time detection</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Timezone-based delivery</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Frequency capping</span>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h2 className="text-2xl font-semibold">Campaign Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Mail className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">2,847</p>
                    <p className="text-muted-foreground text-sm">Emails Sent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Target className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">28.3%</p>
                    <p className="text-muted-foreground text-sm">Avg Open Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">11.7%</p>
                    <p className="text-muted-foreground text-sm">Avg Click Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">3.2%</p>
                    <p className="text-muted-foreground text-sm">Conversion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Analytics chart would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}