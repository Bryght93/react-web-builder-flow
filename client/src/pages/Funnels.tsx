
import React, { useState } from 'react';
import { Plus, Zap, Eye, Edit, Play, Pause, Trash2, Copy, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LiveFunnelBuilder from '@/components/LiveFunnelBuilder';
import { toast } from 'sonner';

const Funnels = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingFunnel, setEditingFunnel] = useState(null);
  const [selectedTab, setSelectedTab] = useState('all');

  const mockFunnels = [
    {
      id: 1,
      title: "Digital Marketing Course Landing",
      status: "active",
      type: "course",
      pages: 4,
      conversions: "12.5%",
      leads: 234,
      revenue: "$4,680",
      lastModified: "2 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Email Marketing Masterclass",
      status: "draft",
      type: "webinar",
      pages: 3,
      conversions: "0%",
      leads: 0,
      revenue: "$0",
      lastModified: "1 day ago",
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Social Media Growth Blueprint",
      status: "paused",
      type: "ebook",
      pages: 5,
      conversions: "8.3%",
      leads: 156,
      revenue: "$3,120",
      lastModified: "3 days ago",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Live';
      case 'paused': return 'Paused';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  const filteredFunnels = mockFunnels.filter(funnel => {
    if (selectedTab === 'all') return true;
    return funnel.status === selectedTab;
  });

  const handleCreateNew = () => {
    setEditingFunnel(null);
    setShowBuilder(true);
  };

  const handleEditFunnel = (funnel: any) => {
    setEditingFunnel(funnel);
    setShowBuilder(true);
  };

  const handlePreviewFunnel = (funnel: any) => {
    // Create a preview URL - this should work now
    const previewUrl = `/funnel-preview/${funnel.id}`;
    window.open(previewUrl, '_blank');
    toast.success('Opening funnel preview...');
  };

  const handleViewLive = (funnel: any) => {
    if (funnel.status !== 'active') {
      toast.error('Only active funnels can be viewed live');
      return;
    }
    // Create a live URL - this should work now
    const liveUrl = `/funnel-live/${funnel.id}`;
    window.open(liveUrl, '_blank');
    toast.success('Opening live funnel...');
  };

  const handleStatusToggle = (funnel: any) => {
    const newStatus = funnel.status === 'active' ? 'paused' : 'active';
    toast.success(`Funnel ${newStatus === 'active' ? 'activated' : 'paused'}`);
  };

  const handleExport = (funnel: any) => {
    toast.success('Exporting funnel...');
  };

  const handleDuplicate = (funnel: any) => {
    toast.success('Funnel duplicated successfully');
  };

  const handleDelete = (funnel: any) => {
    toast.success('Funnel deleted successfully');
  };

  if (showBuilder) {
    return (
      <LiveFunnelBuilder 
        onComplete={(newFunnel) => {
          console.log('Funnel completed:', newFunnel);
          setShowBuilder(false);
          toast.success('Funnel created successfully!');
        }}
        onBack={() => setShowBuilder(false)}
        initialFunnelData={editingFunnel}
      />
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Funnels
          </h1>
          <p className="text-muted-foreground mt-2">
            Create high-converting funnels with AI-powered assistance
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            Create Funnel
          </Button>
          <Button variant="gradient" onClick={handleCreateNew}>
            <Zap className="w-4 h-4 mr-2" />
            Create AI Funnel
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Funnels ({mockFunnels.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({mockFunnels.filter(f => f.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({mockFunnels.filter(f => f.status === 'draft').length})</TabsTrigger>
          <TabsTrigger value="paused">Paused ({mockFunnels.filter(f => f.status === 'paused').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          {filteredFunnels.length === 0 ? (
            <Card className="border-2 border-dashed border-muted-foreground/25">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Zap className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No funnels found</h3>
                <p className="text-muted-foreground text-center mb-6">
                  {selectedTab === 'all' 
                    ? "Get started by creating your first AI-powered funnel"
                    : `No ${selectedTab} funnels available`
                  }
                </p>
                <Button variant="gradient" onClick={handleCreateNew}>
                  <Zap className="w-4 h-4 mr-2" />
                  Create Your First AI Funnel
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFunnels.map((funnel) => (
                <Card key={funnel.id} className="group hover:shadow-lg transition-all duration-200 border-0 shadow-soft">
                  <div className="relative">
                    <img 
                      src={funnel.thumbnail} 
                      alt={funnel.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant="secondary" 
                        className={`${getStatusColor(funnel.status)} text-white border-0`}
                      >
                        {getStatusText(funnel.status)}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-1">
                        <Button size="sm" variant="secondary" onClick={() => handlePreviewFunnel(funnel)}>
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => handleEditFunnel(funnel)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-1">{funnel.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{funnel.pages} pages</span>
                      <span>•</span>
                      <span>{funnel.lastModified}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-lg font-semibold text-primary">{funnel.conversions}</div>
                        <div className="text-xs text-muted-foreground">Conversion</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{funnel.leads}</div>
                        <div className="text-xs text-muted-foreground">Leads</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-green-600">{funnel.revenue}</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => funnel.status === 'active' ? handleViewLive(funnel) : handlePreviewFunnel(funnel)}
                      >
                        {funnel.status === 'active' ? (
                          <>
                            <Play className="w-3 h-3 mr-1" />
                            View Live
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Preview
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant={funnel.status === 'active' ? 'secondary' : 'default'}
                        onClick={() => handleStatusToggle(funnel)}
                      >
                        {funnel.status === 'active' ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                      </Button>
                      
                      <Button size="sm" variant="ghost" onClick={() => handleExport(funnel)}>
                        <Download className="w-3 h-3" />
                      </Button>
                      
                      <Button size="sm" variant="ghost" onClick={() => handleDuplicate(funnel)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Funnels;
