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
import { Mail, MessageSquare, Users, Target, Zap, Play, Pause, BarChart3, Filter, PlusCircle, Edit, Trash2, UserMinus, DollarSign, Send, AlertTriangle, TrendingDown, CheckCircle, Download, Eye, Star, Clock, Smartphone, Moon } from "lucide-react";
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

        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-semibold">Email Analytics Dashboard</h2>
          
          {/* Overview Metrics Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">24.5%</p>
                    <p className="text-muted-foreground text-sm">Open Rate</p>
                    <p className="text-xs text-green-600">+5.2% vs last week</p>
                  </div>
                  <Mail className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">5.2%</p>
                    <p className="text-muted-foreground text-sm">Click Rate</p>
                    <p className="text-xs text-green-600">+1.8% vs last week</p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">3.6%</p>
                    <p className="text-muted-foreground text-sm">Conversion Rate</p>
                    <p className="text-xs text-green-600">+0.4% vs last week</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">1.8%</p>
                    <p className="text-muted-foreground text-sm">Unsubscribe Rate</p>
                    <p className="text-xs text-red-600">+0.2% vs last week</p>
                  </div>
                  <UserMinus className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">$2,450</p>
                    <p className="text-muted-foreground text-sm">Revenue Generated</p>
                    <p className="text-xs text-green-600">+12.3% vs last week</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">12,400</p>
                    <p className="text-muted-foreground text-sm">Emails Sent</p>
                  </div>
                  <Send className="w-6 h-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">0.2%</p>
                    <p className="text-muted-foreground text-sm">Spam Complaints</p>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">0.9%</p>
                    <p className="text-muted-foreground text-sm">Bounce Rate</p>
                  </div>
                  <TrendingDown className="w-6 h-6 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">98.1%</p>
                    <p className="text-muted-foreground text-sm">Deliverability Score</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Performance Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Campaign Performance</CardTitle>
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
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Campaign Name</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Sent Date</th>
                      <th className="text-left p-2">Open Rate</th>
                      <th className="text-left p-2">Click Rate</th>
                      <th className="text-left p-2">Conversion</th>
                      <th className="text-left p-2">Revenue</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Welcome Series</td>
                      <td className="p-2"><Badge variant="outline">Automation</Badge></td>
                      <td className="p-2 text-sm text-muted-foreground">Jan 15, 2025</td>
                      <td className="p-2">32.4%</td>
                      <td className="p-2">8.2%</td>
                      <td className="p-2">4.1%</td>
                      <td className="p-2 font-medium">$1,240</td>
                      <td className="p-2"><Badge className="bg-green-100 text-green-800">Ongoing</Badge></td>
                      <td className="p-2">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm"><BarChart3 className="w-4 h-4" /></Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Product Launch</td>
                      <td className="p-2"><Badge variant="outline">Broadcast</Badge></td>
                      <td className="p-2 text-sm text-muted-foreground">Jan 12, 2025</td>
                      <td className="p-2">28.7%</td>
                      <td className="p-2">6.8%</td>
                      <td className="p-2">3.2%</td>
                      <td className="p-2 font-medium">$890</td>
                      <td className="p-2"><Badge className="bg-blue-100 text-blue-800">Completed</Badge></td>
                      <td className="p-2">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm"><BarChart3 className="w-4 h-4" /></Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Re-engagement Campaign</td>
                      <td className="p-2"><Badge variant="outline">Drip</Badge></td>
                      <td className="p-2 text-sm text-muted-foreground">Jan 10, 2025</td>
                      <td className="p-2">15.3%</td>
                      <td className="p-2">3.2%</td>
                      <td className="p-2">1.8%</td>
                      <td className="p-2 font-medium">$320</td>
                      <td className="p-2"><Badge className="bg-green-100 text-green-800">Ongoing</Badge></td>
                      <td className="p-2">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm"><BarChart3 className="w-4 h-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Heatmap Explorer */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Email Heatmap Explorer</CardTitle>
                <div className="flex items-center space-x-2">
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select Campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">Welcome Series</SelectItem>
                      <SelectItem value="launch">Product Launch</SelectItem>
                      <SelectItem value="reengagement">Re-engagement Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <h4 className="font-medium mb-3">Email Preview</h4>
                    <div className="border rounded-lg bg-white p-4 space-y-3">
                      <div className="h-8 bg-blue-100 rounded flex items-center px-3 text-sm relative">
                        Header Section
                        <span className="absolute right-2 bg-red-500 text-white text-xs px-1 rounded">High</span>
                      </div>
                      <div className="h-12 bg-gray-100 rounded flex items-center px-3 text-sm relative">
                        Main Content Body
                        <span className="absolute right-2 bg-yellow-500 text-white text-xs px-1 rounded">Medium</span>
                      </div>
                      <div className="h-6 bg-green-100 rounded flex items-center px-3 text-sm relative">
                        Primary CTA Button
                        <span className="absolute right-2 bg-red-500 text-white text-xs px-1 rounded">High</span>
                      </div>
                      <div className="h-8 bg-purple-100 rounded flex items-center px-3 text-sm relative">
                        Product Block
                        <span className="absolute right-2 bg-gray-500 text-white text-xs px-1 rounded">Low</span>
                      </div>
                      <div className="h-6 bg-blue-100 rounded flex items-center px-3 text-sm relative">
                        Footer Links
                        <span className="absolute right-2 bg-yellow-500 text-white text-xs px-1 rounded">Medium</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span>High Engagement</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span>Medium Engagement</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-500 rounded"></div>
                      <span>Low Engagement</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Section Click Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm">Header Section</span>
                      <div className="text-right">
                        <p className="text-sm font-medium">184 clicks</p>
                        <p className="text-xs text-muted-foreground">Desktop: 67% | Mobile: 33%</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm">Primary CTA</span>
                      <div className="text-right">
                        <p className="text-sm font-medium">429 clicks</p>
                        <p className="text-xs text-muted-foreground">Desktop: 52% | Mobile: 48%</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm">Footer Links</span>
                      <div className="text-right">
                        <p className="text-sm font-medium">89 clicks</p>
                        <p className="text-xs text-muted-foreground">Desktop: 71% | Mobile: 29%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Emails and Revenue Attribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Emails */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Emails</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Welcome Email #1</h4>
                      <p className="text-xs text-muted-foreground">VIP Segment • Jan 15</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">42.3%</p>
                      <p className="text-xs text-muted-foreground">$1,240</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Product Launch Announcement</h4>
                      <p className="text-xs text-muted-foreground">All Subscribers • Jan 12</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">38.7%</p>
                      <p className="text-xs text-muted-foreground">$890</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-12 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Flash Sale Alert</h4>
                      <p className="text-xs text-muted-foreground">Recent Purchasers • Jan 8</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">35.2%</p>
                      <p className="text-xs text-muted-foreground">$654</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Attribution Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Attribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">Welcome Series</h4>
                      <p className="text-xs text-muted-foreground">Avg. 2.3 days to conversion</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$4,250</p>
                      <p className="text-xs text-muted-foreground">12.3% conversion</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">Product Launch</h4>
                      <p className="text-xs text-muted-foreground">Avg. 1.1 days to conversion</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$8,900</p>
                      <p className="text-xs text-muted-foreground">8.7% conversion</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">Re-engagement</h4>
                      <p className="text-xs text-muted-foreground">Avg. 4.7 days to conversion</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$1,800</p>
                      <p className="text-xs text-muted-foreground">15.1% conversion</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Average Order Value</span>
                      <span className="font-medium">$87.50</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Engagement Timeline and Smart Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Engagement Timeline */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Engagement Timeline</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="7 Days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="text-center space-y-2">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Interactive engagement timeline chart</p>
                    <p className="text-xs text-muted-foreground">Open rates, clicks, and revenue over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Widgets */}
            <Card>
              <CardHeader>
                <CardTitle>Smart Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Best Send Time</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Tuesday 2:00 PM shows highest engagement</p>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Top Segment</span>
                  </div>
                  <p className="text-xs text-muted-foreground">VIP customers have 3x higher open rates</p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Device Impact</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Mobile opens: 68% | Desktop: 32%</p>
                </div>
                
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Moon className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium">Dark Mode</span>
                  </div>
                  <p className="text-xs text-muted-foreground">42% of opens use dark mode themes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}