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
import { Mail, MessageSquare, Users, Target, Zap, Play, Pause, BarChart3, Filter, PlusCircle, Edit, Trash2, UserMinus, DollarSign, Send, AlertTriangle, TrendingDown, CheckCircle, Download, Eye, Star, Clock, Smartphone, Moon, Instagram, Facebook, Linkedin, Twitter, Bot, Layers, Settings, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import AISocialMediaEngine from "./AISocialMediaEngine";
import AIFollowUpOrchestrator from "./AIFollowUpOrchestrator";
import AIFollowUpAnalytics from "./AIFollowUpAnalytics";

export default function AIEmailSMSEngine() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showSegmentBuilder, setShowSegmentBuilder] = useState(false);

  const campaigns = [
    {
      id: 1,
      name: "Welcome Series",
      type: "Email + SMS",
      status: "Active",
      emails: 5,
      smsMessages: 3,
      opens: "24.5%",
      clicks: "8.2%",
      replies: "12.8%",
      subscribers: 1247
    },
    {
      id: 2,
      name: "Abandoned Cart Recovery",
      type: "Multi-Channel",
      status: "Active",
      emails: 3,
      smsMessages: 2,
      socialMessages: 4,
      opens: "32.1%",
      clicks: "12.8%",
      replies: "18.4%",
      subscribers: 892
    },
    {
      id: 3,
      name: "Product Launch Sequence",
      type: "Email + SMS + Social",
      status: "Draft",
      emails: 7,
      smsMessages: 5,
      socialMessages: 8,
      opens: "0%",
      clicks: "0%",
      replies: "0%",
      subscribers: 0
    },
    {
      id: 4,
      name: "VIP Customer Nurture",
      type: "Multi-Channel",
      status: "Active",
      emails: 6,
      smsMessages: 4,
      socialMessages: 6,
      opens: "38.7%",
      clicks: "15.9%",
      replies: "22.3%",
      subscribers: 456
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

  const smsTemplates = [
    {
      id: 1,
      name: "Welcome SMS",
      content: "Welcome to {company}! 🎉 Thanks for joining us. Reply HELP for support or STOP to opt out.",
      type: "Welcome",
      replies: "18.4%",
      clicks: "12.7%"
    },
    {
      id: 2,
      name: "Cart Reminder SMS",
      content: "Hi {name}, you have items waiting in your cart. Complete your purchase: {link}",
      type: "Reminder",
      replies: "24.8%",
      clicks: "31.2%"
    },
    {
      id: 3,
      name: "Promotional SMS",
      content: "🔥 Limited time: {discount}% off! Use code {code}. Shop now: {link}",
      type: "Promotion",
      replies: "15.9%",
      clicks: "28.4%"
    },
    {
      id: 4,
      name: "Follow-up SMS",
      content: "Thanks for your purchase! How was your experience? Reply with feedback.",
      type: "Follow-up",
      replies: "32.1%",
      clicks: "8.9%"
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
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="sms">SMS Engine</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="orchestrator">Orchestrator</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Multi-Channel Campaigns</h2>
              <p className="text-muted-foreground">Unified email, SMS, and social media campaigns</p>
            </div>
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
                    <div className="flex space-x-1">
                      <Mail className="w-4 h-4" />
                      <Smartphone className="w-4 h-4" />
                      {campaign.type.includes("Social") && <Instagram className="w-4 h-4" />}
                    </div>
                    <span>{campaign.type}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span>Emails: {campaign.emails}</span>
                      <span>SMS: {campaign.smsMessages || 0}</span>
                      <span>Social: {campaign.socialMessages || 0}</span>
                      <span>Subscribers: {campaign.subscribers}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Open Rate</span>
                        <span className="font-medium">{campaign.opens}</span>
                      </div>
                      <Progress value={parseFloat(campaign.opens)} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Click Rate</span>
                        <span className="font-medium">{campaign.clicks}</span>
                      </div>
                      <Progress value={parseFloat(campaign.clicks)} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Reply Rate</span>
                        <span className="font-medium">{campaign.replies}</span>
                      </div>
                      <Progress value={parseFloat(campaign.replies)} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {campaign.status === "Active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Message Templates</h2>
              <p className="text-muted-foreground">Email and SMS templates for your campaigns</p>
            </div>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emailTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-muted-foreground">{template.subject}</div>
                        <div className="text-xs text-green-600 mt-1">
                          Opens: {template.opens} | Clicks: {template.clicks}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" />
                  SMS Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {smsTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-muted-foreground">{template.content.substring(0, 50)}...</div>
                        <div className="text-xs text-green-600 mt-1">
                          Replies: {template.replies} | Clicks: {template.clicks}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sms" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">SMS Engine</h2>
              <p className="text-muted-foreground">Advanced SMS campaign management and automation</p>
            </div>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create SMS Campaign
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total SMS Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,847</div>
                <p className="text-xs text-muted-foreground">+23% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.2%</div>
                <p className="text-xs text-muted-foreground">+1.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Reply Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28.4%</div>
                <p className="text-xs text-muted-foreground">+4.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.7%</div>
                <p className="text-xs text-muted-foreground">+1.8% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SMS Automation Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Welcome SMS", trigger: "New subscriber", status: "Active", sent: 1247 },
                    { name: "Cart Abandonment", trigger: "Cart abandoned", status: "Active", sent: 892 },
                    { name: "Purchase Thank You", trigger: "Order completed", status: "Active", sent: 567 },
                    { name: "Re-engagement", trigger: "30 days inactive", status: "Paused", sent: 234 }
                  ].map((rule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{rule.name}</div>
                        <div className="text-sm text-muted-foreground">{rule.trigger}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium">{rule.sent}</div>
                        <Switch checked={rule.status === "Active"} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {smsTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-muted-foreground">{template.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{template.replies}</div>
                        <div className="text-xs text-muted-foreground">reply rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <AISocialMediaEngine />
        </TabsContent>

        <TabsContent value="orchestrator" className="space-y-6">
          <AIFollowUpOrchestrator />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AIFollowUpAnalytics />
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Audience Segments</h2>
              <p className="text-muted-foreground">Smart segmentation for targeted campaigns</p>
            </div>
            <Button onClick={() => setShowSegmentBuilder(true)}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Segment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {segments.map((segment) => (
              <Card key={segment.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{segment.name}</CardTitle>
                    <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                  </div>
                  <CardDescription>{segment.criteria}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{segment.count.toLocaleString()}</div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
