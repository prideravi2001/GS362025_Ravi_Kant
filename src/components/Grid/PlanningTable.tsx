import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const getColor = (value: number) => {
    if (value >= 0.4) return "bg-green-500 text-white";
    if (value >= 0.1) return "bg-yellow-500 text-black";
    if (value > 0.05) return "bg-orange-500 text-white";
    return "bg-red-500 text-white";
};

const PlanningGrid: React.FC<any> = ({ data, calender, storesLabel, skusLabel }) => {
    const { skus } = useSelector((state: RootState) => state.sku);
    const [tableData, setTableData] = useState(data);

    const handleSalesUnitsChange = (store: string, sku: string, week: string, value: number) => {
        const newData = tableData.map((row: any) => {
            let priceAndCost = skus.filter((sku) => sku.ID == row.SKU);
            console.log(priceAndCost[0]);
            if (row.Store === store && row.SKU === sku && row.Week === week) {
                const salesUnits = isNaN(value) ? 0 : value;
                const salesDollars = salesUnits * priceAndCost[0].Price;
                const gmDollars = salesDollars - salesUnits * priceAndCost[0].Cost;
                const gmPercent = salesDollars > 0 ? gmDollars / salesDollars : 0;

                return { ...row, "Sales Units": salesUnits, "Sales Dollars": salesDollars, "GM Dollars": gmDollars, "GM %": gmPercent };
            }
            return row;
        });
        setTableData(newData);
    };

    return (
        <div className="p-4 w-full">
            <div className="overflow-auto">
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200 text-center">
                            <th className="p-3 border" rowSpan={3}>Store</th>
                            <th className="p-3 border" rowSpan={3}>SKU</th>
                            {/* {calender.map((week) => (
                                <th className="p-3 border" colSpan={4} key={week["Seq No."]}>
                                    {week["Month Label"]}
                                </th>
                            ))} */}

                            {/* Grouping Weeks under Months */}
                            {(() => {
                                const monthMap: Record<string, number> = {};
                                calender.forEach((week: any) => {
                                    monthMap[week["Month Label"]] = (monthMap[week["Month Label"]] || 0) + 1;
                                });

                                return Object.entries(monthMap).map(([month, weekCount]) => (
                                    <th className="p-3 border-2 border-gray-300" colSpan={weekCount * 4} key={month}>
                                        {month}
                                    </th>
                                ));
                            })()}
                        </tr>
                        <tr className="bg-gray-200 text-center">
                            {calender.map((week:any) => (
                                <th className="p-3 border-2 border-gray-300" colSpan={4} key={week["Seq No."]}>
                                    {week["Week Label"]}
                                </th>
                            ))}
                        </tr>
                        <tr className="bg-gray-300 text-center">
                            {calender.map((week:any) => (
                                <React.Fragment key={week["Seq No."]}>
                                    <th className="p-2 border">Sales Units</th>
                                    <th className="p-2 border">Sales Dollars</th>
                                    <th className="p-2 border">GM Dollars</th>
                                    <th className="p-2 border">GM Percent</th>
                                </React.Fragment>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row:any, index:number) => (
                            <tr key={index} className="text-center">
                                <td className="p-3 border">{storesLabel[row.Store] || row.Store}</td>
                                <td className="p-3 border">{skusLabel[row.SKU] || row.SKU}</td>
                                {calender.map((week:any) => {
                                    if (row.Week !== week.Week) return <React.Fragment key={week["Seq No."]}></React.Fragment>;

                                    return (
                                        <React.Fragment key={week["Seq No."]}>
                                            {/* Editable Sales Units */}
                                            <td className="p-3 border">
                                                <input
                                                    type="number"
                                                    className="w-16 text-center border rounded"
                                                    value={row["Sales Units"]}
                                                    onChange={(e) => handleSalesUnitsChange(row.Store, row.SKU, row.Week, parseInt(e.target.value))}
                                                />
                                            </td>
                                            {/* Non-editable Calculated Fields */}
                                            <td className="p-3 border">${row["Sales Dollars"].toFixed(2)}</td>
                                            <td className="p-3 border">${row["GM Dollars"].toFixed(2)}</td>
                                            <td className={`p-3 border ${getColor(row["GM %"])}`}>
                                                {(row["GM %"] * 100).toFixed(2)}%
                                            </td>
                                        </React.Fragment>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlanningGrid;
