# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm start` - Start production server

## Architecture Overview

This is a Next.js-based digital business card application with TypeScript, using Firebase for authentication and data storage, and Cloudinary for image management.

### Key Components Structure

**Pages Architecture:**
- `/` - Homepage with card creation interface
- `/[routeName]` - Dynamic routes for individual business cards, using either Firestore or local JSON data
- `/[routeName]/edit` - Edit existing business cards
- `/create` - Card creation interface
- `/manage` - User dashboard for managing cards
- `/login` - Authentication page
- `/upgrade` - Pricing/upgrade page

**Data Sources:**
The application supports dual data sources (see `pages/[routeName].tsx`):
- **Firestore**: Primary data source using Firebase collections
- **Local JSON**: Fallback using JSON files in `/data` directory

**Firebase Integration:**
- Authentication via Google Auth (`lib/firebase.ts`)
- Firestore database for business card data
- Environment variables for Firebase config (NEXT_PUBLIC_FIREBASE_*)

**User Roles System:**
- Role-based card creation limits defined in `lib/roles.ts`
- Roles: `none` (0), `single` (1), `multi` (3), `admin` (unlimited)

**Business Card Data Structure:**
Main interface defined in `components/BusinessCard.tsx`:
- Basic info (name, images, contact details)
- Gallery with carousel/mosaic display options
- Sectioned content with customizable design
- Social media and contact integration

**Image Management:**
- Static images in `/public/images/[businessName]/`
- Cloudinary integration for image uploads/deletion
- Default placeholder images in `/public/defaults/`

### Technology Stack

- **Framework:** Next.js 13 with TypeScript
- **Styling:** Tailwind CSS + Material-UI components
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth (Google provider)
- **Image Storage:** Cloudinary
- **UI Components:** Material-UI, React Icons, React Slick carousel

### Domain-Specific Logic

**Middleware (`middleware.ts`):**
- Custom domain routing: `mad-kor.co.il` redirects to `/madkor` route
- Handles multi-tenant business card serving

**Component Organization:**
- Modular component structure with dedicated folders
- Shared components for gallery (carousel/mosaic), contact buttons, map embeds
- Business card sections are dynamically rendered based on data structure

### Development Notes

- The codebase includes both Hebrew and English text support
- Cards are generated statically with ISR (5-minute revalidation)
- Gallery supports both carousel and mosaic display modes
- Contact buttons integrate with native apps (WhatsApp, maps, etc.)