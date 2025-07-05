import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  MessageSquare,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Settings,
  Zap,
  Users,
  TrendingUp,
  Clock,
  Send,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  AlertCircle,
  Activity,
  Smartphone,
  Globe,
  Bot,
  Target,
  BarChart3,
  Calendar,
  Webhook
} from "lucide-react";

const CHANNELS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    icon: MessageSquare,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Direct messaging with customers',
    status: 'connected',
    lastSync: '2 min ago',
    leads: 127,
    responseRate: '89%'
  },
  {
    id: 'instagram',
    name: 'Instagram DMs',
    icon: Instagram,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    description: 'Instagram direct messages',
    status: 'connected',
    lastSync: '5 min ago',
    leads: 89,
    responseRate: '76%'
  },
  {
    id: 'facebook',
    name: 'Facebook Messenger',
    icon: Facebook,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Facebook page messages',
    status: 'connected',
    lastSync: '1 min ago',
    leads: 156,
    responseRate: '82%'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn InMail',
    icon: Linkedin,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    description: 'Professional networking messages',
    status: 'pending',
    lastSync: 'Never',
    leads: 0,
    responseRate: '0%'
  },
  {
    id: 'email',
    name: 'Email Marketing',
    icon: Mail,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    description: 'Email campaigns and sequences',
    status: 'connected',
    lastSync: 'Just now',
    leads: 234,
    responseRate: '45%'
  },
  {
    id: 'sms',
    name: 'SMS/Text',
    icon: Phone,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Text message marketing',
    status: 'connected',
    lastSync: '3 min ago',
    leads: 78,
    responseRate: '68%'
  }
];

const AUTOMATION_TEMPLATES = [
  {
    id: 'welcome-sequence',
    name: 'Welcome Sequence',
    description: 'Greet new leads and introduce your brand',
    channels: ['whatsapp', 'email', 'sms'],
    trigger: 'New lead capture',
    steps: 3,
    conversionRate: '34%'
  },
  {
    id: 'abandoned-form',
    name: 'Abandoned Form Follow-up',
    description: 'Re-engage leads who started but didn\'t complete forms',
    channels: ['email', 'facebook', 'whatsapp'],
    trigger: 'Form abandonment',
    steps: 2,
    conversionRate: '28%'
  },
  {
    id: 'nurture-sequence',
    name: 'Nurture Sequence',
    description: 'Build trust and provide value over time',
    channels: ['email', 'instagram', 'linkedin'],
    trigger: 'Lead qualification',
    steps: 5,
    conversionRate: '42%'
  },
  {
    id: 'booking-reminder',
    name: 'Booking Reminders',
    description: 'Remind leads about scheduled calls or meetings',
    channels: ['sms', 'whatsapp', 'email'],
    trigger: 'Meeting scheduled',
    steps: 2,
    conversionRate: '78%'
  }
];

const RECENT_MESSAGES = [
  {
    id: 1,
    channel: 'whatsapp',
    contact: 'Sarah Johnson',
    message: 'Hi! I\'m interested in your fitness program...',
    time: '2 min ago',
    status: 'unread',
    lead: true
  },
  {
    id: 2,
    channel: 'instagram',
    contact: 'Mike Chen',
    message: 'Can you tell me more about pricing?',
    time: '5 min ago',
    status: 'replied',
    lead: true
  },
  {
    id: 3,
    channel: 'facebook',
    contact: 'Emma Davis',
    message: 'Thanks for the quick response!',
    time: '8 min ago',
    status: 'read',
    lead: false
  },
  {
    id: 4,
    channel: 'email',
    contact: 'John Smith',
    message: 'I downloaded your guide and have a question...',
    time: '12 min ago',
    status: 'unread',
    lead: true
  }
];

const getChannelIcon = (channelId: string) => {
  const channel = CHANNELS.find(c => c.id === channelId);
  return channel?.icon || MessageSquare;
};

