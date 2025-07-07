import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { toast } from 'sonner';
import {
  User, Edit3, Save, Upload, Camera, Mail, Phone, MapPin, Building, Target,
  TrendingUp, Calendar, Clock, DollarSign, Users, Award, Settings, Crown,
  Zap, Eye, BarChart3, FileText, Globe, Link, Copy, CheckCircle, Star,
  Briefcase, UserCheck, CreditCard, Shield, RefreshCw, Download, Share2
} from 'lucide-react';

// Form validation schema
const profileSchema = z.object({
  // Basic Information
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  
  // Business & Marketing Context
  businessName: z.string().optional(),
  industry: z.string().optional(),
  targetAudience: z.string().optional(),
  mainGoal: z.string().optional(),
  productServiceDescription: z.string().optional(),
  
  // AI Funnel Customization
  funnelObjective: z.string().optional(),
  preferredFunnelStyle: z.string().optional(),
  leadMagnetType: z.string().optional(),
  preferredPlatform: z.string().optional(),
  crmIntegration: z.string().optional(),
  
  // Optional Advanced Fields
  customDomain: z.string().optional(),
  referralCode: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  accountType: string;
  businessName?: string;
  industry?: string;
  targetAudience?: string;
  mainGoal?: string;
  productServiceDescription?: string;
  funnelObjective?: string;
  preferredFunnelStyle?: string;
  leadMagnetType?: string;
  preferredPlatform?: string;
  crmIntegration?: string;
  funnelsCreated: number;
  leadsCollected: number;
  emailsSent: number;
  openRate?: number;
  clickRate?: number;
  currentPlan: string;
  customDomain?: string;
  referralCode?: string;
  createdAt: string;
}

interface UserStats {
  funnelsCreated: number;
  leadsCollected: number;
  emailsSent: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  totalRevenue: number;
  activeTeamMembers: number;
}

const industryOptions = [
  'Real Estate', 'E-commerce', 'Fitness Coach', 'Digital Marketing', 'Consulting',
  'Education', 'Healthcare', 'Finance', 'Technology', 'Food & Beverage',
  'Fashion', 'Travel', 'Entertainment', 'Non-profit', 'Other'
];

const funnelStyleOptions = [
  'Clean & Modern', 'Bold & Salesy', 'Minimalist', 'Corporate', 'Creative',
  'Professional', 'Trendy', 'Classic', 'Colorful', 'Elegant'
];

const leadMagnetTypes = [
  'Ebook', 'Free Call', 'Video Training', 'Checklist', 'Template',
  'Webinar', 'Free Trial', 'Discount Code', 'Quiz', 'Assessment'
];

const platformOptions = [
  'WhatsApp', 'Email', 'Telegram', 'SMS', 'Instagram DM', 'Facebook Messenger',
  'LinkedIn', 'Twitter', 'Slack', 'Discord'
];

const goalOptions = [
  'Book appointments', 'Sell digital product', 'Grow email list', 'Generate leads',
  'Build brand awareness', 'Drive website traffic', 'Increase sales',
  'Promote services', 'Launch product', 'Build community'
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      businessName: '',
      industry: '',
      targetAudience: '',
      mainGoal: '',
      productServiceDescription: '',
      funnelObjective: '',
      preferredFunnelStyle: '',
      leadMagnetType: '',
      preferredPlatform: '',
      crmIntegration: '',
      customDomain: '',
      referralCode: '',
    }
  });

  // Fetch user profile
  const { data: profile, isLoading: isLoadingProfile } = useQuery<UserProfile>({
    queryKey: ['/api/profile'],
    retry: false,
  });

  // Fetch user stats
  const { data: stats, isLoading: isLoadingStats } = useQuery<UserStats>({
    queryKey: ['/api/profile/stats'],
    retry: false,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      return apiRequest('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/profile'] });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });

  // Update profile image mutation
  const updateProfileImageMutation = useMutation({
    mutationFn: async (imageFile: File) => {
      const formData = new FormData();
      formData.append('profileImage', imageFile);
      return apiRequest('/api/profile/image', {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/profile'] });
      toast.success('Profile image updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update profile image: ${error.message}`);
    },
  });

  // Populate form when profile data is loaded
  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phoneNumber: profile.phoneNumber || '',
        businessName: profile.businessName || '',
        industry: profile.industry || '',
        targetAudience: profile.targetAudience || '',
        mainGoal: profile.mainGoal || '',
        productServiceDescription: profile.productServiceDescription || '',
        funnelObjective: profile.funnelObjective || '',
        preferredFunnelStyle: profile.preferredFunnelStyle || '',
        leadMagnetType: profile.leadMagnetType || '',
        preferredPlatform: profile.preferredPlatform || '',
        crmIntegration: profile.crmIntegration || '',
        customDomain: profile.customDomain || '',
        referralCode: profile.referralCode || '',
      });
      setProfileImage(profile.profileImageUrl || null);
    }
  }, [profile, form]);

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateProfileImageMutation.mutate(file);
      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const copyReferralCode = () => {
    if (profile?.referralCode) {
      navigator.clipboard.writeText(profile.referralCode);
      toast.success('Referral code copied to clipboard!');
    }
  };

  const generateReferralCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    form.setValue('referralCode', code);
    toast.success('New referral code generated!');
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
          <p className="text-muted-foreground">Manage your LeadGenius AI account and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={profile?.accountType === 'Pro' ? 'default' : 'secondary'} className="text-xs">
            {profile?.accountType || 'Free'} Plan
          </Badge>
          {profile?.accountType === 'Pro' && <Crown className="w-4 h-4 text-yellow-500" />}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Basic Information
                </CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profileImage || undefined} alt="Profile" />
                  <AvatarFallback className="text-lg">
                    {profile?.firstName?.[0]}{profile?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div>
                    <Label htmlFor="profile-image" className="cursor-pointer">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
                        <Camera className="w-4 h-4" />
                        <span>Change Photo</span>
                      </div>
                    </Label>
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...form.register('firstName')}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted' : ''}
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...form.register('lastName')}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted' : ''}
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      {...form.register('email')}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted' : ''}
                    />
                  </div>
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phoneNumber"
                      {...form.register('phoneNumber')}
                      placeholder="+234 812 345 6789"
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted' : ''}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={updateProfileMutation.isPending}>
                      {updateProfileMutation.isPending ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Business & Marketing Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  {...form.register('businessName')}
                  placeholder="BrandLaunch Media"
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={form.watch('industry')}
                  onValueChange={(value) => form.setValue('industry', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industryOptions.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea
                  id="targetAudience"
                  {...form.register('targetAudience')}
                  placeholder="New moms in Lagos, Nigerian Gen Z creatives"
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>

              <div>
                <Label htmlFor="mainGoal">Main Goal</Label>
                <Select
                  value={form.watch('mainGoal')}
                  onValueChange={(value) => form.setValue('mainGoal', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your main goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalOptions.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="productServiceDescription">Product/Service Description</Label>
                <Textarea
                  id="productServiceDescription"
                  {...form.register('productServiceDescription')}
                  placeholder="Online course teaching small businesses how to launch in 30 days"
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                AI Funnel Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="funnelObjective">Funnel Objective</Label>
                <Textarea
                  id="funnelObjective"
                  {...form.register('funnelObjective')}
                  placeholder="Build landing page + upsell + email drip"
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredFunnelStyle">Preferred Funnel Style</Label>
                  <Select
                    value={form.watch('preferredFunnelStyle')}
                    onValueChange={(value) => form.setValue('preferredFunnelStyle', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {funnelStyleOptions.map((style) => (
                        <SelectItem key={style} value={style}>
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="leadMagnetType">Lead Magnet Type</Label>
                  <Select
                    value={form.watch('leadMagnetType')}
                    onValueChange={(value) => form.setValue('leadMagnetType', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {leadMagnetTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="preferredPlatform">Preferred Platform</Label>
                <Select
                  value={form.watch('preferredPlatform')}
                  onValueChange={(value) => form.setValue('preferredPlatform', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platformOptions.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="crmIntegration">CRM Integration</Label>
                <Input
                  id="crmIntegration"
                  {...form.register('crmIntegration')}
                  placeholder="Mailchimp, Google Sheets, WhatsApp, etc."
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {isLoadingStats ? (
            <div className="flex items-center justify-center h-64">
              <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Target className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{stats?.funnelsCreated || 0}</p>
                        <p className="text-sm text-muted-foreground">Funnels Created</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-2xl font-bold">{stats?.leadsCollected || 0}</p>
                        <p className="text-sm text-muted-foreground">Leads Collected</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold">{stats?.emailsSent || 0}</p>
                        <p className="text-sm text-muted-foreground">Emails Sent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">${stats?.totalRevenue || 0}</p>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Email Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Open Rate</span>
                        <span>{stats?.openRate || 0}%</span>
                      </div>
                      <Progress value={stats?.openRate || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Click Rate</span>
                        <span>{stats?.clickRate || 0}%</span>
                      </div>
                      <Progress value={stats?.clickRate || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Conversion Rate</span>
                        <span>{stats?.conversionRate || 0}%</span>
                      </div>
                      <Progress value={stats?.conversionRate || 0} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Account Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Account Type:</span>
                      <Badge variant={profile?.accountType === 'Pro' ? 'default' : 'secondary'}>
                        {profile?.accountType || 'Free'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Member Since:</span>
                      <span className="text-sm">{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Team Members:</span>
                      <span className="text-sm">{stats?.activeTeamMembers || 0}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Plan:</span>
                      <Badge variant="outline">{profile?.currentPlan || 'Starter'}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Advanced Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customDomain">Custom Domain</Label>
                <div className="flex items-center space-x-2">
                  <Link className="w-4 h-4 text-muted-foreground" />
                  <Input
                    id="customDomain"
                    {...form.register('customDomain')}
                    placeholder="funnel.brandlaunchmedia.com"
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-muted' : ''}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Pro plan required for custom domains
                </p>
              </div>

              <div>
                <Label htmlFor="referralCode">Referral Code</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="referralCode"
                    {...form.register('referralCode')}
                    placeholder="ABC123"
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-muted' : ''}
                  />
                  {profile?.referralCode && (
                    <Button type="button" variant="outline" size="sm" onClick={copyReferralCode}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                  {isEditing && (
                    <Button type="button" variant="outline" size="sm" onClick={generateReferralCode}>
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Share your referral code to earn commissions
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Account Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium">Export Data</h4>
                  <p className="text-sm text-muted-foreground">Download all your account data</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium">Share Profile</h4>
                  <p className="text-sm text-muted-foreground">Share your public profile</p>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}