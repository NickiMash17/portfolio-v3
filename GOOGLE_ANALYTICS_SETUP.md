# How to Get Your Google Analytics Measurement ID

## Step-by-Step Guide

### Option 1: Create a New Property for Your Portfolio (Recommended)

1. **Go to Google Analytics**
   - Visit: https://analytics.google.com/
   - Sign in with your Google account

2. **Create a New Property**
   - Click the **Admin** icon (gear) at the bottom left
   - In the **Property** column, click **Create Property**
   - Enter property name: `Nicolette Portfolio` (or any name you prefer)
   - Select your time zone: `(GMT+02:00) South Africa Standard Time`
   - Select currency: `South African Rand (ZAR)`
   - Click **Next**

3. **Set Up Data Stream**
   - Select **Web** as the platform
   - Enter website URL: `https://nicmash-porfolio.vercel.app`
   - Enter stream name: `Portfolio Website`
   - Click **Create stream**

4. **Get Your Measurement ID**
   - After creating the stream, you'll see a page with your **Measurement ID**
   - It looks like: `G-XXXXXXXXXX` (starts with "G-" followed by letters/numbers)
   - **Copy this ID** - you'll need it in the next step

### Option 2: Use an Existing Property

If you already have a Google Analytics property:

1. **Go to Google Analytics**
   - Visit: https://analytics.google.com/
   - Sign in with your Google account

2. **Select Your Property**
   - Use the dropdown at the top to select the property you want to use
   - Or create a new property following Option 1 above

3. **Find Your Measurement ID**
   - Click **Admin** (gear icon) at the bottom left
   - In the **Property** column, click **Data Streams**
   - Click on your web stream
   - Your **Measurement ID** is displayed at the top (format: `G-XXXXXXXXXX`)

## Add Measurement ID to Your Project

1. **Create or Edit `.env` file**
   - In your project root folder, create a file named `.env` (if it doesn't exist)
   - Or edit the existing `.env` file

2. **Add the Measurement ID**
   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual Measurement ID

3. **Example**
   ```env
   VITE_GA_MEASUREMENT_ID=G-ABC123XYZ
   ```

4. **Restart Your Dev Server**
   - Stop your current dev server (Ctrl+C)
   - Run `npm run dev` again
   - The analytics will now be active!

## Verify It's Working

1. **Check Browser Console**
   - Open your browser's Developer Tools (F12)
   - Go to the **Network** tab
   - Look for requests to `google-analytics.com` or `googletagmanager.com`
   - If you see these requests, analytics is working!

2. **Check Google Analytics**
   - Go to your Google Analytics dashboard
   - Click **Reports** → **Realtime**
   - Visit your portfolio site
   - You should see yourself as an active user within a few seconds

## Important Notes

- **Measurement ID Format**: Always starts with `G-` followed by alphanumeric characters
- **No Spaces**: Don't include spaces in the `.env` file
- **Restart Required**: After adding/changing the ID, restart your dev server
- **Production**: Make sure to add the same variable to your Vercel environment variables when deploying

## Troubleshooting

### "I don't see my Measurement ID"
- Make sure you're looking at a **GA4 property** (not Universal Analytics)
- Check that you've created a **Web** data stream
- The ID should be visible on the stream details page

### "Analytics not working"
- Check that `.env` file is in the project root (same folder as `package.json`)
- Verify the ID starts with `G-` and has no extra spaces
- Restart your dev server after adding the ID
- Check browser console for errors

### "I see another app/property"
- You can use an existing property if you want
- Or create a new property specifically for this portfolio
- Each property has its own Measurement ID

## Need Help?

- [Google Analytics Help Center](https://support.google.com/analytics)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
