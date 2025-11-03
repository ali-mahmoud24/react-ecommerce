import {
    Box,
    Typography,
    Button,
    Rating,
    useTheme,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";

export interface ProductCardProps {
    title: string;
    price: number;
    image: string;
    rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    price,
    image,
    rating,
}) => {
    const theme = useTheme();

    return (
        <Card
            component={motion.div}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            sx={{
                width: "100%",
                maxWidth: 380,
                boxShadow: theme.shadows[6],
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                overflow: "hidden",
                p: 1,
            }}
        >
            {/* Product Image */}
            <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{
                    height: 180,
                    objectFit: "contain",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    bgcolor: theme.palette.background.default,
                }}
            />

            <CardContent sx={{ px: 3, py: 3 }}>
                {/* Title */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        lineHeight: 1.4,
                        color: theme.palette.text.primary,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "20ch", // approximately 20 characters
                        display: "block",
                    }}
                >
                    {title}
                </Typography>


                {/* Rating */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
                    <Rating value={rating} readOnly precision={0.5} size="medium" />
                    <Box
                        sx={{
                            ml: 1.5,
                            px: 1.25,
                            py: 0.35,
                            borderRadius: 1,
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            fontSize: "0.8rem",
                            fontWeight: 600,
                        }}
                    >
                        {rating.toFixed(1)}
                    </Box>
                </Box>

                {/* Price + Button */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        color={theme.palette.text.primary}
                    >
                        ${price}
                    </Typography>

                    <Button
                        component={motion.button}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: theme.shape.borderRadius,
                            textTransform: "none",
                            px: 4,
                            py: 1.25,
                            fontWeight: 600,
                            fontSize: "1rem",
                            boxShadow: theme.shadows[2],
                            "&:hover": {
                                bgcolor:
                                    theme.palette.mode === "light"
                                        ? theme.palette.text.primary
                                        : theme.palette.primary.main,
                            }
                        }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
