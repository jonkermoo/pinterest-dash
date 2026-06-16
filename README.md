# PinScheduler

A Pinterest-compliant content scheduling and publishing tool that helps creators maintain a consistent posting schedule. Schedule pins for future publishing, bulk upload from CSV, and track performance—all from your browser with no backend required!

## 🎯 Features

- **📅 Pin Scheduling**: Schedule pins for automatic publishing at specific dates and times
- **📤 Bulk Upload**: Import and schedule hundreds of pins at once via CSV
- **🎨 Pin Creation**: Create pins with images, titles, descriptions, and destination links
- **📊 Analytics Dashboard**: Track impressions, saves, clicks, and engagement metrics
- **🔒 Secure OAuth 2.0**: Connect Pinterest accounts with CSRF protection
- **💾 Local Storage**: All data stored securely in your browser
- **🚀 No Backend**: Pure frontend application, easy to deploy anywhere
- **📱 Responsive Design**: Works on desktop and mobile devices

## 🌟 Why PinScheduler?

PinScheduler demonstrates clear value to Pinterest's ecosystem by:

- **Helping creators publish more content consistently** - Automated scheduling removes the burden of manual posting
- **Improving content quality** - Time to plan and prepare pins in advance
- **Increasing Pinterest engagement** - Consistent posting schedule drives more traffic
- **Supporting content creators** - Free tool that helps grow Pinterest presence
- **Following Pinterest guidelines** - Built with API v5 and compliant with developer policies

## 🚀 Quick Start

### For Users

1. **Visit the deployed site** (or run locally)
2. **Go to Settings** and enter your Pinterest App ID and Secret
3. **Connect** your Pinterest account via OAuth
4. **Schedule pins** individually or via bulk CSV upload
5. **Monitor** scheduled and published pins in the dashboard

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
   - **Name**: PinScheduler (or your preferred name)
   - **Description**: "A scheduling tool that helps creators publish pins consistently to grow their Pinterest presence"
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

### Step 4: Connect & Schedule

