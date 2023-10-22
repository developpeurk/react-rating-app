import React, { useContext } from 'react';
import { ReviewContext } from './context/ReviewContext';

export default function AverageRating() {

    const {reviews} = useContext(ReviewContext);

    const calculateReviewsAverage = () => {
         let average = 0;
        if (reviews.length > 0) {
            average = (
                reviews.reduce(
                    (acc, review) => acc + review.rating, 0) 
                    / reviews.length
            ).toFixed(2);
        }
       
       return average;

    }
    return (
        <div className='container my-4'>
            <div className="d-flex justify-content-between align-items-center">
                <h5>Review 
                    {" "}
                    <span className='badge bg-dark rounded-pill'>
                        {reviews.length}
                    </span>
                </h5>
                <h5>Average: 
                {" "}
                    <span className='badge bg-warning text-dark rounded-pill'>
                    {
                        calculateReviewsAverage()
                    }

                    </span>
                </h5>
            </div>
        </div>
    )
}
