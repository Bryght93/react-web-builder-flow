import React, { useState } from 'react';
import { Plus, Calendar, Target, Users, BarChart3, CheckCircle, Clock, Zap, Rocket, FileText, Mail, Globe, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const LaunchPlanner = () => {
  const [activeTab, setActiveTab] = useState('launches');
  const [showBuilder, setShowBuilder] = useState(false);

  const mockLaunches = [
    {
      id: 1,
      name: "Digital Marketing Course Launch",
      status: "in-progress",
      launchDate: "2025-02-15",
      daysRemaining: 25,
      progress: 65,
      revenue: "$12,450",
      leads: 1247,
      assets: 12,
      phase: "Pre-Launch"
    },
    {
      id: 2,
      name: "Email Automation Workshop",
      status: "planning",
      launchDate: "2025-03-20",
      daysRemaining: 58,
      progress: 25,
      revenue: "$0",
      leads: 0,
      assets: 5,
      phase: "Planning"
    },
    {
      id: 3,
      name: "AI Sales Funnel Masterclass",
      status: "completed",
      launchDate: "2025-01-10",
      daysRemaining: 0,
      progress: 100,
      revenue: "$28,790",
      leads: 2156,
      assets: 18,
      phase: "Post-Launch"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'planning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  if (showBuilder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Launch Campaign Builder</h1>
            <p className="text-muted-foreground">Plan and execute your product launch</p>
          </div>
          <Button variant="outline" onClick={() => setShowBuilder(false)}>
            Back to Launches
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Launch Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Campaign Name</label>
                    <Input placeholder="Enter campaign name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Launch Date</label>
                    <Input type="date" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Description</label>
                  <Textarea placeholder="Describe your launch campaign..." rows={4} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Campaign Type</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Product Launch</option>
                      <option>Course Launch</option>
                      <option>Service Launch</option>
                      <option>Event Launch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Revenue Goal</label>
                    <Input placeholder="$50,000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Lead Goal</label>
                    <Input placeholder="5,000 leads" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Launch Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { phase: "Pre-Launch", duration: "8 weeks before", tasks: ["Create lead magnet", "Build email sequences", "Set up landing pages"] },
                  { phase: "Announcement", duration: "4 weeks before", tasks: ["Announce to audience", "Start email nurture", "Social media teasers"] },
                  { phase: "Cart Open", duration: "1 week before", tasks: ["Open sales cart", "Send launch emails", "Run paid ads"] },
                  { phase: "Launch Day", duration: "Launch day", tasks: ["Final push emails", "Social media blitz", "Live events"] },
                  { phase: "Post-Launch", duration: "After launch", tasks: ["Thank you sequence", "Deliver product", "Gather testimonials"] }
                ].map((phase, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{phase.phase}</h3>
                        <p className="text-sm text-muted-foreground">{phase.duration}</p>
                      </div>
                      <Badge variant="outline">Phase {index + 1}</Badge>
                    </div>
                    <div className="space-y-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{task}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Task
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Launch Assets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Sales Page", status: "completed", type: "Landing Page" },
                    { name: "Lead Magnet", status: "in-progress", type: "PDF" },
                    { name: "Email Sequence", status: "completed", type: "Email Series" },
                    { name: "Social Media Kit", status: "planning", type: "Graphics" },
                    { name: "Video Sales Letter", status: "in-progress", type: "Video" },
                    { name: "Testimonials", status: "completed", type: "Social Proof" }
                  ].map((asset, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{asset.name}</h4>
                        <Badge variant={asset.status === 'completed' ? 'default' : 'outline'}>
                          {asset.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{asset.type}</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Asset
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Target Audience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Audience Segments</h4>
                    <div className="space-y-2">
                      {[
                        { name: "Existing Customers", size: "2,450", engagement: "High" },
                        { name: "Email Subscribers", size: "8,920", engagement: "Medium" },
                        { name: "Social Followers", size: "15,600", engagement: "Medium" },
                        { name: "Cold Audience", size: "50,000+", engagement: "Low" }
                      ].map((segment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <span className="font-medium">{segment.name}</span>
                            <p className="text-sm text-muted-foreground">{segment.size} people</p>
                          </div>
                          <Badge variant={segment.engagement === 'High' ? 'default' : 'outline'}>
                            {segment.engagement}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Launch Sequence</h4>
                    <div className="space-y-2">
                      {[
                        { day: "Day -14", action: "Tease announcement", audience: "Email + Social" },
                        { day: "Day -7", action: "Full announcement", audience: "All segments" },
                        { day: "Day -3", action: "Early bird offer", audience: "VIP list" },
                        { day: "Day 0", action: "Launch day push", audience: "Everyone" },
                        { day: "Day +3", action: "Final call", audience: "Non-purchasers" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <span className="font-medium">{item.day}</span>
                            <p className="text-sm text-muted-foreground">{item.action}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{item.audience}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="channels" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Marketing Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: "Email Marketing", budget: "$2,000", reach: "10,000", status: "active" },
                    { name: "Social Media Ads", budget: "$5,000", reach: "50,000", status: "active" },
                    { name: "Influencer Partners", budget: "$3,000", reach: "25,000", status: "planning" },
                    { name: "Content Marketing", budget: "$1,000", reach: "15,000", status: "active" },
                    { name: "Affiliate Program", budget: "$4,000", reach: "30,000", status: "planning" },
                    { name: "PR & Media", budget: "$2,500", reach: "100,000", status: "planning" }
                  ].map((channel, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{channel.name}</h4>
                        <Badge variant={channel.status === 'active' ? 'default' : 'outline'}>
                          {channel.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <span className="font-medium">Budget:</span> {channel.budget}
                        </div>
                        <div>
                          <span className="font-medium">Reach:</span> {channel.reach}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Configure</Button>
                        <Button variant="outline" size="sm">Analytics</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-muted-foreground">Revenue Goal</span>
                  </div>
                  <div className="text-2xl font-bold">$50,000</div>
                  <Progress value={42} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">$21,000 achieved</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-muted-foreground">Lead Goal</span>
                  </div>
                  <div className="text-2xl font-bold">5,000</div>
                  <Progress value={65} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">3,250 leads generated</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-muted-foreground">Days Remaining</span>
                  </div>
                  <div className="text-2xl font-bold">25</div>
                  <p className="text-xs text-green-600">On track for launch</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-muted-foreground">Tasks Completed</span>
                  </div>
                  <div className="text-2xl font-bold">65%</div>
                  <Progress value={65} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">22 of 34 tasks done</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Start Campaign</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Launch Planner</h1>
          <p className="text-muted-foreground">Plan, execute, and track your product launches</p>
        </div>
        <Button onClick={() => setShowBuilder(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Launch
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="launches">My Launches</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="launches" className="space-y-6">
          <div className="grid gap-6">
            {mockLaunches.map((launch) => (
              <Card key={launch.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{launch.name}</h3>
                        <Badge variant="secondary" className={`${getStatusColor(launch.status)} text-white`}>
                          {launch.status}
                        </Badge>
                        <Badge variant="outline">{launch.phase}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm text-muted-foreground mb-4">
                        <div>
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {launch.launchDate}
                        </div>
                        <div>
                          <Clock className="w-4 h-4 inline mr-1" />
                          {launch.daysRemaining} days
                        </div>
                        <div>
                          <Target className="w-4 h-4 inline mr-1" />
                          {launch.progress}% complete
                        </div>
                        <div>
                          <Users className="w-4 h-4 inline mr-1" />
                          {launch.leads} leads
                        </div>
                        <div className="font-medium text-green-600">
                          {launch.revenue}
                        </div>
                        <div>
                          <FileText className="w-4 h-4 inline mr-1" />
                          {launch.assets} assets
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Launch Progress</span>
                          <span>{launch.progress}%</span>
                        </div>
                        <Progress value={launch.progress} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowBuilder(true)}>
                        <Zap className="w-4 h-4 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Product Launch Campaign", type: "Physical Product", duration: "8 weeks", conversion: "12.5%" },
              { name: "Course Launch Blueprint", type: "Online Course", duration: "12 weeks", conversion: "18.7%" },
              { name: "Service Launch Plan", type: "Professional Service", duration: "6 weeks", conversion: "8.9%" },
              { name: "App Launch Strategy", type: "Mobile App", duration: "10 weeks", conversion: "22.3%" },
              { name: "Event Launch Campaign", type: "Virtual Event", duration: "4 weeks", conversion: "31.2%" },
              { name: "Book Launch Plan", type: "Digital Book", duration: "6 weeks", conversion: "15.8%" }
            ].map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge variant="outline">{template.type}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {template.duration} timeline
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {template.conversion} avg conversion
                      </div>
                    </div>
                    <Button className="w-full" variant="outline" onClick={() => setShowBuilder(true)}>
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Launch Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium mb-4">
                  <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                </div>
                <div className="space-y-4">
                  {mockLaunches.filter(l => l.status !== 'completed').map((launch) => (
                    <div key={launch.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{launch.name}</h4>
                        <p className="text-sm text-muted-foreground">Launch Date: {launch.launchDate}</p>
                      </div>
                      <Badge variant="outline">{launch.daysRemaining} days left</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Rocket className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-muted-foreground">Total Launches</span>
                </div>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-green-600">3 active campaigns</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">Avg Success Rate</span>
                </div>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-green-600">Above industry avg</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-muted-foreground">Total Leads</span>
                </div>
                <div className="text-2xl font-bold">12,450</div>
                <p className="text-xs text-green-600">+34% this quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
                </div>
                <div className="text-2xl font-bold">$185,670</div>
                <p className="text-xs text-green-600">+28% this quarter</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaunchPlanner;