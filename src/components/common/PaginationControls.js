import React from "react";
import {Box, Pagination} from "@mui/material";

const PaginationControls = ({currentPage, totalPages, onPageChange}) => {
    return (
        <Box sx={{display: "flex", justifyContent: "center", mt: 2}}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => onPageChange(page)}
                color="primary"
                shape="rounded"
                sx={{alignSelf: "center"}}
            />
        </Box>
    );
};

export default PaginationControls;
