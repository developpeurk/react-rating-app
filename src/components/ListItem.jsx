import React, { useContext, useEffect, useState } from 'react';
import { showRating } from './Helpers';
import { ReviewContext } from './context/ReviewContext';

export default function ListItem({review}) {

    
    const [disabled, setDisabled] = useState(false);
    const {removeReview, editReview, reviewToEdit} = useContext(ReviewContext);


    useEffect(() => {
        if (reviewToEdit.updating && reviewToEdit.review && reviewToEdit.review.id === review.id) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [reviewToEdit, review.id]);


    const deleteReview = (id) => {
        removeReview(id)
    }

    const fillTheReviewToEdit = (review) => {
        editReview(review)
    }


    return(
            <li className='list-group-item d-flex justify-content-between align-items-start'>
                <div className='ms-2 me-auto'>
                    <div className='fw-bold'>{review.name}</div>
                    <p>{review.message}</p>
                    <p>
                        {
                            showRating(review.rating)
                        }
                    </p>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <button 
                    disabled={disabled}
                    onClick={() => deleteReview(review.id)}
                    className='btn btn-sm btn-danger mb-2'>
                        <i className="bi bi-trash"></i>
                    </button>
                    <button 
                    onClick={() => fillTheReviewToEdit(review)}
                    className='btn btn-sm btn-warning'>
                        <i className="bi bi-pencil"></i>
                    </button>
                </div>
            </li>
    )
}