'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
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
import { updateProfile } from './actions'
import type { Profile, Category } from '../../../../payload-types'
import { Plus, Trash2 } from 'lucide-react'

// Types
type FormState = { success: boolean | undefined; message: string }
type Service = { serviceName?: string; serviceDescription?: string; price?: number }

interface EditProfileFormProps {
  profile: Profile
  categories: Category[]
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? 'Updating...' : 'Update Profile'}
    </Button>
  )
}

export function EditProfileForm({ profile, categories }: EditProfileFormProps) {
  const { toast } = useToast()
  const initialState: FormState = { success: undefined, message: '' }
  const [state, formAction] = useActionState(updateProfile, initialState)

  useEffect(() => {
    if (state.success === true) {
      toast({ title: 'Success!', description: state.message })
    } else if (state.success === false) {
      toast({ title: 'Error', description: state.message, variant: 'destructive' })
    }
  }, [state, toast])

  const [services, setServices] = useState<Partial<Service>[]>(profile.services || [])

  const addService = () => {
    setServices([...services, { serviceName: '', serviceDescription: '', price: 0 }])
  }
  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index))
  }
  const handleServiceChange = (index: number, field: keyof Service, value: string | number) => {
    const newServices = [...services]
    newServices[index] = { ...newServices[index], [field]: value }
    setServices(newServices)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <input type="hidden" name="profileId" value={profile.id} />

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              name="displayName"
              type="text"
              defaultValue={profile.displayName || ''}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" name="bio" defaultValue={profile.bio || ''} rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={profile.contactInfo?.email || ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              defaultValue={profile.contactInfo?.phone || ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              defaultValue={
                typeof profile.category === 'object'
                  ? String(profile.category.id)
                  : String(profile.category || '')
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg">Service Packages</Label>
              <Button type="button" onClick={addService} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add Service
              </Button>
            </div>
            {services.map((service, index) => (
              <Card key={index} className="p-4 space-y-4 border">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Service #{index + 1}</h4>
                  <Button
                    type="button"
                    onClick={() => removeService(index)}
                    variant="ghost"
                    size="icon"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  name={`services.${index}.serviceName`}
                  placeholder="Service Name"
                  value={service.serviceName || ''}
                  onChange={(e) => handleServiceChange(index, 'serviceName', e.target.value)}
                  required
                />
                <Textarea
                  name={`services.${index}.serviceDescription`}
                  placeholder="Service Description"
                  value={service.serviceDescription || ''}
                  onChange={(e) => handleServiceChange(index, 'serviceDescription', e.target.value)}
                  required
                />
                <Input
                  name={`services.${index}.price`}
                  type="number"
                  placeholder="Price (USD)"
                  value={service.price ?? ''}
                  onChange={(e) =>
                    handleServiceChange(index, 'price', parseFloat(e.target.value) || 0)
                  }
                  required
                />
              </Card>
            ))}
          </div>

          <div className="pt-6">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
