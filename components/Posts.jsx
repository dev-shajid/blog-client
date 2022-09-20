import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { usePostContext } from '../store'
import LoadingPost from './LoadingPost'
import SinglePost from './SinglePost'
import Transitions from './Transitions'

const fetchPosts = async ({ pageParam = 1 }) => {
    // await new Promise((res) => setTimeout(res, 100))
    const res = await axios.get('/api/post/getPosts?_limit=10&_page=' + pageParam)
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
            ['posts'],
            fetchPosts,
            {
                getNextPageParam: (_, pages) => pages.length < Math.ceil(number?.number / 10) ? pages.length + 1 : undefined,
                // enabled: true,
            }
        )

    useEffect(() => {
        refetch()
    }, [])

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
        <div style={{ flex: 1 }}>
            <Transitions>
                <div ref={ref} style={{ maxWidth: "650px", padding: "0px", margin: "0 auto" }}>
                    {
                        isLoading || (isFetching && state.update) ?
                            [1, 2].map((v, i) => <LoadingPost key={i} />)
                            :
                            data?.pages?.map((page, i) => {
                                return (
                                    <div key={i}>
                                        {page?.message?.map((post, index) => (
                                            <div key={index}>
                                                <SinglePost post={post} />
                                            </div>
                                        ))}
                                    </div>
                                )
                            })
                    }

                    {isFetching && hasNextPage ? <LoadingPost /> : null}

                </div>
            </Transitions>
        </div>
    )
}

export default Posts