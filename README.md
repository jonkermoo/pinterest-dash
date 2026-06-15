# PinDash

A standalone, deployment-ready web application for obtaining Pinterest API credentials and monitoring pin performance. No backend required—everything runs in your browser!

## 🎯 Features

- **🔒 Secure OAuth 2.0**: Connect Pinterest accounts with CSRF protection
- **⚙️ Browser-Based Config**: Enter API credentials directly in the app (no .env files)
- **📊 Real-Time Analytics**: Track impressions, saves, clicks, and engagement
- **💾 Credential Export**: Download tokens as JSON for external use
- **🚀 Easy Deployment**: Deploy to any static hosting in minutes
- **🔐 Privacy First**: All credentials stored locally in browser
- **📱 Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### For Users

1. **Visit the deployed site** (or run locally)
2. **Go to Settings** and enter your Pinterest App ID and Secret
3. **Connect** your Pinterest account
4. **Monitor** your pins and export credentials

### For Developers

```bash
# Clone and install
git clone <repo-url>
cd pinterest-api-tool
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173`

## 📋 Getting Pinterest API Credentials

### Step 1: Create Pinterest App

1. Go to [Pinterest Developers](https://developers.pinterest.com/apps/)
2. Sign in and click "Create app"
3. Fill in app details:
   - **Name**: Your app name
   - **Description**: What your app does
   - **Website**: Your website URL

### Step 2: Configure OAuth

1. In your app settings, find OAuth section
2. Add redirect URI:
   - **Development**: `http://localhost:5173/callback`
   - **Production**: `https://yourdomain.com/callback`
3. Copy your **App ID** and **App Secret**

### Step 3: Configure the Tool

1. Open the app and go to **Settings**
2. Paste your App ID and Secret
3. Verify the redirect URI matches your deployment
4. Click **Save Settings**

### Step 4: Connect & Use

1. Go to **Connect** page
2. Click "Connect to Pinterest"
3. Authorize the app
4. View credentials and analytics!

## 🏗️ Project Structure

```
pinterest-api-tool/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Navigation header
│   │   │   └── Footer.tsx          # Site footer
│   │   └── pages/
│   │       ├── Home.tsx             # Landing page
│   │       ├── Settings.tsx         # API configuration
│   │       ├── PinterestSetup.tsx   # Setup guide
│   │       ├── PinterestAuth.tsx    # Authentication
│   │       ├── PinterestCallback.tsx # OAuth callback
│   │       ├── PinterestCredentials.tsx # Credentials display
│   │       └── PinterestDashboard.tsx # Analytics dashboard
│   ├── services/
│   │   └── pinterestApi.ts         # API service layer
│   ├── App.tsx                     # Main app with routes
│   └── main.tsx                    # Entry point
├── index.html
├── package.json
└── README.md
```

## 🌐 Deployment

### Deploy to Vercel

```bash
npm run build
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

```bash
npm run build
# Push dist folder to gh-pages branch
```

### Deploy to Any Static Host

```bash
npm run build
# Upload contents of dist/ folder
```

### Important: Update Redirect URI

After deployment, update your Pinterest app's redirect URI to match your production URL:
```
https://yourdomain.com/callback
```

Also update it in the app's Settings page.

## 🔒 Security & Privacy

### How It Works

- **No Backend**: Everything runs in your browser
- **Local Storage**: Credentials stored in browser's localStorage
- **Direct API Calls**: Your browser communicates directly with Pinterest
- **No Data Collection**: We don't collect or store any data

### Legal & Compliance

- **Privacy Policy**: Available at `/privacy` - explains data handling
- **Terms of Service**: Available at `/terms` - outlines usage terms
- **Pinterest Compliance**: Adheres to Pinterest's API Terms and Developer Guidelines
- **User Control**: Complete control over your data with easy deletion

### Best Practices

1. **Never share your App Secret** publicly
2. **Use HTTPS** in production
3. **Rotate tokens** regularly
4. **Monitor API usage** for suspicious activity
5. **Follow Pinterest's rate limits** (1000 req/hour/user)
6. **Review Privacy Policy** before using the tool
7. **Clear data** when using shared devices

## 📊 Available Features

### Settings Page
- Configure Pinterest App ID and Secret
- Set custom redirect URI
- Clear all settings and disconnect

### Authentication
- Secure OAuth 2.0 flow
- CSRF protection
- Token refresh capability

### Dashboard
- View all boards
- Browse pins with images
- Real-time analytics:
  - Impressions
  - Saves (Repins)
  - Pin clicks
  - Outbound clicks
- Time period filtering (7/30/90 days)

### Credentials
- View access token and refresh token
- Copy to clipboard
- Export as JSON
- Token expiration tracking

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation

## 📚 API Documentation

For detailed Pinterest API documentation:

- [Pinterest API v5](https://developers.pinterest.com/docs/api/v5/)
- [Developer Guidelines](https://policy.pinterest.com/en/developer-guidelines)
- [OAuth 2.0 Guide](https://developers.pinterest.com/docs/getting-started/authentication/)

## 🐛 Troubleshooting

### "API Not Configured"
- Go to Settings and enter your App ID and Secret
- Make sure they're correct from Pinterest Developer Console

### "No authorization code received"
- Verify redirect URI matches exactly in Pinterest app settings
- Check for typos in App ID
- Ensure no trailing slashes in redirect URI

### "Failed to exchange code for token"
- Verify App Secret is correct
- Check that your app is approved (for production)
- Ensure redirect URI is properly configured

### Analytics Not Available
- Analytics may take 24-48 hours to appear
- Some metrics require Pinterest Business account
- Ensure app has correct scopes (ads:read for analytics)

## 📄 License

MIT License - feel free to use for personal or commercial projects

## ⚠️ Disclaimer

This tool is for obtaining and managing Pinterest API credentials. Users are responsible for:

- Complying with Pinterest's Terms of Service
- Protecting their API credentials
- Following rate limits and usage guidelines
- Ensuring their use case is approved by Pinterest

## 🔗 Resources

- [Pinterest Developers](https://developers.pinterest.com/)
- [Pinterest API Status](https://status.pinterest.com/)
- [Pinterest Help Center](https://help.pinterest.com/)

## 💡 Why This Tool?

- ✅ **No Backend Required** - Pure frontend, easy to deploy
- ✅ **Privacy First** - Your data stays in your browser
- ✅ **Easy Setup** - Just enter credentials and go
- ✅ **Free to Use** - No subscription or API costs
- ✅ **Open Source** - Modify as needed
- ✅ **Production Ready** - Deploy anywhere instantly

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Vite
