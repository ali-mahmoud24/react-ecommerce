import { useNavigate, useParams } from "react-router";
import { Box, Typography, Skeleton, useTheme } from "@mui/material";
import { useCategory } from "../hooks/useCategory";
import { useCategoryProducts } from "../hooks/useCategoryProducts";
import { Grid } from "@mui/system";
import SkeletonCard from "@/components/ui/SkeletonCard";
import ProductCard from "@/components/ui/ProductCard";

export default function CategoryDetails() {
    const { id } = useParams<{ id: string }>();
    const { data: category, isLoading } = useCategory(id!);
    const { data: products = [], isLoading: productsLoading } = useCategoryProducts(id!);
    const navigate = useNavigate();
    const theme = useTheme();
    const handleClick = (id: string) => navigate(`/product/${id}`);

    return (
        <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
                {isLoading ? (
                    <>
                        <Skeleton
                            variant="text"
                            sx={{
                                width: { xs: "60%", sm: "40%", md: "30%", lg: "20%" },
                                height: { xs: 36, sm: 42, md: 48 },
                                mx: "auto",
                                mb: 2,
                                borderRadius: 1,
                            }}
                        />

                        <Skeleton
                            variant="text"
                            sx={{
                                width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" },
                                height: { xs: 20, sm: 22, md: 24 },
                                mx: "auto",
                                mb: 3,
                                borderRadius: 1,
                            }}
                        />

                        <Skeleton
                            variant="rectangular"
                            sx={{
                                width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" },
                                height: { xs: 220, md: 300 },
                                mx: "auto",
                                borderRadius: 2,
                                display: "block",
                            }}
                        />
                    </>
                ) : category ? (
                    <>
                        <Typography variant="h3" fontWeight={700}>
                            {category.name}
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            Explore the best products in our {category.name} category
                        </Typography>

                        <Box
                            component="img"
                            src={category.imageUrl}
                            alt={category.name}
                            sx={{
                                mt: 4,
                                height: { xs: 220, md: 300 },
                                width: "auto",
                                maxWidth: "100%",
                                display: "block",
                                mx: "auto",
                                borderRadius: 2,
                                objectFit: "contain",
                            }}
                        />
                    </>
                ) : (
                    <Typography textAlign="center">
                        Category not found.
                    </Typography>
                )}
            </Box>

            <Box sx={{ mt: 8 }}>
                <Typography
                    variant="h4"
                    fontWeight={700}
                    textAlign="center"
                    mb={4}
                    sx={{ color: theme.palette.text.primary }}
                >
                    Products by {category?.name}
                </Typography>

                {productsLoading ?
                    (<Grid container spacing={3} justifyContent="start" flex={1}>
                        {Array.from(new Array(4)).map((_, index) => (
                            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <SkeletonCard />
                            </Grid>
                        ))}
                    </Grid>)
                    : products.length > 0 ?
                        (<Grid container spacing={3} justifyContent="start" flex={1}>
                            {products.map((product) => (
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
                        ) : (
                            <Typography textAlign={"center"} color="text.secondary">
                                No products found for this category.
                            </Typography>
                        )
                }
            </Box>
        </Box>
    );
}
