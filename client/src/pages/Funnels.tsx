import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Copy, 
  Trash2, 
  Play, 
  BarChart3, 
  Users, 
  TrendingUp,
  Calendar,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FunnelBuilder from "@/components/FunnelBuilder";

interface FunnelData {
  id: string;
  name: string;
  industry: string;
  goal: string;
  status: 'active' | 'paused' | 'draft';
  leads: number;
  conversion: number;
  revenue: number;
  created: string;
  steps: number;
  traffic: number;
}

const initialFunnels: FunnelData[] = [
  {
    id: "1",
    name: "Fitness Coach Consultation Funnel",
    industry: "Fitness Coach",
    goal: "Book free consults",
    status: "active",
    leads: 342,
    conversion: 28.5,
    revenue: 12450,
    created: "2 days ago",
    steps: 7,
    traffic: 1200
  },
  {
    id: "2", 
    name: "Real Estate Lead Generation",
    industry: "Real Estate",
    goal: "Generate property leads",
    status: "active",
    leads: 189,
    conversion: 15.2,
    revenue: 8900,
    created: "1 week ago",
    steps: 5,
    traffic: 1240
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case "active": return "bg-success/10 text-success border-success/20";
    case "paused": return "bg-warning/10 text-warning border-warning/20";
    case "draft": return "bg-muted text-muted-foreground border-border";
    default: return "bg-muted text-muted-foreground border-border";
  }
}

export default function Funnels() {
  const [funnels, setFunnels] = useState<FunnelData[]>(initialFunnels);
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingFunnel, setEditingFunnel] = useState<FunnelData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Load funnels from localStorage on mount
  useEffect(() => {
    const savedFunnels = localStorage.getItem('ai-funnels');
    if (savedFunnels) {
      try {
        setFunnels(JSON.parse(savedFunnels));
      } catch (error) {
        console.error('Error loading funnels:', error);
      }
    }
  }, []);

  // Save funnels to localStorage when funnels change
  useEffect(() => {
    localStorage.setItem('ai-funnels', JSON.stringify(funnels));
  }, [funnels]);

  const handleEdit = (funnel: FunnelData) => {
    setEditingFunnel(funnel);
    setShowBuilder(true);
  };

  const handleDuplicate = (funnel: FunnelData) => {
    const duplicatedFunnel: FunnelData = {
      ...funnel,
      id: Date.now().toString(),
      name: `${funnel.name} (Copy)`,
      status: "draft",
      created: "Just now",
      leads: 0,
      revenue: 0
    };
    setFunnels(prev => [duplicatedFunnel, ...prev]);
    toast({
      title: "Funnel Duplicated",
      description: "A copy has been created and added to your collection.",
    });
  };

  const handleDelete = (funnelId: string) => {
    setFunnels(prev => prev.filter(f => f.id !== funnelId));
    toast({
      title: "Funnel Deleted",
      description: "The funnel has been removed from your collection.",
    });
  };

  const toggleFunnelStatus = (funnelId: string) => {
    setFunnels(prev => prev.map(funnel => 
      funnel.id === funnelId 
        ? { ...funnel, status: funnel.status === 'active' ? 'paused' : 'active' as any }
        : funnel
    ));
  };

  const filteredFunnels = funnels.filter(funnel =>
    funnel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    funnel.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNewFunnel = (funnelData: FunnelData) => {
    setFunnels(prev => [funnelData, ...prev]);
  };

  if (showBuilder) {
    return (
      <FunnelBuilder 
        funnel={editingFunnel} 
        onBack={() => {
          setShowBuilder(false);
          setEditingFunnel(null);
        }}
        onSave={addNewFunnel}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Funnels</h1>
            <p className="text-muted-foreground">Manage your high-converting sales funnels</p>
          </div>
          <Button variant="ai" onClick={() => setShowBuilder(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create AI Funnel
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Funnels</p>
                  <p className="text-2xl font-bold text-foreground">{funnels.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold text-foreground">
                    {funnels.reduce((sum, f) => sum + f.leads, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Conversion</p>
                  <p className="text-2xl font-bold text-foreground">
                    {funnels.length > 0 ? (funnels.reduce((sum, f) => sum + f.conversion, 0) / funnels.length).toFixed(1) : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${funnels.reduce((sum, f) => sum + f.revenue, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search funnels..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Funnels Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredFunnels.map((funnel) => (
            <Card key={funnel.id} className="border-0 shadow-soft hover:shadow-strong transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getStatusColor(funnel.status)}>
                        {funnel.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {funnel.steps} steps
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{funnel.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{funnel.industry} • {funnel.goal}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xl font-bold text-primary">{funnel.leads}</p>
                      <p className="text-xs text-muted-foreground">Leads</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-success">{funnel.conversion}%</p>
                      <p className="text-xs text-muted-foreground">Conversion</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-accent">${funnel.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Performance</span>
                      <span className="text-foreground">{funnel.conversion}%</span>
                    </div>
                    <Progress value={funnel.conversion} className="h-2" />
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">Created {funnel.created}</span>
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => toggleFunnelStatus(funnel.id)}
                        title={funnel.status === 'active' ? 'Pause' : 'Activate'}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Analytics">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => handleEdit(funnel)}
                        title="Edit Funnel"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleDuplicate(funnel)}
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleDelete(funnel.id)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Create New Funnel Card */}
          <Card 
            className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer lg:col-span-1"
            onClick={() => setShowBuilder(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[350px] text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Create AI Funnel</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Build industry-optimized funnels with AI in 3 clicks
              </p>
              <Button variant="ai" className="mt-4">
                Start Building
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}