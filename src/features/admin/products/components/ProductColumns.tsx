import { type GridColDef } from '@mui/x-data-grid';
import type { Product } from '../types/product.type';

import { Avatar, Chip, IconButton, Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export type ProductActionsProps = {
  onDelete: (p: Product) => void;
  onEdit: (category: Product) => void;
};

export const getProductColumns = ({
  onDelete,
  onEdit,
}: ProductActionsProps): GridColDef<Product>[] => [
  {
    field: 'imageCoverUrl',
    headerName: 'Image',
    width: 80,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Avatar alt={params.row.title} src={params.value || ''} sx={{ width: 40, height: 40 }} />
    ),
  },

  { field: 'title', headerName: 'Title', flex: 1, minWidth: 180, filterable: false },
  {
    field: 'price',
    headerName: 'Price',
    width: 110,
    filterable: false,
  },
  { field: 'quantity', headerName: 'Quantity', width: 90, filterable: false },

  { field: 'sold', headerName: 'Sold', width: 90, filterable: false },

  {
    field: 'category',
    headerName: 'Category',
    width: 160,
    sortable: false,
    renderCell: (params) =>
      params.row.category?.name ? <Chip label={params.row.category.name} size="small" /> : null,
  },
  {
    field: 'brand',
    headerName: 'Brand',
    width: 140,
    sortable: false,
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
    sortable: false,
    renderCell: (params) => (
      <>
        <Tooltip title="Edit">
          <IconButton onClick={() => onEdit?.(params.row)} color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton onClick={() => onDelete(params.row)} color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];
