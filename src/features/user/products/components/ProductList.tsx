import {
    Box,
    Grid,
    useTheme,
} from "@mui/material";
import { useProduct } from "../hooks/useProducts";
import { useNavigate } from "react-router";
import { useState, useMemo } from "react";
import ProductFilter from "../components/ProductFilter";
import ProductCard from "@/components/ui/ProductCard";
import SkeletonCard from "@/components/ui/SkeletonCard";

export default function ProductList() {
    const theme = useTheme();
    const { data, isLoading } = useProduct();
    const navigate = useNavigate();

    const [priceFilter, setPriceFilter] = useState<number[]>([0, 100000]);
    const [rating, setRating] = useState<number>(0);

    const handleClick = (id: string) => navigate(`/product/${id}`);

    const handleReset = () => {
        setPriceFilter([0, 100000]);
        setRating(0);
    };

    const filteredProducts = useMemo(() => {
        return (
            data?.filter(
                (p) =>
                    p.price >= priceFilter[0] &&
                    p.price <= priceFilter[1] &&
                    p.numOfRatings >= rating
            ) || []
        );
    }, [data, priceFilter, rating]);

    return (
        <Box
            display="flex"
            gap={4}
            p={4}
            bgcolor="#fafafa"
            sx={{
                backgroundColor: theme.palette.background.default,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
            }}
        >
            {/* ==== FILTER SIDEBAR ==== */}
            <ProductFilter
                priceFilter={priceFilter}
                onPriceChange={(_, newValue) => setPriceFilter(newValue as number[])}
                rating={rating}
                onRatingChange={(_, newValue) => setRating(newValue || 0)}
                onReset={handleReset}
            />

            {/* ==== PRODUCT GRID ==== */}
            <Grid container spacing={3} justifyContent="flex-start" flex={1}>
                {isLoading
                    ? Array.from(new Array(8)).map((_, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <SkeletonCard />
                        </Grid>
                    ))
                    : filteredProducts.map((product) => (
                        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <ProductCard
                                id={product.id}
                                title={product.title}
                                imageCoverUrl={product.imageCoverUrl}
                                numOfRatings={product.numOfRatings}
                                price={product.price}
                                onClick={handleClick}
                            />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}
