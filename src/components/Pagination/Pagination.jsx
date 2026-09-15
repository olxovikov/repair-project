import React from 'react'
import './Pagination.css'
import range from 'lodash.range'

function Pagination({totalPage, page, limit, siblings, handlePageChange}) {
    const getPaginationRange = (totalPage, page, limit, siblings) => {
        let totalPageNoInArray = 7 + siblings;
        if (totalPageNoInArray >= totalPage) {
            return range(1, totalPage + 1)
        }

        let leftSiblingsIndex = Math.max(page - siblings, 1)
        let rightSiblingsIndex = Math.min(page + siblings, totalPage)

        let showLeftDots = leftSiblingsIndex > 2
        let showRightDots = rightSiblingsIndex < totalPage - 2

        if(!showLeftDots && showRightDots) {
            let leftItemsCount = 2 + 2 * siblings
            let leftRange = range(1, leftItemsCount+1)
            // return [...leftRange, " ...", totalPage]
            return [...leftRange, " ..."]
        } else if (showLeftDots && !showRightDots) {
            let rightItemsCount = 2 + 2 * siblings
            let rightRange = range(totalPage - rightItemsCount + 1, totalPage+1)
            // return [1, "... ", ...rightRange]
            return ["... ", ...rightRange]
        } else {
            let middleRange = range(leftSiblingsIndex, rightSiblingsIndex+1)
            // return [1, "... ", ...middleRange, " ...", totalPage]
            return ["... ", ...middleRange, " ..."]
        }
    }

    let array = getPaginationRange(totalPage, page, limit, siblings)

    return (
        <ul className="pagination">
            <li className={(page === 1) ? "page-item disabled" : "page-item"}><span className="page-link" onClick={()=>handlePageChange("&laquo;")}>&laquo;</span></li>
            <li className={(page === 1) ? "page-item disabled" : "page-item"}><span className="page-link" onClick={()=>handlePageChange("&lsaquo;")}>&lsaquo;</span></li>
            {array.map(element=>{
                return <li key={element} className={(element===page) ? "page-item active" : "page-item"}><span className="page-link" onClick={()=>handlePageChange(element)}>{element}</span></li>
                
            })}
            <li className={(page === totalPage) ? "page-item disabled" : "page-item"}><span className="page-link" onClick={()=>handlePageChange("&rsaquo;")}>&rsaquo;</span></li>
            <li className={(page === totalPage) ? "page-item disabled" : "page-item"}><span className="page-link" onClick={()=>handlePageChange("&raquo;")}>&raquo;</span></li>
        </ul>
    )
}

export default Pagination