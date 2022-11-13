let queryHelper = {
    buildQuery: (filters) => {
        finalSorting = {}
        finalFilters = {}

        // TODO: correct this
        if (filters["course_department"] !== "None") {
            finalFilters["course_department"] = filters["course_department"]
        }

        // TODO: correct this
        if (filters["course_number"] !== "None") {
            finalFilters["course_number"] = filters["course_number"]
        }

        // TODO: correct this
        if (filters.hasOwnProperty("num_credits") && parseInt(filters["num_credits"]) !== 0) {
            finalFilters["num_credits"] = {"$gte": parseInt(filters["num_credits"])}
        }

        // TODO: correct this
        if (filters["semester"] !== "None") {
            finalFilters["semester"] = filters["semester"]
        }

        if ((filters.hasOwnProperty("order") && filters.hasOwnProperty("order2"))&&(filters["order"] !== "None" && filters["order2"] !== "None")) {
            finalSorting[`${filters["order"]}`] = (filters["order2"] === "Ascending") ? 1 : -1
        }

        return {"filterConfig": finalFilters, "sortingConfig": finalSorting}
    },
    queryParams: () => "/:course_department/:course_number/:num_credits/:semester/:order/:order2"
}

module.exports = queryHelper;