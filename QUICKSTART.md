# Quick Start Guide

Get your Pinterest API credentials and start monitoring pins in 5 minutes!

## 🚀 For Users (Deployed Site)

### Step 1: Get Pinterest Credentials

1. Visit [Pinterest Developers](https://developers.pinterest.com/apps/)
2. Create a new app
3. Copy your **App ID** and **App Secret**
4. Add redirect URI: `https://yourdomain.com/callback`

### Step 2: Configure the App

1. Open the deployed site
2. Go to **Settings** page
3. Enter your App ID and Secret
4. Verify redirect URI matches your site
5. Click **Save Settings**

### Step 3: Connect Pinterest

1. Go to **Connect** page
2. Click "Connect to Pinterest"
3. Authorize the app on Pinterest
4. Done! View your credentials and analytics

## 💻 For Developers (Local Setup)

### Step 1: Install

```bash
git clone <repo-url>
cd pinterest-api-tool
npm install
```

### Step 2: Start Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Step 3: Configure

1. Get Pinterest credentials (see above)
2. In the app, go to **Settings**
3. Enter App ID and Secret
4. Use redirect URI: `http://localhost:5173/callback`
5. Save settings

### Step 4: Connect & Use

1. Click "Connect to Pinterest"
2. Authorize the app
3. View credentials at `/credentials`
4. Monitor pins at `/dashboard`

## 📦 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel --prod
```

### Deploy to Netlify

```bash
netlify deploy --prod --dir=dist
```

### Deploy to Any Static Host

Upload the `dist/` folder contents to your hosting provider.

### ⚠️ After Deployment

1. Update Pinterest app's redirect URI to your production URL
2. Update redirect URI in the app's Settings page
3. Test the OAuth flow

## 🗺️ Available Routes

- `/` - Home page with overview
- `/setup` - Detailed setup guide
- `/settings` - Configure API credentials
- `/auth` - Connect Pinterest account
- `/callback` - OAuth callback (automatic)
- `/credentials` - View and export tokens
- `/dashboard` - Pin analytics

## 💡 Key Features

- ✅ No backend required
- ✅ No .env files needed
- ✅ Configure in browser
- ✅ Deploy anywhere
- ✅ Privacy-first design

## 🆘 Need Help?

- **Configuration issues?** Check the [Setup Guide](/setup)
- **OAuth errors?** Verify redirect URI matches exactly
- **No analytics?** May take 24-48 hours to appear

See the full [README.md](README.md) for detailed documentation.