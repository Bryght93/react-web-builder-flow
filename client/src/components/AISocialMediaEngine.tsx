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
import { Progress } from "@/components/ui/progress";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageSquare, 
  Users, 
  Target, 
  Zap, 
  Play, 
  Pause, 
  BarChart3, 
  Filter, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Send, 
  CheckCircle, 
  Clock, 
  Star, 
  TrendingUp,
  Eye,
  Heart,
  Share,
  MessageCircle,
  Settings,
  Calendar,
  Bot,
  Sparkles
} from "lucide-react";

export default function AISocialMediaEngine() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showAutomationBuilder, setShowAutomationBuilder] = useState(false);

  const socialCampaigns = [
    {
      id: 1,
      name: "Instagram DM Follow-up",
      platforms: ["Instagram"],
      status: "Active",
      messages: 12,
      responses: "18.4%",
      engagement: "32.1%",
      leads: 156,
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "LinkedIn Connection Sequence",
      platforms: ["LinkedIn"],
      status: "Active",
      messages: 8,
      responses: "24.7%",
      engagement: "41.2%",
      leads: 89,
      lastActivity: "4 hours ago"
    },
    {
      id: 3,
      name: "Multi-Platform Retargeting",
      platforms: ["Facebook", "Instagram", "Twitter"],
      status: "Active",
      messages: 15,
      responses: "15.9%",
      engagement: "28.6%",
      leads: 234,
      lastActivity: "1 hour ago"
    },
    {
      id: 4,
      name: "WhatsApp Business Follow-up",
      platforms: ["WhatsApp"],
      status: "Draft",
      messages: 6,
      responses: "0%",
      engagement: "0%",
      leads: 0,
      lastActivity: "Never"
    }
  ];

  const platformStats = [
    { name: "Instagram", icon: Instagram, color: "bg-pink-500", active: 3, leads: 487, engagement: "28.9%" },
    { name: "Facebook", icon: Facebook, color: "bg-blue-600", active: 2, leads: 312, engagement: "22.4%" },
    { name: "LinkedIn", icon: Linkedin, color: "bg-blue-700", active: 4, leads: 198, engagement: "35.7%" },
    { name: "Twitter", icon: Twitter, color: "bg-black", active: 1, leads: 156, engagement: "19.8%" },
    { name: "WhatsApp", icon: MessageSquare, color: "bg-green-500", active: 2, leads: 89, engagement: "42.1%" },
    { name: "TikTok", icon: Target, color: "bg-black", active: 1, leads: 67, engagement: "31.4%" }
  ];

  const automationTriggers = [
    { id: 1, name: "New Follower", description: "When someone follows your account", icon: Users },
    { id: 2, name: "Story View", description: "When someone views your story", icon: Eye },
    { id: 3, name: "Post Engagement", description: "When someone likes/comments on posts", icon: Heart },
    { id: 4, name: "Profile Visit", description: "When someone visits your profile", icon: Target },
    { id: 5, name: "Message Keyword", description: "When someone sends specific keywords", icon: MessageCircle },
    { id: 6, name: "Link Click", description: "When someone clicks your bio link", icon: Share },
    { id: 7, name: "Connection Request", description: "When someone sends connection request", icon: Users },
    { id: 8, name: "Post Share", description: "When someone shares your content", icon: Share }
  ];

  const messageTemplates = [
    {
      id: 1,
      name: "Welcome DM",
      platform: "Instagram",
      content: "Hey {name}! 👋 Thanks for following us! I noticed you're interested in {interest}. Would you like to get our free guide on {topic}?",
      category: "Welcome",
      performance: "28.4%"
    },
    {
      id: 2,
      name: "Connection Thank You",
      platform: "LinkedIn",
      content: "Hi {name}, thanks for connecting! I see you work in {industry}. I'd love to share some insights that might be valuable for your {role}.",
      category: "Connection",
      performance: "35.7%"
    },
    {
      id: 3,
      name: "Engagement Follow-up",
      platform: "Facebook",
      content: "Hi {name}! I saw you engaged with our recent post about {topic}. Would you like to get more detailed insights on this?",
      category: "Engagement",
      performance: "22.1%"
    },
    {
      id: 4,
      name: "Story Viewer Follow-up",
      platform: "Instagram",
      content: "Thanks for checking out our story! {name}, here's the link to that resource I mentioned: {link}",
      category: "Story",
      performance: "31.8%"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Social Media Engine</h1>
          <p className="text-muted-foreground">Automate follow-ups across Instagram, Facebook, LinkedIn, Twitter, TikTok & WhatsApp</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Social Media Campaigns</h2>
              <p className="text-muted-foreground">Automated follow-up sequences across all platforms</p>
            </div>
            <Button onClick={() => setShowAutomationBuilder(true)}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialCampaigns.map((campaign) => (
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
                      {campaign.platforms.map((platform) => {
                        const platformData = platformStats.find(p => p.name === platform);
                        const Icon = platformData?.icon || MessageSquare;
                        return <Icon key={platform} className="w-4 h-4" />;
                      })}
                    </div>
                    <span>{campaign.platforms.join(", ")}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Messages: {campaign.messages}</span>
                      <span>Leads: {campaign.leads}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Response Rate</span>
                        <span className="font-medium">{campaign.responses}</span>
                      </div>
                      <Progress value={parseFloat(campaign.responses)} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Engagement Rate</span>
                        <span className="font-medium">{campaign.engagement}</span>
                      </div>
                      <Progress value={parseFloat(campaign.engagement)} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        Last activity: {campaign.lastActivity}
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
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

        <TabsContent value="platforms" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Platform Overview</h2>
            <p className="text-muted-foreground">Manage your social media platform connections and performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformStats.map((platform) => (
              <Card key={platform.name} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center`}>
                        <platform.icon className="w-4 h-4 text-white" />
                      </div>
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                    </div>
                    <Badge variant="outline">{platform.active} Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Leads</span>
                      <span className="font-bold text-lg">{platform.leads}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Engagement Rate</span>
                      <span className="font-medium">{platform.engagement}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
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
            <h2 className="text-2xl font-bold">Automation Triggers</h2>
            <p className="text-muted-foreground">Set up automated responses based on user actions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automationTriggers.map((trigger) => (
              <Card key={trigger.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <trigger.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{trigger.name}</CardTitle>
                      <CardDescription>{trigger.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <span className="text-sm">Active</span>
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
              <h2 className="text-2xl font-bold">Message Templates</h2>
              <p className="text-muted-foreground">Pre-built messages for different platforms and scenarios</p>
            </div>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messageTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.platform}</Badge>
                  </div>
                  <CardDescription>{template.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">{template.content}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-500">Response Rate: {template.performance}</span>
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Social Media Analytics</h2>
            <p className="text-muted-foreground">Track performance across all social platforms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,847</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.8%</div>
                <p className="text-xs text-muted-foreground">+3.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,309</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
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

          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformStats.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 ${platform.color} rounded-lg flex items-center justify-center`}>
                        <platform.icon className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">{platform.leads}</div>
                        <div className="text-xs text-muted-foreground">Leads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{platform.engagement}</div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{platform.active}</div>
                        <div className="text-xs text-muted-foreground">Active</div>
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