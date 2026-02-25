import { useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle, XCircle, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Investment {
  id: number;
  projectName: string;
  artistName: string;
  amount: number;
  investorCount: number;
  fundingGoal: number;
  status: 'active' | 'completed' | 'failed';
  startDate: string;
  endDate: string;
  progressPercent: number;
}

export default function AdminInvestmentReview() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'failed'>('active');
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);

  // Mock investment data
  const investments: Investment[] = [
    {
      id: 1,
      projectName: 'SoundWeave Platform',
      artistName: 'Platform',
      amount: 1500000,
      investorCount: 2847,
      fundingGoal: 2000000,
      status: 'active',
      startDate: '2025-10-01',
      endDate: '2025-12-31',
      progressPercent: 75,
    },
    {
      id: 2,
      projectName: 'Luna Echo Album',
      artistName: 'Luna Echo',
      amount: 450000,
      investorCount: 1234,
      fundingGoal: 500000,
      status: 'active',
      startDate: '2025-11-01',
      endDate: '2025-12-15',
      progressPercent: 90,
    },
    {
      id: 3,
      projectName: 'Cosmic Sound Tour',
      artistName: 'Cosmic Sound',
      amount: 380000,
      investorCount: 892,
      fundingGoal: 400000,
      status: 'active',
      startDate: '2025-11-10',
      endDate: '2025-12-20',
      progressPercent: 95,
    },
    {
      id: 4,
      projectName: 'Stellar Vibes EP',
      artistName: 'Stellar Vibes',
      amount: 250000,
      investorCount: 567,
      fundingGoal: 250000,
      status: 'completed',
      startDate: '2025-09-01',
      endDate: '2025-10-31',
      progressPercent: 100,
    },
  ];

  const filteredInvestments = investments.filter((inv) => (filter === 'all' ? true : inv.status === filter));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            Active
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            Completed
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-sm font-semibold">
            <XCircle className="w-4 h-4" />
            Failed
          </div>
        );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Investment Review</h1>
        <p className="text-muted-foreground">Monitor and manage platform investments</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'active', 'completed', 'failed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              filter === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Investments List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredInvestments.map((investment) => (
            <Card
              key={investment.id}
              className={`p-6 cursor-pointer transition-all border-2 ${
                selectedInvestment?.id === investment.id
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent hover:border-primary/20'
              }`}
              onClick={() => setSelectedInvestment(investment)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{investment.projectName}</h3>
                  <p className="text-sm text-muted-foreground">{investment.artistName}</p>
                </div>
                {getStatusBadge(investment.status)}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">{investment.progressPercent}% Funded</span>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(investment.amount)} / {formatCurrency(investment.fundingGoal)}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{ width: `${investment.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Investors</p>
                  <p className="font-semibold">{investment.investorCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-semibold">
                    {Math.ceil(
                      (new Date(investment.endDate).getTime() - new Date(investment.startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{' '}
                    days
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1">
          {selectedInvestment ? (
            <Card className="p-6 sticky top-24 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-1">{selectedInvestment.projectName}</h2>
                <p className="text-sm text-muted-foreground">{selectedInvestment.artistName}</p>
              </div>

              {/* Key Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Total Raised</span>
                  </div>
                  <span className="font-bold">{formatCurrency(selectedInvestment.amount)}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Total Investors</span>
                  </div>
                  <span className="font-bold">{selectedInvestment.investorCount.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Funding Goal</span>
                  </div>
                  <span className="font-bold">{formatCurrency(selectedInvestment.fundingGoal)}</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="pt-4 border-t border-border space-y-3">
                <p className="text-sm font-semibold text-muted-foreground">Timeline</p>
                <div className="text-sm space-y-2">
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-semibold">{new Date(selectedInvestment.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">End Date</p>
                    <p className="font-semibold">{new Date(selectedInvestment.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedInvestment.status === 'active' && (
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Flag
                  </Button>
                </div>
              )}
            </Card>
          ) : (
            <Card className="p-6 sticky top-24 text-center">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">Select an investment to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
