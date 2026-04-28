# Interiors Co. - Furniture Website

A modern, responsive furniture and interior design website built with Next.js, React, and Tailwind CSS.

## Features

- **Home Page**: Eye-catching hero section with featured products and call-to-action
- **Products Page**: Full furniture catalog with category filtering
  - Seating
  - Tables
  - Lighting
  - Decor
- **Portfolio**: Showcase of completed interior design projects with testimonials
- **Contact Page**: Professional contact form with business information
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional interface with smooth animations

## Tech Stack

- **Framework**: Next.js 16.2.4 (with App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Components**: Custom reusable UI components
- **Utilities**: 
  - class-variance-authority (CVA) for component variants
  - clsx & tailwind-merge for utility functions

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
```bash
cd /Users/willevans/Desktop/furniture-website
```

2. Install dependencies (already done):
```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The website will be available at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.1.89:3000

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with Navigation and Footer
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles and animations
│   ├── products/
│   │   └── page.tsx         # Products catalog with filtering
│   ├── portfolio/
│   │   └── page.tsx         # Interior design portfolio
│   └── contact/
│       └── page.tsx         # Contact form and information
├── components/
│   ├── navigation.tsx       # Navigation bar (responsive)
│   ├── footer.tsx           # Footer component
│   └── ui/
│       └── button.tsx       # Reusable Button component
└── lib/
    └── utils.ts             # Utility functions (cn for className merging)
```

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero section and featured products |
| `/products` | Product catalog with category filtering |
| `/portfolio` | Interior design project showcase |
| `/contact` | Contact form and business information |

## Features in Detail

### Home Page
- Animated hero section with gradient background
- Featured products grid
- Three key value propositions
- Call-to-action section

### Products Page
- Complete furniture catalog (16 items across 4 categories)
- Interactive category filters
- Product cards with pricing and descriptions
- "Add to Cart" buttons (ready for e-commerce integration)

### Portfolio Page
- 6 completed project showcases
- Client testimonials with ratings
- Location and project descriptions

### Contact Page
- Professional contact form
- Business hours and location info
- Contact methods (email, phone)
- Success message on form submission

## Customization

### Colors
Primary color scheme uses amber/gold (`amber-500`, `amber-600`) with neutral grays. To change colors, update Tailwind class names throughout the components.

### Content
- Update product data in `/src/app/products/page.tsx`
- Modify portfolio projects in `/src/app/portfolio/page.tsx`
- Change business info in `/src/components/footer.tsx` and `/src/app/contact/page.tsx`

### Brand Name
- Replace "Interiors Co." throughout the project with your friend's business name
- Update the navigation logo in `/src/components/navigation.tsx`

## Next Steps for Production

1. **Add Real Product Images**: Replace emoji placeholders with actual product images
2. **E-Commerce Integration**: Connect "Add to Cart" to a shopping cart system
3. **Contact Form Backend**: Set up form submission to email or database
4. **Map Integration**: Add Google Maps to the contact page
5. **SEO Optimization**: Add meta tags and structured data
6. **Analytics**: Integrate Google Analytics or similar
7. **Deployment**: Deploy to Vercel, Netlify, or your preferred hosting

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Browser Support

- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is ready for your friend's interior design business. Feel free to customize and deploy!

---

**Website Status**: ✅ Ready for development and customization
**Build Status**: ✅ Successfully compiled without errors
**Development Server**: ✅ Running on http://localhost:3000

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
