# EmailJS Setup Instructions for Gmail

This contact form uses EmailJS to send emails directly to your Gmail inbox without requiring a backend server.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier allows 200 emails/month)

## Step 2: Create a Gmail Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail** as your email provider
4. Click **Connect Account**
5. You'll be prompted to sign in with your Gmail account (use your company Gmail)
6. Grant EmailJS permission to send emails on your behalf
7. **Copy your Service ID** (you'll see it after setup, e.g., `service_abc123`)

## Step 3: Create an Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Configure the template:

   **Template Name:** Contact Form
   
   **To Email:** Your company Gmail address (e.g., contact@yourcompany.com)
   
   **From Name:** {{from_name}}
   
   **From Email:** {{from_email}}
   
   **Reply To:** {{from_email}}
   
   **Subject:** New Contact Form Message: {{subject}}
   
   **Content (HTML or Plain Text):**
   ```
   New message from your website contact form:
   
   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```

4. Click **Save**
5. **Copy your Template ID** (you'll see it, e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in EmailJS dashboard
2. **Copy your Public Key**

## Step 5: Update the JavaScript

Open `assets/js/script.js` and replace these placeholders:

1. **Line ~65:** Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
   - Found in: EmailJS Dashboard → Account → General → Public Key
   
2. **Line ~85:** Replace `YOUR_SERVICE_ID` with your Gmail Service ID
   - Found in: EmailJS Dashboard → Email Services → Your Gmail Service → Service ID
   
3. **Line ~85:** Replace `YOUR_TEMPLATE_ID` with your Template ID
   - Found in: EmailJS Dashboard → Email Templates → Your Template → Template ID

## Example:

```javascript
// Line ~65
emailjs.init('abc123xyz456'); // Your Public Key

// Line ~85
emailjs.send('service_gmail123', 'template_contact456', formData)
```

## Important Notes for Gmail:

- **Gmail Account:** Use your company Gmail account when connecting
- **App Password (if needed):** If 2FA is enabled, you may need to create an App Password
- **Quota:** Free tier allows 200 emails/month
- **Testing:** Test with your own email first to make sure it works

## Testing

1. Fill out the contact form on your website
2. Click "Send Message"
3. Check your email inbox - you should receive the message!

## Alternative: Use Formspree

If you prefer, you can also use Formspree:

1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up and create a form
3. Get your form endpoint URL
4. Update the form action in `index.html`:

```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

