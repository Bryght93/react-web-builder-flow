import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, Phone, MessageSquare, Mic, Video, Zap, Settings } from "lucide-react";

export default function CallBookingCloser() {
  const [activeTab, setActiveTab] = useState("setup");

  const tabs = [
    { id: "setup", label: "AI Setup", icon: Settings },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "calls", label: "Active Calls", icon: Phone },
    { id: "analytics", label: "Analytics", icon: Zap }
  ];

  const upcomingCalls = [
    { name: "Sarah Johnson", time: "2:00 PM Today", type: "Fitness Consultation", status: "confirmed" },
    { name: "Mike Chen", time: "10:00 AM Tomorrow", type: "Web Design Call", status: "pending" },
    { name: "Lisa Rodriguez", time: "3:30 PM Tomorrow", type: "Marketing Strategy", status: "confirmed" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Call & Booking Closer</h1>
          <p className="text-muted-foreground">AI-powered booking system that converts leads into scheduled calls</p>
        </div>
        <Badge className="bg-success/10 text-success border-success/20">
          <Phone className="w-4 h-4 mr-1" />
          23 Calls Booked This Week
        </Badge>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center space-x-2"
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* AI Setup Tab */}
      {activeTab === "setup" && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>AI Conversation Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>AI Agent Personality</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select personality style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="sales">Sales-focused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Business Information</Label>
                <Textarea placeholder="Describe your business, services, and unique value proposition..." className="min-h-[100px]" />
              </div>

              <div className="flex items-center justify-between">
                <Label>Auto Voice Messages</Label>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <Label>Handle Objections</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Booking Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Available Days</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Switch defaultChecked={day !== "Sat" && day !== "Sun"} />
                      <span className="text-sm">{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Time</Label>
                  <Input type="time" defaultValue="09:00" />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input type="time" defaultValue="17:00" />
                </div>
              </div>

              <div>
                <Label>Call Duration (minutes)</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === "calendar" && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingCalls.map((call, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                          {call.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold">{call.name}</div>
                          <div className="text-sm text-muted-foreground">{call.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{call.time}</div>
                        <Badge variant={call.status === "confirmed" ? "default" : "secondary"} className="text-xs">
                          {call.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Quick Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">87%</div>
                <div className="text-sm text-muted-foreground">Show-up Rate</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">23</div>
                <div className="text-sm text-muted-foreground">Calls This Week</div>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning">$12,500</div>
                <div className="text-sm text-muted-foreground">Revenue Generated</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Active Calls Tab */}
      {activeTab === "calls" && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Live Call Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Currently on call with:</div>
                <div className="font-semibold">Sarah Johnson - Fitness Consultation</div>
              </div>

              <div className="space-y-2">
                <Label>AI Suggestions:</Label>
                <div className="space-y-2">
                  <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                    <div className="text-sm">💡 Ask about their biggest fitness challenge</div>
                  </div>
                  <div className="p-3 bg-success/10 rounded border-l-4 border-success">
                    <div className="text-sm">✅ They mentioned wanting to lose 20lbs - perfect for your program</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Mic className="w-4 h-4 mr-2" />
                  Send Voice Note
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="w-4 h-4 mr-2" />
                  Share Screen
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Call Scripts & Objection Handlers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Common Objections</Label>
                <div className="space-y-2 mt-2">
                  <Button variant="ghost" className="justify-start w-full text-left">
                    "I need to think about it"
                  </Button>
                  <Button variant="ghost" className="justify-start w-full text-left">
                    "It's too expensive"
                  </Button>
                  <Button variant="ghost" className="justify-start w-full text-left">
                    "I don't have time"
                  </Button>
                </div>
              </div>

              <div>
                <Label>Quick Responses</Label>
                <Textarea 
                  placeholder="AI will suggest personalized responses based on the conversation..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">68%</div>
              <div className="text-sm text-success">↑ 12% from last month</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Show-up Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-2">87%</div>
              <div className="text-sm text-success">↑ 5% from last month</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning mb-2">45%</div>
              <div className="text-sm text-muted-foreground">Calls to Sales</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}