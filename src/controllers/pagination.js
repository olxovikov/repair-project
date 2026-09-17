const getVisibleItems = (page, limit, array) => {
    let result = []
    for (let i = (page-1)*limit; i < (page*limit) && array[i]; i++) {
        result.push(array[i])
    }
    return result;
}

const handlePageChange = (value, setter, page, totalPage) => {
    if (value === "&laquo;") {
        setter(1);
    } else if (value === "&lsaquo;") {
        if (page !== 1) {
            setter(page - 1)
        }
    } else if (value === "&rsaquo;") {
        if (page !== totalPage) {
            setter(page + 1)
        }
    } else if (value === "&raquo;") {
        setter(totalPage)
    } else {
        if (value !== " ..." && value !== "... ") {
            setter(value)
        }
    }
}

export {getVisibleItems, handlePageChange}