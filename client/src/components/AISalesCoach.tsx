import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, TrendingUp, Target, Lightbulb, Star, Award, Zap } from "lucide-react";

export default function AISalesCoach() {
  const [activeConversation, setActiveConversation] = useState(null);

  const suggestions = [
    {
      type: "opener",
      title: "Perfect Opening Line",
      message: "Hey Sarah! Saw you downloaded our 7-minute workout guide. What's your biggest fitness challenge right now?",
      confidence: 94
    },
    {
      type: "objection",
      title: "Handle Price Objection",
      message: "I totally understand budget is important. Let me ask - what would staying stuck cost you over the next 6 months?",
      confidence: 87
    },
    {
      type: "close",
      title: "Soft Close Opportunity",
      message: "Based on what you've shared, our program sounds perfect for you. Want to hop on a quick 15-min call to make sure it's the right fit?",
      confidence: 91
    }
  ];

  const performanceData = [
    { metric: "Response Rate", value: 68, target: 70, change: "+12%" },
    { metric: "Conversion Rate", value: 24, target: 30, change: "+8%" },
    { metric: "Close Rate", value: 45, target: 50, change: "+15%" },
    { metric: "Follow-up Rate", value: 89, target: 85, change: "+5%" }
  ];

  const improvementTips = [
    {
      area: "Opening Messages",
      tip: "Add more personalization by mentioning specific details from their lead magnet download",
      impact: "High",
      difficulty: "Easy"
    },
    {
      area: "Objection Handling",
      tip: "Use more question-based responses instead of direct answers to objections",
      impact: "Medium",
      difficulty: "Medium"
    },
    {
      area: "Follow-up Timing",
      tip: "Wait 2-3 days between follow-ups instead of daily messages",
      impact: "High",
      difficulty: "Easy"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Sales Coach</h1>
          <p className="text-muted-foreground">Real-time suggestions and feedback to improve your sales conversations</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20">
          <Brain className="w-4 h-4 mr-1" />
          AI Coach Active
        </Badge>
      </div>

      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live">Live Coaching</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Live Coaching Tab */}
        <TabsContent value="live" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Current Conversation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Lead: Sarah Johnson</div>
                  <div className="font-medium">Fitness Coach - Free Consultation</div>
                  <div className="text-sm text-muted-foreground mt-1">Downloaded: 7-minute workout guide</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
                      Hi Sarah! Thanks for downloading our workout guide. How did you find it?
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                      It was great! I've been looking for something I can do during my lunch break at work.
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Your Reply</Label>
                  <Textarea placeholder="Type your message..." className="min-h-[100px]" />
                  <div className="flex justify-between items-center mt-2">
                    <Button variant="outline" size="sm">
                      <Zap className="w-4 h-4 mr-2" />
                      AI Suggest
                    </Button>
                    <Button size="sm">Send Message</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>AI Suggestions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{suggestion.type}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-warning" />
                        <span className="text-sm">{suggestion.confidence}%</span>
                      </div>
                    </div>
                    <div className="font-medium text-sm">{suggestion.title}</div>
                    <div className="text-sm text-muted-foreground">{suggestion.message}</div>
                    <Button size="sm" variant="outline" className="w-full">
                      Use This Message
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conversation Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">High</div>
                  <div className="text-sm text-muted-foreground">Interest Level</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">Ready</div>
                  <div className="text-sm text-muted-foreground">Buying Stage</div>
                </div>
                <div className="text-center p-4 bg-warning/10 rounded-lg">
                  <div className="text-2xl font-bold text-warning">Ask</div>
                  <div className="text-sm text-muted-foreground">Next Action</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {performanceData.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{metric.metric}</h3>
                    <Badge variant={metric.value >= metric.target ? "default" : "secondary"}>
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current: {metric.value}%</span>
                      <span>Target: {metric.target}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Weekly Performance Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                <p>Performance chart would be displayed here</p>
                <p className="text-sm">Showing conversation metrics over time</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Improvement Opportunities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {improvementTips.map((tip, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{tip.area}</h4>
                      <div className="flex space-x-2">
                        <Badge variant={tip.impact === "High" ? "default" : "secondary"}>
                          {tip.impact} Impact
                        </Badge>
                        <Badge variant="outline">{tip.difficulty}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{tip.tip}</p>
                    <Button size="sm" variant="outline">
                      Practice This
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales Scripts Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {["Cold Outreach", "Follow-up Messages", "Objection Handlers", "Closing Scripts"].map((script, index) => (
                  <div key={index} className="p-4 border rounded-lg text-center">
                    <h4 className="font-semibold mb-2">{script}</h4>
                    <Button size="sm" variant="outline">View Scripts</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm text-muted-foreground">Messages Use AI Suggestions</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-success" />
                <div className="text-2xl font-bold">+23%</div>
                <div className="text-sm text-muted-foreground">Conversion Improvement</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-warning" />
                <div className="text-2xl font-bold">Expert</div>
                <div className="text-sm text-muted-foreground">Current Skill Level</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Best Performing Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-success/20 text-success">95% Success Rate</Badge>
                    <span className="text-sm text-muted-foreground">Opening Message</span>
                  </div>
                  <p className="text-sm">"Hey [Name]! Saw you downloaded [Lead Magnet]. What's your biggest challenge with [Topic] right now?"</p>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-primary/20 text-primary">87% Success Rate</Badge>
                    <span className="text-sm text-muted-foreground">Follow-up</span>
                  </div>
                  <p className="text-sm">"Quick question - if I could show you exactly how to [solve problem] in the next 15 minutes, would that be worth a quick call?"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}