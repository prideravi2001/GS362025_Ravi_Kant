export const tableMapping = (skuArray: any[]) => {
    const idToLabelMap = Object.fromEntries(skuArray.map(item => [item.ID, item.Label]));
    console.log(idToLabelMap);
    return idToLabelMap;   
}

