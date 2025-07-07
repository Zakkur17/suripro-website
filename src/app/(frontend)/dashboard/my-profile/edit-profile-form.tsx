'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'
import { Label } from '../../../../components/ui/label'
import { Textarea } from '../../../../components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select'
import { useToast } from '../../../../hooks/use-toast'
import { updateProfileAction } from './actions'
import type { Profile, Category } from '../../../../payload-types'
import { Plus, Trash2 } from 'lucide-react'

interface EditProfileFormProps {
  profile: Profile
  categories: Category[]
}

interface Service {
  serviceName: string
  serviceDescription: string
  price: number
}

export function EditProfileForm({ profile, categories }: EditProfileFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  // Initialize form state
  const [displayName, setDisplayName] = useState(profile.displayName || '')
  const [bio, setBio] = useState(profile.bio || '')
  const [email, setEmail] = useState(profile.contactInfo?.email || '')
  const [phone, setPhone] = useState(profile.contactInfo?.phone || '')
  const [category, setCategory] = useState(
    typeof profile.category === 'object'
      ? profile.category.id.toString()
      : profile.category?.toString() || '',
  )

  // Initialize services state
  const [services, setServices] = useState<Service[]>(
    profile.services?.map((service) => ({
      serviceName: service.serviceName || '',
      serviceDescription: service.serviceDescription || '',
      price: service.price || 0,
    })) || [],
  )

  const [isSubmitting, setIsSubmitting] = useState(false)

  const addService = () => {
    setServices([...services, { serviceName: '', serviceDescription: '', price: 0 }])
  }

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index))
  }

  const updateService = (index: number, field: keyof Service, value: string | number) => {
    const updatedServices = [...services]
    updatedServices[index] = { ...updatedServices[index], [field]: value }
    setServices(updatedServices)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('profileId', profile.id.toString())
      formData.append('displayName', displayName)
      formData.append('bio', bio)
      formData.append('email', email)
      formData.append('phone', phone)
      formData.append('category', category)

      // Add services to form data
      services.forEach((service, index) => {
        formData.append(`services[${index}].serviceName`, service.serviceName)
        formData.append(`services[${index}].serviceDescription`, service.serviceDescription)
        formData.append(`services[${index}].price`, service.price.toString())
      })

      const result = await updateProfileAction(formData)

      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        })
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        })
      }
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Tell potential clients about yourself..."
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg">Service Packages</Label>
              <Button type="button" onClick={addService} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>

            {services.map((service, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-semibold">Service {index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => removeService(index)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Service Name</Label>
                      <Input
                        value={service.serviceName}
                        onChange={(e) => updateService(index, 'serviceName', e.target.value)}
                        placeholder="e.g., Basic Logo Design"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Price (USD)</Label>
                      <Input
                        type="number"
                        value={service.price}
                        onChange={(e) =>
                          updateService(index, 'price', parseFloat(e.target.value) || 0)
                        }
                        placeholder="150"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Service Description</Label>
                    <Textarea
                      value={service.serviceDescription}
                      onChange={(e) => updateService(index, 'serviceDescription', e.target.value)}
                      placeholder="Describe what's included in this service..."
                      rows={3}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
