import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { DeletePost } from './delete-post'
import { auth } from '@/server/auth'

export const PostList: React.FC = async () => {
  const { user } = await auth()
  const { data, error } = await api.post.getAll.get()

  if (error) return <p className="text-destructive">{error.value.message}</p>

  return (
    <section className="mx-auto mb-4 max-w-screen-md space-y-4">
      {data?.map((post) => (
        <Card key={post.id}>
          {post.author.id === user?.id && <DeletePost postId={post.id} />}
          <CardHeader>
            <CardDescription>{post.author.name}</CardDescription>
            <CardTitle>{post.content}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </section>
  )
}
