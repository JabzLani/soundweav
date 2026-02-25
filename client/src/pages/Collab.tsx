import { useState, useMemo } from 'react';
import { TrendingUp, Target, Users, Zap, Loader2, Music, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { useCart } from '@/contexts/CartContext';

export default function Collab() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCart();

  // Fetch active collaboration projects from tRPC API
  const { data: projects = [], isLoading, error } = trpc.projects.getActive.useQuery();

  // Filter projects based on search
  const filteredProjects = useMemo(() => {
    return projects.filter((project: any) => {
      const matchesSearch = project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.artistName?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [projects, searchQuery]);

  // Calculate project progress
  const getProjectProgress = (project: any) => {
    if (!project.fundingGoal || !project.currentFunded) return 0;
    const goal = typeof project.fundingGoal === 'string' ? parseInt(project.fundingGoal) : project.fundingGoal;
    const funded = typeof project.currentFunded === 'string' ? parseInt(project.currentFunded) : project.currentFunded;
    return Math.min(100, (funded / goal) * 100);
  };

  const handleInvest = (project: any, tier: any) => {
    addItem({
      id: project.id * 1000 + (tier.id || 1),
      title: `${project.title} - ${tier.name} Investment`,
      artist: project.artistName || 'Unknown Artist',
      price: typeof tier.amount === 'string' ? parseInt(tier.amount) : tier.amount,
      image: project.imageUrl,
      quantity: 1,
      category: 'digital',
    });
  };

  const selectedProjectData = projects.find((p: any) => p.id === selectedProject);

  const ProjectCard = ({ project }: { project: any }) => {
    const progressPercent = getProjectProgress(project);
    const daysLeft = project.endDate ? Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

    return (
      <Card className="overflow-hidden card-hover cursor-pointer" onClick={() => setSelectedProject(project.id)}>
        <div className="relative h-48 overflow-hidden bg-muted">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Music className="w-20 h-20 text-muted-foreground opacity-30" />
            </div>
          )}
          {daysLeft > 0 && (
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
              {daysLeft} days left
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-1">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{project.artistName || 'Unknown Artist'}</p>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

          {/* Progress Bar */}
          <div className="mb-3">
            <Progress value={progressPercent} className="h-2" />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-bold">${project.currentFunding?.toLocaleString() || '0'}</span>
              <span className="text-xs text-muted-foreground">{Math.round(progressPercent)}%</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between text-xs text-muted-foreground mb-4 pb-4 border-b">
            <span>{0} backers</span>
            <span>Goal: ${typeof project.fundingGoal === 'string' ? parseInt(project.fundingGoal).toLocaleString() : project.fundingGoal?.toLocaleString() || '0'}</span>
          </div>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            View Project
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Collaboration Projects</h1>
            <p className="text-muted-foreground">Invest in upcoming music projects and earn royalties.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64"
            />
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            Error loading projects. Please try again.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}