const getChannelColor = (channelId: string) => {
  const channel = CHANNELS.find(c => c.id === channelId);
  return channel?.color || 'text-gray-600';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected': return 'text-green-600 bg-green-50 border-green-200';
    case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'error': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export default function MultiChannelSync() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnectChannel = (channelId: string) => {
    toast({
      title: "Channel Connected",
      description: `${CHANNELS.find(c => c.id === channelId)?.name} has been connected successfully.`,
    });
  };

  const handleCreateAutomation = () => {
    toast({
      title: "Automation Created",
      description: "Your multi-channel automation has been set up successfully.",
    });
  };

  const connectedChannels = CHANNELS.filter(c => c.status === 'connected');
  const totalLeads = CHANNELS.reduce((sum, channel) => sum + channel.leads, 0);
  const avgResponseRate = Math.round(
    CHANNELS.filter(c => c.status === 'connected')
      .reduce((sum, channel) => sum + parseFloat(channel.responseRate), 0) / connectedChannels.length
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Multi-Channel Sync</h1>
            <p className="text-muted-foreground">Manage all your communication channels in one place</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ai" size="sm">
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            <Button variant="gradient" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Channel
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-3xl font-bold text-primary">{totalLeads}</p>
                  <p className="text-sm text-success">+18% this week</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Connected Channels</p>
                  <p className="text-3xl font-bold text-success">{connectedChannels.length}</p>
                  <p className="text-sm text-muted-foreground">of {CHANNELS.length} total</p>
                </div>
                <Globe className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Rate</p>
                  <p className="text-3xl font-bold text-warning">{avgResponseRate}%</p>
                  <p className="text-sm text-success">+5% improvement</p>
                </div>
                <TrendingUp className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Automations</p>
                  <p className="text-3xl font-bold text-accent">12</p>
                  <p className="text-sm text-success">3 new this week</p>
                </div>
                <Zap className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="channels" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="automations">Automations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Channels Tab */}
          <TabsContent value="channels" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CHANNELS.map((channel) => (
                <Card
                  key={channel.id}
                  className="border-0 shadow-soft hover:shadow-strong transition-all cursor-pointer"
                  onClick={() => setSelectedChannel(selectedChannel === channel.id ? null : channel.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${channel.bgColor} rounded-lg flex items-center justify-center`}>
                          <channel.icon className={`w-6 h-6 ${channel.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{channel.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{channel.description}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(channel.status)} variant="outline">
                        {channel.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{channel.leads}</div>
                        <div className="text-xs text-muted-foreground">Leads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">{channel.responseRate}</div>
                        <div className="text-xs text-muted-foreground">Response Rate</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>Last sync: {channel.lastSync}</span>
                      {channel.status === 'connected' && (
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                          Active
                        </div>
                      )}
                    </div>

                    {selectedChannel === channel.id && (
                      <div className="space-y-3 pt-3 border-t">
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="w-3 h-3 mr-1" />
                            Setup
                          </Button>
                          <Button variant="outline" size="sm">
                            <Activity className="w-3 h-3 mr-1" />
                            Analytics
                          </Button>
                        </div>
                        {channel.status !== 'connected' && (
                          <Button 
                            variant="gradient" 
                            size="sm" 
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConnectChannel(channel.id);
                            }}
                          >
                            Connect Now
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Messages</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {RECENT_MESSAGES.filter(m => m.status === 'unread').length} unread
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Mark All Read
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {RECENT_MESSAGES.map((message) => {
                        const ChannelIcon = getChannelIcon(message.channel);
                        const channelColor = getChannelColor(message.channel);
                        
                        return (
                          <div
                            key={message.id}
                            className={`flex items-center space-x-4 p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 ${
                              message.status === 'unread' ? 'bg-primary/5' : ''
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <ChannelIcon className={`w-5 h-5 ${channelColor}`} />
                              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium">
                                {message.contact.charAt(0)}
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-foreground">{message.contact}</h4>
                                {message.lead && (
                                  <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                                    Lead
                                  </Badge>
                                )}
                                {message.status === 'unread' && (
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{message.message}</p>
                              <p className="text-xs text-muted-foreground">{message.time}</p>
                            </div>
                            
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Send className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Reply</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Channel</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select channel" />
                        </SelectTrigger>
                        <SelectContent>
                          {connectedChannels.map(channel => (
                            <SelectItem key={channel.id} value={channel.id}>
                              {channel.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Message</Label>
                      <Textarea placeholder="Type your message..." rows={4} />
                    </div>
                    <Button variant="gradient" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">AI Assistant</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <p className="text-sm font-medium mb-1">💡 Smart Suggestion</p>
                      <p className="text-xs text-muted-foreground">
                        Based on the conversation, this lead seems interested in premium features. Consider sending pricing information.
                      </p>
                    </div>
                    <Button variant="ai" size="sm" className="w-full">
                      <Bot className="w-4 h-4 mr-2" />
                      Generate Response
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Automations Tab */}
          <TabsContent value="automations" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Automation Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {AUTOMATION_TEMPLATES.map((template) => (
                      <div
                        key={template.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-soft ${
                          selectedTemplate === template.id ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                        onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {template.conversionRate}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{template.steps} steps</span>
                          <span>Trigger: {template.trigger}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {template.channels.map(channelId => {
                            const channel = CHANNELS.find(c => c.id === channelId);
                            const ChannelIcon = channel?.icon || MessageSquare;
                            return (
                              <div key={channelId} className="flex items-center space-x-1 text-xs">
                                <ChannelIcon className={`w-3 h-3 ${channel?.color}`} />
                              </div>
                            );
                          })}
                        </div>

                        {selectedTemplate === template.id && (
                          <div className="mt-4 pt-3 border-t">
                            <Button variant="gradient" size="sm" className="w-full">
                              <Plus className="w-3 h-3 mr-1" />
                              Use Template
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Create Custom Automation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Automation Name</Label>
                      <Input placeholder="Enter automation name" />
                    </div>
                    
                    <div>
                      <Label>Trigger Event</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select trigger" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="form-submit">Form Submission</SelectItem>
                          <SelectItem value="lead-score">Lead Score Change</SelectItem>
                          <SelectItem value="email-open">Email Opened</SelectItem>
                          <SelectItem value="website-visit">Website Visit</SelectItem>
                          <SelectItem value="time-delay">Time Delay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Channels</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {connectedChannels.map(channel => (
                          <div key={channel.id} className="flex items-center space-x-2">
                            <Switch />
                            <channel.icon className={`w-4 h-4 ${channel.color}`} />
                            <span className="text-sm">{channel.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Message Template</Label>
                      <Textarea 
                        placeholder="Hi {name}, thanks for your interest in..."
                        rows={4}
                      />
                    </div>

                    <Button variant="gradient" className="w-full" onClick={handleCreateAutomation}>
                      <Zap className="w-4 h-4 mr-2" />
                      Create Automation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Channel Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {CHANNELS.filter(c => c.status === 'connected').map(channel => (
                      <div key={channel.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <channel.icon className={`w-4 h-4 ${channel.color}`} />
                            <span className="text-sm font-medium">{channel.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{channel.responseRate}</span>
                        </div>
                        <Progress value={parseFloat(channel.responseRate)} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Lead Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {CHANNELS.filter(c => c.status === 'connected').map((channel, index) => (
                      <div key={channel.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 ${channel.bgColor} rounded-full`}></div>
                          <span className="text-sm">{channel.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{channel.leads}</div>
                          <div className="text-xs text-muted-foreground">
                            {Math.round((channel.leads / totalLeads) * 100)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}