1. Go to **Connect** page (or click "Schedule" in nav)
2. Authorize the app with Pinterest
3. Start scheduling pins!

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
│   │       ├── SchedulePins.tsx     # Schedule new pins
│   │       ├── ScheduledPins.tsx    # View/manage scheduled pins
│   │       ├── BulkUpload.tsx       # CSV bulk upload
│   │       ├── PinterestDashboard.tsx # Analytics dashboard
│   │       └── PinterestCredentials.tsx # Credentials display
│   ├── services/
│   │   ├── pinterestApi.ts         # Pinterest API service
│   │   └── schedulerService.ts     # Scheduling logic
│   ├── App.tsx                     # Main app with routes
│   └── main.tsx                    # Entry point
├── index.html
├── package.json
└── README.md
```

## 📅 Scheduling Features

### Individual Pin Scheduling

- Create pins with images (upload or URL)
- Add titles, descriptions, and destination links
- Select target board
- Choose publish date and time
- Instant publish option available

### Bulk CSV Upload

Upload multiple pins at once with CSV format:

```csv
board_id,title,description,link,image_url,scheduled_time
123456789,Pin Title,Pin description,https://example.com,https://example.com/image.jpg,2026-12-31T12:00:00
```

**Required columns:**
- `board_id` - Pinterest board ID
- `title` - Pin title (max 100 characters)
- `scheduled_time` - ISO 8601 format (YYYY-MM-DDTHH:MM:SS)

**Optional columns:**
- `description` - Pin description (max 500 characters)
- `link` - Destination URL
- `image_url` - Direct image URL

### Automatic Publishing

- Scheduler checks every minute for due pins
- Automatically publishes pins at scheduled times
- Handles errors gracefully with retry options
- Updates pin status in real-time

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

### Deploy to Any Static Host

```bash
npm run build
# Upload contents of dist/ folder
```

### Important: Update Redirect URI

After deployment, update your Pinterest app's redirect URI:
```
https://yourdomain.com/callback
```

Also update it in the app's Settings page.

## 🔒 Security & Privacy

### How It Works

- **No Backend**: Everything runs in your browser
- **Local Storage**: Credentials and scheduled pins stored in browser's localStorage
- **Direct API Calls**: Your browser communicates directly with Pinterest API
- **No Data Collection**: We don't collect, store, or transmit any user data
- **Secure OAuth**: Industry-standard OAuth 2.0 with CSRF protection

### Pinterest API Compliance

This tool is built following Pinterest's Developer Guidelines:

- ✅ Uses official Pinterest API v5
- ✅ Implements proper OAuth 2.0 authentication
- ✅ Respects rate limits (1000 requests/hour/user)
- ✅ Adds value to Pinterest ecosystem by helping creators publish consistently
- ✅ Includes Privacy Policy and Terms of Service
- ✅ Transparent about data usage (all local, no external storage)
- ✅ Follows content publishing best practices

### Best Practices

1. **Never share your App Secret** publicly
2. **Use HTTPS** in production
3. **Rotate tokens** regularly
4. **Monitor API usage** for suspicious activity
5. **Follow Pinterest's rate limits**
6. **Review Privacy Policy** before using
7. **Clear data** when using shared devices
8. **Schedule responsibly** - don't spam Pinterest

## 📊 Available Features

### Schedule Pins Page
- Upload images or provide URLs
- Add titles and descriptions
- Set destination links
- Choose boards
- Schedule for future or publish immediately

### Scheduled Pins Page
- View all scheduled pins
- Filter by status (pending, published, failed)
- Edit scheduled pins
- Delete scheduled pins
- Retry failed pins
- Real-time status updates

### Bulk Upload Page
- Download CSV template
- Upload CSV files
- Paste CSV content
- Batch schedule hundreds of pins
- Error reporting and validation

### Analytics Dashboard
- View all boards and pins
- Track impressions, saves, clicks
- Monitor engagement metrics
- Time period filtering (7/30/90 days)
- Board-level analytics

### Settings Page
- Configure Pinterest App ID and Secret
- Set custom redirect URI
- Clear all settings and disconnect
- View connection status

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
- **Pinterest API v5** - Pin creation and analytics

## 📚 API Documentation

For detailed Pinterest API documentation:

- [Pinterest API v5](https://developers.pinterest.com/docs/api/v5/)
- [Developer Guidelines](https://policy.pinterest.com/en/developer-guidelines)
- [OAuth 2.0 Guide](https://developers.pinterest.com/docs/getting-started/authentication/)
- [Pin Creation](https://developers.pinterest.com/docs/api/v5/#operation/pins/create)

## 🐛 Troubleshooting

### "API Not Configured"
- Go to Settings and enter your App ID and Secret
- Verify credentials are correct from Pinterest Developer Console

### "No authorization code received"
- Verify redirect URI matches exactly in Pinterest app settings
- Check for typos in App ID
- Ensure no trailing slashes in redirect URI

### "Failed to create pin"
- Verify you have pins:write scope enabled
- Check image URL is publicly accessible
- Ensure board_id is correct
- Verify image meets Pinterest requirements (max 32MB)

### Pins Not Publishing
- Check browser console for errors
- Verify access token is still valid
- Ensure scheduled time is in the future
- Check Pinterest API status

### Analytics Not Available
- Analytics may take 24-48 hours to appear
- Some metrics require Pinterest Business account
- Ensure app has correct scopes

## 📄 License

MIT License - feel free to use for personal or commercial projects

## ⚠️ Disclaimer

This tool helps creators schedule and publish content to Pinterest. Users are responsible for:

- Complying with Pinterest's Terms of Service and Community Guidelines
- Protecting their API credentials
- Following rate limits and usage guidelines
- Ensuring their content meets Pinterest's quality standards
- Not using the tool for spam or prohibited content
- Obtaining necessary rights for images and content they publish

## 🔗 Resources

- [Pinterest Developers](https://developers.pinterest.com/)
- [Pinterest API Status](https://status.pinterest.com/)
- [Pinterest Help Center](https://help.pinterest.com/)
- [Pinterest Business](https://business.pinterest.com/)

## 💡 Why This Tool Adds Value to Pinterest

PinScheduler helps Pinterest's ecosystem by:

1. **Enabling Consistent Content** - Creators can maintain regular posting schedules, leading to more content on Pinterest
2. **Improving Content Quality** - Time to plan and prepare pins in advance results in better content
3. **Supporting Small Creators** - Free tool helps creators without budget for expensive scheduling tools
4. **Driving Engagement** - Consistent posting increases overall Pinterest engagement
5. **Following Best Practices** - Encourages proper pin formatting, descriptions, and linking
6. **Respecting Platform** - Built with official API, follows guidelines, respects rate limits

---

Built with ❤️ for Pinterest creators using React, TypeScript, Tailwind CSS, and Vite
