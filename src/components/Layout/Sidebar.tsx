import { Link } from 'react-router'
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { BiBarChartSquare } from "react-icons/bi";
import { LuChartColumn } from "react-icons/lu";
import { TbTriangleSquareCircle } from "react-icons/tb";


const Sidebar = () => {
  return (
    <>
      <div className='flex flex-col gap-4'>

        <Link to='/store' className='flex items-center text-2xl  gap-3 hover:bg-gray-200 p-2'>
          <MdOutlineStoreMallDirectory />
          <p className='text-xl'>
            Store
          </p>
        </Link>

        <Link to='/skus' className='flex items-center text-2xl  gap-3  hover:bg-gray-200 p-2'>
          <TbTriangleSquareCircle />
          <p className='text-xl'>
            SKUs
          </p>
        </Link>
        <Link to='/planning' className='flex items-center text-2xl  gap-3  hover:bg-gray-200 p-2'>
          <LuChartColumn />
          <p className='text-xl'>
            Planning
          </p>
        </Link>
        <Link to='/charts' className='flex items-center text-2xl  gap-3  hover:bg-gray-200 p-2'>
          <BiBarChartSquare />
          <p className='text-xl'>
            Charts
          </p>
        </Link>
      </div>
    </>
  )
}

export default Sidebar