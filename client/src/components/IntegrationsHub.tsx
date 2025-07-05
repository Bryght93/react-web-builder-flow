import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  CreditCard, 
  FileText, 
  Clock, 
  ShoppingCart, 
  Zap, 
  Check, 
  Settings,
  Link,
  Users,
  Mail,
  Database
} from "lucide-react";

export default function IntegrationsHub() {
  const [connectedIntegrations, setConnectedIntegrations] = useState([
    { name: "Calendly", status: "connected", category: "scheduling" },
    { name: "Stripe", status: "connected", category: "payment" }
  ]);

  const availableIntegrations = [
    {
      name: "Calendly",
      description: "Automated booking and scheduling",
      icon: Calendar,
      category: "scheduling",
      connected: true,
      features: ["Auto-book calls", "Calendar sync", "Reminder emails"]
    },
    {
      name: "Stripe",
      description: "Payment processing and billing",
      icon: CreditCard,
      category: "payment",
      connected: true,
      features: ["Accept payments", "Subscription billing", "Invoicing"]
    },
    {
      name: "Notion",
      description: "Organize leads and customer data",
      icon: FileText,
      category: "productivity",
      connected: false,
      features: ["Lead database", "Customer notes", "Task management"]
    },
    {
      name: "Google Calendar",
      description: "Sync appointments and meetings",
      icon: Clock,
      category: "scheduling",
      connected: false,
      features: ["Calendar sync", "Meeting reminders", "Availability blocks"]
    },
    {
      name: "Shopify",
      description: "E-commerce integration for upsells",
      icon: ShoppingCart,
      category: "ecommerce",
      connected: false,
      features: ["Product sync", "Order tracking", "Upsell automation"]
    },
    {
      name: "Zapier",
      description: "Connect with 5000+ apps",
      icon: Zap,
      category: "automation",
      connected: false,
      features: ["Workflow automation", "Data sync", "Custom triggers"]
    },
    {
      name: "HubSpot",
      description: "Advanced CRM features",
      icon: Users,
      category: "crm",
      connected: false,
      features: ["Lead scoring", "Pipeline management", "Email sequences"]
    },
    {
      name: "Mailchimp",
      description: "Email marketing automation",
      icon: Mail,
      category: "email",
      connected: false,
      features: ["Email campaigns", "List management", "Analytics"]
    }
  ];

  const categories = [
    { id: "all", name: "All Integrations", count: availableIntegrations.length },
    { id: "scheduling", name: "Scheduling", count: availableIntegrations.filter(i => i.category === "scheduling").length },
    { id: "payment", name: "Payments", count: availableIntegrations.filter(i => i.category === "payment").length },
    { id: "productivity", name: "Productivity", count: availableIntegrations.filter(i => i.category === "productivity").length },
    { id: "automation", name: "Automation", count: availableIntegrations.filter(i => i.category === "automation").length }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIntegrations = availableIntegrations.filter(integration => {
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Integrations Hub</h1>
          <p className="text-muted-foreground">Connect your favorite tools to streamline your lead generation workflow</p>
        </div>
        <Badge className="bg-success/10 text-success border-success/20">
          <Check className="w-4 h-4 mr-1" />
          {connectedIntegrations.length} Connected
        </Badge>
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Integrations</TabsTrigger>
          <TabsTrigger value="connected">Connected ({connectedIntegrations.length})</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks & API</TabsTrigger>
        </TabsList>

        {/* Browse Integrations Tab */}
        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Integrations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration, index) => (
              <Card key={index} className={`transition-all duration-200 hover:shadow-soft ${integration.connected ? 'border-success/50 bg-success/5' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <integration.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{integration.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    {integration.connected && (
                      <Badge className="bg-success/20 text-success border-success/50">
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>

                  <div className="space-y-2 mb-4">
                    {integration.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs">
                        <Check className="w-3 h-3 text-success" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      variant={integration.connected ? "outline" : "default"}
                    >
                      {integration.connected ? (
                        <>
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </>
                      ) : (
                        <>
                          <Link className="w-4 h-4 mr-2" />
                          Connect
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Connected Integrations Tab */}
        <TabsContent value="connected" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {connectedIntegrations.map((integration, index) => {
              const fullIntegration = availableIntegrations.find(i => i.name === integration.name);
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <fullIntegration.icon className="w-6 h-6 text-primary" />
                        <span>{integration.name}</span>
                      </div>
                      <Badge className="bg-success/20 text-success">Active</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Auto-sync enabled</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Real-time updates</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Error notifications</Label>
                        <Switch />
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <div className="text-sm text-muted-foreground">Last sync: 2 minutes ago</div>
                      <div className="text-sm text-success">✓ All systems operational</div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                      <Button size="sm" variant="outline">
                        Test Connection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Integration Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">New appointment booked</div>
                      <div className="text-sm text-muted-foreground">Calendly • 5 minutes ago</div>
                    </div>
                  </div>
                  <Badge variant="outline">Success</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-4 h-4 text-success" />
                    <div>
                      <div className="font-medium">Payment processed</div>
                      <div className="text-sm text-muted-foreground">Stripe • 1 hour ago</div>
                    </div>
                  </div>
                  <Badge variant="outline">Success</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhooks & API Tab */}
        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Custom Webhooks</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Webhook URL</Label>
                <Input placeholder="https://your-app.com/webhook" />
              </div>

              <div>
                <Label>Events to Send</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["New Lead", "Lead Converted", "Email Opened", "Page Visited", "Form Submitted", "Call Booked"].map((event) => (
                    <div key={event} className="flex items-center space-x-2">
                      <Switch />
                      <span className="text-sm">{event}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button>Create Webhook</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>API Key</Label>
                <div className="flex space-x-2">
                  <Input value="lg_••••••••••••••••••••••••••••••••" readOnly />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>

              <div>
                <Label>API Endpoint</Label>
                <Input value="https://api.leadgenius.ai/v1/" readOnly />
              </div>

              <div className="flex space-x-2">
                <Button variant="outline">View Documentation</Button>
                <Button variant="outline">Download SDK</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}