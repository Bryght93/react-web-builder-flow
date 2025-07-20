import React, { useState } from 'react';
import { Plus, Play, Pause, Calendar, Users, BarChart3, Settings, Monitor, Upload, Zap, Globe, Clock, Target, Layers, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const EvergreenWebinar = () => {
  const [activeTab, setActiveTab] = useState('webinars');
  const [showBuilder, setShowBuilder] = useState(false);

  const mockWebinars = [
    {
      id: 1,
      title: "Master Digital Marketing in 2025",
      status: "live",
      type: "evergreen",
      duration: "45 min",
      registrations: 1247,
      attendees: 523,
      conversionRate: "34.2%",
      revenue: "$15,680",
      nextSession: "Every 2 hours",
      created: "2 weeks ago"
    },
    {
      id: 2,
      title: "AI-Powered Sales Funnels Workshop",
      status: "draft",
      type: "scheduled",
      duration: "60 min", 
      registrations: 0,
      attendees: 0,
      conversionRate: "0%",
      revenue: "$0",
      nextSession: "Jan 25, 2025 - 2:00 PM",
      created: "1 day ago"
    },
    {
      id: 3,
      title: "Email Marketing Automation Secrets",
      status: "paused",
      type: "replay",
      duration: "38 min",
      registrations: 892,
      attendees: 445,
      conversionRate: "28.7%",
      revenue: "$8,920",
      nextSession: "On-demand",
      created: "1 month ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (showBuilder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Webinar Builder</h1>
            <p className="text-muted-foreground">Create your evergreen webinar experience</p>
          </div>
          <Button variant="outline" onClick={() => setShowBuilder(false)}>
            Back to Webinars
          </Button>
        </div>

        <Tabs defaultValue="setup" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Webinar Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Webinar Title</label>
                    <Input placeholder="Enter webinar title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <Input placeholder="45 minutes" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea placeholder="Describe what attendees will learn..." rows={4} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Evergreen (Always Available)</option>
                      <option>Scheduled (Fixed Time)</option>
                      <option>On-Demand Replay</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Frequency</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Every 2 hours</option>
                      <option>Every 4 hours</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time Zone</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>UTC</option>
                      <option>EST</option>
                      <option>PST</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Webinar Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Monitor className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Upload Webinar Video</h3>
                  <p className="text-muted-foreground mb-4">Drag and drop your webinar recording or browse files</p>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Presentation Slides</label>
                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Slides (PDF)
                    </Button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Resources</label>
                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resources
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Registration Page
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Registration Headline</label>
                  <Input placeholder="Join Our Free Masterclass..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Benefits List</label>
                  <Textarea placeholder="• Learn advanced strategies&#10;• Get exclusive templates&#10;• Ask questions live" rows={6} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">CTA Button Text</label>
                    <Input placeholder="Save My Spot Now" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Thank You Page URL</label>
                    <Input placeholder="/webinar-thank-you" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Automated Sequences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Registration Confirmation</h4>
                      <p className="text-sm text-muted-foreground">Send immediately after registration</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Webinar Reminders</h4>
                      <p className="text-sm text-muted-foreground">24h, 1h, and 15min before webinar</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Follow-up Sequence</h4>
                      <p className="text-sm text-muted-foreground">Post-webinar nurture sequence</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">No-Show Recovery</h4>
                      <p className="text-sm text-muted-foreground">Re-engage missed attendees</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-muted-foreground">Total Registrations</span>
                  </div>
                  <div className="text-2xl font-bold">2,139</div>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Play className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-muted-foreground">Show-up Rate</span>
                  </div>
                  <div className="text-2xl font-bold">68.5%</div>
                  <p className="text-xs text-green-600">+5.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-muted-foreground">Conversion Rate</span>
                  </div>
                  <div className="text-2xl font-bold">31.2%</div>
                  <p className="text-xs text-green-600">+3.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
                  </div>
                  <div className="text-2xl font-bold">$24,600</div>
                  <p className="text-xs text-green-600">+18% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Launch Webinar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Evergreen Webinars</h1>
          <p className="text-muted-foreground">Host automated webinars that run 24/7 and convert leads into customers</p>
        </div>
        <Button onClick={() => setShowBuilder(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Webinar
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="webinars">All Webinars</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="webinars" className="space-y-6">
          <div className="grid gap-6">
            {mockWebinars.map((webinar) => (
              <Card key={webinar.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{webinar.title}</h3>
                        <Badge variant="secondary" className={`${getStatusColor(webinar.status)} text-white`}>
                          {webinar.status}
                        </Badge>
                        <Badge variant="outline">{webinar.type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm text-muted-foreground">
                        <div>
                          <Clock className="w-4 h-4 inline mr-1" />
                          {webinar.duration}
                        </div>
                        <div>
                          <Users className="w-4 h-4 inline mr-1" />
                          {webinar.registrations} registered
                        </div>
                        <div>
                          <Play className="w-4 h-4 inline mr-1" />
                          {webinar.attendees} attended
                        </div>
                        <div>
                          <Target className="w-4 h-4 inline mr-1" />
                          {webinar.conversionRate} conversion
                        </div>
                        <div className="font-medium text-green-600">
                          {webinar.revenue}
                        </div>
                        <div>
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {webinar.nextSession}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                      {webinar.status === 'live' ? (
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Activate
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Monitor className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-muted-foreground">Active Webinars</span>
                </div>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-green-600">2 evergreen, 1 scheduled</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">Total Registrations</span>
                </div>
                <div className="text-2xl font-bold">2,139</div>
                <p className="text-xs text-green-600">+23% this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-muted-foreground">Avg Conversion</span>
                </div>
                <div className="text-2xl font-bold">31.4%</div>
                <p className="text-xs text-green-600">Above industry avg</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
                </div>
                <div className="text-2xl font-bold">$24,600</div>
                <p className="text-xs text-green-600">+34% this month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Product Launch Webinar", category: "eCommerce", duration: "45 min", conversions: "28.5%" },
              { name: "Course Pre-Sell Workshop", category: "Education", duration: "60 min", conversions: "34.2%" },
              { name: "Service Demo Training", category: "B2B", duration: "30 min", conversions: "22.8%" },
              { name: "Coaching Program Intro", category: "Coaching", duration: "40 min", conversions: "31.7%" },
              { name: "Software Demo Series", category: "SaaS", duration: "25 min", conversions: "26.3%" },
              { name: "Consulting Masterclass", category: "Professional", duration: "50 min", conversions: "29.1%" }
            ].map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {template.duration}
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {template.conversions} avg conversion
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
      </Tabs>
    </div>
  );
};

export default EvergreenWebinar;