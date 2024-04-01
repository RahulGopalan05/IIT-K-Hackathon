import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewPage1.css'; // Importing the CSS file

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ author: '', rating: '', comment: '' });

  useEffect(() => {
    // Fetch top 5 reviews from the database
    axios.get('http://localhost:3001/feedback')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send new review data to the backend
    axios.post('http://localhost:3001/feedback', newReview)
      .then(response => {
        console.log('Review submitted successfully:', response.data);
        // Fetch updated top 5 reviews after submission
        axios.get('http://localhost:3001/feedback')
          .then(response => {
            setReviews(response.data);
            setNewReview({ author: '', rating: '', comment: '' }); // Clear input fields
          })
          .catch(error => {
            console.error('Error fetching reviews after submission:', error);
          });
      })
      .catch(error => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <div>
      <h1>Submit Your Feedback</h1>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Your Name:</label>
          <input type="text" id="author" name="author" value={newReview.author} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" name="rating" value={newReview.rating} onChange={handleInputChange} min="1" max="5" required />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" name="comment" value={newReview.comment} onChange={handleInputChange} required />
        </div>
        <button type="submit">Submit Review</button>
      </form>

      <div className="review-page">
        <h1>Top 5 Reviews</h1>
        <div className="review-list">
          {reviews.slice(0, 5).map(review => (
            <div key={review._id} className="review">
              <div className="review-header">
                <span className="review-author">{review.author}</span>
                <span className="review-rating">Rating: {review.rating}/5</span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
