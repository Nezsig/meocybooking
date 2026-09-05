# MEOCY React + Tailwind Deployment Guide

## Setup

### 1. Environment Variables
Create `.env.local` with:
```
NEXT_PUBLIC_API_URL=https://meocy-production.up.railway.app
```

### 2. Verify Railway Backend
- Express server running at `https://meocy-production.up.railway.app`
- `/api/bookings` - POST endpoint for booking submissions
- `/api/booked-dates` - GET endpoint for unavailable dates
- Resend email integration configured with API key

### 3. Vercel Deployment

**Option A: CLI**
```bash
npm install -g vercel
vercel --prod
```

**Option B: GitHub Integration**
1. Push to GitHub: `git push origin main`
2. Connect repo to Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://meocy-production.up.railway.app`
4. Deploy

### 4. Domain Setup
- Point meocy.com DNS to Vercel
- SSL certificate auto-configured

## Testing

After deployment, verify:

✅ **Homepage loads** - All sections visible
✅ **Calendar loads** - Date picker shows current month
✅ **Red dates** - Booked dates from API displayed in red
✅ **Green dates** - Available dates clickable
✅ **Booking submission** - Form submits to API
✅ **Email confirmation** - Confirmation email sent to customer
✅ **Inquiry email** - Inquiry sent to meocystudio@gmail.com

## Troubleshooting

### Calendar shows wrong dates
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify Railway backend is running: `curl https://meocy-production.up.railway.app/health`

### Emails not arriving
- Verify Resend API configured on Railway
- Check email doesn't land in spam
- Verify domain DNS records added (SPF, DKIM, DMARC)

### Build fails
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`

## API Integration

The booking form communicates with Railway backend:

```javascript
// Fetch booked dates
GET /api/booked-dates
Response: { booked_dates: [...] }

// Submit booking
POST /api/bookings
Body: {
  name, email, phone, package, shootType, 
  location, preferredDate, preferredTime, specialRequests
}
Response: { success: true, data: {...}, message: "..." }
```

## File Structure

```
app/
  ├── page.tsx              # Home page with hero, packages, booking form
  ├── layout.tsx            # Root layout
  ├── components/
  │   ├── BookingFormAppleStyle.tsx  # Main form component
  │   └── Calendar.tsx               # Date picker component
  └── globals.css           # Tailwind styles

.env.local                   # API URL configuration
package.json                 # Dependencies
next.config.ts              # Next.js config
```
