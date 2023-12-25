import React, { useState, useEffect } from "react";
import ScheduleService from "../services/schedule-service";
import { format, set, subMonths, startOfDay, endOfDay } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { throttle } from "../utils";
import { TrashcanIcon } from "../components/icons";

const SchedulePage = () => {
  // api查詢database資料的變數
  const [dataList, setDataList] = useState([]); // array裡面是object
  const [totalCount, setTotalCount] = useState({
    totalItems: 0,
    totalPages: 1,
    totalDonate: 0,
  });
  const [isDateRange, setIsDateRange] = useState(false); // 是否查詢指定區間

  const [startDate, setStartDate] = useState(subMonths(new Date(), 6));
  const [endDate, setEndDate] = useState(new Date());
  const [[tempStartDate, tempEndDate], tempSetter] = useState([
    subMonths(new Date(), 6),
    new Date(),
  ]);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState(null);

  // 資料顯示變數
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);

  // 翻頁的頁碼變數
  const paginateOptions = Array.from(
    { length: totalCount.totalPages },
    (_, index) => index + 1
  );

  // 查詢指定時間的btn
  const handleSearchBtn = () => {
    setIsDateRange(true);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setPage(1);
  };
  // 換頁按鈕們
  const handlePaginateBtn = (e) => {
    e.preventDefault();
    setPage(e.target.textContent);
  };
  const handlePrevBtn = () => {
    if (Number(page) === paginateOptions[0]) {
      return;
    }
    setPage(page - 1);
  };
  const handleNextBtn = () => {
    if (Number(page) === paginateOptions[paginateOptions.length - 1]) {
      return;
    }
    setPage(page + 1);
  };
  // 刪除的按鈕們
  const handleEditBtn = () => {
    setEdit((prevEditStatus) => {
      setSpanAmount((prev) => (!prevEditStatus ? ++prev : --prev));
      return !prevEditStatus;
    });
  };
  const handleDeleteBtn = async (e) => {
    const rowElement = e.currentTarget.closest(".d-sm-table-row");
    // 抓取座位資訊，用在確認視窗中顯示
    const orderId = rowElement.childNodes[0].getAttribute("data-order-id");
    const startTime = rowElement.childNodes[1].textContent;
    const endTime = rowElement.childNodes[2].textContent;
    const seatNumber = rowElement.childNodes[4].textContent;

    // 確認視窗
    const confirmResult = window.confirm(
      `Start Time : ${startTime}\nEnd Time   : ${endTime}\nSeat Number : ${seatNumber}\nAre you sure to delete ?`
    );

    if (!confirmResult) return;

    ScheduleService.deleteReservation(orderId)
      .then((response) => {
        if (response.status === 200) {
          // 如果只setMessage會造成只更新message的部分 =>
          // react只刷新有更新的地方 => 所以datalist也需要更新
          const updatedDataList = dataList.filter(
            (item) => item._id !== orderId
          );
          setDataList(updatedDataList);
        }
        setMessage(`${response.data.message}`);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };
  // RWD調整tfoot的colspan數量
  const [spanAmount, setSpanAmount] = useState(6);
  useEffect(() => {
    const handleResize = throttle(() => {
      const xs = window.innerWidth < 576;
      const sm = window.innerWidth >= 576 && window.innerWidth < 768;
      const md = window.innerWidth >= 768;
      if (xs && spanAmount !== 1) {
        setSpanAmount(1);
      } else if (sm && spanAmount !== 5) {
        setSpanAmount(5);
      } else if (md && spanAmount !== 6) {
        setSpanAmount(6);
      }
    }, 200);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [spanAmount]);

  // 進入頁面發送request，依據page跟items數量取得req.user座位資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const start = startOfDay(startDate);
        const end = endOfDay(endDate);
        const response = await ScheduleService.getSchedules(
          start,
          end,
          page,
          items
        );

        const documents = response.data.totalDocuments;
        const pages = Math.ceil(documents / items);
        const donates = response.data.totalDonate[0].total;

        setTotalCount({
          totalItems: documents,
          totalPages: pages,
          totalDonate: donates,
        });

        setDataList(response.data.foundSchedules);
        setMessage(null);
      } catch (error) {
        setMessage(error);
      }
    };
    fetchData();
  }, [page, items, startDate, endDate, isDateRange]); // 換頁時重新取得單頁資料

  return (
    <>
      <div className="schedule container-md">
        <div className="wrapper" style={{ padding: "140px 0" }}>
          <h1 className="fw-semibold mb-5">My Schedule.</h1>
          <form>
            <fieldset>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="row mb-3 ">
                  {!edit && (
                    <div className="col-12 col-md-3 mb-3 mb-md-0">
                      <DatePicker
                        className="date-picker"
                        label="Start Date"
                        showDaysOutsideCurrentMonth
                        value={tempStartDate}
                        onChange={(date) => {
                          tempSetter([date, tempEndDate]);
                        }}
                        format="yyyy/MM/dd"
                        formatDensity
                      />
                    </div>
                  )}
                  {!edit && (
                    <div className="col-12 col-md-3 mb-3 mb-md-0">
                      <DatePicker
                        className="date-picker"
                        label="End Date"
                        showDaysOutsideCurrentMonth
                        value={tempEndDate}
                        onChange={(date) => {
                          tempSetter([tempStartDate, date]);
                        }}
                        format="yyyy/MM/dd"
                        formatDensity
                      />
                    </div>
                  )}

                  <div
                    className={`schedule-btns col-12 col-md-6 ${
                      edit ? "offset-md-6" : ""
                    } d-flex flex-column flex-sm-row justify-content-start justify-content-md-between align-items-center`}
                  >
                    {!edit && (
                      <button
                        type="button"
                        onClick={() => {
                          handleSearchBtn(startDate, endDate);
                        }}
                        className="btn btn-lg btn-primary mb-3 mb-sm-0"
                      >
                        Search
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleEditBtn}
                      className={`btn btn-lg btn-primary ${
                        edit ? "ms-auto" : ""
                      } ${!edit ? "ms-sm-3" : ""}`}
                    >
                      {`${edit ? "Done" : "Edit"}`}
                    </button>
                  </div>
                </div>
              </LocalizationProvider>
            </fieldset>
          </form>
          {message && (
            <div className="alert alert-danger">{String(message)}</div>
          )}
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered border-secondary align-middle caption-top">
              <caption>List of Reservations</caption>
              <thead className="table-dark text-center">
                <tr className="align-middle">
                  <th scope="col" className="col-1">
                    #
                  </th>
                  <th scope="col">Start Time</th>
                  <th scope="col">End Time</th>
                  {/* Period === "時段" or "當天" */}
                  <th scope="col">Period</th>
                  <th scope="col">Seat Number</th>
                  <th
                    scope="col"
                    className="d-table-cell d-sm-none d-md-table-cell"
                  >
                    Reserve Date
                  </th>
                  <th scope="col">Price</th>
                  {edit && <th scope="col">Edit</th>}
                </tr>
              </thead>
              <tbody className="table-group-divider text-center">
                {dataList &&
                  dataList.map((data, index) => {
                    return (
                      <tr className={`d-flex d-sm-table-row flex-column my-3`}>
                        <td
                          className="d-flex d-sm-table-cell align-self-center p-0 p-sm-2"
                          data-order-id={data._id}
                          data-title="#"
                        >
                          <span className="flex-grow-1 flex-sm-grow-0 flex-shrink-1 flex-sm-shrink-0 align-self-center align-self-sm-stretch p-2">
                            {1 + index + (page - 1) * items}
                          </span>
                        </td>
                        {/* data.data */}
                        <td
                          className="d-flex d-sm-table-cell align-self-center p-0 p-sm-2"
                          data-title="Start Time"
                        >
                          <span className="flex-grow-1 flex-sm-grow-0 flex-shrink-1 flex-sm-shrink-0 align-self-center align-self-sm-stretch p-2">
                            {format(
                              new Date(data.startTime),
                              "yyyy/MM/dd HH:mm aaa"
                            )}
                          </span>
                        </td>
                        <td
                          className="d-flex d-sm-table-cell align-self-center p-0 p-sm-2"
                          data-title="End Time"
                        >
                          <span className="flex-grow-1 flex-sm-grow-0 flex-shrink-1 flex-sm-shrink-0 align-self-center align-self-sm-stretch p-2">
                            {format(
                              new Date(data.endTime),
                              "yyyy/MM/dd HH:mm aaa"
                            )}
                          </span>
                        </td>
                        <td
                          className="d-flex d-sm-table-cell align-self-center p-0 p-sm-2"
                          data-title="Period"
                        >
                          <span className="flex-grow-1 flex-sm-grow-0 flex-shrink-1 flex-sm-shrink-0 align-self-center align-self-sm-stretch p-2">
                            {data.period}
                          </span>
                        </td>
                        <td
                          className="d-flex d-sm-table-cell align-self-center p-0 p-sm-2"
                          data-title="Seat Number"
                        >
                          <span className="flex-grow-1 flex-sm-grow-0 flex-shrink-1 flex-sm-shrink-0 align-self-center align-self-sm-stretch p-2">
                            {data.seatNumber}
                          </span>
                        </td>
                        <td
                          data-title="Reserve Date"
                          className="d-flex d-sm-none d-md-table-cell align-self-center p-0 p-sm-2"
                        >
                          <span className="flex-grow-1 flex-sm-grow-0 flex-shrink-1 flex-sm-shrink-0 align-self-center align-self-sm-stretch p-2">
                            {format(
                              new Date(data.createdAt),
                              "yyyy/MM/dd HH:mm aaa"
                            )}
                          </span>
                        </td>
                        <td
                          className="d-flex d-sm-table-cell align-self-center p-0 p-sm-2"
                          data-title="Price"
                        >
                          <span className="flex-grow-1 flex-sm-grow-0 flex-shrink-1 flex-sm-shrink-0 align-self-center align-self-sm-stretch p-2">{`NT$${data.price}`}</span>
                        </td>
                        {edit && (
                          <td
                            className="d-flex d-sm-table-cell align-self-center p-0 p-sm-2"
                            data-title="Cancel"
                          >
                            <span className="flex-grow-1 flex-sm-grow-0 flex-shrink-1 flex-sm-shrink-0 align-self-center align-self-sm-stretch p-2">
                              <button
                                className="bg-transparent border-0"
                                onClick={handleDeleteBtn}
                                type="submit"
                              >
                                <TrashcanIcon width={"20px"} height={"20px"} />
                              </button>
                            </span>
                            {/* <input type="checkbox" /> */}
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
              {Number(page) === paginateOptions[paginateOptions.length - 1] && (
                <tfoot>
                  <tr className="d-flex d-sm-table-row">
                    <th
                      scope="col"
                      colSpan={spanAmount}
                      className="text-end w-100"
                    >
                      Total Donate :{" "}
                    </th>
                    <th scope="col" className="text-center">
                      {`NT$${totalCount.totalDonate}`}
                    </th>
                  </tr>
                </tfoot>
              )}
            </table>
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-end">
                <li
                  className={`page-item ${
                    Number(page) === paginateOptions[0] ? "disabled" : ""
                  }`}
                  onClick={handlePrevBtn}
                >
                  <button className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {paginateOptions.map((p) => {
                  return (
                    <li
                      className={`page-item ${
                        Number(page) === p ? "active" : ""
                      }`}
                      onClick={handlePaginateBtn}
                    >
                      <button className="page-link" href="#">
                        {p}
                      </button>
                    </li>
                  );
                })}
                <li
                  className={`page-item ${
                    Number(page) === paginateOptions[paginateOptions.length - 1]
                      ? "disabled"
                      : ""
                  }`}
                  onClick={handleNextBtn}
                >
                  <button className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchedulePage;
