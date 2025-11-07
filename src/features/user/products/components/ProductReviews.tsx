import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Rating } from '@mui/material';
import { useReviews } from '../hooks/useReviews';

interface ProductReviewsProps {
    productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
    const { reviews, loading, error, submitReview } = useReviews(productId);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewRating, setReviewRating] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!reviewTitle || !reviewRating) return;
        setSubmitting(true);
        await submitReview(reviewTitle, reviewRating);
        setReviewTitle('');
        setReviewRating(null);
        setSubmitting(false);
    };

    return (
        <Box mt={4}>
            <Typography variant="h5" mb={2}>Add a Review</Typography>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
                fullWidth
                label="Review Title"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Rating
                name="rating"
                value={reviewRating}
                precision={0.5}
                onChange={(_, value) => setReviewRating(value)}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" sx={{ml: 3}} onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>

            <Box mt={4}>
                <Typography variant="h5" mb={2}>Reviews</Typography>
                {loading ? (
                    <Typography>Loading reviews...</Typography>
                ) : reviews.length === 0 ? (
                    <Typography>No reviews yet.</Typography>
                ) : (
                    reviews?.map((rev, idx) => (
                        <Box key={rev.id || `review-${idx}`} mb={2} p={2} border="1px solid #ddd" borderRadius={2}>
                            <Typography fontWeight="bold">{rev.title}</Typography>
                            <Rating value={rev.rating} readOnly precision={0.5} size="small" />
                            <Typography variant="body2" color="text.secondary">
                                {new Date(rev.createdAt).toLocaleDateString()}
                            </Typography>
                        </Box>
                    ))
                )}
            </Box>
        </Box>
    );
}
