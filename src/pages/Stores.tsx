import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import FullFeaturedCrudGridCrud from '../components/Grid/DataGridCRUD';

const Stores = () => {
  const { stores } = useSelector((state: RootState) => state.store);
  useEffect(() => {
    console.log("stores start----------");
    console.log(stores);
    console.log("stores end----------");
  },[stores]);

  return (
    <>
      <div className=''>
        <FullFeaturedCrudGridCrud data={stores} type="stores"/>
      </div>

    </>
  )
}




export default Stores