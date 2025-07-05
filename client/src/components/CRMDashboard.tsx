import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  TrendingUp,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Target,
  Star,
  Filter,
  Search,
  MoreHorizontal,
  UserPlus,
  Send,
  Eye,
  Edit,
  Trash2,
  Download,
  Bell,
  Zap,
  BarChart3,
  Activity,
  Clock,
  MapPin,
  ExternalLink,
  AlertCircle
} from "lucide-react";

const LEAD_STATUSES = [
  { value: "new", label: "New", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-500/10 text-yellow-600 border-yellow-200" },
  { value: "qualified", label: "Qualified", color: "bg-green-500/10 text-green-600 border-green-200" },
  { value: "proposal", label: "Proposal Sent", color: "bg-purple-500/10 text-purple-600 border-purple-200" },
  { value: "closed-won", label: "Closed Won", color: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
  { value: "closed-lost", label: "Closed Lost", color: "bg-red-500/10 text-red-600 border-red-200" }
];

const LEAD_SOURCES = [
  "Website Form", "LinkedIn", "Facebook Ad", "Instagram", "WhatsApp", "Referral", 
  "Email Campaign", "Cold Outreach", "Webinar", "Content Download"
];

const mockLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Solutions",
    position: "Marketing Director",
    source: "LinkedIn",
    status: "qualified",
    score: 85,
    lastActivity: "2 hours ago",
    nextFollowUp: "Tomorrow 2:00 PM",
    tags: ["enterprise", "high-value", "decision-maker"],
    avatar: "/placeholder.svg",
    location: "San Francisco, CA",
    interests: ["Marketing Automation", "Lead Generation"],
    interactions: 12,
    emailOpens: 8,
    linkClicks: 5,
    notes: "Very interested in our enterprise solution. Scheduled demo for next week.",
    estimatedValue: "$25,000"
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@startup.io",
    phone: "+1 (555) 234-5678",
    company: "InnovateLab",
    position: "CEO",
    source: "Website Form",
    status: "proposal",
    score: 92,
    lastActivity: "30 minutes ago",
    nextFollowUp: "Friday 10:00 AM",
    tags: ["startup", "urgent", "founder"],
    avatar: "/placeholder.svg",
    location: "Austin, TX",
    interests: ["Scaling", "Automation"],
    interactions: 18,
    emailOpens: 15,
    linkClicks: 9,
    notes: "Founder with immediate need. Budget approved.",
    estimatedValue: "$15,000"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@design.co",
    phone: "+1 (555) 345-6789",
    company: "Creative Design Co",
    position: "Creative Director",
    source: "Instagram",
    status: "contacted",
    score: 73,
    lastActivity: "1 day ago",
    nextFollowUp: "Next Monday 9:00 AM",
    tags: ["creative", "small-business"],
    avatar: "/placeholder.svg",
    location: "New York, NY",
    interests: ["Design Tools", "Productivity"],
    interactions: 6,
    emailOpens: 4,
    linkClicks: 2,
    notes: "Interested but needs more time to evaluate.",
    estimatedValue: "$8,000"
  }
];

