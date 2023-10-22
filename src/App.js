import { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import ReviewList from "./components/ReviewList";
import AverageRating from "./components/AverageRating";
import { ReviewContext } from "./components/context/ReviewContext";

function App() {
  
  const [reviews, setReviews] = useState([]);
  const [reviewToEdit, setReviewToEdit] = useState({
    review: null,
    updating: false,
  });

  const removeReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  }
  
  
const addReview = (review, isUpdate = false) => {
  if (isUpdate) {
    const reviewIndex = reviews.findIndex(r => r.id === review.id);
    if (reviewIndex !== -1) {
        // Deep copy the reviews array
        const updatedReviews = JSON.parse(JSON.stringify(reviews));
        updatedReviews[reviewIndex] = review;
        setReviews(updatedReviews);
    }
} else {
    setReviews(prevReviews => [...prevReviews, review]);
}


  
  // Reset reviewToEdit state after a review is added/edited
  setReviewToEdit({
      review: null,
      updating: false,
  });
};




  const editReview = (review) => {
    setReviewToEdit({
      review,
      updating: true,
    });
   
  }


  return (

     <ReviewContext.Provider value={
        {
          reviews,
          addReview,
          editReview,
          reviewToEdit,
          removeReview,
        }

     }>

          <div className="row my-4">
                <div className="col-md-8 mx-auto">
                  <div className="card">
                    <div className="card-header bg-white">
                    <Header />
                    </div>
                    <div className="card-body">
                    <Form  />
                    <AverageRating />
                    <ReviewList />

                    
                    {/* <Form 
                        addReview={addReview}
                        reviewToEdit={reviewToEdit}
                      />   */}
                      
                     
                      {/* <AverageRating  reviews={reviews}/> */}
                    
                      {/* <ReviewList 
                      removeReview={removeReview}
                      reviews={reviews}
                      editReview={editReview}
                      reviewToEdit={reviewToEdit}
                      /> */}

                     
                    </div>
                  </div>
                </div>
              </div>

     </ReviewContext.Provider>

   
  );
}

export default App;
