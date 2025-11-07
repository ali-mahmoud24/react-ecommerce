import { formatCurrency } from "@/utils/formatCurrency";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Rating,
    Box,
    useTheme,
} from "@mui/material";

type ProductCardProps = {
    id: string;
    title: string;
    imageCoverUrl: string;
    numOfRatings: number;
    price: number;
    onClick: (id: string) => void;
};

export default function ProductCard({
    id,
    title,
    imageCoverUrl,
    numOfRatings,
    price,
    onClick,
}: ProductCardProps) {
    const theme = useTheme();

    return (
        <Card
            onClick={() => onClick(id)}
            sx={{
                cursor: "pointer",
                width: "100%",
                height: "100%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                overflow: "hidden",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                },
            }}
        >
            {/* Image with hover scale */}
            <Box
                sx={{
                    overflow: "hidden",
                    height: 200,
                }}
            >
                <CardMedia
                    component="img"
                    image={imageCoverUrl}
                    alt={title}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "#f0f0f0",
                        transition: "transform 0.4s ease",
                        "&:hover": {
                            transform: "scale(1.1)",
                        },
                    }}
                />
            </Box>

            <CardContent sx={{ textAlign: "center", color: theme.palette.text.primary }}>
                <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ mb: 0.5 }}>
                    {title}
                </Typography>

                <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
                    <Rating value={numOfRatings} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" ml={0.5} color="text.secondary">
                        {numOfRatings.toFixed(1)} / 5
                    </Typography>
                </Box>

                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    mt={1}
                    sx={{ textAlign: "center", color: theme.palette.text.primary }}
                >
                    {formatCurrency(price)}
                </Typography>
            </CardContent>
        </Card>
    );
}
