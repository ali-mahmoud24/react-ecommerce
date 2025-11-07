import { memo } from 'react';
import {
  QuickFilter,
  ColumnsPanelTrigger,
  QuickFilterClear,
  QuickFilterTrigger,
  ToolbarButton,
  Toolbar,
  QuickFilterControl,
} from '@mui/x-data-grid';
import { Tooltip, InputAdornment, Divider, TextField } from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';

// Styled components (ownerState drives width/opacity)
type OwnerState = { expanded: boolean };

const StyledQuickFilter = styled(QuickFilter)({
  display: 'grid',
  alignItems: 'center',
});

const StyledToolbarButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(
  ({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    width: 'min-content',
    height: 'min-content',
    zIndex: 1,
    opacity: ownerState.expanded ? 0 : 1,
    pointerEvents: ownerState.expanded ? 'none' : 'auto',
    transition: theme.transitions.create(['opacity']),
  }),
);

const StyledTextField = styled(TextField)<{ ownerState: OwnerState }>(({ theme, ownerState }) => ({
  gridArea: '1 / 1',
  overflowX: 'clip',
  width: ownerState.expanded ? 260 : 'var(--trigger-width)',
  opacity: ownerState.expanded ? 1 : 0,
  transition: theme.transitions.create(['width', 'opacity']),
}));

// --------- Stateless memoized toolbar (DO NOT pass keyword prop) ----------
export default memo(function CustomToolbar() {
  return (
    <Toolbar>
      <Tooltip title="Columns">
        <ColumnsPanelTrigger render={<ToolbarButton />}>
          <ViewColumnIcon fontSize="small" />
        </ColumnsPanelTrigger>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <StyledQuickFilter>
        <QuickFilterTrigger
          render={(triggerProps, state) => (
            <Tooltip title="Search">
              <StyledToolbarButton
                {...triggerProps}
                ownerState={{ expanded: state.expanded }}
                color="default"
              >
                <GridSearchIcon fontSize="small" />
              </StyledToolbarButton>
            </Tooltip>
          )}
        />

        {/* IMPORTANT: We do NOT control 'value' here. Let DataGrid manage it. */}
        <QuickFilterControl
          render={({ ref, onChange, ...controlProps }, state) => (
            <StyledTextField
              {...controlProps}
              ownerState={{ expanded: state.expanded }}
              inputRef={ref}
              placeholder="Search…"
              size="small"
              onChange={(e) => {
                // Tell DataGrid about the change (it keeps its internal quick filter state)
                onChange?.(e);
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: state.value ? (
                    <InputAdornment position="end">
                      <QuickFilterClear
                        edge="end"
                        size="small"
                        aria-label="Clear search"
                        onClick={() => {
                          // Clear internal quick filter value
                          const syntheticEvent = {
                            target: { value: '' },
                          } as React.ChangeEvent<HTMLInputElement>;

                          onChange?.(syntheticEvent);

                          //  Safely focus input if ref is an object ref
                          if (ref && typeof ref !== 'function' && ref.current) {
                            // put in next tick to avoid collapse flicker
                            setTimeout(() => ref.current?.focus(), 0);
                          }
                        }}
                      >
                        <CancelIcon fontSize="small" />
                      </QuickFilterClear>
                    </InputAdornment>
                  ) : null,
                  ...controlProps.slotProps?.input,
                },
                ...controlProps.slotProps,
              }}
            />
          )}
        />
      </StyledQuickFilter>
    </Toolbar>
  );
});
