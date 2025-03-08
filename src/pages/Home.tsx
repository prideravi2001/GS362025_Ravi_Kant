import { useEffect } from 'react'
import Sidebar from '../components/Layout/Sidebar'
import logo from '../assets/GsynergyLogo.svg'
import { BrowserRouter, Route, Routes } from 'react-router'
import Stores from './Stores'
import SKUs from './SKUs'
import Planning from './Planning'
import Chart from './Chart'
// GS362025_Ravi_Kant/src/assets/GSIV25 - Sample Data.xlsx


import * as XLSX from "xlsx";
import { useDispatch } from 'react-redux'
import { addToStore } from '../redux/slices/storeSlice'
import { addToSkus } from '../redux/slices/skuSlice'
import { addToPlanning } from '../redux/slices/planningSlice'


const Home = () => {

    const dispatch = useDispatch();


    useEffect(() => {
        loadChartData();
    }, []);

    const loadChartData = async () => {
        try {
            const response = await fetch("/GSIV25 - Sample Data.xlsx"); 
            const blob = await response.blob(); 
            const arrayBuffer = await blob.arrayBuffer(); 
            const workbook = XLSX.read(arrayBuffer, { type: "binary" }); 
            let dataArr = workbook.SheetNames;
            dataArr.forEach((sheetName) => {
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                switch (sheetName.toUpperCase()) {
                    case "STORES":
                        dispatch(addToStore(jsonData));
                        break;
                    case "SKUS":
                        dispatch(addToSkus(jsonData));
                        break;
                    case "CALENDAR":
                        dispatch(addToPlanning({ type: "CALENDAR", data: jsonData }))
                        break;
                    case "PLANNING":
                        dispatch(addToPlanning({ type: "PLANNING", data: jsonData }))
                        break;
                    case "CALCULATIONS":
                        dispatch(addToPlanning({ type: "CALCULATIONS", data: jsonData }))
                        break;
                    case "CHARTS":
                        // dispatch(addToChar(jsonData));
                        break;
                    default:
                        console.error("No sheets present in the xlsx.");
                        break;
                }
            })

            const sheet = workbook.Sheets["Stores"]; 
            if (!sheet) {
                console.error("Sheet not found!");
                return;

            }

        } catch (error) {
            console.error("Error loading Excel file:", error);
        }
    };

    return (
        <>
            <div className=''>
                <BrowserRouter>

                    <div className='flex w-full bg-white h-12 items-center justify-between p-2'>
                        <div className='w-36 cursor-pointer'>
                            <img srcSet={logo} alt="Gsynergy Logo" className='' />
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>Data Viewer App</h2>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className='flex'>
                        <div className='h-[90vh] bg-white w-32'>
                            <Sidebar />
                        </div>
                        <div className='routers w-auto h-full  bg-gray-300'>
                            <div className='w-full md:h-[88vh] [bg-red-400] bg-white'>
                                <Routes>
                                    {/* <Route path='/' element={<Home />} /> */}
                                    <Route path='/store' element={<Stores />} />
                                    <Route path='/skus' element={<SKUs />} />
                                    <Route path='/planning' element={<Planning />} />
                                    <Route path='/charts' element={<Chart />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>

            </div>
        </>
    )
}

export default Home