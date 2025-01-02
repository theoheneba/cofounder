import { AuthProvider } from '@/contexts/auth-context';
import { AuthGuard } from '@/components/auth/auth-guard';
import { Header } from '@/components/layout/header';
import { HomePage } from '@/pages/home';
import { SignupPage } from '@/pages/signup';
import { LoginPage } from '@/pages/login';
import { DashboardPage } from '@/pages/dashboard';
import { ProfilePage } from '@/pages/profile';
import { ProfileEditPage } from '@/pages/profile/edit';
import { MessagesPage } from '@/pages/messages';
import { SettingsPage } from '@/pages/settings';
import { AdminRoutes } from '@/pages/admin/routes';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <AuthGuard requireAuth={false}>
                  <HomePage />
                </AuthGuard>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthGuard requireAuth={false}>
                  <SignupPage />
                </AuthGuard>
              }
            />
            <Route
              path="/login"
              element={
                <AuthGuard requireAuth={false}>
                  <LoginPage />
                </AuthGuard>
              }
            />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <DashboardPage />
                </AuthGuard>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthGuard>
                  <ProfilePage />
                </AuthGuard>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <AuthGuard>
                  <ProfileEditPage />
                </AuthGuard>
              }
            />
            <Route
              path="/messages"
              element={
                <AuthGuard>
                  <MessagesPage />
                </AuthGuard>
              }
            />
            <Route
              path="/settings"
              element={
                <AuthGuard>
                  <SettingsPage />
                </AuthGuard>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin/*"
              element={
                <AuthGuard>
                  <AdminRoutes />
                </AuthGuard>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}