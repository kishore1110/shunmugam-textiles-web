# Deploying Shunmugam Textiles Web to Render

This guide will walk you through deploying your React + Vite application to Render.

## Prerequisites

1. A GitHub, GitLab, or Bitbucket account
2. Your code pushed to a Git repository
3. A Render account (sign up at [render.com](https://render.com))

## Step 1: Push Your Code to Git Repository

### If you haven't already:

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub repository**:
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it `shunmugam-web` (or your preferred name)
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/shunmugam-web.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub/GitLab/Bitbucket account (recommended for easy integration)

## Step 3: Create a New Web Service

1. In your Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your Git repository:
   - If using GitHub/GitLab/Bitbucket, click "Connect account" and authorize
   - Select your repository: `shunmugam-web`
   - Click "Connect"

## Step 4: Configure Build Settings

Fill in the following settings:

### Basic Settings:
- **Name**: `shunmugam-web` (or your preferred name)
- **Region**: Choose closest to your users (e.g., `Oregon (US West)`)
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave empty (or `./` if your project is in root)

### Build & Deploy Settings:

- **Environment**: `Node`
- **Build Command**: 
  ```bash
  npm install && npm run build
  ```
- **Start Command**: 
  ```bash
  npm run preview
  ```

**OR** (Alternative - using a static site):

Since Vite builds a static site, you can also use:
- **Environment**: `Static Site`
- **Build Command**: 
  ```bash
  npm install && npm run build
  ```
- **Publish Directory**: `dist`

> **Note**: For React Router to work properly, we recommend using the **Static Site** option with a custom redirect rule (see Step 6).

## Step 5: Set Environment Variables

Click on **"Environment"** tab and add these variables:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Where to find these values:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon ⚙️ → **Project Settings**
4. Scroll down to **"Your apps"** section
5. Click on your web app
6. Copy the values from the `firebaseConfig` object

## Step 6: Configure Redirects for React Router (IMPORTANT)

Since React Router uses client-side routing, you need to handle all routes properly. This prevents 404 errors when users refresh the page or access URLs directly.

### For Static Site (Recommended):

1. In Render dashboard, go to your service
2. Click on **"Settings"** tab
3. Scroll down to **"Redirect and Rewrite Rules"** section
4. Click **"Add Rule"** button
5. Fill in the form:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: Select **"Rewrite"** from the dropdown
6. Click **"Save Changes"**

This ensures all routes are handled by React Router and prevents 404 errors.

> **Note**: If you're using a **Static Site**, Render may automatically handle this. But it's good to verify the rule exists.

### For Web Service:

Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: shunmugam-web
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm run preview
    envVars:
      - key: VITE_FIREBASE_API_KEY
        sync: false
      - key: VITE_FIREBASE_AUTH_DOMAIN
        sync: false
      - key: VITE_FIREBASE_PROJECT_ID
        sync: false
      - key: VITE_FIREBASE_STORAGE_BUCKET
        sync: false
      - key: VITE_FIREBASE_MESSAGING_SENDER_ID
        sync: false
      - key: VITE_FIREBASE_APP_ID
        sync: false
```

## Step 7: Deploy

1. Click **"Create Web Service"**
2. Render will:
   - Clone your repository
   - Install dependencies
   - Build your application
   - Deploy it

3. Wait for the build to complete (usually 2-5 minutes)

## Step 8: Update Firebase Authorized Domains

After deployment, you'll get a URL like: `https://shunmugam-web.onrender.com`

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **"Add domain"**
5. Add your Render domain: `shunmugam-web.onrender.com`
6. Click **"Add"**

## Step 9: Test Your Deployment

1. Visit your Render URL
2. Test all pages:
   - Home page
   - Products page
   - About page
   - Contact page
   - Admin login (`/login`)
   - Admin dashboard (after login)

## Step 10: Custom Domain (Optional)

1. In Render dashboard, go to your service
2. Click **"Settings"** → **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter your domain (e.g., `www.shunmugamtextiles.com`)
5. Follow the DNS configuration instructions
6. Update Firebase authorized domains with your custom domain

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Check that all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: "Environment variables not found"**
- Make sure all `VITE_*` variables are set in Render dashboard
- Restart the service after adding variables

### Routing Issues (404 on refresh)

**Problem**: Getting 404 when refreshing pages or accessing direct URLs

**Solution**: 
- Make sure redirect rule is set: `/*` → `/index.html`
- For Static Site, this is automatic
- For Web Service, add the redirect in Settings

### Firebase Errors

**Error: "Firebase not initialized"**
- Check environment variables are set correctly
- Verify variable names start with `VITE_`
- Restart the service after updating variables

**Error: "Permission denied"**
- Check Firestore security rules
- Verify authorized domains in Firebase Console

### Build Takes Too Long

- Render free tier has build time limits
- Consider upgrading to paid plan for faster builds
- Optimize your build by removing unused dependencies

## Render Configuration Summary

### Recommended Settings:

**Service Type**: Static Site (for better performance)

**Build Command**:
```bash
npm install && npm run build
```

**Publish Directory**: `dist`

**Environment Variables**:
- All `VITE_FIREBASE_*` variables from your Firebase config

**Redirects**:
- `/*` → `/index.html` (handled automatically for Static Sites)

## Additional Tips

1. **Auto-Deploy**: Render automatically deploys when you push to your main branch
2. **Manual Deploy**: You can trigger manual deploys from the dashboard
3. **Build Logs**: Check build logs in Render dashboard if deployment fails
4. **Environment**: Use different environments for staging and production
5. **Monitoring**: Set up health checks in Render dashboard

## Cost

- **Free Tier**: 
  - 750 hours/month
  - Services spin down after 15 minutes of inactivity
  - First spin-up takes ~30 seconds
  
- **Paid Plans**: 
  - Always-on services
  - Faster builds
  - More resources

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- Firebase Documentation: https://firebase.google.com/docs

---

**Your app should now be live!** 🎉

Visit your Render URL to see your deployed application.

