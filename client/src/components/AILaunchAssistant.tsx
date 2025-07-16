import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Rocket, Mail, MessageSquare, Target, DollarSign, Clock, CheckCircle, Zap, FileText, Megaphone } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AILaunchAssistant() {
  const [productType, setProductType] = useState("");
  const [pricePoint, setPricePoint] = useState("");
  const [launchDuration, setLaunchDuration] = useState("14");
  const [productName, setProductName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [campaignGenerated, setCampaignGenerated] = useState(false);
  const [generatingCampaign, setGeneratingCampaign] = useState(false);

  const productTypes = [
    "Digital Course", "Physical Product", "Webinar", "Challenge", "App/Software", "Service", "Membership", "eBook"
  ];

  const priceRanges = [
    "Free", "$1-$50", "$51-$200", "$201-$500", "$501-$1000", "$1000+"
  ];

  const generateCampaign = async () => {
    setGeneratingCampaign(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setCampaignGenerated(true);
    setGeneratingCampaign(false);
  };

  const mockCampaignData = {
    timeline: [
      { day: 1, title: "Pre-Launch Buzz", tasks: ["Social media teasers", "Email announcement", "Landing page setup"] },
      { day: 3, title: "Value Delivery", tasks: ["Free content release", "Case study share", "Community engagement"] },
      { day: 7, title: "Soft Launch", tasks: ["Beta access", "Early bird pricing", "Influencer outreach"] },
      { day: 10, title: "Main Launch", tasks: ["Full campaign launch", "PR outreach", "Paid ads start"] },
      { day: 14, title: "Final Push", tasks: ["Scarcity messaging", "Last chance emails", "Bonus offers"] }
    ],
    emailSequence: [
      { day: 1, subject: "Something exciting is coming...", type: "Teaser" },
      { day: 3, subject: "Here's what I've been working on", type: "Reveal" },
      { day: 7, subject: "You're invited to the exclusive preview", type: "Early Access" },
      { day: 10, subject: "It's finally here!", type: "Launch" },
      { day: 12, subject: "Don't miss out - 48 hours left", type: "Urgency" }
    ],
    socialPosts: [
      { platform: "Instagram", content: "Behind the scenes of my latest project... 👀", type: "Story" },
      { platform: "LinkedIn", content: "After months of development, I'm excited to share...", type: "Post" },
      { platform: "Twitter", content: "Big announcement coming tomorrow 🚀", type: "Tweet" }
    ]
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Launch Assistant</h1>
          <p className="text-muted-foreground">Complete campaign strategy generated in minutes</p>
        </div>
      </div>

      {!campaignGenerated ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Launch Strategy Setup</span>
            </CardTitle>
            <CardDescription>
              Tell us about your product and we'll create a complete launch campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  placeholder="Enter your product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productType">Product Type</Label>
                <Select value={productType} onValueChange={setProductType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePoint">Price Range</Label>
                <Select value={pricePoint} onValueChange={setPricePoint}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="launchDuration">Campaign Duration</Label>
                <Select value={launchDuration} onValueChange={setLaunchDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="14">14 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Textarea
                id="targetAudience"
                placeholder="Describe your ideal customer (demographics, interests, pain points)"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                rows={3}
              />
            </div>

            <Button 
              onClick={generateCampaign}
              disabled={!productName || !productType || !pricePoint || !targetAudience || generatingCampaign}
              className="w-full"
              size="lg"
            >
              {generatingCampaign ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  AI Generating Your Campaign...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4 mr-2" />
                  Generate Launch Campaign
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timeline">Launch Timeline</TabsTrigger>
            <TabsTrigger value="emails">Email Sequence</TabsTrigger>
            <TabsTrigger value="social">Social Content</TabsTrigger>
            <TabsTrigger value="ads">Ad Scripts</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{launchDuration}-Day Launch Timeline</span>
                </CardTitle>
                <CardDescription>
                  Your complete campaign roadmap for {productName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockCampaignData.timeline.map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {milestone.day}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{milestone.title}</h3>
                        <div className="mt-2 space-y-1">
                          {milestone.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emails" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Email Campaign Sequence</span>
                </CardTitle>
                <CardDescription>
                  Pre-written emails ready to send
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCampaignData.emailSequence.map((email, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">Day {email.day}</Badge>
                          <Badge variant="secondary">{email.type}</Badge>
                        </div>
                        <h4 className="font-semibold">{email.subject}</h4>
                        <div className="mt-3 flex space-x-2">
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            Edit Content
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4 mr-2" />
                            Schedule Send
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Social Media Content</span>
                </CardTitle>
                <CardDescription>
                  Platform-optimized posts and stories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockCampaignData.socialPosts.map((post, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{post.platform}</Badge>
                          <Badge variant="secondary">{post.type}</Badge>
                        </div>
                        <p className="text-sm mb-3">{post.content}</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Post</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Megaphone className="w-5 h-5" />
                  <span>Ad Scripts & Copy</span>
                </CardTitle>
                <CardDescription>
                  Ready-to-use ad content for all platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Card className="border">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Facebook/Instagram Ad</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        "Transform your business with {productName}. Join thousands who've already..."
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit Copy</Button>
                        <Button variant="outline" size="sm">Launch Ad</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Google Ads Copy</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        "Get {productName} - Limited Time Offer. Start Your Journey Today!"
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit Copy</Button>
                        <Button variant="outline" size="sm">Launch Ad</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}