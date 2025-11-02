import * as React from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { Box, Stack, Typography, Button } from '@mui/material';
import { usePaginatedUsersQuery } from '../hooks/useUsers';

export default function UsersTable() {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isLoading } = usePaginatedUsersQuery(page, pageSize);

  const rows = data?.data ?? [];
  const total = data?.results ?? 0;

  const columns: GridColDef[] = [
    { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'role', headerName: 'Role', width: 120 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,
      valueGetter: (params) =>
        new Date(params.value).toLocaleDateString('en-US'),
    },
  ];

  return (
    console.log("✅ UsersTable mounted"),

    <Box sx={{ height: 600, width: '100%', p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Users
        </Typography>
        <Button variant="contained" color="primary">
          + Add User
        </Button>
      </Stack>

      <DataGrid
        loading={isLoading}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        rowCount={total}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
