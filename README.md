# 🎨 ProductStudio AI

> Transform product photos into professional e-commerce listings in seconds using AI-powered editing tools.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Made with Gemini API](https://img.shields.io/badge/Powered%20by-Gemini%20API-orange)](https://ai.google.dev/)

 | [**📖 Documentation**](https://docs.productstudio.ai) | [**💬 Support**](https://support.productstudio.ai)



---

## ✨ Features

### Core Features
- 🎯 **AI Background Removal** - Remove backgrounds with one click using Gemini API
- 🖼️ **Smart Background Library** - 30+ pre-designed e-commerce backgrounds
- 📦 **Batch Processing** - Edit up to 50 images simultaneously
- 🎨 **Auto-Enhance** - AI-powered automatic image optimization
- 🌟 **Shadow Generator** - Add realistic shadows (drop, reflection, natural)
- 📐 **Platform Resize** - One-click resize for Amazon, Etsy, Instagram, Shopify
- ⚡ **E-commerce Templates** - Amazon Ready, Etsy Professional, Instagram Shop presets

### User Experience
- 📤 **Drag & Drop Upload** - Upload up to 10 images at once
- 👁️ **Before/After Comparison** - Visual side-by-side preview
- 💾 **Bulk Download** - Download all processed images as ZIP
- 🎯 **Real-time Processing** - See results instantly
- 📱 **Mobile Responsive** - Works perfectly on all devices

---

## 🎯 Perfect For

- 🛒 **E-commerce Sellers** - Shopify, Amazon FBA, Etsy, eBay merchants
- 📱 **Social Media Marketers** - Instagram, Facebook, Pinterest creators
- 🎨 **Digital Marketers** - Product photographers and agencies
- 🚀 **Dropshippers** - Quick product photo editing at scale
- 🏢 **Small Businesses** - Professional photos without expensive software

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Google AI Studio API Key ([Get it here](https://ai.google.dev/))
- Stripe Account (for payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/productstudio-ai.git

# Navigate to project directory
cd productstudio-ai

# Install dependencies
npm install
# or
yarn install

# Create environment file
cp .env.example .env.local

# Add your API keys to .env.local
# GOOGLE_AI_API_KEY=your_gemini_api_key
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
# STRIPE_SECRET_KEY=your_stripe_secret

# Run development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google AI Studio (Gemini API)
GOOGLE_AI_API_KEY=your_gemini_api_key_here

# Stripe Payment Gateway
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_MAX_FREE_IMAGES=10
NEXT_PUBLIC_MAX_BATCH_FREE=3
NEXT_PUBLIC_MAX_BATCH_PREMIUM=20

# Firebase (Optional - for authentication)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Image Storage (Optional - Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📁 Project Structure

```
productstudio-ai/
├── app/
│   ├── page.js                 # Homepage
│   ├── editor/
│   │   └── page.js            # AI Editor
│   ├── pricing/
│   │   └── page.js            # Pricing page
│   ├── success/
│   │   └── page.js            # Payment success page
│   └── api/
│       ├── remove-background/  # Background removal endpoint
│       ├── create-checkout/    # Stripe checkout
│       └── verify-payment/     # Payment verification
├── components/
│   ├── ImageUploader.jsx
│   ├── BackgroundSelector.jsx
│   ├── BatchProcessor.jsx
│   ├── ShadowGenerator.jsx
│   └── UpgradeModal.jsx
├── lib/
│   ├── gemini.js              # Gemini API integration
│   ├── stripe.js              # Stripe configuration
│   └── utils.js               # Helper functions
├── public/
│   └── backgrounds/           # Pre-made background images
├── styles/
│   └── globals.css
├── .env.local                 # Environment variables (create this)
├── .env.example              # Environment template
├── package.json
└── README.md
```

---

## 💡 Usage

### Basic Workflow

1. **Upload Images**
   - Drag and drop or click to select (up to 10 images)
   
2. **Choose Action**
   - Remove Background
   - Change Background
   - Add Shadow
   - Auto-Enhance
   
3. **Apply Template (Optional)**
   - Select Amazon Ready, Etsy Professional, or Instagram Shop preset
   
4. **Download**
   - Download individual image or all as ZIP

### Batch Processing

```javascript
// Free users: Process up to 3 images
// Premium users: Process up to 20 images

const images = [img1, img2, img3, ...];
await processBatchImages(images, userTier);
```

---

## 🎨 API Usage

### Remove Background

```javascript
const response = await fetch('/api/remove-background', {
  method: 'POST',
  body: formData
});

const { processedImageUrl } = await response.json();
```

### Generate Background

```javascript
const response = await fetch('/api/generate-background', {
  method: 'POST',
  body: JSON.stringify({
    productImage: imageUrl,
    backgroundType: 'marble',
    shadowType: 'drop'
  })
});
```

---

## 💰 Pricing

### Free Tier
- ✓ 10 uploads at once
- ✓ 3 batch processing
- ✓ Basic background removal
- ✗ Watermark included

### Premium - $19.99/month
- ✓ 2,000 images/month
- ✓ 50 uploads at once
- ✓ 20 batch processing
- ✓ No watermarks
- ✓ All templates & backgrounds
- ✓ Shadow generator
- ✓ Auto-enhance
- ✓ Priority support
- ✓ 4000x4000px resolution

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **AI Engine**: Google Gemini API (gemini-1.5-flash)
- **Payment**: Stripe
- **Authentication**: Firebase Auth (optional)
- **Storage**: Cloudinary / Firebase Storage
- **Deployment**: Vercel
- **Analytics**: Google Analytics

---

## 🔐 Security

- ✅ API keys stored in environment variables
- ✅ Server-side API calls only
- ✅ HTTPS enforced in production
- ✅ Rate limiting on API endpoints
- ✅ File type and size validation
- ✅ Stripe webhook signature verification

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Settings → Environment Variables
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/raghavxi1/productstudio-ai)

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

---

## 📊 Performance

- ⚡ **Page Load**: < 2 seconds
- 🎯 **Image Processing**: 3-5 seconds per image
- 📦 **Batch Processing**: ~1 minute for 20 images
- 💾 **Image Optimization**: WebP format, <200KB
- 🌍 **CDN**: Global edge network via Vercel

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/OS information

[**Report a Bug →**](https://github.com/raghavxi1/productstudio-ai/issues)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/) - AI-powered image processing
- [Stripe](https://stripe.com/) - Payment processing
- [Vercel](https://vercel.com/) - Deployment platform
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

---

## 📧 Contact

- **Website**: [productstudio.ai](https://productstudio.ai)
- **Email**: support@productstudio.ai
- **Twitter**: [@productstudioai](https://twitter.com/productstudioai)
- **Discord**: [Join our community](https://discord.gg/productstudioai)

---

## 🗺️ Roadmap

- [x] AI Background Removal
- [x] Batch Processing
- [x] E-commerce Templates
- [x] Shadow Generator
- [ ] Mobile App (iOS/Android)
- [ ] API for Developers
- [ ] Plugin for Shopify
- [ ] Video Background Removal
- [ ] Team Collaboration Features
- [ ] White-label Solution

---


## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/raghavxi1/productstudio-ai?style=social)
![GitHub forks](https://img.shields.io/github/forks/raghavxi1/productstudio-ai?style=social)
![GitHub issues](https://img.shields.io/github/issues/raghavxi1/productstudio-ai)
![GitHub pull requests](https://img.shields.io/github/issues-pr/raghavxi1/productstudio-ai)

---

<div align="center">

**Made with ❤️ by [Raghav Siddharth](https://github.com/raghavxi1)**

[⬆ Back to Top](#-productstudio-ai)

</div>
