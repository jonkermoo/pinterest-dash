export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to PinDash ("we," "our," or "us"). We are committed to protecting your privacy and ensuring transparency about how we handle your data. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you use our service.
            </p>
            <p>
              <strong>Important:</strong> This tool operates entirely in your browser. We do not collect, store, or transmit any of your personal data or Pinterest credentials to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Do NOT Collect</h2>
            <p className="mb-4">We want to be clear about what we don't do:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>We do NOT collect your Pinterest App ID or App Secret</li>
              <li>We do NOT store your Pinterest access tokens or refresh tokens</li>
              <li>We do NOT track your Pinterest account information</li>
              <li>We do NOT collect your pin data or analytics</li>
              <li>We do NOT use cookies for tracking purposes</li>
              <li>We do NOT share any data with third parties</li>
              <li>We do NOT have access to your Pinterest account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How Your Data is Stored</h2>
            <p className="mb-4">
              All data you enter into this tool is stored locally in your browser using localStorage. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Pinterest App ID and App Secret (entered in Settings)</li>
              <li>OAuth access tokens and refresh tokens (received from Pinterest)</li>
              <li>Pinterest account information (username, profile data)</li>
            </ul>
            <p className="mb-4">
              <strong>This data never leaves your browser.</strong> It is stored locally on your device and is only used to communicate directly with Pinterest's API from your browser.
            </p>
            <p>
              You can clear all stored data at any time by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Using the "Clear All" button in Settings</li>
              <li>Clearing your browser's localStorage</li>
              <li>Using your browser's "Clear browsing data" feature</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How the Tool Works</h2>
            <p className="mb-4">
              This is a client-side application that runs entirely in your browser:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>You enter your Pinterest API credentials in the Settings page</li>
              <li>These credentials are stored in your browser's localStorage</li>
              <li>When you connect to Pinterest, your browser communicates directly with Pinterest's servers</li>
              <li>Pinterest returns access tokens to your browser</li>
              <li>Your browser uses these tokens to fetch analytics data directly from Pinterest</li>
              <li>All data stays in your browser - nothing is sent to our servers</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pinterest API Usage</h2>
            <p className="mb-4">
              When you use this tool to connect to Pinterest:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You are subject to Pinterest's Privacy Policy and Terms of Service</li>
              <li>Pinterest may collect data about your API usage according to their policies</li>
              <li>We recommend reviewing <a href="https://policy.pinterest.com/en/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Pinterest's Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Security</h2>
            <p className="mb-4">
              We take security seriously:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All communications with Pinterest use HTTPS encryption</li>
              <li>Your credentials are stored locally and never transmitted to our servers</li>
              <li>We use OAuth 2.0 with CSRF protection for secure authentication</li>
              <li>We recommend using this tool only on trusted devices</li>
              <li>Always log out and clear data when using shared computers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Services</h2>
            <p className="mb-4">
              This tool interacts with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Pinterest API:</strong> For authentication and data retrieval (subject to Pinterest's policies)</li>
              <li><strong>Hosting Provider:</strong> The website files are hosted on a static hosting service, but no user data is stored on their servers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Rights</h2>
            <p className="mb-4">
              Since we don't collect or store your data, you have complete control:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You can delete all data at any time using the Settings page</li>
              <li>You can revoke Pinterest access through your Pinterest account settings</li>
              <li>You can stop using the tool at any time</li>
              <li>Your data is never shared because we never have access to it</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p>
              This service is not intended for users under the age of 13. We do not knowingly collect information from children under 13. If you are under 13, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify users of any material changes by updating the "Last Updated" date at the top of this policy.
            </p>
            <p>
              Continued use of the service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. International Users</h2>
            <p>
              This tool can be used from anywhere in the world. Since all data is stored locally in your browser, data protection laws of your country apply to how you manage your own data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy, please:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Review our documentation and FAQ</li>
              <li>Check Pinterest's support resources for API-related questions</li>
              <li>Open an issue on our GitHub repository (if applicable)</li>
            </ul>
          </section>

          <section className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-semibold text-blue-900 mb-2">Summary</h3>
            <p className="text-blue-800">
              <strong>Your privacy is paramount.</strong> This tool is designed to give you complete control over your data. Everything happens in your browser, and we never see, collect, or store any of your information. You are in full control.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
