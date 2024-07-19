import PostForms from '@/components/forms/PostForms'
import React from 'react'

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img 
          src="/assets/icons/add-post.svg"
          width={36}
          height={36}
          alt='add'
          />
          <h2 className='h3-bold md:h2-bold justify-start w-full'>Create Post</h2>
        </div>

        <PostForms/>
      </div>
      
    </div>
  )
}

export default CreatePost