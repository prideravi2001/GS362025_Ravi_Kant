import { Box } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import FullFeaturedCrudGrid from '../components/Grid/DataGridCRUD';

const SKUs = () => {
  const { skus } = useSelector((state: RootState) => state.sku);
  return (
    <>
      <Box>
        <FullFeaturedCrudGrid data={skus} type='skus'/>
      </Box>      
    </>
  )
}

export default SKUs