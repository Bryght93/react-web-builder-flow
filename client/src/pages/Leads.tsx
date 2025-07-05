import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Download,
  Mail,
  Phone,
  MessageSquare,
  MoreHorizontal,
  TrendingUp,
  Users,
  Target,
  Calendar,
  ExternalLink,
  Zap
} from "lucide-react";

const leads = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    source: "LinkedIn Quiz",
    status: "hot",
    score: 95,
    lastActivity: "2 minutes ago",
    tags: ["fitness", "premium"],
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@company.com",
    phone: "+1 (555) 234-5678",
    source: "Facebook Lead Magnet",
    status: "warm",
    score: 78,
    lastActivity: "15 minutes ago",
    tags: ["business", "startup"],
    avatar: "MC"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1 (555) 345-6789",
    source: "Instagram Story",
    status: "cold",
    score: 45,
    lastActivity: "1 hour ago",
    tags: ["health"],
    avatar: "ED"
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 456-7890",
    source: "Website Form",
    status: "hot",
    score: 88,
    lastActivity: "2 hours ago",
    tags: ["consulting", "enterprise"],
    avatar: "JW"
  },
  {
    id: 5,
    name: "Lisa Brown",
    email: "lisa.brown@email.com",
    phone: "+1 (555) 567-8901",
    source: "WhatsApp",
    status: "warm",
    score: 72,
    lastActivity: "3 hours ago",
    tags: ["real-estate"],
    avatar: "LB"
  },
  {
    id: 6,
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 678-9012",
    source: "Email Campaign",
    status: "qualified",
    score: 92,
    lastActivity: "5 hours ago",
    tags: ["finance", "investment"],
    avatar: "DK"
  }
];

const sources = ["All Sources", "LinkedIn Quiz", "Facebook Lead Magnet", "Instagram Story", "Website Form", "WhatsApp", "Email Campaign"];
const statuses = ["All Status", "hot", "warm", "cold", "qualified", "converted"];

function getStatusColor(status: string) {
  switch (status) {
    case "hot": return "bg-red-500/10 text-red-600 border-red-200";
    case "warm": return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
    case "cold": return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "qualified": return "bg-green-500/10 text-green-600 border-green-200";
    case "converted": return "bg-purple-500/10 text-purple-600 border-purple-200";
    default: return "bg-gray-500/10 text-gray-600 border-gray-200";
  }
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
}

export default function Leads() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === "All Sources" || lead.source === selectedSource;
    const matchesStatus = selectedStatus === "All Status" || lead.status === selectedStatus;
    
    return matchesSearch && matchesSource && matchesStatus;
  });

  const getTabCount = (status: string) => {
    if (status === "all") return leads.length;
    return leads.filter(lead => lead.status === status).length;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leads Management</h1>
            <p className="text-muted-foreground">Track, nurture, and convert your leads</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="gradient" size="sm">
              <Zap className="w-4 h-4 mr-2" />
              AI Follow-up
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Leads", value: leads.length.toString(), icon: Users, color: "text-primary" },
            { label: "Hot Leads", value: leads.filter(l => l.status === "hot").length.toString(), icon: TrendingUp, color: "text-red-500" },
            { label: "Qualified", value: leads.filter(l => l.status === "qualified").length.toString(), icon: Target, color: "text-green-500" },
            { label: "Avg. Score", value: Math.round(leads.reduce((acc, lead) => acc + lead.score, 0) / leads.length).toString(), icon: TrendingUp, color: "text-accent" }
          ].map((stat, index) => (
            <Card key={index} className="border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search leads by name or email..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sources.map((source) => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
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

        {/* Leads Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All ({getTabCount("all")})</TabsTrigger>
            <TabsTrigger value="hot">Hot ({getTabCount("hot")})</TabsTrigger>
            <TabsTrigger value="warm">Warm ({getTabCount("warm")})</TabsTrigger>
            <TabsTrigger value="cold">Cold ({getTabCount("cold")})</TabsTrigger>
            <TabsTrigger value="qualified">Qualified ({getTabCount("qualified")})</TabsTrigger>
            <TabsTrigger value="converted">Converted ({getTabCount("converted")})</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {selectedTab === "all" ? "All Leads" : `${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Leads`}
                    ({filteredLeads.length})
                  </span>
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
                    <div key={lead.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium">
                          {lead.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-foreground">{lead.name}</h4>
                            <Badge className={getStatusColor(lead.status)} variant="outline">
                              {lead.status}
                            </Badge>
                            <div className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                              {lead.score}% score
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{lead.email}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-muted-foreground">From: {lead.source}</span>
                            <span className="text-xs text-muted-foreground">Last seen: {lead.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-wrap gap-1 mr-4">
                          {lead.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredLeads.filter(lead => selectedTab === "all" || lead.status === selectedTab).length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No leads found</h3>
                    <p className="text-muted-foreground">
                      {selectedTab === "all" 
                        ? "Try adjusting your filters or create a new lead magnet."
                        : `No ${selectedTab} leads match your current filters.`
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}