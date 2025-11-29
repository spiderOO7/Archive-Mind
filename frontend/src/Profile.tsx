"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Edit,  Save,  Upload, User, X } from "lucide-react"
import { Button } from "./components/elements/Button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Textarea } from "./components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "./components/elements/Card"
import { HoverEffect } from "./components/ui/hover-effect"
import { cn } from "././lib/utils"

const INITIAL_PROFILE = {
  name: "Alex Johnson",
  title: "Senior Developer",
  email: "alex.johnson@example.com",
  bio: "Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies. Passionate about creating intuitive user experiences and scalable applications.",
  location: "San Francisco, CA",
  website: "https://alexjohnson.dev",
  github: "github.com/alexjohnson",
  twitter: "twitter.com/alexjohnson",
  linkedin: "linkedin.com/in/alexjohnson",
}

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A React-based dashboard for data visualization",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Project Beta",
    description: "E-commerce platform with Next.js and Stripe integration",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "Mobile app for fitness tracking with React Native",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(INITIAL_PROFILE)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [gallery, setGallery] = useState(GALLERY_ITEMS)
  const [activeTab, setActiveTab] = useState("profile")

  const profileInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = {
          id: gallery.length + 1,
          title: `New Project ${gallery.length + 1}`,
          description: "Click edit to update the description",
          image: e.target?.result as string,
        }
        setGallery([...gallery, newImage])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    console.log("Profile saved:", profile)
  }

  const handleRemoveGalleryItem = (id: number) => {
    setGallery(gallery.filter((item) => item.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
    

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Cover Image */}
        <div className="relative h-64 bg-gradient-to-r from-gray-900 to-gray-800">
          {coverImage && (
            <img src={coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
          )}
          {isEditing && (
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 border-gray-700"
              onClick={() => coverInputRef.current?.click()}
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">Upload cover image</span>
            </Button>
          )}
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverImageUpload}
          />
        </div>

        {/* Profile Section */}
        <div className="px-8 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-4 border-black overflow-hidden bg-gray-800 flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-20 h-20 text-gray-600" />
                )}
              </div>
              {isEditing && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 border-gray-700"
                  onClick={() => profileInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Upload profile image</span>
                </Button>
              )}
              <input
                ref={profileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageUpload}
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 pt-4 md:pt-10">
              <div className="flex justify-between items-start">
                <div>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      className="text-2xl font-bold bg-gray-800 border-gray-700 mb-1"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                  )}
                  {isEditing ? (
                    <Input
                      name="title"
                      value={profile.title}
                      onChange={handleProfileChange}
                      className="text-gray-400 bg-gray-800 border-gray-700"
                    />
                  ) : (
                    <p className="text-gray-400">{profile.title}</p>
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList className="bg-gray-800 border-b border-gray-800 w-full justify-start rounded-none px-0 h-auto">
              <TabsTrigger
                value="profile"
                className={cn(
                  "rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary px-6 py-3",
                  activeTab === "profile" ? "border-b-2 border-primary" : "",
                )}
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className={cn(
                  "rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary px-6 py-3",
                  activeTab === "gallery" ? "border-b-2 border-primary" : "",
                )}
              >
                Gallery
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card className="bg-gray-800 border-gray-800">
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isEditing ? (
                        <Textarea
                          name="bio"
                          value={profile.bio}
                          onChange={handleProfileChange}
                          className="min-h-32 bg-gray-800 border-gray-700"
                        />
                      ) : (
                        <p className="text-gray-300">{profile.bio}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="bg-gray-800 border-gray-800">
                    <CardHeader>
                      <CardTitle>Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-gray-400">Email</Label>
                        {isEditing ? (
                          <Input
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="mt-1 bg-gray-800 border-gray-700"
                          />
                        ) : (
                          <p className="text-gray-300">{profile.email}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-gray-400">Location</Label>
                        {isEditing ? (
                          <Input
                            name="location"
                            value={profile.location}
                            onChange={handleProfileChange}
                            className="mt-1 bg-gray-800 border-gray-700"
                          />
                        ) : (
                          <p className="text-gray-300">{profile.location}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-gray-400">Website</Label>
                        {isEditing ? (
                          <Input
                            name="website"
                            value={profile.website}
                            onChange={handleProfileChange}
                            className="mt-1 bg-gray-800 border-gray-700"
                          />
                        ) : (
                          <p className="text-gray-300">{profile.website}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Project Gallery</h2>
                {isEditing && (
                  <Button variant="outline" onClick={() => galleryInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                )}
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleGalleryImageUpload}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-2px border-white">
                <HoverEffect
                  items={gallery.map((item) => ({
                    title: item.title,
                    description: item.description,
                    link: "#",
                    thumbnail: item.image,
                    id: item.id.toString(),
                    onRemove: isEditing ? () => handleRemoveGalleryItem(item.id) : undefined,
                  }))}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


