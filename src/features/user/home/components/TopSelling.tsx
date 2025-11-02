import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import http from "@/lib/axios";
import ProductCard from "./ProductCard";
import type { ProductCardProps } from "./ProductCard";

interface ProductApiResponse {
    id: string;
    title: string;
    price: number;
    imageCoverUrl: string;
    numOfRatings: number;
    sold: number;
    createdAt: string;
}

export default function TopSelling() {
    const theme = useTheme();

    const { data, isLoading, error } = useQuery<ProductCardProps[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await http.get("/products");
            const products = res.data.data as ProductApiResponse[];
            const topSelling = products
                .sort((a, b) => b.sold - a.sold)
                .slice(0, 4)
                .map((item) => ({
                    title: item.title,
                    price: item.price,
                    image: item.imageCoverUrl,
                    rating: item.numOfRatings || 0,
                }));

            return topSelling;
        },
    });

    if (isLoading)
        return (
            <Box display="flex" justifyContent="center" py={6}>
                <CircularProgress />
            </Box>
        );

    if (error)
        return (
            <Typography color="error" textAlign="center" py={6}>
                Failed to load products
            </Typography>
        );

    return (
        <Box sx={{ py: 8, px: 2, backgroundColor: theme.palette.background.default }}>
            <Typography
                variant="h3"
                fontWeight={700}
                textAlign="center"
                mb={6}
                sx={{ color: theme.palette.text.primary }}
            >
                Top Selling
                <Typography variant="body1" color={theme.palette.text.secondary}>
                    Our most popular products this month
                </Typography>
            </Typography>

            <Grid container spacing={4} sx={{ justifyContent: "center" }}>
                {data?.map((product) => (
                    <Grid item xs={12} sm={12} md={6} lg={3} key={product.title}>
                        <ProductCard {...product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
