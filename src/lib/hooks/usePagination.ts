import { WithPaginationInput } from "@/schema/helpers/WithPagination";
import { useRouter } from "next/router"

export const usePagination = () => {
    const router = useRouter();
    const page = router.query.page ? Number(router.query.page) : 1;
    const pageSize = router.query.limit ? Number(router.query.limit) : 30;

    return {
       page,
       pageSize
    }
}