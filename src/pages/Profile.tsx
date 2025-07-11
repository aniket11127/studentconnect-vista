
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, Save, Lock, Code, MessageSquare, Play, Award, BookOpen, TrendingUp, CheckCircle, Star, Target } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  name: string | null;
  avatar_url: string | null;
  school_name?: string;
  class_level?: string;
}

interface UserStats {
  coursesEnrolled: number;
  certificatesEarned: number;
  learningProgress: number;
}

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({
    coursesEnrolled: 0,
    certificatesEarned: 0,
    learningProgress: 0
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showAlert, setShowAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Milestone badges
  const milestones = [
    { id: 'first_login', name: 'First Login', icon: Star, earned: true },
    { id: 'project_completed', name: 'Project Master', icon: Target, earned: true },
    { id: 'ai_explorer', name: 'AI Explorer', icon: MessageSquare, earned: false },
    { id: 'code_ninja', name: 'Code Ninja', icon: Code, earned: false }
  ];

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Get enrollment count
      const { count: enrollmentCount } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      // Get certificates count
      const { count: certificatesCount } = await supabase
        .from('certificates')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      // Get course progress
      const { data: progressData } = await supabase
        .from('courses_progress')
        .select('progress')
        .eq('user_id', user?.id);

      const avgProgress = progressData && progressData.length > 0
        ? progressData.reduce((sum, item) => sum + item.progress, 0) / progressData.length
        : 0;

      setStats({
        coursesEnrolled: enrollmentCount || 0,
        certificatesEarned: certificatesCount || 0,
        learningProgress: Math.round(avgProgress)
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          school_name: profile.school_name,
          class_level: profile.class_level
        })
        .eq('id', user?.id);

      if (error) throw error;

      setShowAlert({ type: 'success', message: 'Profile updated successfully!' });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setShowAlert({ type: 'error', message: 'Failed to update profile' });
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setShowAlert({ type: 'error', message: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setShowAlert({ type: 'error', message: 'Password must be at least 6 characters long' });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowAlert({ type: 'success', message: 'Password updated successfully!' });
      toast.success('Password updated successfully!');
    } catch (error: any) {
      console.error('Error updating password:', error);
      setShowAlert({ type: 'error', message: error.message || 'Failed to update password' });
      toast.error('Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Helmet>
        <title>My Profile | SGK14 Student Portal</title>
      </Helmet>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and track your learning progress</p>
        </div>

        {showAlert && (
          <Alert className={`mb-6 ${showAlert.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <AlertDescription className={showAlert.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {showAlert.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Picture and Basic Info */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                        {profile?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Upload New
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile?.name || ''}
                        onChange={(e) => setProfile(prev => prev ? { ...prev, name: e.target.value } : null)}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="class">Class</Label>
                      <Select
                        value={profile?.class_level || ''}
                        onValueChange={(value) => setProfile(prev => prev ? { ...prev, class_level: value } : null)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8">Class 8</SelectItem>
                          <SelectItem value="9">Class 9</SelectItem>
                          <SelectItem value="10">Class 10</SelectItem>
                          <SelectItem value="11">Class 11</SelectItem>
                          <SelectItem value="12">Class 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="school">School Name</Label>
                      <Input
                        id="school"
                        value={profile?.school_name || ''}
                        onChange={(e) => setProfile(prev => prev ? { ...prev, school_name: e.target.value } : null)}
                        placeholder="Enter your school name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={saving} className="w-full md:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <Button type="submit" disabled={saving} variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    {saving ? 'Updating...' : 'Update Password'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats and Quick Actions */}
          <div className="space-y-6">
            {/* Learning Summary */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Learning Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Courses Enrolled</span>
                  </div>
                  <span className="font-semibold text-lg">{stats.coursesEnrolled}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Certificates Earned</span>
                  </div>
                  <span className="font-semibold text-lg">{stats.certificatesEarned}</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Learning Progress</span>
                    <span className="text-sm font-semibold">{stats.learningProgress}%</span>
                  </div>
                  <Progress value={stats.learningProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/editor">
                    <Code className="h-4 w-4 mr-2" />
                    Code Editor
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/ai-chat">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    AI Chat
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/videos">
                    <Play className="h-4 w-4 mr-2" />
                    Video Hub
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Achievement Badges */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Achievement Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {milestones.map((milestone) => {
                    const IconComponent = milestone.icon;
                    return (
                      <Badge
                        key={milestone.id}
                        variant={milestone.earned ? "default" : "secondary"}
                        className={`p-2 flex flex-col items-center text-xs ${
                          milestone.earned ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'
                        }`}
                      >
                        <IconComponent className="h-4 w-4 mb-1" />
                        {milestone.name}
                        {milestone.earned && <CheckCircle className="h-3 w-3 mt-1" />}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
