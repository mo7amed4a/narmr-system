import api from "@/lib/axios";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";

export const getBranches = () => tryCatchWrapper(async() => {
    const res = await api.get("/branches");
    return res?.data?.data
})