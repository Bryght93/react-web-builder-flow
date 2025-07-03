import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  HelpCircle, 
  CheckSquare,
  BarChart3,
  Eye,
  Edit,
  Copy,
  Trash2,
  Sparkles,
  Zap,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialMagnets = [
  {
    id: 1,
    title: "Ultimate Fitness Challenge Guide",
    type: "eBook",
    industry: "Fitness",
    leads: 234,
    conversion: 24.5,
    status: "active",
    created: "2 days ago"
  },
  {
    id: 2,
    title: "What's Your Investment Style?",
    type: "Quiz",
    industry: "Finance",
    leads: 189,
    conversion: 31.2,
    status: "active",
    created: "1 week ago"
  },
  {
    id: 3,
    title: "Small Business Startup Checklist",
    type: "Checklist",
    industry: "Business",
    leads: 156,
    conversion: 18.7,
    status: "paused",
    created: "2 weeks ago"
  },
  {
    id: 4,
    title: "Health Assessment Tool",
    type: "Assessment",
    industry: "Health",
    leads: 98,
    conversion: 42.1,
    status: "draft",
    created: "3 days ago"
  }
];

const magnetTypes = [
  { value: "ebook", label: "eBook", icon: FileText, description: "Comprehensive guides and reports" },
  { value: "quiz", label: "Quiz", icon: HelpCircle, description: "Interactive assessments" },
  { value: "checklist", label: "Checklist", icon: CheckSquare, description: "Step-by-step action items" },
  { value: "template", label: "Template", icon: Copy, description: "Ready-to-use templates" },
  { value: "assessment", label: "Assessment", icon: BarChart3, description: "Personalized evaluations" }
];

const industries = [
  "Fitness & Health",
  "Real Estate", 
  "Business Consulting",
  "Finance & Investment",
  "Marketing & Digital",
  "Education & Coaching",
  "E-commerce",
  "SaaS & Technology"
];

function getStatusColor(status: string) {
  switch (status) {
    case "active": return "bg-success/10 text-success border-success/20";
    case "paused": return "bg-warning/10 text-warning border-warning/20";
    case "draft": return "bg-muted text-muted-foreground border-border";
    default: return "bg-muted text-muted-foreground border-border";
  }
}

function getTypeIcon(type: string) {
  switch (type.toLowerCase()) {
    case "ebook": return FileText;
    case "quiz": return HelpCircle;
    case "checklist": return CheckSquare;
    case "assessment": return BarChart3;
    default: return FileText;
  }
}

