import { useState } from 'react';
import { CheckCircle, XCircle, Clock, FileText, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface VerificationRequest {
  id: number;
  artistName: string;
  email: string;
  genre: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: {
    idDocument: string;
    musicProof: string;
    bankStatement: string;
  };
  notes?: string;
}

export default function AdminArtistVerification() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  // Mock verification requests
  const requests: VerificationRequest[] = [
    {
      id: 1,
      artistName: 'Luna Echo',
      email: 'luna@example.com',
      genre: 'Electronic',
      submittedDate: '2025-11-20',
      status: 'pending',
      documents: {
        idDocument: 'luna_id.pdf',
        musicProof: 'luna_music.pdf',
        bankStatement: 'luna_bank.pdf',
      },
    },
    {
      id: 2,
      artistName: 'Stellar Vibes',
      email: 'stellar@example.com',
      genre: 'Hip-Hop',
      submittedDate: '2025-11-18',
      status: 'pending',
      documents: {
        idDocument: 'stellar_id.pdf',
        musicProof: 'stellar_music.pdf',
        bankStatement: 'stellar_bank.pdf',
      },
    },
    {
      id: 3,
      artistName: 'Cosmic Sound',
      email: 'cosmic@example.com',
      genre: 'Ambient',
      submittedDate: '2025-11-15',
      status: 'approved',
      documents: {
        idDocument: 'cosmic_id.pdf',
        musicProof: 'cosmic_music.pdf',
        bankStatement: 'cosmic_bank.pdf',
      },
    },
  ];

  const filteredRequests = requests.filter((req) => (filter === 'all' ? true : req.status === filter));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4" />
            Pending
          </div>
        );
      case 'approved':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            Approved
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-sm font-semibold">
            <XCircle className="w-4 h-4" />
            Rejected
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Artist Verification Management</h1>
        <p className="text-muted-foreground">Review and approve artist verification requests</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
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
        {/* Requests List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No verification requests found</p>
            </Card>
          ) : (
            filteredRequests.map((request) => (
              <Card
                key={request.id}
                className={`p-6 cursor-pointer transition-all border-2 ${
                  selectedRequest?.id === request.id
                    ? 'border-primary bg-primary/5'
                    : 'border-transparent hover:border-primary/20'
                }`}
                onClick={() => setSelectedRequest(request)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{request.artistName}</h3>
                    <p className="text-sm text-muted-foreground">{request.email}</p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Genre</p>
                    <p className="font-semibold">{request.genre}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Submitted</p>
                    <p className="font-semibold">{new Date(request.submittedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1">
          {selectedRequest ? (
            <Card className="p-6 sticky top-24 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">{selectedRequest.artistName}</h2>
                <p className="text-sm text-muted-foreground">{selectedRequest.email}</p>
              </div>

              {/* Documents */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground">Documents</p>
                {Object.entries(selectedRequest.documents).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                    <button className="p-1 hover:bg-background rounded transition-colors">
                      <Download className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Admin Notes */}
              {selectedRequest.status === 'pending' && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <label className="text-sm font-semibold">Admin Notes</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes for this verification request..."
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    rows={3}
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-600 text-white hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}

              {selectedRequest.status !== 'pending' && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    This request has already been {selectedRequest.status}.
                  </p>
                </div>
              )}
            </Card>
          ) : (
            <Card className="p-6 sticky top-24 text-center">
              <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">Select a request to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
