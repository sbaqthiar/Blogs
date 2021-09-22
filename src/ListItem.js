import React from 'react'

function ListItem({ item, rank, }) {
    return (
        <>
            <a href={item.url} target="_blank" style={{textDecoration:'none', color:'black'}}>
                <div className="card list-item">
                    <div className="card-body ">
                        <h5></h5> <p className="card-title margin-none" ><strong>{rank}.</strong> {item.title}</p>
                    </div>
                </div>
            </a>
        </>
    )
}

export default ListItem
