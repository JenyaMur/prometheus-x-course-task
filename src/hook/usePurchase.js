import { useContext } from "react";
import { PurchaseContext } from "../hoc/PurchaseProvider";

export default function usePurchase() {
    return useContext(PurchaseContext)
}