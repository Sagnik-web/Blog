import React from 'react'
// import '../css/index.css'

const Layout = ({children})=>{
    return (
        <React.Fragment>
            
            {children}
            <h1>Footer</h1>
        </React.Fragment>
    )
}

export default Layout