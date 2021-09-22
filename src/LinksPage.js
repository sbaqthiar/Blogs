import React from 'react'
import GhostContentAPI from '@tryghost/content-api'
import { useEffect, useState } from 'react';
import ListItem from './ListItem';
import LinkItem from './LinkItem';
import NavButtons from './NavButtons';

function LinksPage() {
    let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    let testarray = [], t2 = [], internallinks = [], externallinks = [], t3 = [];

    let IntLinksBroken = [], ExtLinksBroken = [];
    const [totalLinks, setTotalLinks] = useState([])

    //state for internal Links array
    const [intLinks, setIntLinks] = useState([])

    //state for external Links array
    const [extLinks, setExtLinks] = useState([])

    // state for broken internal and external links
    const [BrokenIntLinks, setBrokenIntLinks] = useState([])
    const [BrokenExtLinks, setBrokenExtLinks] = useState([])



    useEffect(() => {
        const api = new GhostContentAPI({
            url: 'https://ghost-blog.ipxp.in',
            key: '8196190b08906dda0ebf6e6f5d',
            version: 'v4'
        });

        const put = (item) => {
            IntLinksBroken.push(item)
        }

        api.posts.browse().then((posts) => {
            posts.map((item) => {
                t2 = (item.html.match(urlRegex))
                if (t2 !== null)
                    testarray = [...testarray, ...t2]

            })
            //removing extra unwanted charaacters from links array
            testarray = testarray.map((item) => item.split('\"')[0])
            //setting state with all links
            setTotalLinks(testarray)

            //fetching all internal links
            internallinks = testarray.map((item) => {
                if (item.includes('https://ghost-blog'))
                    return item
            }
            )
            internallinks = internallinks.filter((e) => e !== undefined)

            //setting state with all internal links
            setIntLinks(internallinks);

            //fetching all external links
            externallinks = testarray.map((item) => {
                if (!item.includes('https://ghost-blog'))
                    return item
            })
            //removing undefined values 
            externallinks = externallinks.filter((e) => e !== undefined)

            //setting state with all external links
            setExtLinks(externallinks)




            //checking and storing broken internal links



            internallinks.map((e,index) => {

                fetch(e).then((response) => {

                if (response.status > 300) {
                    IntLinksBroken.push(e)
                    // console.log('Inside Then block ',IntLinksBroken)

                }
                if(index===internallinks.length-1) {
                    setBrokenIntLinks(IntLinksBroken);
                }
                
            }).catch((err) => {
                
                console.log(err)
            })})


            //checking and storing broken external links
            externallinks.map((e,index) => {
                fetch(e).then((response) => {
                    if (response.status > 300)
                        ExtLinksBroken.push(e)
                    if(index=== externallinks.length-1){
                        setBrokenExtLinks(ExtLinksBroken)
                    }
                }).catch((err) => {
                    ExtLinksBroken.push(e)
                    if(index=== externallinks.length-1){
                        setBrokenExtLinks(ExtLinksBroken)
                    }
                    console.log('Hello Hello Hello',err)
                })
            })

        }).catch((err) => console.log(err))


    }, [])
    return (
        <>
            <div className="links-page">
                <div className="container-fluid">
                    <NavButtons/>
                    <div className="row">
                        <div className="col-md">
                            <h1>Links Page</h1>
                        </div>
                    </div>
                    <div className="row top-buffer">
                        <div className="col-md-4 border-grey padding-none FixedHeightContainer">
                            <h6 className="padding-left">Total Number of Links</h6>
                            <h2>{totalLinks.length}</h2>
                            <h6 className="padding-left">Number or external Links</h6>
                            <h2>{extLinks.length}</h2>
                            <h6 className="padding-left">Number or internal Links</h6>
                            <h2>{intLinks.length}</h2>
                        </div>
                        <div className="col-md-4 border-grey padding-none">
                            <h6 className="padding-left">Broken Internal Links [{BrokenIntLinks.length}]</h6>
                            <div className="Content">
                                {
                                    BrokenIntLinks.map((item, index) => (<LinkItem item={item} rank={index + 1} />))
                                }
                            </div>
                        </div>
                        <div className="col-md-4 border-grey padding-none">
                            <h6 className="padding-left">Broken External Links [{BrokenExtLinks.length}]</h6>
                            <div className="Content">
                            {
                                    BrokenExtLinks.map((item, index) => (<LinkItem item={item} rank={index + 1} />))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LinksPage
