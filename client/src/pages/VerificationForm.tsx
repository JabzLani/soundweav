import { useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle, AlertCircle, Upload, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import FileUpload from '@/components/FileUpload';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VerificationForm() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    artistName: '',
    legalName: '',
    email: '',
    bio: '',
    genres: '',
  });
  const [documents, setDocuments] = useState<{
    idDocument: File | null;
    musicProof: File | null;
  }>({
    idDocument: null,
    musicProof: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (docType: 'idDocument' | 'musicProof', file: File) => {
    setDocuments((prev) => ({
      ...prev,
      [docType]: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!documents.idDocument || !documents.musicProof) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - in production, this would upload to backend
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus('success');
      setTimeout(() => {
        setLocation('/profile');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b bg-card">
          <div className="container py-8">
            <button
              onClick={() => setLocation('/profile')}
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Profile
            </button>
            <h1 className="text-4xl font-bold mb-2">Artist Verification</h1>
            <p className="text-muted-foreground">
              Get verified to unlock exclusive features and build trust with your audience
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {submitStatus === 'success' ? (
                <Card className="p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Verification Submitted!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for submitting your verification. Our team will review your documents
                    and get back to you within 3-5 business days.
                  </p>
                  <Button
                    onClick={() => setLocation('/profile')}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Return to Profile
                  </Button>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Artist Name / Stage Name
                        </label>
                        <Input
                          type="text"
                          name="artistName"
                          value={formData.artistName}
                          onChange={handleInputChange}
                          placeholder="Your artist name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Legal Name
                        </label>
                        <Input
                          type="text"
                          name="legalName"
                          value={formData.legalName}
                          onChange={handleInputChange}
                          placeholder="Your full legal name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Artist Profile */}
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Artist Profile</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us about yourself and your music..."
                          className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                          rows={4}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Primary Genres
                        </label>
                        <Input
                          type="text"
                          name="genres"
                          value={formData.genres}
                          onChange={handleInputChange}
                          placeholder="e.g., Electronic, Hip-Hop, Ambient"
                          required
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Document Upload */}
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Document Verification</h2>
                    <p className="text-muted-foreground mb-6">
                      Upload documents to verify your identity and music ownership. All documents
                      are kept confidential and used only for verification purposes.
                    </p>

                    <div className="space-y-6">
                      {/* ID Document */}
                      <div>
                        <FileUpload
                          label="Government-Issued ID"
                          description="Upload a photo of your government-issued ID (passport, driver's license, etc.)"
                          accept=".pdf,.jpg,.jpeg,.png"
                          maxSize={10}
                          onFileSelect={(file) => handleFileSelect('idDocument', file)}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          We accept: Passport, Driver's License, National ID, or similar documents
                        </p>
                      </div>

                      {/* Music Proof */}
                      <div>
                        <FileUpload
                          label="Music Ownership Proof"
                          description="Upload proof of music ownership (production credits, release documentation, etc.)"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          maxSize={10}
                          onFileSelect={(file) => handleFileSelect('musicProof', file)}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Examples: Spotify artist profile screenshot, release documentation, production credits
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-red-900">Submission Error</p>
                        <p className="text-sm text-red-700">
                          Please ensure all fields are filled and documents are uploaded.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Verification'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLocation('/profile')}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar - Benefits */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Verification Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Verified badge on your profile</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Higher visibility in search results</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to artist analytics</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Priority support from our team</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Eligibility for featured placements</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Enhanced collaboration opportunities</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Privacy Note:</strong> Your documents are encrypted and stored securely.
                    We never share your personal information with third parties.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
