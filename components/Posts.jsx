import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { usePostContext } from '../store'
import LoadingPost from './LoadingPost'
import Post from './Post'
import Transitions from './Transitions'

const fetchPosts = async ({ pageParam = 1 }) => {
    await new Promise((res) => setTimeout(res, 1000))
    // const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=' + pageParam)
    const res = await axios.get('/api/post/get?_limit=2&_page=' + pageParam)
    return res.data
}

const fetchPostsNumber = async () => {
    const res = await axios.get('/api/post/count')
    return res.data
}

const Posts = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const ref = useRef()
    const { state, dispatch } = usePostContext()

    const { data: number } = useQuery(['number'], fetchPostsNumber)

    const { isLoading, isError, data, error, isFetching, fetchNextPage, hasNextPage, refetch } =
        useInfiniteQuery(
            ['posts;'],
            fetchPosts,
            {
                getNextPageParam: (_, pages) => pages.length < Math.ceil(number.number / 2) ? pages.length + 1 : undefined,
                enabled: true,
            }
        )

    useEffect(() => {
        if (router.route !== '/') {
            dispatch({ type: 'UPDATE_FALSE' })
        }
    }, [router.route])

    // Infinite Scrolling Data Fetching
    useEffect(() => {
        // after scrolling to the bottom of the page, fetch the next page
        const onScroll = (e) => {
            const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement
            dispatch({ type: 'UPDATE_FALSE' })
            if (scrollHeight - scrollTop <= clientHeight * 1.2 && ref.current && hasNextPage && !isFetching) {
                fetchNextPage()
            }
        }

        document.addEventListener('scroll', onScroll)
        return () => document.removeEventListener('scroll', onScroll)
    }, [isFetching, hasNextPage])

    if (isError) return <div>Error! {JSON.stringify(error)}</div>

    return (
        <Transitions>
            <section>
                <div ref={ref} style={{ maxWidth: "700px", padding: "5px 10px", margin: "0 auto" }}>
                    {
                        isLoading || (isFetching && state.update) ?
                            [1, 2].map((v, i) => <LoadingPost key={i} />)
                            :
                            data?.pages?.map((page, i) => {
                                return (
                                    <div key={i}>
                                        {page?.message?.map((post, index) => (
                                            <div key={index}>
                                                <Post post={post} />
                                            </div>
                                        ))}
                                    </div>
                                )
                            })
                    }

                    {isFetching && hasNextPage ? <LoadingPost /> : null}

                </div>

            </section>
        </Transitions>
    )
}

export default Posts