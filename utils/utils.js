import admin from "firebase-admin"

export function listActions(inputSort, inputRange, filter) {
    let parsedSort;
    let parsedRange;
    let parsedFilter;
    let startRange;
    let endRange;

    if (inputSort != null && inputSort != undefined && inputSort.length > 0) {
        parsedSort = JSON.parse(inputSort);
        console.log(parsedSort);
    }

    if (inputRange != null && inputRange != undefined && inputRange.length > 0) {
        parsedRange = JSON.parse(inputRange);
        startRange = +parsedRange[0];
        endRange = +parsedRange[1];
    }

    if (filter != null && filter != undefined && filter.length > 0) {
        parsedFilter = JSON.parse(filter);
        console.log(parsedFilter);
    }

    return { sort: parsedSort, range: parsedRange, filter: parsedFilter, startRange: startRange };
}

/**
 * @param {admin.firestore.CollectionReference} dbRef
 * @param {Array} sort
 * @param {Array} range
 * @param {Object} filter
 */
export function listActionsDAO(dbRef, sort, range, filter, resource) {
    let keys;
    let field;
    let order;
    let query;

    query = dbRef

    if (sort || filter) {
        if (!(typeof filter == "undefined") && Object.keys(filter).length != 0) {
            keys = Object.keys(filter);
            keys.map((key) => {
                if (Array.isArray(filter[key])){
                    query = query.where(key, "array-contains-any", filter[key])
                } else {
                    query = query.where(key, "==", filter[key])
                }
            });
        }
        if (sort) {
            field = sort[0];
            order = sort[1]?.toLowerCase();
            if (!["asc", "desc"].includes(order)) {
                order = "asc"
            }
            if (field == "id") {
                field = "createdAt";
            }
            if (field) {
                if (filter != undefined) {
                    keys = Object.keys(filter);
                    if (!(keys.includes(field))) {
                        query = query.orderBy(field, order);
                    }
                } else {
                    query = query.orderBy(field, order);
                }
            }
        }
    }

    if (range !== undefined) {
        const start = range[0];
        const end = range[1];
        query = query.limit(end + 1 - start).offset(start);
    }

    return query;
}