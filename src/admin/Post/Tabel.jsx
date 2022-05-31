import React from "react";
import Pagenation from "../../Components/Pagenation";
import DropDown from "../../Components/DropDown";
import Title from "../../Components/Title";

const Tabel = ({
  currentPage,
  filtered,
  handelUpdate,
  handelDelete,
  handelShowRows,
  handelPageChange,
  postList,
  pageSize,
}) => {
  return (
    <>
      {filtered.length === 0 ? (
        <div className="mt-1 mb-1">
          <Title title={"there are no posts in the database"} />
        </div>
      ) : (
        <>
          <div className="mt-1 mb-1">
            <Title
              title={`showing ${postList.length} posts out of ${filtered.length}`}
            />
          </div>

          <div className="mt-1 mb-1">
            <DropDown onChange={handelShowRows} pageSize={pageSize} />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {postList.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <th scope="row">{item.id}</th>
                    <td>{item.title}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <i
                          className="fa-solid fa-pen-to-square "
                          onClick={() => handelUpdate(item)}
                        ></i>
                        <i
                          className="fa-solid fa-trash-can"
                          onClick={() => handelDelete(item)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagenation
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handelPageChange}
            itemsCount={filtered.length}
          />
        </>
      )}
    </>
  );
};

export default Tabel;
