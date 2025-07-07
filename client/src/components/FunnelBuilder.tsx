import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  FileText, 
  Target, 
  BarChart3, 
  Eye, 
  Zap,
  GripVertical,
  Plus,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdvancedPageBuilder from "./AdvancedPageBuilder";

interface FunnelStep {
  id: string;
  type: 'landing' | 'optin' | 'thankyou' | 'email' | 'offer' | 'upsell' | 'downsell';
  title: string;
  description: string;
  components: Component[];
}

interface Component {
  id: string;
  type: 'headline' | 'button' | 'form' | 'image' | 'text' | 'video';
  content: string;
  properties: Record<string, any>;
}

const COMPONENT_TYPES = [
  { type: 'headline', icon: FileText, label: 'Headline', description: 'Main heading text' },
  { type: 'button', icon: Target, label: 'Button', description: 'Call-to-action button' },
  { type: 'form', icon: BarChart3, label: 'Form', description: 'Lead capture form' },
  { type: 'image', icon: Eye, label: 'Image', description: 'Visual content' },
  { type: 'text', icon: FileText, label: 'Text', description: 'Paragraph text' },
  { type: 'video', icon: Eye, label: 'Video', description: 'Video content' }
];

const DEFAULT_FUNNEL_STEPS: Omit<FunnelStep, 'id' | 'components'>[] = [
  { type: 'landing', title: 'Landing Page', description: 'Main entry point with compelling offer' },
  { type: 'optin', title: 'Opt-in Page', description: 'Email capture form' },
  { type: 'thankyou', title: 'Thank You Page', description: 'Confirmation and next steps' },
  { type: 'email', title: 'Welcome Email', description: 'Automated follow-up sequence' },
  { type: 'offer', title: 'Main Offer', description: 'Core product or service' },
  { type: 'upsell', title: 'Upsell Offer', description: 'Additional premium offer' },
  { type: 'downsell', title: 'Downsell Offer', description: 'Alternative lower-price offer' }
];

