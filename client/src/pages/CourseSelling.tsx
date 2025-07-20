import React, { useState } from 'react';
import { Plus, BookOpen, Users, BarChart3, Settings, Upload, Play, Edit, Eye, Trash2, DollarSign, Clock, Star, Video, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const CourseSelling = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [showBuilder, setShowBuilder] = useState(false);

  const mockCourses = [
    {
      id: 1,
      title: "Complete Digital Marketing Mastery",
      status: "published",
      category: "Marketing",
      price: 297,
      students: 1247,
      rating: 4.8,
      lessons: 32,
      duration: "12 hours",
      revenue: "$370,359",
      lastSale: "2 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "AI-Powered Sales Funnel Blueprint",
      status: "draft",
      category: "Sales",
      price: 497,
      students: 0,
      rating: 0,
      lessons: 24,
      duration: "8 hours",
      revenue: "$0",
      lastSale: "Never",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Email Marketing Automation Workshop",
      status: "published",
      category: "Email Marketing",
      price: 197,
      students: 823,
      rating: 4.9,
      lessons: 18,
      duration: "6 hours",
      revenue: "$162,131",
      lastSale: "1 hour ago",
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-gray-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  if (showBuilder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Course Builder</h1>
            <p className="text-muted-foreground">Create and structure your online course</p>
          </div>
          <Button variant="outline" onClick={() => setShowBuilder(false)}>
            Back to Courses
          </Button>
        </div>

        <Tabs defaultValue="setup" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="publish">Publish</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Course Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Title</label>
                    <Input placeholder="Enter course title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Marketing</option>
                      <option>Sales</option>
                      <option>Business</option>
                      <option>Technology</option>
                      <option>Design</option>
                      <option>Personal Development</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Course Description</label>
                  <Textarea placeholder="Describe what students will learn..." rows={4} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Skill Level</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>All Levels</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <Input placeholder="e.g., 8 hours" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Course Thumbnail</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Upload course thumbnail (1280x720 recommended)</p>
                    <Button variant="outline" className="mt-2">Choose File</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Course Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((section) => (
                    <div key={section} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Section {section}: Course Introduction</h3>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-1" />
                            Add Lesson
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3].map((lesson) => (
                          <div key={lesson} className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                            <div className="flex items-center space-x-3">
                              <Video className="w-4 h-4 text-muted-foreground" />
                              <span>Lesson {lesson}: Getting Started</span>
                              <Badge variant="outline">5 min</Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Content Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Upload Videos</h3>
                    <p className="text-muted-foreground mb-4">Drag and drop video files or browse</p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Videos
                    </Button>
                  </div>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Upload Resources</h3>
                    <p className="text-muted-foreground mb-4">PDFs, worksheets, templates</p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Content Library</h3>
                  <div className="space-y-2">
                    {['intro_video.mp4', 'lesson_1.mp4', 'worksheet.pdf'].map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center space-x-3">
                          {file.endsWith('.mp4') ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          <span>{file}</span>
                          <Badge variant="outline">Uploaded</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Price</label>
                    <Input placeholder="$297" type="number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Type</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>One-time Payment</option>
                      <option>Payment Plan (2 payments)</option>
                      <option>Payment Plan (3 payments)</option>
                      <option>Subscription</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Currency</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Launch Price (Optional)</label>
                    <Input placeholder="$197 (Limited Time)" type="number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Coupon Codes</label>
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Coupon
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Marketing Materials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sales Page Headline</label>
                  <Input placeholder="Master Digital Marketing in 30 Days" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Course Benefits</label>
                  <Textarea placeholder="• Learn proven strategies that work&#10;• Get step-by-step implementation&#10;• Access private community" rows={6} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Instructor Bio</label>
                    <Textarea placeholder="Brief instructor background..." rows={4} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Testimonials</label>
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Testimonial
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publish" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Publish Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Access Type</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Immediate Access</option>
                      <option>Drip Content (Weekly)</option>
                      <option>Drip Content (Daily)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Duration Access</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Lifetime Access</option>
                      <option>1 Year Access</option>
                      <option>6 Months Access</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="certificate" />
                    <label htmlFor="certificate" className="text-sm">Provide completion certificate</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="community" />
                    <label htmlFor="community" className="text-sm">Include private community access</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="bonuses" />
                    <label htmlFor="bonuses" className="text-sm">Add bonus materials</label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Publish Course</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Selling</h1>
          <p className="text-muted-foreground">Create, manage, and sell your online courses</p>
        </div>
        <Button onClick={() => setShowBuilder(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid gap-6">
            {mockCourses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img src={course.thumbnail} alt={course.title} className="w-24 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{course.title}</h3>
                        <Badge variant="secondary" className={`${getStatusColor(course.status)} text-white`}>
                          {course.status}
                        </Badge>
                        <Badge variant="outline">{course.category}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm text-muted-foreground mb-4">
                        <div>
                          <DollarSign className="w-4 h-4 inline mr-1" />
                          ${course.price}
                        </div>
                        <div>
                          <Users className="w-4 h-4 inline mr-1" />
                          {course.students} students
                        </div>
                        <div>
                          <Star className="w-4 h-4 inline mr-1" />
                          {course.rating || 'N/A'} rating
                        </div>
                        <div>
                          <BookOpen className="w-4 h-4 inline mr-1" />
                          {course.lessons} lessons
                        </div>
                        <div>
                          <Clock className="w-4 h-4 inline mr-1" />
                          {course.duration}
                        </div>
                        <div className="font-medium text-green-600">
                          {course.revenue}
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground mb-4">
                        Last sale: {course.lastSale}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-muted-foreground">Total Courses</span>
                </div>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-green-600">+2 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">Total Students</span>
                </div>
                <div className="text-2xl font-bold">2,070</div>
                <p className="text-xs text-green-600">+156 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
                </div>
                <div className="text-2xl font-bold">$532,490</div>
                <p className="text-xs text-green-600">+28% this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-muted-foreground">Avg Rating</span>
                </div>
                <div className="text-2xl font-bold">4.7</div>
                <p className="text-xs text-green-600">+0.2 this month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">Complete Digital Marketing Mastery</p>
                    <p className="text-xs text-muted-foreground">Progress: 78% • Enrolled 2 weeks ago</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Active</Badge>
                    <Button variant="outline" size="sm">Message</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Michael Chen</h4>
                    <p className="text-sm text-muted-foreground">Email Marketing Automation Workshop</p>
                    <p className="text-xs text-muted-foreground">Progress: 100% • Completed</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-500 text-white">Completed</Badge>
                    <Button variant="outline" size="sm">Certificate</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Marketing Course Template", category: "Marketing", lessons: 25, price: "$297" },
              { name: "Business Fundamentals", category: "Business", lessons: 18, price: "$197" },
              { name: "Personal Development", category: "Coaching", lessons: 20, price: "$397" },
              { name: "Technical Skills Training", category: "Technology", lessons: 30, price: "$497" },
              { name: "Creative Design Course", category: "Design", lessons: 22, price: "$247" },
              { name: "Sales Mastery Program", category: "Sales", lessons: 16, price: "$597" }
            ].map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {template.lessons} lessons
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        Suggested price: {template.price}
                      </div>
                    </div>
                    <Button className="w-full" variant="outline" onClick={() => setShowBuilder(true)}>
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseSelling;