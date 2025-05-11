"use client"
import { useNavigate, useLocation } from "react-router-dom"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

function Pagination({ currentPage, totalPages }) {
  const navigate = useNavigate()
  const location = useLocation()

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(location.search)
    params.set("page", pageNumber.toString())
    return `?${params.toString()}`
  }

  // Generate page numbers to display
  const generatePagination = () => {
    // If there are 7 or fewer pages, display all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always include first and last page
    const firstPage = 1
    const lastPage = totalPages

    // Calculate middle pages
    const leftSiblingIndex = Math.max(currentPage - 1, 1)
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages)

    // Don't show dots if only one position away
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    // Case 1: Show left dots but no right dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 5
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1)
      return [firstPage, "...", ...rightRange]
    }

    // Case 2: Show right dots but no left dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 5
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
      return [...leftRange, "...", lastPage]
    }

    // Case 3: Show both left and right dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      )
      return [firstPage, "...", ...middleRange, "...", lastPage]
    }

    return []
  }

  const pages = generatePagination()

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className={`p-2 border rounded-md ${currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => navigate(createPageURL(currentPage - 1))}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="sr-only">Previous page</span>
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <button key={`ellipsis-${i}`} className="p-2 border rounded-md opacity-50 cursor-not-allowed">
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">More pages</span>
          </button>
        ) : (
          <button
            key={`page-${page}`}
            className={`px-3 py-2 border rounded-md ${currentPage === page ? "bg-primary text-white" : ""}`}
            onClick={() => navigate(createPageURL(page))}
          >
            {page}
          </button>
        ),
      )}

      <button
        className={`p-2 border rounded-md ${currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => navigate(createPageURL(currentPage + 1))}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="w-4 h-4" />
        <span className="sr-only">Next page</span>
      </button>
    </div>
  )
}

export default Pagination
