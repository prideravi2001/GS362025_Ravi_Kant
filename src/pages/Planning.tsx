import { useEffect, useState } from 'react'
// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import PlanningGrid from '../components/Grid/PlanningTable';
import { Box } from '@mui/material';
const Planning = () => {
  const { calender, calculation, planning } = useSelector((state: RootState) => state.planning);
  const { skus } = useSelector((state: RootState) => state.sku);
  const { stores } = useSelector((state: RootState) => state.store);

  const [skusLabel, setSkusLabel] = useState<{ [k: string]: string; } | any>([]);
  const [storesLabel, setStoresLabel] = useState<{ [k: string]: string; } | any>([]);

  useEffect(() => {
    let stLabel = Object.fromEntries(stores.map(item => [item.ID, item.Label]));
    let sksLabel = Object.fromEntries(skus.map(item => [item.ID, item.Label]));

    console.log(stLabel);
    console.log(sksLabel);

    setSkusLabel(sksLabel);
    setStoresLabel(stLabel);
    console.log("calender");
    console.log(calender)

  }, [calculation, calender, planning]);
  return (
    <>
      <Box sx={{
        height: 500,
        width: '88vw',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}>
        <PlanningGrid
          data={calculation}
          calender={calender}
          planning={planning}
          skusLabel={skusLabel}
          storesLabel={storesLabel}
        />
      </Box>
    </>
  )
}

export default Planning