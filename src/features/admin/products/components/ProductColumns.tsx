import { type GridColDef } from '@mui/x-data-grid';
import type { Product } from '../types/product.type';

import { Chip, IconButton, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';

export type ProductActionsProps = {
  onDelete: (p: Product) => void;
};

export const getProductColumns = ({ onDelete }: ProductActionsProps): GridColDef<Product>[] => [
  { field: 'title', headerName: 'Title', flex: 1, minWidth: 180, filterable: false },
  {
    field: 'price',
    headerName: 'Price',
    width: 110,
    filterable: false,
  },
  { field: 'quantity', headerName: 'Qty', width: 90, filterable: false },

  { field: 'sold', headerName: 'Sold', width: 90, filterable: false },

  {
    field: 'category',
    headerName: 'Category',
    width: 160,
    renderCell: (params) =>
      params.row.category?.name ? <Chip label={params.row.category.name} size="small" /> : null,
  },
  {
    field: 'brand',
    headerName: 'Brand',
    width: 140,
    renderCell: (params) =>
      params.row.brand?.name ? <Chip label={params.row.brand.name} size="small" /> : null,
  },

  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 150,
    filterable: false,
    renderCell: (params) => params.value?.split?.('T')?.[0] ?? '',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Tooltip title="Delete product">
        <IconButton color="error" onClick={() => onDelete(params.row)}>
          <Delete fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
  },
];
