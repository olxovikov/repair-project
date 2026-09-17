import React from 'react'
import './Pagination.css'
import range from 'lodash.range'

function Pagination({totalPage, page, setPage, siblings, handlePageChange, format}) {
    const getPaginationRange = (totalPage, page, siblings) => {
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

    let array = [page]

    if (format !== 'mini') {
        array = getPaginationRange(totalPage, page, siblings)
    }

    return (
        <ul className="pagination">
            {
                format !== 'mini' && 
                <li className={(page === 1) ? "page-item disabled" : "page-item"}><span className="page-link" onClick={()=>handlePageChange("&laquo;", setPage, page, totalPage)}>&laquo;</span></li>
            }
            
            <li className={(page === 1) ? "page-item disabled" : "page-item"}><span className="page-link" onClick={()=>handlePageChange("&lsaquo;", setPage, page, totalPage)}>&lsaquo;</span></li>
            {array.map(element=>{
                return <li key={element} className={(element===page & format !== 'mini') ? "page-item active" : "page-item"}><span className="page-link" onClick={()=>handlePageChange(element, setPage, page, totalPage)}>{element}</span></li>
                
            })}
            <li className={(page === totalPage) ? "page-item disabled" : "page-item"}><span className="page-link" onClick={()=>handlePageChange("&rsaquo;", setPage, page, totalPage)}>&rsaquo;</span></li>
            {
                format !== 'mini' &&
                <li className={(page === totalPage) ? "page-item disabled" : "page-item"}><span className="page-link" onClick={()=>handlePageChange("&raquo;", setPage, page, totalPage)}>&raquo;</span></li>
            }
            
        </ul>
    )
}

export default Pagination