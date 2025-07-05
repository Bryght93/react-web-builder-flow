import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Target, DollarSign, Eye, MousePointer, Users, Zap, Play, Pause, Edit } from "lucide-react";

export default function AdLaunchTracker() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Fitness Coach Lead Gen",
      platform: "Facebook",
      budget: 150,
      spent: 87,
      leads: 23,
      clicks: 156,
      impressions: 4230,
      status: "active"
    },
    {
      id: 2,
      name: "Real Estate Quiz Campaign",
      platform: "Instagram",
      budget: 200,
      spent: 134,
      leads: 31,
      clicks: 203,
      impressions: 5890,
      status: "active"
    }
  ]);

  const industryTemplates = [
    { name: "Fitness Coach", audience: "Ages 25-45, Health & Fitness Interests", budget: "$10-50/day" },
    { name: "Real Estate", audience: "First-time Homebuyers, Local Area", budget: "$15-75/day" },
    { name: "Business Coach", audience: "Entrepreneurs, Small Business Owners", budget: "$20-100/day" },
    { name: "Beauty Services", audience: "Women 20-50, Beauty & Wellness", budget: "$10-40/day" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ad Launch & Tracking</h1>
          <p className="text-muted-foreground">Create, launch, and track Facebook & Instagram ads directly from your dashboard</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Zap className="w-4 h-4" />
          <span>Create New Campaign</span>
        </Button>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* Active Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-xl font-semibold">{campaign.name}</h3>
                      <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                        {campaign.platform}
                      </Badge>
                      <Badge variant={campaign.status === "active" ? "default" : "outline"}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 gap-4 mb-4">
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{campaign.leads}</div>
                      <div className="text-sm text-muted-foreground">Leads</div>
                    </div>
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">{campaign.clicks}</div>
                      <div className="text-sm text-muted-foreground">Clicks</div>
                    </div>
                    <div className="text-center p-3 bg-warning/10 rounded-lg">
                      <div className="text-2xl font-bold text-warning">{campaign.impressions.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Impressions</div>
                    </div>
                    <div className="text-center p-3 bg-accent/10 rounded-lg">
                      <div className="text-2xl font-bold text-accent">${campaign.spent}</div>
                      <div className="text-sm text-muted-foreground">Spent</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">${(campaign.spent / campaign.leads).toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Cost/Lead</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget Progress</span>
                      <span>${campaign.spent} / ${campaign.budget}</span>
                    </div>
                    <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Create Campaign Tab */}
        <TabsContent value="create" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Campaign Name</Label>
                  <Input placeholder="Enter campaign name" />
                </div>

                <div>
                  <Label>Platform</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="both">Facebook + Instagram</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Industry Template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryTemplates.map((template, index) => (
                        <SelectItem key={index} value={template.name.toLowerCase()}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Daily Budget</Label>
                    <Input type="number" placeholder="50" />
                  </div>
                  <div>
                    <Label>Campaign Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Ad Headline</Label>
                  <Textarea 
                    placeholder="AI will generate compelling headlines based on your industry..."
                    className="min-h-[60px]"
                  />
                </div>

                <div>
                  <Label>Ad Description</Label>
                  <Textarea 
                    placeholder="AI will create persuasive ad copy that converts..."
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label>Call-to-Action</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select CTA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="learn-more">Learn More</SelectItem>
                      <SelectItem value="sign-up">Sign Up</SelectItem>
                      <SelectItem value="download">Download</SelectItem>
                      <SelectItem value="book-now">Book Now</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate AI Content
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Targeting & Audience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Age Range</Label>
                  <div className="flex space-x-2">
                    <Input placeholder="25" />
                    <span className="flex items-center">to</span>
                    <Input placeholder="55" />
                  </div>
                </div>

                <div>
                  <Label>Gender</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Location</Label>
                  <Input placeholder="Enter location" />
                </div>
              </div>

              <div>
                <Label>Interests (AI Suggested)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Fitness", "Health", "Weight Loss", "Nutrition", "Gym"].map((interest) => (
                    <Badge key={interest} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Lookalike Audience</Label>
                <Switch />
              </div>

              <Button className="w-full" size="lg">
                <Play className="w-4 h-4 mr-2" />
                Launch Campaign
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">$2,450</div>
                <div className="text-sm text-muted-foreground">Total Ad Spend</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-success" />
                <div className="text-2xl font-bold">127</div>
                <div className="text-sm text-muted-foreground">Total Leads</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-warning" />
                <div className="text-2xl font-bold">$19.29</div>
                <div className="text-sm text-muted-foreground">Avg Cost/Lead</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">23.4%</div>
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Platform Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Facebook</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={68} className="w-24 h-2" />
                          <span className="text-sm">68%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Instagram</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={32} className="w-24 h-2" />
                          <span className="text-sm">32%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Age Group Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>25-34</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={45} className="w-24 h-2" />
                          <span className="text-sm">45%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>35-44</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={35} className="w-24 h-2" />
                          <span className="text-sm">35%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>45-54</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={20} className="w-24 h-2" />
                          <span className="text-sm">20%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {industryTemplates.map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-soft transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                  <p className="text-muted-foreground mb-4">Target: {template.audience}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{template.budget}</Badge>
                    <Button size="sm">Use Template</Button>
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