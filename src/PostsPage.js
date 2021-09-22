import React from 'react'
import GhostContentAPI from '@tryghost/content-api'
import { useEffect, useState } from 'react';
import ListItem from './ListItem';
import NavButtons from './NavButtons';

function PostsPage() {
    //State for posts without meta description
    // test comment for git.
    const [NoMetaDesc, setNoMetaDesc] = useState([])

    // State for posts with too long meta description
    const [LongMetaDesc, setLongMetaDesc] = useState([])

    // State for posts with too long URL.
    const [LongUrl, setLongUrl] = useState([])

    // State for posts without feature image
    const [Nofeatureimg, setNoFeatureImg] = useState([])

    // State for too short posts, below 250 words
    const[ShortPost, setShortPost]= useState([])

    // State for too long posts, more than 1500 words
    const[LongPost, setLongPost] = useState([])

    useEffect(() => {
        const api = new GhostContentAPI({
            url: 'https://ghost-blog.ipxp.in',
            key: '8196190b08906dda0ebf6e6f5d',
            version: 'v4'
        });

        api.posts.browse().then((posts) => {
            //filtering all posts without meta description
            setNoMetaDesc(posts.filter((item) => item.meta_description === null))

            // filtering all posts with too long meta description, more than 20 words
            setLongMetaDesc(posts.filter((item) => {
                if (item.meta_description !== null)
                    return item.meta_description.split(' ').length > 20
                else
                    return false
            }))

            // filtering all posts with too long url, more than 100 characters
            setLongUrl(posts.filter((item) => {
                if (item.url !== null)
                    return item.url.length > 100
                else
                    return false

            }))

            //filtering all posts without feature image
            setNoFeatureImg(posts.filter((item)=> item.feature_image === null))
            

            //filtering too short posts, below 250 words
            setShortPost(posts.filter((item)=> item.html.split(' ').length < 250))

            //filtering too long posts, more than 1500 words
            setLongPost(posts.filter((item)=> item.html.split(' ').length > 1500))

        }).catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className="posts-page">
                <div className="container-fluid">
                    <NavButtons/>
                    <div className="row">
                        <div className="col-md">
                            <h1>Posts Page</h1>
                        </div>
                    </div>
                    <div className="row top-buffer">
                        <div className="col-md-4 border-grey padding-none FixedHeightContainer">
                            <h6 className="padding-left">Posts without Meta Description</h6>
                            <div className="Content">
                                {
                                    NoMetaDesc.length !== 0 ?
                                        NoMetaDesc.map((item, index) => (<ListItem item={item} rank={index + 1} />)) :
                                        (<ListItem item={{ title: 'Hurray! No Posts to display here' }} rank={'#'} />)
                                }
                            </div>
                        </div>
                        <div className="col-md-4 border-grey padding-none">
                            <h6 className="padding-left">Too long Meta Description, more than 20 words</h6>
                            <div className="Content">
                                {
                                    LongMetaDesc.length !== 0 ?
                                        LongMetaDesc.map((item, index) => (<ListItem item={item} rank={index + 1} />)) :
                                        (<ListItem item={{ title: 'Hurray! No Posts to display here' }} rank={'#'} />)
                                }
                            </div>
                        </div>
                        <div className="col-md-4 border-grey padding-none">
                            <h6 className="padding-left">Too long URL, more than 100 chars</h6>
                            <div className="Content">
                                {
                                    LongUrl.length !== 0 ?
                                        LongUrl.map((item, index) => (<ListItem item={item} rank={index + 1} />)) :
                                        (<ListItem item={{ title: 'Hurray! No Posts to display here' }} rank={'#'} />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row top-buffer">
                        <div className="col-md-4 border-grey padding-none">
                            <h6 className="padding-left">Posts without Featured Image</h6>
                            <div className="Content">
                                {
                                    Nofeatureimg.length !== 0 ?
                                        Nofeatureimg.map((item, index) => (<ListItem item={item} rank={index + 1} />)) :
                                        (<ListItem item={{ title: 'Hurray! No Posts to display here' }} rank={'#'} />)
                                }
                            </div>
                        </div>
                        <div className="col-md-4 border-grey padding-none">
                            <h6 className="padding-left">Too Short Posts, Below 250 words</h6>
                            <div className="Content">
                                {
                                    ShortPost.length !== 0 ?
                                        ShortPost.map((item, index) => (<ListItem item={item} rank={index + 1} />)) :
                                        (<ListItem item={{ title: 'Hurray! No Posts to display here' }} rank={'#'} />)
                                }
                            </div>
                        </div>
                        <div className="col-md-4 border-grey padding-none">
                            <h6 className="padding-left">Too Long Posts, More than 1500 words</h6>
                            <div className="Content">
                                {
                                    LongPost.length !== 0 ?
                                        LongPost.map((item, index) => (<ListItem item={item} rank={index + 1} />)) :
                                        (<ListItem item={{ title: 'Hurray! No Posts to display here' }} rank={'#'} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostsPage
