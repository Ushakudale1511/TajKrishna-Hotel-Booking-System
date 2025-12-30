import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RoomCard from "../room/RoomCard";
import { Button, Row } from "react-bootstrap";
import RoomPaginator from "./RoomPaginator";

const RoomSearchResults = ({ results, onClearSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const resultsPerPage = 3;
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // reset page when results change
  useEffect(() => {
    setCurrentPage(1);
  }, [results]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = results.slice(startIndex, endIndex);

  if (results.length === 0) return null;

  return (
    <>
      <h5 className="text-center mt-5">Search Results</h5>

      <Row>
        {paginatedResults.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </Row>

      <Row className="mt-3 mb-3 justify-content-center">
        {totalResults > resultsPerPage && (
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <div className="text-center mt-2">
          <Button variant="secondary" onClick={onClearSearch}>
            Clear Search
          </Button>
        </div>
      </Row>
    </>
  );
};

RoomSearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

export default RoomSearchResults;
