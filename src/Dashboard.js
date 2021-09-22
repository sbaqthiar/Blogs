import GhostContentAPI from '@tryghost/content-api'
import { useEffect, useState } from 'react';
import ListItem from './ListItem';
import Chart from 'react-google-charts';

const Dashboard = () => {

    const [postcount, setPostCount] = useState(0)
    const [pagecount, setPageCount] = useState(0)
    const [authorcount, setAuthorCount] = useState(0)
    const [tagcount, setTagCount] = useState(0)

    const [postpm, setPostpm] = useState([])

    // state for latest 5 posts
    const [postlist, setPostList] = useState([])
    let dateStr = [], monthInt = [], monthCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    useEffect(() => {

        const api = new GhostContentAPI({
            url: 'https://ghost-blog.ipxp.in',
            key: '8196190b08906dda0ebf6e6f5d',
            version: 'v4'
        });


        //Fetching total no. of posts and last 5 posts
        api.posts.browse().then((posts) => {

            setPostList(posts.slice(0, 5))
            setPostCount(posts.length)

            // code for chart date display starts
            dateStr = posts.map((item) => item.published_at)
            for (let i in dateStr) {
                let d1 = new Date(dateStr[i]);
                monthInt[i] = (d1.getMonth() + 1);

            }
            //running switch case to get month count
        
        monthInt.map((item) => {
            switch (item) {
                case 1:
                    monthCounter[0] = monthCounter[0] + 1
                    break;
                case 2:
                    monthCounter[1] = monthCounter[1] + 1
                    break;
                case 3:
                    monthCounter[2] = monthCounter[2] + 1
                    break;
                case 4:
                    monthCounter[3] = monthCounter[3] + 1
                    break;
                case 5:
                    monthCounter[4] = monthCounter[4] + 1
                    break;
                case 6:
                    monthCounter[5] = monthCounter[5] + 1
                    break;
                case 7:
                    monthCounter[6] = monthCounter[6] + 1
                    break;
                case 8:
                    monthCounter[7] = monthCounter[7] + 1
                    break;
                case 9:
                    monthCounter[8] = monthCounter[8] + 1
                    break;
                case 10:
                    monthCounter[9] = monthCounter[9] + 1
                    break;
                case 11:
                    monthCounter[10] = monthCounter[10] + 1
                    break;
                case 12:
                    monthCounter[11] = monthCounter[11] + 1
                    break;
                default:
                    console.log("All above dates checked")
            }
            
            
        })
        //taking the Post per month count into state
        setPostpm(monthCounter)
        }
        ).catch((err) => console.log(err))

        

        //Fetching total no. of pages
        api.pages.browse().then((pages) => setPageCount(pages.length)).catch((err) => console.log(err))

        //Fetching total no. of authors
        api.authors.browse().then((authors) => setAuthorCount(authors.length)).catch((err) => console.log(err))

        //Fetching total no. of tags
        api.tags.browse().then((tags) => setTagCount(tags.length)).catch((err) => console.log(err))




    }, [])
    return (
        <>
            <div className="dashboard">
                <div className="container px-4">
                    <div className="row top-buffer">
                        <div className="col-md-3 border-red padding-none right-buffer ">
                            <div className="card ">
                                <div className="card-body">
                                    <p className="card-title">Total number of posts</p>
                                    <h1 className="card-text">{postcount}</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 border-red padding-none right-buffer">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-title">Total number of pages</p>
                                    <h1 className="card-text">{pagecount}</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 border-red padding-none">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-title">Total number of authors</p>
                                    <h1 className="card-text">{authorcount}</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 border-red padding-none">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-title">Total number of tags</p>
                                    <h1 className="card-text">{tagcount}</h1>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="row top-buffer">

                        <div className="col-md-6 border-red padding-none">
                            <div><h5 className="padding-left">Latest 5 Published Posts</h5></div>
                            {
                                // showing latest 5 posts using map
                                postlist.map((item, index) => (<ListItem item={item} rank={index + 1} />)) //passing title and rank to Top 5 ListItem
                            }


                        </div>
                        {/* column for chart */}
                        <div className="col-md-6 border-red padding-none" id="chart-container">
                            <div><h5 className="padding-left">Post per Month Chart</h5></div>
                            {/* // ___________________________________Chart code starts___________________________________________________ */}

                            <div style={{ display: 'flex', maxWidth: 900, justifyContent: 'center', overflow: 'hidden' }}>
                                <Chart
                                    width={500}
                                    height={300}
                                    chartType="ColumnChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Months', 'Posts'],
                                        ['Jan', postpm[0]],
                                        ['Feb', postpm[1]],
                                        ['March', postpm[2]],
                                        ['Apr', postpm[3]],
                                        ['May', postpm[4]],
                                        ['June', postpm[5]],
                                        ['July', postpm[6]],
                                        ['Aug', postpm[7]],
                                        ['Sept', postpm[8]],
                                        ['Oct', postpm[9]],
                                        ['Nov', postpm[10]],
                                        ['Dec', postpm[11]]
                                    ]}
                                    options={{
                                        title: 'Posts per Month',
                                        chartArea: { left: '15%', right: '20%', width: '60%' },
                                        legend: {
                                            position: 'right'
                                        },
                                        hAxis: {
                                            title: 'Months',
                                            minValue: 0,
                                        },
                                        vAxis: {
                                            title: 'Number of posts',
                                            scaleType: 'linear'
                                        },
                                    }}
                                    legendToggle
                                />
                                {/* //________________________________________Chart code ends___________________________________________________ */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;