function SortableStep({ step, onEdit, onDelete }: { 
  step: FunnelStep; 
  onEdit: (step: FunnelStep) => void; 
  onDelete: (id: string) => void; 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-card border border-border rounded-lg p-4 mb-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{step.title}</h4>
            <p className="text-sm text-muted-foreground">{step.description}</p>
            <div className="text-xs text-muted-foreground mt-1">
              {step.components.length} component(s)
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(step)}>
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(step.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ComponentDragItem({ component }: { component: { type: string; icon: any; label: string; description: string } }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `component-${component.type}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 border border-dashed border-border rounded-lg cursor-grab hover:bg-accent/50 transition-colors"
    >
      <div className="flex items-center">
        <component.icon className="w-4 h-4 mr-2" />
        <span className="text-sm">{component.label}</span>
      </div>
    </div>
  );
}

interface FunnelBuilderProps {
  magnet?: any;
  funnel?: any;
  onBack: () => void;
  onSave?: (funnelData: any) => void;
}

export default function FunnelBuilder({ magnet, funnel, onBack, onSave }: FunnelBuilderProps) {
  const [steps, setSteps] = useState<FunnelStep[]>([]);
  const [selectedStep, setSelectedStep] = useState<FunnelStep | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [useAdvancedBuilder, setUseAdvancedBuilder] = useState(false);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const generateAutoFunnel = () => {
    const autoSteps: FunnelStep[] = DEFAULT_FUNNEL_STEPS.slice(0, 7).map((step, index) => ({
      id: `step-${Date.now()}-${index}`,
      ...step,
      components: []
    }));

    // Add default components to each step
    autoSteps.forEach((step, index) => {
      switch (step.type) {
        case 'landing':
          step.components = [
            { id: `comp-${Date.now()}-1`, type: 'headline', content: 'Transform Your Business Today', properties: {} },
            { id: `comp-${Date.now()}-2`, type: 'text', content: 'Discover the secrets to success with our proven system.', properties: {} },
            { id: `comp-${Date.now()}-3`, type: 'button', content: 'Get Started Now', properties: { variant: 'gradient' } }
          ];
          break;
        case 'optin':
          step.components = [
            { id: `comp-${Date.now()}-4`, type: 'headline', content: 'Get Your Free Guide', properties: {} },
            { id: `comp-${Date.now()}-5`, type: 'form', content: 'Email Capture Form', properties: {} }
          ];
          break;
        case 'thankyou':
          step.components = [
            { id: `comp-${Date.now()}-6`, type: 'headline', content: 'Thank You!', properties: {} },
            { id: `comp-${Date.now()}-7`, type: 'text', content: 'Check your email for the download link.', properties: {} }
          ];
          break;
        default:
          step.components = [
            { id: `comp-${Date.now()}-${index + 8}`, type: 'headline', content: step.title, properties: {} }
          ];
      }
    });

    setSteps(autoSteps);
    toast({
      title: "Auto-Funnel Generated! 🎉",
      description: "A 7-step funnel has been created with default components.",
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleAddStep = () => {
    const newStep: FunnelStep = {
      id: `step-${Date.now()}`,
      type: 'landing',
      title: 'New Step',
      description: 'Custom funnel step',
      components: []
    };
    setSteps([...steps, newStep]);
  };

  const handleDeleteStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const handleEditStep = (step: FunnelStep) => {
    setSelectedStep(step);
  };

  const saveStep = (updatedStep: FunnelStep) => {
    setSteps(steps.map(step => step.id === updatedStep.id ? updatedStep : step));
    setSelectedStep(null);
  };

  if (selectedStep) {
    if (useAdvancedBuilder) {
      return (
        <AdvancedPageBuilder
          initialElements={selectedStep.components.map(comp => ({
            id: comp.id,
            type: comp.type,
            content: comp.content,
            styles: comp.properties
          }))}
          onSave={(elements) => {
            const updatedStep = {
              ...selectedStep,
              components: elements.map(el => ({
                id: el.id,
                type: el.type as any,
                content: el.content,
                properties: el.styles || {}
              }))
            };
            saveStep(updatedStep);
            setUseAdvancedBuilder(false);
          }}
          onClose={() => {
            setUseAdvancedBuilder(false);
          }}
        />
      );
    }

    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Step Editor</h1>
              <p className="text-muted-foreground">Editing: {selectedStep.title}</p>
            </div>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setUseAdvancedBuilder(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
              >
                🚀 Advanced Builder
              </Button>
              <Button variant="outline" onClick={() => setSelectedStep(null)}>
                ← Back to Funnel
              </Button>
              <Button onClick={() => saveStep(selectedStep)}>
                Save Changes
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Component Library */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {COMPONENT_TYPES.map((comp) => (
                  <div
                    key={comp.type}
                    className="p-3 border border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => {
                      const newComponent: Component = {
                        id: `comp-${Date.now()}`,
                        type: comp.type as any,
                        content: `New ${comp.label}`,
                        properties: {}
                      };
                      setSelectedStep({
                        ...selectedStep,
                        components: [...selectedStep.components, newComponent]
                      });
                    }}
                  >
                    <div className="flex items-center">
                      <comp.icon className="w-4 h-4 mr-2" />
                      <span className="text-sm">{comp.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{comp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Canvas */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Step Canvas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg min-h-[500px] p-4">
                    {selectedStep.components.length === 0 ? (
                      <div className="text-center text-muted-foreground mt-20">
                        <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Add components to build your step</p>
                        <p className="text-sm">Click on components from the left panel to add them</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedStep.components.map((component, index) => (
                          <div key={component.id} className="p-4 border border-border rounded-lg bg-card">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium capitalize">{component.type}</span>
                                <span className="text-xs text-muted-foreground">#{index + 1}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedStep({
                                    ...selectedStep,
                                    components: selectedStep.components.filter(c => c.id !== component.id)
                                  });
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="mt-2">
                              <Input
                                value={component.content}
                                onChange={(e) => {
                                  setSelectedStep({
                                    ...selectedStep,
                                    components: selectedStep.components.map(c =>
                                      c.id === component.id ? { ...c, content: e.target.value } : c
                                    )
                                  });
                                }}
                                placeholder="Enter content..."
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Properties */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Step Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Step Title</Label>
                    <Input
                      value={selectedStep.title}
                      onChange={(e) => setSelectedStep({ ...selectedStep, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={selectedStep.description}
                      onChange={(e) => setSelectedStep({ ...selectedStep, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Step Type</Label>
                    <Select
                      value={selectedStep.type}
                      onValueChange={(value) => setSelectedStep({ ...selectedStep, type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="landing">Landing Page</SelectItem>
                        <SelectItem value="optin">Opt-in Page</SelectItem>
                        <SelectItem value="thankyou">Thank You Page</SelectItem>
                        <SelectItem value="email">Email Sequence</SelectItem>
                        <SelectItem value="offer">Main Offer</SelectItem>
                        <SelectItem value="upsell">Upsell</SelectItem>
                        <SelectItem value="downsell">Downsell</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Funnel Builder</h1>
            <p className="text-muted-foreground">
              Building funnel for: {funnel?.name || magnet?.title || "New Funnel"}
            </p>
          </div>
          <Button variant="outline" onClick={onBack}>
            ← Back to Magnets
          </Button>
        </div>

        {steps.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Create Your Funnel</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Generate a complete 7-step funnel automatically or build your own step by step
            </p>
            <div className="space-x-4">
              <Button variant="gradient" onClick={generateAutoFunnel}>
                <Zap className="w-4 h-4 mr-2" />
                Generate Auto-Funnel (7 Steps)
              </Button>
              <Button variant="outline" onClick={handleAddStep}>
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Step
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Funnel Steps ({steps.length})</h2>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleAddStep}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
                <Button variant="gradient">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Funnel
                </Button>
              </div>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {steps.map((step) => (
                    <SortableStep
                      key={step.id}
                      step={step}
                      onEdit={handleEditStep}
                      onDelete={handleDeleteStep}
                    />
                  ))}
                </div>
              </SortableContext>
              <DragOverlay>
                {activeId ? (
                  <div className="bg-card border border-border rounded-lg p-4 opacity-90">
                    <div className="flex items-center space-x-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium text-foreground">
                          {steps.find(s => s.id === activeId)?.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        )}
      </div>
    </div>
  );
}