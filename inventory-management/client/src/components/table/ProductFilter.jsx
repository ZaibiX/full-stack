import React from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { FilterList, Inventory2, Bolt, Checkroom, Warning, LibraryBooks } from '@mui/icons-material';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const ProductFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: null, label: 'All Products', icon: <Inventory2 fontSize="small" /> },
    { id: 'Electronics', label: 'Electronics', icon: <Bolt fontSize="small" /> },
    { id: 'Clothing', label: 'Clothing', icon: <Checkroom fontSize="small" /> },
    { id: 'Books', label: 'Books', icon: <LibraryBooks fontSize="small" /> },

    { id: 'low-stock', label: 'Low Stock', icon: <Warning fontSize="small" /> },
    
  ];

  return (
    <Box className="mb-6">
      <div className="flex items-center gap-2 mb-3 text-gray-500">
        <FilterList fontSize="small" />
        <Typography variant="body2" className="font-semibold uppercase tracking-wider">
          Quick Filters
        </Typography>
      </div>
      
      <Stack direction="row" spacing={0} className="overflow-x-auto pb-2 flex-wrap items-start gap-2 justify-start">
        {filters.map((filter) => (
          <Chip
            key={filter.id}
            icon={filter.icon}
            label={filter.label}
            onClick={() => onFilterChange(filter.id)}
            variant={activeFilter === filter.id ? 'filled' : 'outlined'}
            color={activeFilter === filter.id ? 'primary' : 'default'}
            sx={{
              px: 1,
              py: 2,
              fontWeight: 600,
              borderRadius: '12px',
              transition: 'all 0.2s',
              // Custom blue for the primary state
              backgroundColor: activeFilter === filter.id ? '#2563eb' : 'transparent',
              '&:hover': {
                backgroundColor: activeFilter === filter.id ? '#1d4ed8' : '#f3f4f6',
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ProductFilter;