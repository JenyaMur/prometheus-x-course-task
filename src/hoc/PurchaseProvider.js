import { createContext, useState } from "react";

export const PurchaseContext = createContext(null);

export const PurchaseProvider = ({children}) => {
    const [purchase, setPurchase] = useState(null);

    const addPurchase = (arr) => {
        setPurchase(arr);
    }
    const deletePurchase = () => {
        setPurchase(null);
    }
    const value = {purchase, addPurchase, deletePurchase};
    return (
        <PurchaseContext.Provider value={value}>
            {children}
        </PurchaseContext.Provider>
    )
}