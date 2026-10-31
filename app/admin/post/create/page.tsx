import PostForm from "@/app/admin/post/post-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CreatePostPage() {
  return (
    <main className="py-10">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-bold">
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full lg:w-2/3">
            <PostForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default CreatePostPage;
