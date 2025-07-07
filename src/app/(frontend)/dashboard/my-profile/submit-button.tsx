'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../../../../components/ui/button'

interface SubmitButtonProps {
  isSubmitting?: boolean
}

export function SubmitButton({ isSubmitting = false }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending || isSubmitting} className="w-full md:w-auto">
      {pending || isSubmitting ? 'Updating...' : 'Update Profile'}
    </Button>
  )
}
