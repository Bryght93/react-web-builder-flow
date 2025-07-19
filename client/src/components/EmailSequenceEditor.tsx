import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Plus, 
  Mail, 
  Edit3, 
  Trash2, 
  Copy, 
  Save, 
  Eye,
  Mic,
  MicOff,
  Sparkles,
  Clock,
  Send,
  Settings
} from 'lucide-react';
import PuckEmailEditor from './PuckEmailEditor';

interface Email {
  id: number;
  name: string;
  subject: string;
  content: any;
  delay?: number;
  delayUnit?: 'minutes' | 'hours' | 'days';
  status: 'draft' | 'active';
}

interface EmailTemplate {
  id: number;
  name: string;
  description: string;
  type: 'sequence' | 'broadcast';
  emailCount: number;
}

interface EmailSequenceEditorProps {
  onBack: () => void;
  template: EmailTemplate;
}

export default function EmailSequenceEditor({ onBack, template }: EmailSequenceEditorProps) {
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  const [view, setView] = useState<'sequence' | 'editor'>('sequence');
  const [isListening, setIsListening] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  // Initialize emails based on template
  const [emails, setEmails] = useState<Email[]>(() => {
    const initialEmails: Email[] = [];
    
    if (template.name.includes('Welcome')) {
      return [
        {
          id: 1,
          name: 'Welcome Email',
          subject: '🎉 Welcome to our community!',
          content: {},
          delay: 0,
          delayUnit: 'minutes',
          status: 'draft'
        },
        {
          id: 2,
          name: 'Getting Started Guide',
          subject: 'Here\'s how to get started',
          content: {},
          delay: 1,
          delayUnit: 'days',
          status: 'draft'
        },
        {
          id: 3,
          name: 'Special Offer',
          subject: 'Exclusive offer just for you',
          content: {},
          delay: 3,
          delayUnit: 'days',
          status: 'draft'
        }
      ];
    } else if (template.name.includes('Product Launch')) {
      return [
        {
          id: 1,
          name: 'Coming Soon Announcement',
          subject: '🚀 Something big is coming...',
          content: {},
          delay: 0,
          delayUnit: 'minutes',
          status: 'draft'
        },
        {
          id: 2,
          name: 'Behind the Scenes',
          subject: 'Take a peek behind the curtain',
          content: {},
          delay: 2,
          delayUnit: 'days',
          status: 'draft'
        },
        {
          id: 3,
          name: 'Early Access',
          subject: 'You\'re invited to early access',
          content: {},
          delay: 4,
          delayUnit: 'days',
          status: 'draft'
        },
        {
          id: 4,
          name: 'Launch Day',
          subject: 'It\'s here! Your exclusive access',
          content: {},
          delay: 7,
          delayUnit: 'days',
          status: 'draft'
        },
        {
          id: 5,
          name: 'Last Chance',
          subject: 'Don\'t miss out - limited time',
          content: {},
          delay: 10,
          delayUnit: 'days',
          status: 'draft'
        }
      ];
    } else {
      return [
        {
          id: 1,
          name: 'Email 1',
          subject: 'Your subject here',
          content: {},
          delay: 0,
          delayUnit: 'minutes',
          status: 'draft'
        }
      ];
    }
  });

  const handleAddEmail = () => {
    const newEmail: Email = {
      id: Math.max(...emails.map(e => e.id), 0) + 1,
      name: `Email ${emails.length + 1}`,
      subject: 'Your subject here',
      content: {},
      delay: 1,
      delayUnit: 'days',
      status: 'draft'
    };
    setEmails([...emails, newEmail]);
  };

  const handleDeleteEmail = (emailId: number) => {
    setEmails(emails.filter(e => e.id !== emailId));
    if (selectedEmailId === emailId) {
      setSelectedEmailId(null);
    }
  };

  const handleDuplicateEmail = (email: Email) => {
    const newEmail: Email = {
      ...email,
      id: Math.max(...emails.map(e => e.id), 0) + 1,
      name: `${email.name} (Copy)`
    };
    setEmails([...emails, newEmail]);
  };

  const handleEditEmail = (emailId: number) => {
    setSelectedEmailId(emailId);
    setView('editor');
  };

  const handleSaveEmailFromEditor = (emailData: any) => {
    if (selectedEmailId) {
      setEmails(emails.map(email => 
        email.id === selectedEmailId 
          ? { ...email, content: emailData }
          : email
      ));
    }
    setView('sequence');
    setSelectedEmailId(null);
  };

  const handleBackFromEditor = () => {
    setView('sequence');
    setSelectedEmailId(null);
  };

  const handleAIPrompt = async () => {
    if (!aiPrompt.trim()) return;
    
    // Simulate AI processing
    console.log('Processing AI prompt:', aiPrompt);
    setAiPrompt('');
    
    // In a real app, you would send this to your AI service
    // and update the selected email based on the response
  };

  const toggleVoiceRecording = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Start voice recording
      console.log('Starting voice recording...');
      // In a real app, you would integrate with Web Speech API
    } else {
      // Stop voice recording
      console.log('Stopping voice recording...');
    }
  };

  if (view === 'editor' && selectedEmailId) {
    const selectedEmail = emails.find(e => e.id === selectedEmailId);
    return (
      <PuckEmailEditor
        onBack={handleBackFromEditor}
        onSave={handleSaveEmailFromEditor}
        emailTemplate={{
          name: selectedEmail?.name || 'Email',
          subject: selectedEmail?.subject || 'Subject'
        }}
        initialData={selectedEmail?.content}
      />
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{template.name}</h1>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Sequence
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Email List */}
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Email Sequence</h2>
              <Badge variant="outline">{emails.length} emails</Badge>
            </div>
            
            <Button 
              onClick={handleAddEmail}
              className="w-full"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Email
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {emails.map((email, index) => (
              <Card 
                key={email.id} 
                className={`cursor-pointer hover:shadow-md transition-all ${
                  selectedEmailId === email.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedEmailId(email.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">Email {index + 1}</span>
                    </div>
                    <Badge 
                      variant={email.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {email.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm">{email.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-600 mb-3 line-clamp-1">
                    {email.subject}
                  </p>
                  
                  {index > 0 && (
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <Clock className="w-3 h-3 mr-1" />
                      Delay: {email.delay} {email.delayUnit}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-1">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditEmail(email.id);
                      }}
                      className="flex-1 text-xs"
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicateEmail(email);
                      }}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEmail(email.id);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {selectedEmailId ? (
            <div className="flex-1 flex flex-col">
              {/* Email Editor Header */}
              <div className="bg-white border-b px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {emails.find(e => e.id === selectedEmailId)?.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {emails.find(e => e.id === selectedEmailId)?.subject}
                    </p>
                  </div>
                  <Button 
                    onClick={() => handleEditEmail(selectedEmailId)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Open Editor
                  </Button>
                </div>
              </div>

              {/* AI Assistant Panel */}
              <div className="bg-white border-b px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <Input
                      placeholder="Tell AI what to change in this email... (e.g., 'Make it more urgent' or 'Add a call to action')"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAIPrompt()}
                      className="flex-1"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleVoiceRecording}
                    className={isListening ? 'bg-red-50 border-red-300 text-red-700' : ''}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button onClick={handleAIPrompt} size="sm" disabled={!aiPrompt.trim()}>
                    Apply AI
                  </Button>
                </div>
              </div>

              {/* Email Preview Area */}
              <div className="flex-1 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Email Editor
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Click "Open Editor" to start designing this email with the drag-and-drop editor
                  </p>
                  <Button 
                    onClick={() => handleEditEmail(selectedEmailId)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Open Editor
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Select an Email to Edit
                </h3>
                <p className="text-gray-600">
                  Choose an email from the left sidebar to start editing
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}