import React from 'react'
import Footer from './Footer'
import Modal from './Modal'



function Layout({children}) {
    return (
        <div >
           
            <Modal></Modal>
            {children}
            
        </div>
    )
}

export default Layout
