import { type GridColDef } from '@mui/x-data-grid';
import { Avatar, IconButton, Tooltip, Typography, Stack } from '@mui/material';
import type { Brand } from '../types/brand.type';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export type BrandActionsProps = {
  onDelete: (brand: Brand) => void;
  onEdit?: (brand: Brand) => void;
};

export const getBrandColumns = ({ onDelete, onEdit }: BrandActionsProps): GridColDef[] => [
  {
    field: 'imageUrl',
    headerName: 'Image',
    width: 80,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.value || ''} sx={{ width: 40, height: 40 }} />
    ),
  },
  {
    field: 'name',
    headerName: 'Category Name',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Stack direction="column" spacing={0}>
        <Typography variant="body2" fontWeight={600}>
          {params.value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {params.row.slug}
        </Typography>
      </Stack>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 140,
    renderCell: (params) => params.value?.split('T')[0] ?? '',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    // flex: 0.5,
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
