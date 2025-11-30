import {
    Box,
    Grid,
    useTheme,
    Pagination,
    Stack
} from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router";
import { useState } from "react";
import ProductFilter from "../components/ProductFilter";
import ProductCard from "@/components/ui/ProductCard";
import SkeletonCard from "@/components/ui/SkeletonCard";

export default function ProductList() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const limit = 8;


    // filters that will be sent to backend
    const [priceFilter, setPriceFilter] = useState<number[]>([0, 100000]);
    const [rating, setRating] = useState<number>(0);

    // Build dynamic filters
    const filters: Record<string, any> = {};
    if (priceFilter[0] > 0) filters["price[gte]"] = priceFilter[0];
    if (priceFilter[1] < 100000) filters["price[lte]"] = priceFilter[1];
    if (rating > 0) filters["averageRating[gte]"] = rating;



    const { data, isLoading } = useProducts(page, limit, filters);


    const handleClick = (id: string) => navigate(`/product/${id}`);

    const handleReset = () => {
        setPriceFilter([0, 100000]);
        setRating(0);
        setPage(1);
    };



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
                onPriceChange={(_, newValue) => {
                    setPriceFilter(newValue as number[]);
                    setPage(1); // reset page
                }}
                onRatingChange={(_, newValue) => {
                    setRating(newValue || 0);
                    setPage(1); // reset page
                }}
                rating={rating}
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
                    : data?.data.map((product) => (
                        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <ProductCard
                                id={product.id}
                                title={product.title}
                                imageCoverUrl={product.imageCoverUrl}
                                averageRating={product.averageRating || 0}
                                price={product.price}
                                onClick={handleClick}
                            />
                        </Grid>
                    ))}

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    mt={4}
                >
                    <Pagination
                        count={data?.paginationResult?.numberOfPages ?? 1}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                        size="medium"
                        shape="rounded"
                    />
                </Stack>
            </Grid>

        </Box>
    );
}
