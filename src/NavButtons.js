import React from 'react'
import {useHistory} from 'react-router-dom'
import { useEffect } from 'react'

function NavButtons() {
    
        const hist = useHistory();
    
    return (
        <>
            <div className="row">
                <nav>
                    {/* <a href="/"><button className="btn btn-primary button">Dashboard</button></a>
                    <a href="/PostsPage"><button className="btn btn-primary button">Posts Page</button></a>
                    <a href="/LinksPage"><button className="btn btn-primary button">Links Page</button></a> */}
                    
                    <button className="btn btn-primary button" onClick={()=> hist.push('/') }>Dashboard</button>
                    <button className="btn btn-primary button" onClick={()=> hist.push('/PostsPage') }>Posts Page</button>
                    <button className="btn btn-primary button" onClick={()=> hist.push('/LinksPage') }>Links Page</button>
                </nav>
            </div>
        </>
    )
}

export default NavButtons
