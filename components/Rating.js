import React from 'react'

export default function Rating(props) {
    const {rating} = props;
    return (
        <div>
            <div className="rating">
                <i className={
                    rating >= 1 
                    ? "fas fa-star"
                    : rating >= 0.5
                    ? 'fas fa-star-half-o'
                    : 'far fa-star-o' }>
                </i>
                <i className={
                    rating >= 2 
                    ? "fas fa-star" 
                    : rating >= 1.5
                    ? "fas fa-star-half-alt" 
                    : "fas fa-star-o"}>

                </i>
                <i className={
                    rating >= 3
                    ? "fas fa-star" 
                    : rating >= 2.5
                    ? 'fas fa-star-half-o'
                    : 'fas fa-star-o'}>

                </i>
                <i className={
                    rating >= 4
                    ? "fas fa-star" 
                    : rating >= 3.5
                    ? "fas fa-star-half-alt" 
                    : "fas fa-star"}>

                </i>
                <i className={
                    rating >= 5
                    ? "fas fa-star" 
                    : rating >= 4.5
                    ? "fas fa-star-half-alt" 
                    : "fas fa-star"}>

                </i>
            </div>
        </div>
    )
}

