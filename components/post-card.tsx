import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface PostCardProps {
  title: string
  content: string
  image: string
  isAdmin?: boolean
  handleDelete?: () => void
  handleEdit?: () => void
}

export function PostCard({ title, content, image, isAdmin, handleDelete, handleEdit }: PostCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute z-30 aspect-video" />
      <img
        src={image || 'https://avatar.vercel.sh/shadcn1'}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60"
      />
      <CardHeader>
        <CardTitle>{title || ''}</CardTitle>
        <CardDescription>{content || ''}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        {isAdmin ? (
          <>
            <Button className="w-full" onClick={handleEdit}>
              Edit
            </Button>
            <Button className="w-full" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </>
        ) : null}
      </CardFooter>
    </Card>
  )
}
