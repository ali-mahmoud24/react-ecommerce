import { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from './components/UserNavbar';
import Footer from './components/UserFooter';
import { Box, Grid, Typography, Paper } from '@mui/material';
import type { Product } from '@/features/user/products/api/products.api';

export default function UserLayout() {
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);

  const handleSearchResults = (results: Product[] | null) => {
    setSearchResults(results);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar onSearchResults={handleSearchResults} />

      <main style={{ padding: '1rem' }}>
        {searchResults ? (
          <Box>
            {searchResults.length > 0 ? (
              <Grid container spacing={2}>
                {searchResults.map((product) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.3s',
                        '&:hover': { boxShadow: 4 },
                      }}
                      onClick={() => (window.location.href = `/products/${product.id}`)}
                    >
                      <img
                        src={product.imageCoverUrl}
                        alt={product.title}
                        style={{
                          width: '100%',
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                        }}
                      />
                      <Typography variant="subtitle1" mt={1} fontWeight={600}>
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={0.5}>
                        {product.price} EGP
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="h6" align="center" mt={4}>
                No products found.
              </Typography>
            )}
          </Box>
        ) : (
          <Outlet />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
