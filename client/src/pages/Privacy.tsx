import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2024</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="space-y-8 text-muted-foreground">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p>
                  SoundWeave ("we" or "us" or "our") operates the SoundWeave website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Information Collection and Use</h2>
                <p>
                  We collect several different types of information for various purposes to provide and improve our service to you.
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Types of Data Collected:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Personal Data:</strong> Name, email address, phone number, profile picture</li>
                  <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time spent</li>
                  <li><strong>Payment Information:</strong> Credit card details (processed securely by payment providers)</li>
                  <li><strong>Artist Data:</strong> Music files, metadata, verification documents</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Data</h2>
                <p>
                  SoundWeave uses the collected data for various purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To allow you to participate in interactive features</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our service</li>
                  <li>To monitor the usage of our service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Security of Data</h2>
                <p>
                  The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Services</h2>
                <p>
                  Our service may contain links to third-party sites that are not operated by us. This Privacy Policy does not apply to third-party websites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party services before providing your personal information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Children's Privacy</h2>
                <p>
                  Our service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from children under 13. If we become aware that a child under 13 has provided us with personal information, we immediately delete such information from our servers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted rounded">
                  <p><strong>Email:</strong> privacy@soundweave.com</p>
                  <p><strong>Address:</strong> 123 Music Street, Cape Town, 8000, South Africa</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Data Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data in a portable format</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Data Retention</h2>
                <p>
                  We retain your personal data for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. You can request deletion of your account and associated data at any time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
