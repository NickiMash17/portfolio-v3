# Step-by-Step: Create New Google Analytics 4 Property

## Step 1: Go to Google Analytics
1. Open your browser
2. Go to: **https://analytics.google.com/**
3. Sign in with your Google account

## Step 2: Access Admin Settings
1. Look at the **bottom left corner** of the page
2. Click the **⚙️ Admin** icon (gear/settings icon)
3. You'll see three columns: Account, Property, and View

## Step 3: Create New Property
1. In the **middle column** (Property), click the dropdown
2. Click **"Create Property"** button at the top
3. A setup wizard will appear

## Step 4: Property Setup
1. **Property name**: Enter `Nicolette Portfolio` (or any name you like)
2. **Reporting time zone**: Select `(GMT+02:00) South Africa Standard Time`
3. **Currency**: Select `South African Rand (ZAR)`
4. Click **"Next"** button

## Step 5: Business Information (Optional)
1. **Industry category**: Select `Technology` or `Software`
2. **Business size**: Select `Small` or `Medium`
3. **How you intend to use Google Analytics**: 
   - Check `Measure customer engagement with my site or app`
   - Check `Optimize the performance of my site or app`
4. Click **"Create"** button

## Step 6: Accept Terms
1. Read the Google Analytics Terms of Service
2. Check the boxes to accept:
   - ✅ Google Analytics Terms of Service
   - ✅ Measurement Controller-Controller Data Protection Terms (if shown)
3. Click **"I Accept"**

## Step 7: Set Up Data Stream
1. You'll see a page asking "How do you want to set up data collection?"
2. Click **"Web"** (the globe icon)
3. A form will appear

## Step 8: Configure Web Stream
1. **Website URL**: Enter `https://nicmash-porfolio.vercel.app`
   - Make sure to include `https://`
   - No trailing slash
2. **Stream name**: Enter `Portfolio Website` (or leave default)
3. **Enhanced measurement**: Leave it **ON** (recommended)
4. Click **"Create stream"** button

## Step 9: Get Your Measurement ID
1. After creating the stream, you'll see a page with stream details
2. At the **top of the page**, you'll see:
   ```
   Measurement ID
   G-XXXXXXXXXX
   ```
3. **This is your Measurement ID!** 
4. Click the **copy icon** 📋 next to it, or manually copy it
5. It should look like: `G-ABC123XYZ` (starts with G-)

## Step 10: Add to Your Project
1. Go back to your project folder
2. Open or create `.env` file in the root directory
3. Add this line:
   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   (Replace `G-XXXXXXXXXX` with the ID you just copied)

4. Save the file

## Step 11: Restart Your Dev Server
1. Stop your current dev server (press `Ctrl+C` in terminal)
2. Run `npm run dev` again
3. Analytics is now active! 🎉

## Step 12: Verify It's Working
1. Visit your portfolio: `http://localhost:8080`
2. Open browser Developer Tools (F12)
3. Go to **Network** tab
4. Look for requests to:
   - `google-analytics.com`
   - `googletagmanager.com`
5. If you see these requests, it's working!

## Alternative: Check in Google Analytics
1. Go back to Google Analytics
2. Click **Reports** in the left sidebar
3. Click **Realtime** (under Reports)
4. Visit your portfolio site
5. You should see yourself as an active user within 10-30 seconds!

---

## Quick Checklist
- [ ] Signed in to Google Analytics
- [ ] Created new property
- [ ] Set up Web data stream
- [ ] Copied Measurement ID (starts with G-)
- [ ] Added to `.env` file
- [ ] Restarted dev server
- [ ] Verified it's working

## Troubleshooting

**"I don't see the Admin button"**
- Make sure you're signed in
- Try refreshing the page
- Check if you have access to Google Analytics

**"I can't find the Measurement ID"**
- Make sure you completed the data stream setup
- Look at the top of the stream details page
- It should be clearly labeled "Measurement ID"

**"The ID doesn't start with G-"**
- Make sure you're using **GA4** (Google Analytics 4), not Universal Analytics
- GA4 IDs always start with `G-`
- If you see `UA-`, that's the old version - create a new GA4 property

**"Analytics still not working"**
- Check that `.env` file is in the project root (same folder as `package.json`)
- Make sure there are no spaces: `VITE_GA_MEASUREMENT_ID=G-ABC123` (not `G- ABC123`)
- Restart your dev server
- Check browser console for errors

---

## Need More Help?
- [Google Analytics Help](https://support.google.com/analytics/answer/9304153)
- Check the `GOOGLE_ANALYTICS_SETUP.md` file for more details
