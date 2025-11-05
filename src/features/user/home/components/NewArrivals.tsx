import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { useHomeProducts } from "../hooks/useHomeProducts";
import ProductCard from "@/components/ui/ProductCard";
import SkeletonCard from "@/components/ui/SkeletonCard";

export default function NewArrivals() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { data, isLoading, error } = useHomeProducts();

    const handleClick = (id: string) => navigate(`/product/${id}`);

    // Sort & slice products to get latest 4
    const latest = data
        ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);

    return (
        <Box
            py={6}
            px={2}
            sx={{
                backgroundColor: theme.palette.background.default,
            }}
        >
            {/* ==== SECTION TITLE ==== */}
            <Typography
                variant="h3"
                fontWeight={700}
                textAlign="center"
                mb={6}
                sx={{ color: theme.palette.text.primary }}
            >
                New Arrivals
                <Typography
                    variant="body1"
                    color={theme.palette.text.secondary}
                    sx={{ mt: 1 }}
                >
                    Check out our latest and most popular products
                </Typography>
            </Typography>

            {/* ==== PRODUCT GRID ==== */}
            <Grid container spacing={3} justifyContent="center" flex={1}>
                {isLoading
                    ? Array.from(new Array(4)).map((_, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <SkeletonCard />
                        </Grid>
                    ))
                    : error ? (
                        <Typography color="error" textAlign="center" py={4} width="100%">
                            Failed to load products
                        </Typography>
                    ) : (
                        latest?.map((product) => (
                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3, lg: 3 }} >
                                <ProductCard
                                    id={product.id}
                                    title={product.title}
                                    imageCoverUrl={product.imageCoverUrl}
                                    numOfRatings={product.numOfRatings}
                                    price={product.price}
                                    onClick={handleClick}
                                />
                            </Grid>
                        ))
                    )}
            </Grid>
        </Box>
    );
}