const getStatusStyle = (status: string) => {
  const statusObj = LEAD_STATUSES.find(s => s.value === status);
  return statusObj?.color || "bg-gray-500/10 text-gray-600 border-gray-200";
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

const getScoreBgColor = (score: number) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

export default function CRMDashboard() {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
    const matchesSource = filterSource === "all" || lead.source === filterSource;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const getTabCount = (status: string) => {
    if (status === "all") return mockLeads.length;
    return mockLeads.filter(lead => lead.status === status).length;
  };

  const totalValue = mockLeads.reduce((sum, lead) => sum + parseInt(lead.estimatedValue.replace(/[$,]/g, "")), 0);
  const avgScore = Math.round(mockLeads.reduce((sum, lead) => sum + lead.score, 0) / mockLeads.length);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Smart CRM</h1>
            <p className="text-muted-foreground">AI-powered lead management and nurturing</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="ai" size="sm">
              <Zap className="w-4 h-4 mr-2" />
              AI Insights
            </Button>
            <Button variant="gradient" size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-3xl font-bold text-primary">{mockLeads.length}</p>
                  <p className="text-sm text-success">+12% this month</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pipeline Value</p>
                  <p className="text-3xl font-bold text-success">${totalValue.toLocaleString()}</p>
                  <p className="text-sm text-success">+8% this month</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Lead Score</p>
                  <p className="text-3xl font-bold text-warning">{avgScore}</p>
                  <p className="text-sm text-success">+5 points</p>
                </div>
                <Target className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-3xl font-bold text-accent">24.5%</p>
                  <p className="text-sm text-success">+3.2% this month</p>
                </div>
                <BarChart3 className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search leads by name, email, or company..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {LEAD_STATUSES.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterSource} onValueChange={setFilterSource}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {LEAD_SOURCES.map(source => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Leads List */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All ({getTabCount("all")})</TabsTrigger>
                <TabsTrigger value="new">New ({getTabCount("new")})</TabsTrigger>
                <TabsTrigger value="qualified">Qualified ({getTabCount("qualified")})</TabsTrigger>
                <TabsTrigger value="proposal">Proposals ({getTabCount("proposal")})</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-6">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Leads Pipeline</span>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {filteredLeads
                        .filter(lead => selectedTab === "all" || lead.status === selectedTab)
                        .map((lead) => (
                        <div
                          key={lead.id}
                          className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 cursor-pointer ${
                            selectedLead?.id === lead.id ? 'bg-primary/5 border-primary/20' : ''
                          }`}
                          onClick={() => setSelectedLead(lead)}
                        >
                          <div className="flex items-center space-x-4 flex-1">
                            <Avatar>
                              <AvatarImage src={lead.avatar} />
                              <AvatarFallback className="bg-gradient-primary text-white">
                                {lead.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-foreground">{lead.name}</h4>
                                <Badge className={getStatusStyle(lead.status)} variant="outline">
                                  {LEAD_STATUSES.find(s => s.value === lead.status)?.label}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{lead.position} at {lead.company}</p>
                              <p className="text-xs text-muted-foreground">{lead.email}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs text-muted-foreground">From: {lead.source}</span>
                                <span className="text-xs text-muted-foreground">Last: {lead.lastActivity}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                                {lead.score}%
                              </div>
                              <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getScoreBgColor(lead.score)}`}
                                  style={{ width: `${lead.score}%` }}
                                />
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">{lead.estimatedValue}</div>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Mail className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Phone className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MessageSquare className="w-3 h-3" />
                              </Button>
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

          {/* Lead Details Panel */}
          <div className="space-y-6">
            {selectedLead ? (
              <>
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Avatar className="mr-3">
                          <AvatarImage src={selectedLead.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {selectedLead.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{selectedLead.name}</div>
                          <div className="text-sm text-muted-foreground">{selectedLead.position}</div>
                        </div>
                      </CardTitle>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Company:</span>
                        <div className="font-medium">{selectedLead.company}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Source:</span>
                        <div className="font-medium">{selectedLead.source}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Score:</span>
                        <div className={`font-medium ${getScoreColor(selectedLead.score)}`}>
                          {selectedLead.score}%
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Value:</span>
                        <div className="font-medium text-success">{selectedLead.estimatedValue}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedLead.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {selectedLead.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      Schedule Call
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Meeting
                    </Button>
                    <Button variant="ai" className="w-full justify-start">
                      <Zap className="w-4 h-4 mr-2" />
                      AI Follow-up
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{selectedLead.interactions}</div>
                        <div className="text-xs text-muted-foreground">Interactions</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-success">{selectedLead.emailOpens}</div>
                        <div className="text-xs text-muted-foreground">Email Opens</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Engagement Score</span>
                        <span className="font-medium">{selectedLead.score}%</span>
                      </div>
                      <Progress value={selectedLead.score} className="h-2" />
                    </div>

                    <div className="text-sm">
                      <span className="text-muted-foreground">Next Follow-up:</span>
                      <div className="font-medium flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1 text-warning" />
                        {selectedLead.nextFollowUp}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{selectedLead.notes}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Add Note
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-0 shadow-soft">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Select a Lead</h3>
                  <p className="text-muted-foreground text-sm">
                    Click on a lead from the list to view detailed information and take action.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* AI Insights Panel */}
            <Card className="border-0 shadow-soft bg-gradient-to-br from-accent/5 to-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-accent" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Hot Lead Alert</p>
                      <p className="text-xs text-muted-foreground">
                        Sarah Johnson has opened your email 3 times today. Perfect time to follow up!
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="w-4 h-4 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Trend Analysis</p>
                      <p className="text-xs text-muted-foreground">
                        LinkedIn leads have 40% higher conversion rate this month.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Optimal Timing</p>
                      <p className="text-xs text-muted-foreground">
                        Best follow-up time: Tuesday 2-4 PM (67% response rate).
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}