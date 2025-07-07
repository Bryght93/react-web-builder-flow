import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Eye,
  MousePointer,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Zap,
  Brain,
  Mic,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Equal,
  Activity,
  PieChart as PieChartIcon,
  BarChart3,
  LineChart as LineChartIcon,
  Map,
  Globe,
  Smartphone,
  Monitor,
  Mail,
  Phone,
  Share2,
  Heart,
  Star,
  Bookmark,
  ShoppingCart,
  CreditCard,
  Repeat,
  UserCheck,
  UserX,
  Timer,
  Gauge,
  Layers,
  Maximize2
} from "lucide-react";

interface AnalyticsData {
  overview: {
    totalRevenue: number;
    totalLeads: number;
    conversionRate: number;
    avgOrderValue: number;
    revenueGrowth: number;
    leadsGrowth: number;
    conversionGrowth: number;
    aovGrowth: number;
  };
  funnelData: Array<{
    stage: string;
    visitors: number;
    conversions: number;
    rate: number;
    revenue: number;
  }>;
  trafficSources: Array<{
    source: string;
    visitors: number;
    conversions: number;
    revenue: number;
    color: string;
  }>;
  timeSeriesData: Array<{
    date: string;
    revenue: number;
    leads: number;
    conversions: number;
    visitors: number;
  }>;
  deviceData: Array<{
    device: string;
    visitors: number;
    conversions: number;
    revenue: number;
  }>;
  geographicData: Array<{
    country: string;
    visitors: number;
    conversions: number;
    revenue: number;
  }>;
  campaignData: Array<{
    campaign: string;
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    revenue: number;
    roi: number;
  }>;
  cohortData: Array<{
    cohort: string;
    month0: number;
    month1: number;
    month2: number;
    month3: number;
    month4: number;
    month5: number;
  }>;
  customerLifetime: {
    avgLifetime: number;
    avgValue: number;
    churnRate: number;
    retentionRate: number;
  };
  productAnalytics: Array<{
    product: string;
    views: number;
    addToCart: number;
    purchases: number;
    revenue: number;
    conversionRate: number;
  }>;
  aiInsights: Array<{
    type: 'opportunity' | 'warning' | 'success' | 'info';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    confidence: number;
    actions: string[];
  }>;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', '#ff6b6b'];

export default function Analytics() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState({ from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), to: new Date() });
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [aiVoiceMode, setAiVoiceMode] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  const { data: analyticsData, isLoading, refetch } = useQuery<AnalyticsData>({
    queryKey: ['/api/analytics', dateRange, selectedMetric],
    queryFn: async () => {
      // Simulate comprehensive analytics data
      const mockData: AnalyticsData = {
        overview: {
          totalRevenue: 127500,
          totalLeads: 2847,
          conversionRate: 12.4,
          avgOrderValue: 89.50,
          revenueGrowth: 23.5,
          leadsGrowth: 15.2,
          conversionGrowth: 8.7,
          aovGrowth: 12.1
        },
        funnelData: [
          { stage: "Awareness", visitors: 10000, conversions: 8500, rate: 85, revenue: 0 },
          { stage: "Interest", visitors: 8500, conversions: 6200, rate: 73, revenue: 0 },
          { stage: "Consideration", visitors: 6200, conversions: 3100, rate: 50, revenue: 0 },
          { stage: "Purchase", visitors: 3100, conversions: 1240, rate: 40, revenue: 127500 },
          { stage: "Retention", visitors: 1240, conversions: 620, rate: 50, revenue: 65000 }
        ],
        trafficSources: [
          { source: "Organic Search", visitors: 4500, conversions: 675, revenue: 55000, color: "#8884d8" },
          { source: "Paid Ads", visitors: 3200, conversions: 512, revenue: 42000, color: "#82ca9d" },
          { source: "Social Media", visitors: 1800, conversions: 234, revenue: 18500, color: "#ffc658" },
          { source: "Email", visitors: 800, conversions: 120, revenue: 12000, color: "#ff7300" },
          { source: "Direct", visitors: 1200, conversions: 180, revenue: 15000, color: "#00ff00" }
        ],
        timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          revenue: Math.floor(Math.random() * 5000) + 2000,
          leads: Math.floor(Math.random() * 100) + 50,
          conversions: Math.floor(Math.random() * 50) + 20,
          visitors: Math.floor(Math.random() * 500) + 200
        })),
        deviceData: [
          { device: "Desktop", visitors: 5500, conversions: 825, revenue: 72000 },
          { device: "Mobile", visitors: 4200, conversions: 588, revenue: 48000 },
          { device: "Tablet", visitors: 1800, conversions: 216, revenue: 18000 }
        ],
        geographicData: [
          { country: "United States", visitors: 4200, conversions: 630, revenue: 58000 },
          { country: "Canada", visitors: 1800, conversions: 252, revenue: 24000 },
          { country: "United Kingdom", visitors: 1600, conversions: 208, revenue: 22000 },
          { country: "Australia", visitors: 1200, conversions: 144, revenue: 16000 },
          { country: "Germany", visitors: 800, conversions: 88, revenue: 9500 }
        ],
        campaignData: [
          { campaign: "Google Ads - Search", impressions: 250000, clicks: 12500, conversions: 875, cost: 15000, revenue: 78000, roi: 420 },
          { campaign: "Facebook Ads", impressions: 180000, clicks: 9000, conversions: 540, cost: 8000, revenue: 48000, roi: 500 },
          { campaign: "LinkedIn Ads", impressions: 120000, clicks: 3600, conversions: 180, cost: 6000, revenue: 24000, roi: 300 },
          { campaign: "YouTube Ads", impressions: 300000, clicks: 15000, conversions: 450, cost: 12000, revenue: 36000, roi: 200 }
        ],
        cohortData: [
          { cohort: "Jan 2024", month0: 100, month1: 85, month2: 72, month3: 65, month4: 58, month5: 52 },
          { cohort: "Feb 2024", month0: 100, month1: 88, month2: 75, month3: 68, month4: 62, month5: 0 },
          { cohort: "Mar 2024", month0: 100, month1: 82, month2: 70, month3: 63, month4: 0, month5: 0 },
          { cohort: "Apr 2024", month0: 100, month1: 90, month2: 78, month3: 0, month4: 0, month5: 0 },
          { cohort: "May 2024", month0: 100, month1: 86, month2: 0, month3: 0, month4: 0, month5: 0 }
        ],
        customerLifetime: {
          avgLifetime: 24.5,
          avgValue: 285.75,
          churnRate: 4.2,
          retentionRate: 85.8
        },
        productAnalytics: [
          { product: "Premium Funnel Template", views: 2400, addToCart: 480, purchases: 156, revenue: 18720, conversionRate: 32.5 },
          { product: "Email Marketing Course", views: 1800, addToCart: 360, purchases: 108, revenue: 10800, conversionRate: 30.0 },
          { product: "CRM Integration", views: 1200, addToCart: 180, purchases: 48, revenue: 9600, conversionRate: 26.7 },
          { product: "Analytics Dashboard", views: 900, addToCart: 135, purchases: 36, revenue: 7200, conversionRate: 26.7 }
        ],
        aiInsights: [
          {
            type: 'opportunity',
            title: 'Mobile Conversion Opportunity',
            description: 'Mobile traffic shows 35% higher engagement but 28% lower conversion rate than desktop.',
            impact: 'high',
            confidence: 92,
            actions: ['Optimize mobile checkout flow', 'Implement mobile-specific CTAs', 'Test mobile payment options']
          },
          {
            type: 'warning',
            title: 'Cart Abandonment Spike',
            description: 'Cart abandonment rate increased by 15% in the last 7 days.',
            impact: 'high',
            confidence: 88,
            actions: ['Send abandoned cart emails', 'Review checkout process', 'Offer exit-intent discounts']
          },
          {
            type: 'success',
            title: 'Email Campaign Performance',
            description: 'Recent email campaign generated 45% higher ROI than previous campaigns.',
            impact: 'medium',
            confidence: 95,
            actions: ['Scale winning email format', 'Test similar subject lines', 'Increase send frequency']
          },
          {
            type: 'info',
            title: 'Seasonal Trend Detected',
            description: 'Traffic patterns suggest 20% increase expected in next 2 weeks.',
            impact: 'medium',
            confidence: 78,
            actions: ['Prepare inventory', 'Scale ad spend', 'Optimize server capacity']
          }
        ]
      };
      
      return mockData;
    }
  });

  const handleVoiceQuery = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Voice Recognition Active",
          description: "Listening for your analytics query...",
        });
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceQuery(transcript);
        processVoiceQuery(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Could not process voice input. Please try again.",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
    }
  };

  const processVoiceQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('revenue') || lowerQuery.includes('sales')) {
      setActiveTab('revenue');
    } else if (lowerQuery.includes('conversion') || lowerQuery.includes('funnel')) {
      setActiveTab('funnel');
    } else if (lowerQuery.includes('traffic') || lowerQuery.includes('source')) {
      setActiveTab('traffic');
    } else if (lowerQuery.includes('customer') || lowerQuery.includes('retention')) {
      setActiveTab('customer');
    } else if (lowerQuery.includes('campaign') || lowerQuery.includes('ads')) {
      setActiveTab('campaigns');
    }

    toast({
      title: "Voice Query Processed",
      description: `Navigated to ${activeTab} based on: "${query}"`,
    });
  };

  const MetricCard = ({ title, value, change, icon, trend }: any) => (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend === 'up' ? <TrendingUp className="w-3 h-3 text-green-500 mr-1" /> : 
           trend === 'down' ? <TrendingDown className="w-3 h-3 text-red-500 mr-1" /> : 
           <Equal className="w-3 h-3 text-gray-500 mr-1" />}
          <span className={trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'}>
            {change}%
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );

  const AIInsightCard = ({ insight }: { insight: any }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {insight.type === 'opportunity' && <Target className="w-4 h-4 text-blue-500" />}
            {insight.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
            {insight.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
            {insight.type === 'info' && <Activity className="w-4 h-4 text-gray-500" />}
            <CardTitle className="text-sm">{insight.title}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={insight.impact === 'high' ? 'destructive' : insight.impact === 'medium' ? 'default' : 'secondary'}>
              {insight.impact} impact
            </Badge>
            <Badge variant="outline">{insight.confidence}% confident</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
        <div className="space-y-1">
          <p className="text-xs font-medium">Recommended Actions:</p>
          {insight.actions.map((action: string, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>{action}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <BarChart3 className="w-8 h-8" />
              Advanced Analytics
            </h1>
            <p className="text-muted-foreground mt-2">
              AI-powered insights and comprehensive analytics to maximize your sales performance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant={aiVoiceMode ? "default" : "outline"}
              onClick={() => setAiVoiceMode(!aiVoiceMode)}
              className="flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              AI Assistant
            </Button>
            <Button 
              variant={isListening ? "destructive" : "outline"}
              onClick={handleVoiceQuery}
              className="flex items-center gap-2"
            >
              <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
              Voice Query
            </Button>
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {aiVoiceMode && (
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Analytics Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Input 
                placeholder="Ask me anything about your analytics... (e.g., 'Show me conversion trends')"
                value={voiceQuery}
                onChange={(e) => setVoiceQuery(e.target.value)}
              />
              <Button onClick={handleVoiceQuery}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask AI
              </Button>
            </div>
            {voiceQuery && (
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  <strong>You asked:</strong> "{voiceQuery}"
                </p>
                <p className="text-sm mt-2">
                  <strong>AI Response:</strong> Based on your query, I've navigated to the most relevant analytics section. 
                  Your data shows strong performance in the requested area.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="funnel">Funnel</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Revenue"
              value={`$${analyticsData?.overview.totalRevenue.toLocaleString()}`}
              change={analyticsData?.overview.revenueGrowth}
              icon={<DollarSign className="w-4 h-4" />}
              trend="up"
            />
            <MetricCard
              title="Total Leads"
              value={analyticsData?.overview.totalLeads.toLocaleString()}
              change={analyticsData?.overview.leadsGrowth}
              icon={<Users className="w-4 h-4" />}
              trend="up"
            />
            <MetricCard
              title="Conversion Rate"
              value={`${analyticsData?.overview.conversionRate}%`}
              change={analyticsData?.overview.conversionGrowth}
              icon={<Target className="w-4 h-4" />}
              trend="up"
            />
            <MetricCard
              title="Avg Order Value"
              value={`$${analyticsData?.overview.avgOrderValue}`}
              change={analyticsData?.overview.aovGrowth}
              icon={<ShoppingCart className="w-4 h-4" />}
              trend="up"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData?.timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData?.trafficSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="visitors"
                    >
                      {analyticsData?.trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={analyticsData?.timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Source</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        <span className="text-sm">{source.source}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">${source.revenue.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {((source.revenue / analyticsData.overview.totalRevenue) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel Analysis</CardTitle>
              <CardDescription>
                Track user journey from awareness to retention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={analyticsData?.funnelData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="stage" type="category" />
                    <Tooltip />
                    <Bar dataKey="visitors" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="space-y-4">
                  {analyticsData?.funnelData.map((stage, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{stage.stage}</h3>
                        <Badge variant="outline">{stage.rate}%</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Visitors:</span>
                          <div className="font-medium">{stage.visitors.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Conversions:</span>
                          <div className="font-medium">{stage.conversions.toLocaleString()}</div>
                        </div>
                      </div>
                      <Progress value={stage.rate} className="mt-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic by Device</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData?.deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="visitors"
                    >
                      {analyticsData?.deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.geographicData.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{country.country}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{country.visitors.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {country.conversions} conversions
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customer" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">${analyticsData?.customerLifetime.avgValue}</div>
                    <div className="text-sm text-muted-foreground">Average LTV</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{analyticsData?.customerLifetime.avgLifetime} mo</div>
                    <div className="text-sm text-muted-foreground">Average Lifetime</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{analyticsData?.customerLifetime.retentionRate}%</div>
                    <div className="text-sm text-muted-foreground">Retention Rate</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{analyticsData?.customerLifetime.churnRate}%</div>
                    <div className="text-sm text-muted-foreground">Churn Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cohort Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Cohort</th>
                        <th className="text-center p-2">M0</th>
                        <th className="text-center p-2">M1</th>
                        <th className="text-center p-2">M2</th>
                        <th className="text-center p-2">M3</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData?.cohortData.map((cohort, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{cohort.cohort}</td>
                          <td className="text-center p-2">{cohort.month0}%</td>
                          <td className="text-center p-2">{cohort.month1}%</td>
                          <td className="text-center p-2">{cohort.month2}%</td>
                          <td className="text-center p-2">{cohort.month3}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Campaign</th>
                      <th className="text-center p-2">Impressions</th>
                      <th className="text-center p-2">Clicks</th>
                      <th className="text-center p-2">Conversions</th>
                      <th className="text-center p-2">Cost</th>
                      <th className="text-center p-2">Revenue</th>
                      <th className="text-center p-2">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData?.campaignData.map((campaign, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{campaign.campaign}</td>
                        <td className="text-center p-2">{campaign.impressions.toLocaleString()}</td>
                        <td className="text-center p-2">{campaign.clicks.toLocaleString()}</td>
                        <td className="text-center p-2">{campaign.conversions}</td>
                        <td className="text-center p-2">${campaign.cost.toLocaleString()}</td>
                        <td className="text-center p-2">${campaign.revenue.toLocaleString()}</td>
                        <td className="text-center p-2">
                          <Badge variant={campaign.roi > 300 ? "default" : campaign.roi > 200 ? "secondary" : "destructive"}>
                            {campaign.roi}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData?.productAnalytics.map((product, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">{product.product}</h3>
                      <Badge variant="outline">{product.conversionRate}% conversion</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Views</div>
                        <div className="font-medium">{product.views.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Add to Cart</div>
                        <div className="font-medium">{product.addToCart.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Purchases</div>
                        <div className="font-medium">{product.purchases.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Revenue</div>
                        <div className="font-medium">${product.revenue.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>View to Cart</span>
                        <span>{((product.addToCart / product.views) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(product.addToCart / product.views) * 100} className="h-2" />
                      <div className="flex justify-between text-xs">
                        <span>Cart to Purchase</span>
                        <span>{((product.purchases / product.addToCart) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(product.purchases / product.addToCart) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>
                Advanced machine learning analysis of your data patterns and opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Actionable Insights</h3>
                  {analyticsData?.aiInsights.map((insight, index) => (
                    <AIInsightCard key={index} insight={insight} />
                  ))}
                </div>
                <div>
                  <h3 className="font-medium mb-4">Performance Predictions</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Next 7 Days Revenue</span>
                          <span className="font-medium">$28,500 - $35,200</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Lead Generation</span>
                          <span className="font-medium">540 - 680 leads</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Conversion Rate</span>
                          <span className="font-medium">11.8% - 13.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}