import React, { useEffect } from 'react';
import Swiper from 'swiper/swiper-bundle.esm.js';
import './postimg.css';

function PostImage({ file, pagination }) {    

//-------------------------------* USE-EFFECT FUNCTION FOR SWIPER *-------------------------------//
    useEffect(()=>{
        new Swiper('.swiper-container', {
            spaceBetween: 30,
            autoplay: {
                delay: 6000,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            centeredSlides: true,
            loop: true,
        });     
    })
   
    return (
        <>                 
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    { 
                        file.length===1
                    ?
                        <img id="img" src= {`${file[0].filepath}`} alt= 'img' />
                    :
                        file.map((img, index)=>(
                        <div className="swiper-slide" key={index}>
                            <img id="img" src= {`${img.filepath}`} alt= {`${img.filepath}`} />
                        </div>
                        ))
                    }
                </div>
                {
                        pagination
                    ?
                        <div className="swiper-pagination"></div>
                    :
                        null
                }
            </div>            
        </>
    );
}

export default PostImage;