export default function LeadMagnets() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [showFunnelBuilder, setShowFunnelBuilder] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [magnets, setMagnets] = useState(initialMagnets);
  const [editingMagnet, setEditingMagnet] = useState<any>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!selectedType || !selectedIndustry || !businessDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to generate your lead magnet.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newMagnet = {
        id: Date.now(),
        title: `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} for ${selectedIndustry}`,
        type: selectedType.charAt(0).toUpperCase() + selectedType.slice(1),
        industry: selectedIndustry,
        leads: 0,
        conversion: 0,
        status: "draft",
        created: "Just now"
      };
      
      setMagnets(prev => [newMagnet, ...prev]);
      setIsGenerating(false);
      
      toast({
        title: "Lead Magnet Generated! 🎉",
        description: "Your AI-powered lead magnet has been created and added to your collection.",
      });
      
      // Reset form
      setSelectedType("");
      setSelectedIndustry("");
      setBusinessDescription("");
      setTargetAudience("");
      setShowBuilder(false);
    }, 3000);
  };

  const handleEdit = (magnet: any) => {
    setEditingMagnet(magnet);
    setShowFunnelBuilder(true);
  };

  const handleDelete = (magnetId: number) => {
    setMagnets(prev => prev.filter(m => m.id !== magnetId));
    toast({
      title: "Lead Magnet Deleted",
      description: "The lead magnet has been removed from your collection.",
    });
  };

  const handleDuplicate = (magnet: any) => {
    const duplicatedMagnet = {
      ...magnet,
      id: Date.now(),
      title: `${magnet.title} (Copy)`,
      status: "draft",
      created: "Just now",
      leads: 0
    };
    setMagnets(prev => [duplicatedMagnet, ...prev]);
    toast({
      title: "Lead Magnet Duplicated",
      description: "A copy has been created in your collection.",
    });
  };

  if (showFunnelBuilder) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Funnel Builder</h1>
              <p className="text-muted-foreground">
                Editing: {editingMagnet?.title || "New Funnel"}
              </p>
            </div>
            <Button variant="outline" onClick={() => setShowFunnelBuilder(false)}>
              ← Back to Magnets
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {/* Toolbox */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  <div className="p-3 border border-dashed border-border rounded-lg cursor-grab hover:bg-accent/50 transition-colors">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      <span className="text-sm">Headline</span>
                    </div>
                  </div>
                  <div className="p-3 border border-dashed border-border rounded-lg cursor-grab hover:bg-accent/50 transition-colors">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      <span className="text-sm">Button</span>
                    </div>
                  </div>
                  <div className="p-3 border border-dashed border-border rounded-lg cursor-grab hover:bg-accent/50 transition-colors">
                    <div className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      <span className="text-sm">Form</span>
                    </div>
                  </div>
                  <div className="p-3 border border-dashed border-border rounded-lg cursor-grab hover:bg-accent/50 transition-colors">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      <span className="text-sm">Image</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Canvas */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-soft h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Landing Page Canvas</CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                  <div className="border-2 border-dashed border-border rounded-lg h-full min-h-[500px] p-4 bg-background relative">
                    <div className="text-center text-muted-foreground mt-20">
                      <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Drag components here</p>
                      <p className="text-sm">Build your landing page by dragging components from the toolbox</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Properties */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Text</Label>
                    <Input placeholder="Enter text..." />
                  </div>
                  <div>
                    <Label>Color</Label>
                    <Input type="color" />
                  </div>
                  <div>
                    <Label>Size</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    Apply Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline">
              Preview
            </Button>
            <Button variant="gradient">
              Save & Publish
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showBuilder) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Lead Magnet Builder</h1>
              <p className="text-muted-foreground">Let AI create the perfect lead magnet for your business</p>
            </div>
            <Button variant="outline" onClick={() => setShowBuilder(false)}>
              ← Back to Magnets
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Builder Form */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-accent" />
                  Lead Magnet Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="type">Lead Magnet Type *</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose magnet type" />
                    </SelectTrigger>
                    <SelectContent>
                      {magnetTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center">
                            <type.icon className="w-4 h-4 mr-2" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedType && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {magnetTypes.find(t => t.value === selectedType)?.description}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="business">Business Description *</Label>
                  <Textarea 
                    placeholder="Describe your business, services, and what makes you unique..."
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input 
                    placeholder="e.g., Busy professionals aged 25-45"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>

                <Button 
                  variant="ai" 
                  className="w-full" 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-pulse" />
                      AI is Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Preview/Templates */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Popular Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {magnetTypes.slice(0, 3).map((type, index) => (
                    <div 
                      key={type.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-soft ${
                        selectedType === type.value ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => setSelectedType(type.value)}
                    >
                      <div className="flex items-center mb-2">
                        <type.icon className="w-5 h-5 mr-3 text-primary" />
                        <h4 className="font-medium">{type.label}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-success">High converting</span>
                        <Badge variant="outline" className="text-xs">
                          {Math.floor(Math.random() * 50) + 15}% avg conversion
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lead Magnets</h1>
            <p className="text-muted-foreground">Create and manage your AI-powered lead magnets</p>
          </div>
          <Button variant="gradient" onClick={() => setShowBuilder(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Lead Magnet
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search lead magnets..." className="pl-10" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lead Magnets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {magnets.map((magnet) => {
            const IconComponent = getTypeIcon(magnet.type);
            return (
              <Card key={magnet.id} className="border-0 shadow-soft hover:shadow-strong transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {magnet.type}
                      </Badge>
                    </div>
                    <Badge className={getStatusColor(magnet.status)}>
                      {magnet.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{magnet.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{magnet.industry}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{magnet.leads}</p>
                        <p className="text-xs text-muted-foreground">Leads Generated</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-success">{magnet.conversion}%</p>
                        <p className="text-xs text-muted-foreground">Conversion Rate</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">Created {magnet.created}</span>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Preview">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => handleEdit(magnet)}
                          title="Edit Funnel"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDuplicate(magnet)}
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDelete(magnet.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {/* Create New Card */}
          <Card 
            className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setShowBuilder(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Create New Lead Magnet</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Use AI to generate the perfect lead magnet for your business in minutes
              </p>
              <Button variant="gradient" className="mt-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Start Building
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}