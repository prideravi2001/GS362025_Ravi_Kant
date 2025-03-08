
export const calculateSalesDollars = (units: number, price: number) => {
    return units * price;
};

export const calculateGMDollars = (salesDollars: number, units: number, cost: number) => {
    return salesDollars - units * cost;
};

export const calculateGMPercentage = (gmDollars: number, salesDollars: number) => {
    return salesDollars > 0 ? (gmDollars / salesDollars) * 100 : 0;
};
