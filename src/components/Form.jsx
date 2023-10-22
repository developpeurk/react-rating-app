import React, { useContext, useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating'
import { v4 as uuidv4 } from 'uuid';
import { ReviewContext } from './context/ReviewContext';



export default function Form() {

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);
    const [ratingKey, setRatingKey] = useState(uuidv4());
    const {addReview, reviewToEdit} = useContext(ReviewContext);



    useEffect(() => {
        if (reviewToEdit.updating && reviewToEdit.review) {
            setName(reviewToEdit.review.name);
            setMessage(reviewToEdit.review.message);
            setRating(reviewToEdit.review.rating);
            setRatingKey(uuidv4());
        }
    }, [reviewToEdit]);



    const handleRating = (rate) => {
        setRating(rate);
    }



    const formSubmit = (e) => {
        e.preventDefault();
    
        const reviewData = {
            name: name,
            message: message,
            rating: rating
        };
    
        if (reviewToEdit.updating) {
            reviewData.id = reviewToEdit.review.id;  // Use the existing review's ID
            addReview(reviewData, true);  // Pass a second argument to indicate it's an update
        } else {
            reviewData.id = uuidv4();
            addReview(reviewData, false);  // Pass a second argument to indicate it's a new review
        }
        
        // Reset form fields
        setName('');
        setMessage('');
        setRating(0);
        setRatingKey(uuidv4());

    };
    


    const isDisabled = () => {    
        if (!name || !message || !rating > 0) {
            return true;
        }
        return false;
    }

    
    return (
        <form onSubmit={(e) => formSubmit(e)}>
        <div className='mb3'>
            <label htmlFor='name' className='form-label'>Name</label>
            <input
                type='text' 
                className='form-control' 
                name='name' 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='name' />
        </div>
        <div className='mb-3'>
            <label htmlFor='message' className='form-label'>Message</label>
            <textarea
                className='form-control' 
                name='message' 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Message'
                rows='3'></textarea>
        </div>
        <div className='mb-3'>
             <Rating
                key={rating}
                onClick={handleRating}
                initialValue={rating}
             />
        </div>
        <div className='mb-3'>
        <button 
            type='submit' 
            disabled={isDisabled()}
            className={reviewToEdit.updating ? 'btn btn-warning mb-3' : 'btn btn-primary mb-3'}>
            {reviewToEdit.updating ? 'Update' : 'Submit'}
        </button>

        </div>
        </form>
        
    )
}