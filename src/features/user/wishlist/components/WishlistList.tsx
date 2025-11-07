import {
    Box,
    Paper,
    Stack,
    Typography,
    IconButton,
    Button,
    CircularProgress,
    useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Delete } from "@mui/icons-material";
import { useWishlist } from "../hooks/useWishlist";
import { formatCurrency } from "@/utils/formatCurrency";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    boxShadow:
        theme.palette.mode === "light"
            ? "0 2px 8px rgba(0,0,0,0.08)"
            : "0 2px 12px rgba(0,0,0,0.3)",
}));

export default function WishlistList() {
    const { wishlist, isLoading, deleteItemFromWishlist } = useWishlist();
    const theme = useTheme();
    const navigate = useNavigate();

    if (isLoading)
        return (
            <Box textAlign="center" mt={4}>
                <CircularProgress />
            </Box>
        );

    if (!wishlist || wishlist.length === 0)
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="70vh"
                textAlign="center"
            >
                <FavoriteBorderOutlinedIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Your wishlist is empty
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                    Save items you love to easily find them later.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/products")}
                    sx={{
                        borderRadius: 2, textTransform: "none", px: 4, py: 1.5,
                        "&:hover": {
                            bgcolor:
                                theme.palette.mode === "light"
                                    ? theme.palette.text.primary
                                    : theme.palette.primary.main,
                        },
                    }}
                >
                    Browse Products
                </Button>
            </Box>
        );

    return (
        <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", py: 5, px: 2 }}>
            <Typography
                variant="h3"
                fontWeight={700}
                textAlign="center"
                mb={5}
                sx={{ color: theme.palette.text.primary }}
            >
                Your Wishlist
                <Typography
                    variant="body1"
                    color={theme.palette.text.secondary}
                    sx={{ mt: 1 }}
                >
                    Manage your favorite items and move them to your cart anytime.
                </Typography>
            </Typography>

            <Stack spacing={2}>
                {wishlist.map((item) => (
                    <Item
                        key={item.id}
                        sx={{
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "center", sm: "center" },
                            justifyContent: "space-between",
                            gap: 3,
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            alignItems={{ xs: "center", sm: "center" }}
                            spacing={2}
                            flex={1}
                            width="100%"
                        >
                            {item.imageCoverUrl && (
                                <Box
                                    component="img"
                                    src={item.imageCoverUrl}
                                    alt={item.title}
                                    sx={{
                                        width: { xs: 90, sm: 110 },
                                        height: { xs: 90, sm: 110 },
                                        borderRadius: 2,
                                        objectFit: "cover",
                                        boxShadow:
                                            theme.palette.mode === "light"
                                                ? "0 2px 6px rgba(0,0,0,0.1)"
                                                : "0 2px 8px rgba(0,0,0,0.4)",
                                    }}
                                />
                            )}

                            <Box textAlign={{ xs: "center", sm: "left" }}>
                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5 }}
                                >
                                    {formatCurrency(item.price)}
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack alignItems={{ xs: "center", sm: "flex-end" }}>
                            <IconButton
                                color="error"
                                onClick={() => deleteItemFromWishlist(item.id)}
                            >
                                <Delete />
                            </IconButton>
                        </Stack>
                    </Item>
                ))}
            </Stack>
        </Box>
    );
}
