import React, { useContext } from 'react';
import ListItem from './ListItem';
import { ReviewContext } from './context/ReviewContext';

export default function ReviewList() {

    const { reviews } = useContext(ReviewContext);
    return(
        <ul className='mt-4 list-group'>
            {
                reviews.map((review) => {
                    return <ListItem 
                    key={review.id} 
                    review={review} 

                    />
                })
            }
        </ul>
    )
}