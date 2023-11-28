export function extractPrice(...elements: any) {
    for(const element of elements) {
        const priceText = element.text().trim();

        if(priceText) return priceText.replace(/[^\d.]/g, '');

        return '';
    }
}


export function extractCurreny(element: any) {
    const currencyText = element.text().trim().slice(0, 1);

    return currencyText ? currencyText : '';
}


export function extractDiscription(element: any) {
    const discriptionText = element.text().trim();

    return discriptionText ? discriptionText : '';
}