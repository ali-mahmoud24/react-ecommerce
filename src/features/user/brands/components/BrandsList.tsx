import { Box, Typography, Grid, Card, CardMedia, CardContent, Skeleton, useTheme } from "@mui/material";
import { useBrands } from "../hooks/useBrands";
import { useNavigate } from "react-router";

export default function BrandsList() {
    const { data, isLoading } = useBrands();
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
            <Typography
                variant="h3"
                fontWeight={700}
                textAlign="center"
                mb={6}
                sx={{ color: theme.palette.text.primary }}
            >
                Explore Our Brands
                <Typography
                    variant="body1"
                    color={theme.palette.text.secondary}
                    sx={{ mt: 1 }}
                >
                    Discover top brands and shop the latest from your favorites
                </Typography>
            </Typography>

            <Grid container spacing={4}>
                {isLoading
                    ? Array.from(new Array(4)).map((_, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                            <Card
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    boxShadow: 2,
                                    overflow: "hidden",
                                }}
                            >
                                <Skeleton
                                    variant="rectangular"
                                    height={200}
                                    sx={{ animation: "pulse 1.2s ease-in-out infinite" }}
                                />
                                <CardContent
                                    sx={{
                                        textAlign: "center",
                                        bgcolor: theme.palette.background.default,
                                    }}
                                >
                                    <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                    : data?.map((brand) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={brand.id}>
                            <Card
                                onClick={() => navigate(`/brands/${brand.id}`)}
                                sx={{
                                    cursor: "pointer",
                                    width: "100%",
                                    height: "100%",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    overflow: "hidden",
                                    transition: "box-shadow 0.3s ease",
                                    "&:hover": { boxShadow: "0 6px 16px rgba(0,0,0,0.15)" },
                                }}
                            >
                                <Box sx={{ overflow: "hidden", height: 200 }}>
                                    <CardMedia
                                        component="img"
                                        image={brand.imageUrl}
                                        alt={brand.name}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            backgroundColor: "#f0f0f0",
                                            transition: "transform 0.4s ease",
                                            "&:hover": { transform: "scale(1.1)" },
                                        }}
                                    />
                                </Box>

                                <CardContent sx={{ textAlign: "center", color: theme.palette.text.primary }}>
                                    <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ mb: 0.5 }}>
                                        {brand.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}
