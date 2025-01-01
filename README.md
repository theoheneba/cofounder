# CoFounderHub

A platform for connecting entrepreneurs with potential co-founders. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🤝 Smart Co-founder Matching
- 💬 Real-time Messaging
- 🔒 Profile Verification
- 📊 Analytics Dashboard
- 📱 Responsive Design
- 🎨 Modern UI/UX

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: React Context
- **Routing**: React Router
- **Forms**: React Hook Form + Zod
- **UI Components**: Custom components with Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/theoheneba/cofounder.git
   cd cofounder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React Context providers
├── hooks/           # Custom React hooks
├── lib/             # Utilities and API functions
├── pages/           # Page components
└── types/           # TypeScript type definitions
```

## Features in Detail

### Authentication
- Email/password authentication
- Protected routes
- Profile creation during signup

### Profiles
- Detailed user profiles
- Skills and expertise
- Working preferences
- Verification system

### Matching
- AI-powered matching algorithm
- Compatibility scoring
- Filter and search functionality

### Messaging
- Real-time chat
- End-to-end encryption
- File attachments
- Read receipts

### Analytics
- Profile views
- Connection statistics
- Response rates
- Match quality metrics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.