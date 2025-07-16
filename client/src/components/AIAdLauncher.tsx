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
import { Slider } from "@/components/ui/slider";
import { Target, DollarSign, BarChart3, Play, Pause, Eye, Edit, Zap, Users, MapPin, Calendar, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AIAdLauncher() {
  const [selectedFunnel, setSelectedFunnel] = useState("");
  const [budget, setBudget] = useState([10]);
  const [duration, setDuration] = useState("7");
  const [targetingType, setTargetingType] = useState("ai-suggested");
  const [adGenerated, setAdGenerated] = useState(false);
  const [adLaunched, setAdLaunched] = useState(false);

  const funnels = [
    { id: 1, name: "Lead Magnet Funnel", type: "Lead Generation", conversions: "12.3%" },
    { id: 2, name: "Product Launch Funnel", type: "Sales", conversions: "8.7%" },
    { id: 3, name: "Webinar Registration", type: "Event", conversions: "15.2%" },
    { id: 4, name: "Free Trial Signup", type: "SaaS", conversions: "9.8%" }
  ];

  const adCampaigns = [
    {
      id: 1,
      name: "Lead Magnet Campaign",
      status: "Active",
      platform: "Facebook + Instagram",
      budget: "$15/day",
      impressions: "12,547",
      clicks: "234",
      conversions: "18",
      cpc: "$0.64",
      cpa: "$12.50"
    },
    {
      id: 2,
      name: "Product Launch Ads",
      status: "Active",
      platform: "Facebook",
      budget: "$25/day",
      impressions: "8,932",
      clicks: "167",
      conversions: "12",
      cpc: "$0.89",
      cpa: "$18.75"
    },
    {
      id: 3,
      name: "Webinar Promotion",
      status: "Paused",
      platform: "Instagram",
      budget: "$10/day",
      impressions: "5,421",
      clicks: "89",
      conversions: "8",
      cpc: "$0.56",
      cpa: "$7.25"
    }
  ];

  const aiTargetingSuggestions = [
    { category: "Demographics", suggestions: ["Age: 25-45", "Gender: All", "Education: College+"] },
    { category: "Interests", suggestions: ["Digital Marketing", "Entrepreneurship", "Online Business", "Lead Generation"] },
    { category: "Behaviors", suggestions: ["Small Business Owners", "Engaged Shoppers", "Technology Early Adopters"] },
    { category: "Lookalike", suggestions: ["Similar to current customers", "Based on email subscribers", "Website visitors"] }
  ];

  const generateAd = () => {
    setAdGenerated(true);
  };

  const launchAd = () => {
    setAdLaunched(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Ad Launcher</h1>
          <p className="text-muted-foreground">Launch Facebook & Instagram ads directly from your app</p>
        </div>
      </div>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Ad</TabsTrigger>
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ad Setup */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Campaign Setup</span>
                  </CardTitle>
                  <CardDescription>
                    Configure your ad campaign settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="funnel">Select Funnel</Label>
                    <Select value={selectedFunnel} onValueChange={setSelectedFunnel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your funnel" />
                      </SelectTrigger>
                      <SelectContent>
                        {funnels.map((funnel) => (
                          <SelectItem key={funnel.id} value={funnel.id.toString()}>
                            <div className="flex items-center justify-between w-full">
                              <span>{funnel.name}</span>
                              <Badge variant="outline" className="ml-2">{funnel.type}</Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Daily Budget: ${budget[0]}</Label>
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      max={100}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$5</span>
                      <span>$100+</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Campaign Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Days</SelectItem>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="14">14 Days</SelectItem>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* AI Targeting */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>AI Smart Targeting</span>
                  </CardTitle>
                  <CardDescription>
                    AI-suggested targeting based on your niche and funnel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={targetingType === "ai-suggested"}
                        onCheckedChange={(checked) => setTargetingType(checked ? "ai-suggested" : "manual")}
                      />
                      <Label>Use AI-suggested targeting</Label>
                    </div>
                  </div>

                  {targetingType === "ai-suggested" && (
                    <div className="space-y-4">
                      {aiTargetingSuggestions.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <h4 className="font-medium text-sm">{category.category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.suggestions.map((suggestion, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {suggestion}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {targetingType === "manual" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Custom Audience</Label>
                        <Textarea
                          placeholder="Describe your target audience..."
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Age Range</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select age range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="18-24">18-24</SelectItem>
                              <SelectItem value="25-34">25-34</SelectItem>
                              <SelectItem value="35-44">35-44</SelectItem>
                              <SelectItem value="45-54">45-54</SelectItem>
                              <SelectItem value="55+">55+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input placeholder="Enter locations" />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {!adGenerated ? (
                <Button 
                  onClick={generateAd}
                  disabled={!selectedFunnel}
                  className="w-full"
                  size="lg"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Ad Content with AI
                </Button>
              ) : (
                <Button 
                  onClick={launchAd}
                  disabled={adLaunched}
                  className="w-full"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {adLaunched ? "Ad Launched!" : "Launch Ad Campaign"}
                </Button>
              )}
            </div>

            {/* Ad Preview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ad Preview</CardTitle>
                  <CardDescription>
                    See how your ad will appear
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {adGenerated ? (
                    <div className="space-y-4">
                      {/* Mock ad preview */}
                      <div className="border rounded-lg p-4 bg-muted/50">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-sm">Your Business</p>
                            <p className="text-xs text-muted-foreground">Sponsored</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm text-muted-foreground">Ad Image/Video</span>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold">🚀 Transform Your Business Today!</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Join thousands who've discovered the secret to generating quality leads automatically...
                            </p>
                          </div>
                          
                          <Button variant="outline" size="sm" className="w-full">
                            Learn More
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Generate ad content to see preview</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estimated Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Daily Reach</span>
                      <span className="font-medium">1,200 - 3,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Expected Clicks</span>
                      <span className="font-medium">24 - 64</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Est. CPC</span>
                      <span className="font-medium">$0.42 - $0.68</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Conversion Rate</span>
                      <span className="font-medium">8% - 15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Active Campaigns</h2>
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Create New Campaign
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {adCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{campaign.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{campaign.platform}</span>
                        <span>{campaign.budget}</span>
                        <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        {campaign.status === "Active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Impressions</p>
                      <p className="font-medium">{campaign.impressions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Clicks</p>
                      <p className="font-medium">{campaign.clicks}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conversions</p>
                      <p className="font-medium">{campaign.conversions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CPC</p>
                      <p className="font-medium">{campaign.cpc}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CPA</p>
                      <p className="font-medium">{campaign.cpa}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CTR</p>
                      <p className="font-medium">
                        {((parseInt(campaign.clicks) / parseInt(campaign.impressions.replace(',', ''))) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h2 className="text-2xl font-semibold">Performance Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Target className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">$847</p>
                    <p className="text-muted-foreground text-sm">Total Spend</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">38</p>
                    <p className="text-muted-foreground text-sm">Conversions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">$22.29</p>
                    <p className="text-muted-foreground text-sm">Avg CPA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">2.8%</p>
                    <p className="text-muted-foreground text-sm">Avg CTR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Performance chart would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}