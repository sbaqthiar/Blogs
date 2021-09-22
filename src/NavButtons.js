import React from 'react'

function NavButtons() {
    return (
        <>
            <div className="row">
                <nav>
                    <a href="/"><button className="btn btn-primary button">Dashboard</button></a>
                    <a href="/PostsPage"><button className="btn btn-primary button">Posts Page</button></a>
                    <a href="/LinksPage"><button className="btn btn-primary button">Links Page</button></a>
                    
                </nav>
            </div>
        </>
    )
}

export default NavButtons
