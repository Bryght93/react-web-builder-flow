
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  Search, 
  Filter, 
  Edit3, 
  Copy, 
  Trash2, 
  Eye,
  Clock,
  Send,
  ArrowLeft,
  Plus
} from 'lucide-react';

interface SavedEmail {
  id: number;
  name: string;
  subject: string;
  content: any;
  status: 'draft' | 'completed' | 'sent';
  lastModified: string;
  type: string;
  createdAt?: string;
}

interface MyEmailsLibraryProps {
  onBack: () => void;
  onEditEmail: (email: SavedEmail) => void;
  onCreateNew: () => void;
}

export default function MyEmailsLibrary({ onBack, onEditEmail, onCreateNew }: MyEmailsLibraryProps) {
  const [savedEmails, setSavedEmails] = useState<SavedEmail[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'completed' | 'sent'>('all');

  // Load emails from localStorage
  useEffect(() => {
    const loadEmails = () => {
      const emails = JSON.parse(localStorage.getItem('myEmails') || '[]');
      setSavedEmails(emails.sort((a: SavedEmail, b: SavedEmail) => 
        new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      ));
    };

    loadEmails();
    
    // Listen for storage changes
    window.addEventListener('storage', loadEmails);
    return () => window.removeEventListener('storage', loadEmails);
  }, []);

  const filteredEmails = savedEmails.filter(email => {
    const matchesSearch = email.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || email.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteEmail = (emailId: number) => {
    const updatedEmails = savedEmails.filter(email => email.id !== emailId);
    setSavedEmails(updatedEmails);
    localStorage.setItem('myEmails', JSON.stringify(updatedEmails));
  };

  const handleDuplicateEmail = (email: SavedEmail) => {
    const duplicatedEmail = {
      ...email,
      id: Date.now(),
      name: `${email.name} (Copy)`,
      status: 'draft' as const,
      lastModified: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedEmails = [duplicatedEmail, ...savedEmails];
    setSavedEmails(updatedEmails);
    localStorage.setItem('myEmails', JSON.stringify(updatedEmails));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Emails</h1>
              <p className="text-gray-600">Manage all your email drafts and completed templates</p>
            </div>
          </div>
          
          <Button 
            onClick={onCreateNew}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Email
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="draft">Drafts</option>
              <option value="completed">Completed</option>
              <option value="sent">Sent</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {savedEmails.filter(e => e.status === 'draft').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {savedEmails.filter(e => e.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Send className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {savedEmails.filter(e => e.status === 'sent').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {savedEmails.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email List */}
        {filteredEmails.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No emails found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No emails match your current filters'
                  : 'Start creating your first email template'
                }
              </p>
              <Button 
                onClick={onCreateNew}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Email
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmails.map((email) => (
              <Card key={email.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                        {email.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-2">{email.subject}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(email.status)}>
                          {email.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(email.lastModified)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditEmail(email);
                        }}
                        className="flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateEmail(email);
                        }}
                        className="flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </Button>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEmail(email.id);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
