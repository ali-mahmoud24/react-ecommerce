import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { WishlistResponse } from '../api/wishlist.api';
import { getWishlist, addToWishlist, deleteFromWishlist } from '../api/wishlist.api';
import { useTheme } from '@mui/material/styles';
import { showToast } from '@/utils/showToast';


export const useWishlist = () => {
    const queryClient = useQueryClient();
    const theme = useTheme();

    const { data, isLoading } = useQuery<WishlistResponse>({
        queryKey: ['wishlist'],
        queryFn: getWishlist,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const addItemToWishlist = useMutation({
        mutationFn: (productId: string) => addToWishlist(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            showToast('Item added to wishlist!', 'success', theme);
        },
        onError: () => {
            showToast('Failed to add item to wishlist.', 'error', theme);
        },
    });

    const deleteItemFromWishlist = useMutation({
        mutationFn: (productId: string) => deleteFromWishlist(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            showToast('Item removed from wishlist.', 'success', theme);
        },
        onError: () => {
            showToast('Failed to remove item from wishlist.', 'error', theme);
        },
    });

    return {
        wishlist: data?.data || [],
        isLoading,
        addItemToWishlist: addItemToWishlist.mutate,
        deleteItemFromWishlist: deleteItemFromWishlist.mutate,
        totalItems: data?.data?.length || 0,
    };
};
