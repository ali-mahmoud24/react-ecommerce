import { useState, useEffect, useRef } from 'react';
import {
    InputBase,
    alpha,
    Box,
    List,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ClickAwayListener,
    CircularProgress,
    Typography,
    Paper,
    Popper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';
import http from '@/lib/axios';
import useDebounce from '@/hooks/useDebounce'; // your hook

interface Product {
    id: string;
    title: string;
    imageCoverUrl?: string;
}

interface SearchInputProps {
    value: string;
    onChange: (val: string) => void;
}
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: theme.palette.mode === 'light'
        ? alpha(theme.palette.common.black, 0.05)
        : alpha(theme.palette.common.white, 0.1),
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light'
            ? alpha(theme.palette.common.black, 0.1)
            : alpha(theme.palette.common.white, 0.15),
    },
    width: '100%',
    maxWidth: 600, // <- limit the width so it doesn't collapse
    // [theme.breakpoints.up('md')]: { maxWidth: 250 },
    // [theme.breakpoints.up('lg')]: { maxWidth: 600 }, // optional for large screens
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.mode === 'light' ? theme.palette.text.secondary : theme.palette.grey[400],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
    },
}));

export default function SearchInput({ value, onChange }: SearchInputProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const debouncedValue = useDebounce(value, 500); // debounce 500ms

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setProducts([]);
            setOpen(false);
            return;
        }

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await http.get('/products', { params: { keyword: debouncedValue } });
                setProducts(res.data.data || []);
                setOpen(true);
            } catch (err) {
                console.error(err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedValue]);

    const handleClickAway = () => setOpen(false);

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative', width: '100%' }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="What are you looking for?"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        inputRef={inputRef}
                        onFocus={() => value && setOpen(true)}
                    />
                </Search>

                <Popper
                    open={open}
                    anchorEl={inputRef.current}
                    placement="bottom-start"
                    sx={{ zIndex: 1300, width: inputRef.current?.offsetWidth }}
                >
                    <Paper elevation={3} sx={{ maxHeight: 300, overflowY: 'auto', mt: 1 }}>
                        {loading ? (
                            <Box p={2} display="flex" justifyContent="center">
                                <CircularProgress size={24} />
                            </Box>
                        ) : products.length === 0 ? (
                            <Box p={2}>
                                <Typography variant="body2" color="text.secondary">
                                    No results
                                </Typography>
                            </Box>
                        ) : (
                            <List dense>
                                {products.map((product) => (
                                    <ListItemButton
                                        key={product.id}
                                        onClick={() => {
                                            navigate(`/product/${product.id}`);
                                            setOpen(false);
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                src={product.imageCoverUrl}
                                                variant="square"
                                                sx={{ width: 40, height: 40, borderRadius: 1 }}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={product.title} />
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                    </Paper>
                </Popper>
            </Box>
        </ClickAwayListener>
    );
}
