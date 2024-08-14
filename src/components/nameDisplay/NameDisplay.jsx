import React, { useCallback, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Pagination, TextField } from "@mui/material";
import axios from "axios";

const NameDisplay = () => {
  const [allNames, setAllNames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const getAllNames = useCallback(async (page) => {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );
    console.log(response.data);
    const { data, total_pages } = response.data;
    setAllNames(data);
    setTotalPage(total_pages);
  }, []);

  useEffect(() => {
    getAllNames(currentPage);
  }, [getAllNames, currentPage]);

  const filteredName = allNames?.filter((each) =>
    `${each.first_name}  ${each.last_name}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );
  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchValue}
        onChange={handleSearchChange}
        margin="normal"
      />
      <div className="card-container ">
        {filteredName?.map((each, idx) => {
          const { id, first_name, last_name, avatar, email } = each;
          return (
            <div
              className="each-card flex bg-backgroundColor rounded-lg p-4 m-4"
              key={id}
            >
              <Avatar src={avatar} sx={{ width: 56, height: 56 }} />
              <div className="flex justify-start items-start flex-col ml-4">
                <div className="text-fontColor font-bold text-[20px]">
                  {first_name}
                  {last_name}
                </div>
                <div className="text-fontColor font-bold">{email}</div>
              </div>
            </div>
          );
        })}
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </>
  );
};

export default NameDisplay;
