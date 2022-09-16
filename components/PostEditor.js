import React, { useRef, useState } from 'react'
import style from '../styles/CreatePost.module.css'
import Editor from './Editor';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router';
import { usePostContext } from '../store';
import { TagsInput } from "react-tag-input-component";

const PostEditor = ({ setActive }) => {
    const [description, setDescription] = useState('')
    const [image, setImage] = useState()
    const [title, setTitle] = useState()
    const [imagePreview, setImagePreview] = useState('');
    const { state, dispatch } = usePostContext()
    const router = useRouter()
    const imageRef = useRef()

    const [selectedTags, setSelectedTags] = useState([])

    function handleTitleChange(e) {
        e.target.style.height = "5px !important";
        e.target.style.height = (e.target.scrollHeight) + "px";
        setTitle(e.target.value.trim())
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        if (title && description && image) {
            let form = new FormData()
            form.append('title', title)
            form.append('description', description)
            // form.append('tags', selectedTags)
            form.append('image', image)

            const toastId = toast.loading('Loading...')
            setActive(true)
            try {
                const res = await axios.post('/api/post/create', form)
                if (res.status == 200) {
                    dispatch({ type: 'UPDATE_TRUE' })
                    toast.dismiss(toastId)
                    setActive(false)
                    toast.success('Successfully Created New Post')
                    router.push('/')
                } else {
                    toast.dismiss(toastId)
                    setActive(false)
                    toast.error("Something wents wrong")
                }
            } catch (err) {
                toast.dismiss(toastId)
                setActive(false)
                toast.error(err.response.data.error)
                console.log({error:err});
            }

        } else {
            if (!title) {
                toast.error("Give a Post Title")
            } else if (!image) {
                toast.error("Cover Image should not be blank")
            } else if (!description) {
                toast.error("Post Content must be provided")
            }
        }
    }

    function handleImage(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <>
            <div className={style.create_post_container}>

                {/* Add Title */}
                <div className={style.create_post_title}>
                    <textarea
                        style={{ fontFamily: 'Comic Neue' }}
                        type='text'
                        placeholder='New post title here...'
                        onChange={handleTitleChange}
                    />
                </div>

                {/* Tag Input  */}
                <div className={style.tag_container} >
                    <TagsInput
                        value={selectedTags}
                        onChange={setSelectedTags}
                        name="Tag"
                        placeHolder="Enter Tag"
                    />
                </div>

                {/* Add Image */}
                <div className={style.create_post_image}>
                    <div className={style.image_open_container}>
                        <div onClick={() => imageRef.current.click()} className={style.image_open_button}>Add a Cover Image</div>
                        <span>Image Aspect-Ratio should be 5:3</span>
                    </div>
                    <input
                        type='file'
                        id='image_box'
                        style={{ display: 'none' }}
                        onChange={handleImage}
                        ref={imageRef}
                    />
                    {imagePreview && <div className='post_cover_image'><img src={imagePreview} /></div>}
                </div>

                {/* Add Description */}
                <div className={style.create_post_description}>
                    <Editor setDescription={setDescription} />
                </div>

                {/* Submit Button */}
                <div className={style.buttons}>
                    <div
                        className={style.button}
                        onClick={handleFormSubmit}
                    >
                        Submit
                    </div>
                    <div onClick={() => router.push('/')} className={`${style.cancel_button} ${style.button}`}>Cancel</div>
                </div>

            </div>
        </>
    )
}

export default PostEditor