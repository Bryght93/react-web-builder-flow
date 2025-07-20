import React, { useState } from 'react';
import { Plus, Users, DollarSign, Link2, Share2, BarChart3, Eye, Copy, Settings, Calendar, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Affiliates = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateProgram, setShowCreateProgram] = useState(false);

  const mockAffiliates = [
    {
      id: 1,
      name: "Sarah Marketing Pro",
      email: "sarah@marketingpro.com",
      commissionRate: 30,
      totalEarned: "$2,450",
      referrals: 12,
      conversions: 8,
      status: "active",
      joinDate: "2024-01-15",
      lastSale: "2 days ago"
    },
    {
      id: 2,
      name: "Digital Growth Agency",
      email: "partners@digitalgrowth.com",
      commissionRate: 25,
      totalEarned: "$5,680",
      referrals: 28,
      conversions: 15,
      status: "active",
      joinDate: "2023-12-20",
      lastSale: "5 hours ago"
    },
    {
      id: 3,
      name: "Marketing Mike",
      email: "mike@mikesmarketing.com",
      commissionRate: 35,
      totalEarned: "$890",
      referrals: 6,
      conversions: 3,
      status: "pending",
      joinDate: "2024-01-20",
      lastSale: "Never"
    }
  ];

  const mockPrograms = [
    {
      id: 1,
      name: "Standard Affiliate Program",
      commissionRate: 30,
      cookieDuration: 60,
      affiliates: 45,
      revenue: "$28,450",
      status: "active"
    },
    {
      id: 2,
      name: "VIP Partner Program",
      commissionRate: 40,
      cookieDuration: 90,
      affiliates: 12,
      revenue: "$15,230",
      status: "active"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (showCreateProgram) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create Affiliate Program</h1>
            <p className="text-muted-foreground">Set up a new affiliate program for your products</p>
          </div>
          <Button variant="outline" onClick={() => setShowCreateProgram(false)}>
            Back to Programs
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Program Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Program Name</label>
                <Input placeholder="Standard Affiliate Program" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Commission Rate (%)</label>
                <Input placeholder="30" type="number" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Cookie Duration (days)</label>
                <Input placeholder="60" type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Minimum Payout</label>
                <Input placeholder="$50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Payment Schedule</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Monthly</option>
                  <option>Bi-weekly</option>
                  <option>Weekly</option>
                  <option>On Request</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Program Description</label>
              <Textarea placeholder="Describe your affiliate program benefits..." rows={4} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Application Process</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Auto-approve</option>
                  <option>Manual approval</option>
                  <option>Application required</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Affiliate Resources</label>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Resources
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Commission Tiers</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <span className="font-medium">Starter (0-10 sales)</span>
                    <p className="text-sm text-muted-foreground">New affiliates</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input className="w-20" placeholder="25" />
                    <span>%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <span className="font-medium">Pro (11-50 sales)</span>
                    <p className="text-sm text-muted-foreground">Regular performers</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input className="w-20" placeholder="30" />
                    <span>%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <span className="font-medium">Elite (50+ sales)</span>
                    <p className="text-sm text-muted-foreground">Top performers</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input className="w-20" placeholder="40" />
                    <span>%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">Save Draft</Button>
              <Button>Create Program</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Affiliate Management</h1>
          <p className="text-muted-foreground">Manage your affiliate partners and track performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Invite Affiliates
          </Button>
          <Button onClick={() => setShowCreateProgram(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Program
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-muted-foreground">Active Affiliates</span>
                </div>
                <div className="text-2xl font-bold">57</div>
                <p className="text-xs text-green-600">+8 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
                </div>
                <div className="text-2xl font-bold">$43,680</div>
                <p className="text-xs text-green-600">+15% this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-muted-foreground">Conversions</span>
                </div>
                <div className="text-2xl font-bold">234</div>
                <p className="text-xs text-green-600">+23 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-muted-foreground">Avg Commission</span>
                </div>
                <div className="text-2xl font-bold">32%</div>
                <p className="text-xs text-green-600">Industry leading</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Affiliates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAffiliates.slice(0, 3).map((affiliate) => (
                    <div key={affiliate.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{affiliate.name}</h4>
                        <p className="text-sm text-muted-foreground">{affiliate.conversions} conversions</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{affiliate.totalEarned}</div>
                        <div className="text-sm text-muted-foreground">{affiliate.commissionRate}% rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">New sale by Digital Growth Agency</p>
                      <p className="text-xs text-muted-foreground">5 hours ago - $297 commission</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">New affiliate application approved</p>
                      <p className="text-xs text-muted-foreground">1 day ago - Marketing Mike</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Monthly payouts processed</p>
                      <p className="text-xs text-muted-foreground">3 days ago - $12,450 total</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="affiliates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Input placeholder="Search affiliates..." className="w-64" />
              <Button variant="outline">Filter</Button>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Affiliate
            </Button>
          </div>

          <div className="space-y-4">
            {mockAffiliates.map((affiliate) => (
              <Card key={affiliate.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{affiliate.name}</h3>
                        <Badge variant="secondary" className={`${getStatusColor(affiliate.status)} text-white`}>
                          {affiliate.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Email:</span><br />
                          {affiliate.email}
                        </div>
                        <div>
                          <span className="font-medium">Commission:</span><br />
                          {affiliate.commissionRate}%
                        </div>
                        <div>
                          <span className="font-medium">Total Earned:</span><br />
                          <span className="text-green-600 font-medium">{affiliate.totalEarned}</span>
                        </div>
                        <div>
                          <span className="font-medium">Referrals:</span><br />
                          {affiliate.referrals}
                        </div>
                        <div>
                          <span className="font-medium">Conversions:</span><br />
                          {affiliate.conversions}
                        </div>
                        <div>
                          <span className="font-medium">Last Sale:</span><br />
                          {affiliate.lastSale}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="grid gap-6">
            {mockPrograms.map((program) => (
              <Card key={program.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{program.name}</h3>
                        <Badge variant="secondary" className="bg-green-500 text-white">
                          {program.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Commission Rate:</span><br />
                          {program.commissionRate}%
                        </div>
                        <div>
                          <span className="font-medium">Cookie Duration:</span><br />
                          {program.cookieDuration} days
                        </div>
                        <div>
                          <span className="font-medium">Active Affiliates:</span><br />
                          {program.affiliates}
                        </div>
                        <div>
                          <span className="font-medium">Total Revenue:</span><br />
                          <span className="text-green-600 font-medium">{program.revenue}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Link2 className="w-4 h-4 mr-1" />
                        Get Link
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">January 2025 Payouts</h4>
                    <p className="text-sm text-muted-foreground">57 affiliates paid</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">$12,450</div>
                    <Badge variant="secondary" className="bg-green-500 text-white">Completed</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">December 2024 Payouts</h4>
                    <p className="text-sm text-muted-foreground">52 affiliates paid</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">$9,780</div>
                    <Badge variant="secondary" className="bg-green-500 text-white">Completed</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">February 2025 Payouts</h4>
                    <p className="text-sm text-muted-foreground">Pending calculation</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">$8,920</div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Materials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Banner Ads (5 sizes)</h4>
                    <p className="text-sm text-muted-foreground">Web banners ready to use</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Email Templates</h4>
                    <p className="text-sm text-muted-foreground">Pre-written email campaigns</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Social Media Posts</h4>
                    <p className="text-sm text-muted-foreground">Ready-to-share content</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Affiliate Handbook</h4>
                    <p className="text-sm text-muted-foreground">Complete guide to promoting</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Video Training</h4>
                    <p className="text-sm text-muted-foreground">Marketing strategy videos</p>
                  </div>
                  <Button variant="outline" size="sm">Watch</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Best Practices</h4>
                    <p className="text-sm text-muted-foreground">Tips from top performers</p>
                  </div>
                  <Button variant="outline" size="sm">Read</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Affiliates;