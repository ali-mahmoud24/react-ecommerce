import { formatCurrency } from '@/utils/formatCurrency';
import { Button, Slider, Typography, Rating, Paper, Divider, useTheme, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface ProductFilterProps {
    priceFilter: number[];
    onPriceChange: (event: Event, newValue: number | number[]) => void;
    rating: number;
    onRatingChange: (event: React.SyntheticEvent<Element, Event>, newValue: number | null) => void;
    onReset: () => void;
}

export default function ProductFilter({
    priceFilter,
    onPriceChange,
    rating,
    onRatingChange,
    onReset,
}: ProductFilterProps) {
    const theme = useTheme();

    return (
        <Paper
            component={motion.div}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            elevation={4}
            sx={{
                width: 180,
                p: 4,
                bgcolor: theme.palette.mode === 'light' ? theme.palette.background.paper : '#1a1a1a',
                color: theme.palette.text.primary,
                height: 'fit-content',
                position: { xs: "static", sm: "sticky" },
                top: 100,
                boxShadow:
                    theme.palette.mode === 'light'
                        ? '0 6px 20px rgba(0,0,0,0.08)'
                        : '0 6px 18px rgba(255,255,255,0.05)',
            }}
        >
            {/* Header */}
            <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{
                    textAlign: 'center',
                    letterSpacing: 0.5,
                    mb: 3,
                }}
            >
                Filters
            </Typography>

            {/* === PRICE RANGE === */}
            <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mx: 1, opacity: 0.9 }}>
                    Price Range
                </Typography>

                <Slider
                    value={priceFilter}
                    onChange={onPriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100000}
                    step={1000}
                    sx={{
                        color: theme.palette.primary.main,
                        '& .MuiSlider-thumb': {
                            width: 18,
                            height: 18,
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0 0 0 8px ${theme.palette.primary.main}22`,
                            },
                        },
                    }}
                />

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                    {formatCurrency(priceFilter[0])} - {formatCurrency(priceFilter[1])}
                </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* === RATING === */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} mb={3}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ width: 125 }}>
                    Minimum Rating
                </Typography>

                <Rating
                    value={rating}
                    onChange={onRatingChange}
                    size="large"
                    precision={0.5}
                    sx={{
                        color: theme.palette.primary.main,
                        '& .MuiRating-iconHover': {
                            transform: 'scale(1.2)',
                        },
                    }}
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* === RESET BUTTON === */}
            <Button
                variant="contained"
                fullWidth
                onClick={onReset}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                    p: 1,
                    fontWeight: 'bold',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.getContrastText(
                        theme.palette.mode === 'light'
                            ? theme.palette.text.primary
                            : theme.palette.primary.main,
                    ),
                    "&:hover": {
                        bgcolor:
                            theme.palette.mode === "light"
                                ? theme.palette.text.primary
                                : theme.palette.primary.main,
                    },
                }}
            >
                Reset Filters
            </Button>
        </Paper>
    );
}