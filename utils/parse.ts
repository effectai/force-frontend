export const parseQuantityString = (quantity: string): number => {
    const quantityString = quantity.replace(/ /g, "");
    return parseFloat(quantityString);
}