import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"

type PostFormProps = {
    post?: Models.Document;
}

const PostForms = ({post}: PostFormProps) => {
    
    const {user} = useUserContext();
    const {toast} = useToast();
    const navigate = useNavigate();

    // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      game: post ? post?.games : "",
      
    },
  });

  /* Query
  const { mutateAsync: createPost, isLoading: isLoadingCreate } =
    useCreatePost();*/
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    })

    if(!newPost) {
      toast({
        title: 'Please try again'
      })
    }

    navigate('/')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5x1">
      <FormField
          control={form.control}
          name="game"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label flex-center">Choose Game</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field}/>
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label flex-center">Add Content</FormLabel>
              <FormControl>
                <FileUploader 
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" placeholder="Flex something..." {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
       
        <div className="flex gap-4 items-center justify-center">
        <Button 
        type="button" 
        className="shad-button_primary whitespace-nowrap ">Submit</Button>
        <Button 
        type="button" 
        className="shad-button_dark_4 ">Cancel</Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForms