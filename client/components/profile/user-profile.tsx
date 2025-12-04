"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Calendar, BookOpen, TrendingUp, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import BookCollectionGrid from "./book-collection-grid"

export default function UserProfile() {
  const [userStats, setUserStats] = useState({
    name: "Sarah Martinez",
    location: "Downtown, San Francisco, CA",
    joinDate: "March 2023",
    rating: 4.8,
    reviews: 42,
    booksLent: 15,
    booksShared: 28,
    activeSwaps: 3,
  })

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [settings, setSettings] = useState({
    allowAnyone: true,
    allowSwapOnly: true,
    verifiedOnly: false,
    emailNotifications: true,
    pushNotifications: true,
    reminderEmails: true,
  })
  const { toast } = useToast()

  const handleEditProfile = () => {
    setEditDialogOpen(true)
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved!",
      description: "Your preferences have been updated successfully.",
    })
  }

  const handleToggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <Card className="mb-8 p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/profile-avatar.png" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">{userStats.name}</h1>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold">{userStats.rating}</span>
                <span className="text-sm text-muted-foreground">({userStats.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{userStats.location}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Member since {userStats.joinDate}</span>
              </div>
            </div>
          </div>

          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  <Input defaultValue={userStats.name} />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input defaultValue={userStats.location} />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Bio</label>
                  <Textarea placeholder="Tell others about yourself..." />
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Profile updated",
                        description: "Your profile has been saved successfully.",
                      })
                      setEditDialogOpen(false)
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
            <p className="text-2xl font-bold">{userStats.booksLent}</p>
            <p className="text-xs text-muted-foreground">Books Lent</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <p className="text-2xl font-bold">{userStats.booksShared}</p>
            <p className="text-xs text-muted-foreground">Books Shared</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <p className="text-2xl font-bold">{userStats.activeSwaps}</p>
            <p className="text-xs text-muted-foreground">Active Exchanges</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Star className="h-6 w-6 text-accent" />
            </div>
            <p className="text-2xl font-bold">{userStats.rating}</p>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
        </div>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="library" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="library">My Library</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* My Library Tab */}
        <TabsContent value="library" className="mt-6">
          <Card className="p-6">
            <BookCollectionGrid />
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">Reliable and Quick Responder</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">2 weeks ago</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  "Sarah was great! She took excellent care of my book and returned it on time. Highly recommend!"
                </p>
                <p className="text-xs text-muted-foreground">By John Smith</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-6">
          <Card className="p-6 space-y-6">
            {/* Lending Preferences */}
            <div>
              <h3 className="font-bold mb-3">Lending Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowAnyone}
                    onChange={() => handleToggleSetting("allowAnyone")}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Allow anyone to borrow</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowSwapOnly}
                    onChange={() => handleToggleSetting("allowSwapOnly")}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Allow swaps only</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.verifiedOnly}
                    onChange={() => handleToggleSetting("verifiedOnly")}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Verified users only</span>
                </label>
              </div>
            </div>

            {/* Notification Preferences */}
            <div>
              <h3 className="font-bold mb-3">Notifications</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={() => handleToggleSetting("emailNotifications")}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Email notifications for requests</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={() => handleToggleSetting("pushNotifications")}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Push notifications</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.reminderEmails}
                    onChange={() => handleToggleSetting("reminderEmails")}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Reminder emails for due dates</span>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div>
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
