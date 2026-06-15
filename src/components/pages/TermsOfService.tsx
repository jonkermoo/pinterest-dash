export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using PinDash ("the Service"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and PinDash regarding your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="mb-4">
              PinDash is a free, open-source, client-side web application that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Helps you connect to Pinterest's Developer API</li>
              <li>Allows you to view your Pinterest analytics and data</li>
              <li>Provides tools to manage your Pinterest API credentials</li>
              <li>Operates entirely in your browser without server-side data storage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Pinterest API Compliance</h2>
            <p className="mb-4">
              <strong>Important:</strong> By using this Service, you agree to comply with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li><a href="https://policy.pinterest.com/en/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Pinterest's Terms of Service</a></li>
              <li><a href="https://policy.pinterest.com/en/developer-guidelines" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Pinterest's Developer Guidelines</a></li>
              <li><a href="https://policy.pinterest.com/en/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Pinterest's Privacy Policy</a></li>
              <li><a href="https://developers.pinterest.com/docs/api/v5/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Pinterest API Documentation</a></li>
            </ul>
            <p className="mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Creating and managing your own Pinterest Developer account</li>
              <li>Obtaining your own Pinterest API credentials</li>
              <li>Ensuring your use of Pinterest's API complies with their policies</li>
              <li>Maintaining the security of your API credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate information when using the Service</li>
              <li>Keep your Pinterest API credentials secure and confidential</li>
              <li>Not share your credentials with unauthorized parties</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Not attempt to reverse engineer, decompile, or hack the Service</li>
              <li>Not use the Service to violate Pinterest's policies or terms</li>
              <li>Not use the Service to spam, harass, or harm others</li>
              <li>Not attempt to access data you're not authorized to access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data and Privacy</h2>
            <p className="mb-4">
              <strong>Client-Side Operation:</strong> This Service operates entirely in your browser. We do not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Collect or store your Pinterest credentials</li>
              <li>Access your Pinterest account data</li>
              <li>Transmit your data to our servers</li>
              <li>Share your information with third parties</li>
            </ul>
            <p className="mb-4">
              All data is stored locally in your browser using localStorage. You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Securing your device and browser</li>
              <li>Managing your stored credentials</li>
              <li>Clearing data when using shared devices</li>
            </ul>
            <p>
              For more details, see our <a href="/privacy" className="text-red-600 hover:underline">Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              <strong>Pinterest Trademarks:</strong> Pinterest, the Pinterest logo, and related marks are trademarks of Pinterest, Inc. We use these marks in accordance with Pinterest's Brand Guidelines. We are not affiliated with, endorsed by, or sponsored by Pinterest.
            </p>
            <p className="mb-4">
              <strong>Service Code:</strong> The source code of this Service may be open-source and subject to its own license terms. Check the repository for specific licensing information.
            </p>
            <p>
              <strong>Your Content:</strong> You retain all rights to your Pinterest content and data. This Service does not claim any ownership of your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimers and Limitations</h2>
            <p className="mb-4">
              <strong>AS-IS Service:</strong> The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy or reliability</li>
              <li>Uninterrupted or error-free operation</li>
            </ul>
            <p className="mb-4">
              <strong>No Guarantee:</strong> We do not guarantee that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The Service will meet your requirements</li>
              <li>The Service will be available at all times</li>
              <li>Pinterest's API will remain accessible or unchanged</li>
              <li>Your data will be secure or not lost</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law, we shall not be liable for any:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or use</li>
              <li>Damage to your device or data</li>
              <li>Issues arising from Pinterest API changes or downtime</li>
              <li>Unauthorized access to your credentials</li>
              <li>Errors or omissions in the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless PinDash, its developers, and contributors from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of Pinterest's terms or policies</li>
              <li>Your violation of any third-party rights</li>
              <li>Your misuse of Pinterest's API</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Service Availability</h2>
            <p className="mb-4">
              We reserve the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or discontinue the Service at any time</li>
              <li>Change these Terms with or without notice</li>
              <li>Refuse service to anyone for any reason</li>
              <li>Remove or modify features</li>
            </ul>
            <p className="mt-4">
              We are not liable for any modification, suspension, or discontinuation of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Third-Party Services</h2>
            <p className="mb-4">
              This Service integrates with Pinterest's API, which is a third-party service. You acknowledge that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Pinterest may change, limit, or discontinue their API at any time</li>
              <li>Pinterest's terms and policies apply to your use of their API</li>
              <li>We are not responsible for Pinterest's actions or policies</li>
              <li>Issues with Pinterest's API are outside our control</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Security</h2>
            <p className="mb-4">
              While we implement security best practices, you acknowledge that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>No internet transmission is completely secure</li>
              <li>You use the Service at your own risk</li>
              <li>You are responsible for securing your device and browser</li>
              <li>You should not use the Service on untrusted devices</li>
              <li>You should clear data when using shared computers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Age Restrictions</h2>
            <p>
              You must be at least 13 years old to use this Service. If you are under 18, you must have parental consent. By using the Service, you represent that you meet these age requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Termination</h2>
            <p className="mb-4">
              You may stop using the Service at any time by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Clearing your browser's localStorage</li>
              <li>Revoking Pinterest API access in your Pinterest account</li>
              <li>Simply not accessing the Service</li>
            </ul>
            <p>
              We may terminate or suspend access to the Service immediately, without notice, for any reason, including breach of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes shall be resolved in accordance with the laws of the jurisdiction where the Service is operated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. The "Last Updated" date at the top indicates when changes were made.
            </p>
            <p>
              Your continued use of the Service after changes constitutes acceptance of the modified Terms. If you do not agree to the changes, stop using the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and PinDash regarding the Service and supersede all prior agreements and understandings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Contact</h2>
            <p className="mb-4">
              For questions about these Terms:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Review our documentation and FAQ</li>
              <li>Check our GitHub repository for issues and discussions</li>
              <li>For Pinterest API questions, contact Pinterest support</li>
            </ul>
          </section>

          <section className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <h3 className="font-semibold text-yellow-900 mb-2">Important Reminders</h3>
            <ul className="text-yellow-800 space-y-2">
              <li>✓ You must comply with Pinterest's Terms of Service and Developer Guidelines</li>
              <li>✓ You are responsible for securing your API credentials</li>
              <li>✓ This Service is provided as-is without warranties</li>
              <li>✓ We are not affiliated with Pinterest, Inc.</li>
              <li>✓ All data is stored locally in your browser</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
