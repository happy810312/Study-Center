import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SeatCategories from "../components/SeatCategories-component";
import ScheduleService from "../services/schedule-service";
import { addMonths, format, set } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const SchedulePage = () => {
  // api查詢database資料的變數
  const [dataList, setDataList] = useState([]); // array裡面是object
  const [dataIndex, setDataIndex] = useState([]); // array裡面是index編號
  const [totalCount, setTotalCount] = useState({
    totalItems: 0,
    totalPages: 0,
    totalDonate: 0,
  });
  const [isDateRange, setIsDateRange] = useState(false); // 是否查詢指定區間

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addMonths(new Date(), 1));
  const [cancel, setCancel] = useState(false);
  const [message, setMessage] = useState(null);

  // 資料顯示變數
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);
  // const location = useLocation();
  // const [page, setPage] = useState(
  //   new URLSearchParams(location.search).get("page")
  // );
  // const [items, setItems] = useState(
  //   new URLSearchParams(location.search).get("items")
  // );

  // 翻頁的頁碼變數
  const paginateOptions = Array.from(
    { length: totalCount.totalPages },
    (_, index) => index + 1
  );

  // 查詢指定時間的btn
  const handleSearchBtn = (startDate, endDate) => {
    // set startDate => 00:00:00 , endDate => 23:59:59
    const setStartDate = set(new Date(startDate), {
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    const setEndDate = set(new Date(endDate), {
      hours: 23,
      minutes: 59,
      seconds: 59,
    });

    ScheduleService.getDateRangeSchedule(
      setStartDate.toISOString(),
      setEndDate.toISOString()
    )
      .then((foundSchedule) => {
        setDataList(foundSchedule.data);
        setIsDateRange(true);
        // console.log(foundSchedule.data);
      })
      .catch((error) => {
        setMessage(error.response.data.msg);
      });
  };
  // 換頁按鈕們
  const handlePaginateBtn = (e) => {
    e.preventDefault();
    setPage(e.target.textContent);
  };
  const handlePrevBtn = () => {
    if (Number(page) === paginateOptions[0]) {
      return;
    } else {
      setPage(page - 1);
    }
  };
  const handleNextBtn = () => {
    if (Number(page) === paginateOptions[paginateOptions.length - 1]) {
      return;
    } else {
      setPage(page + 1);
    }
  };
  // 刪除的按鈕們
  const handleCancelBtn = (e) => {
    setCancel(!cancel);
  };
  const handleDeleteBtn = (e) => {
    // 抓取座位資訊，用在確認視窗中顯示
    const orderId =
      e.currentTarget.parentNode.parentNode.childNodes[0].getAttribute(
        "data-order-id"
      );
    const startTime =
      e.currentTarget.parentNode.parentNode.childNodes[1].textContent;
    const endTime =
      e.currentTarget.parentNode.parentNode.childNodes[2].textContent;
    const seatNumber =
      e.currentTarget.parentNode.parentNode.childNodes[4].textContent;

    // 確認視窗
    const confirmResult = window.confirm(
      `Start Time : ${startTime}\nEnd Time   : ${endTime}\nSeat Number : ${seatNumber}\nAre you sure to delete ?`
    );

    if (confirmResult) {
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
          // console.log(error);
          setMessage(error.response.data.message);
        });
    }
  };

  // 排序order日期，降序排序b-a
  // 故障，待修
  const sortObjByDate = (orders) => {
    return orders.sort((order1, order2) => {
      const date1 = new Date(order1.startTime);
      const date2 = new Date(order2.startTime);
      if (date1 < date2) return 1; // 降序排序
      if (date1 > date2) return -1;
      return 0;
    });
  };

  // 進入頁面發送request，依據page跟items數量取得req.user座位資料
  useEffect(() => {
    ScheduleService.getPageSchedule(page, items)
      .then((scheduleMenu) => {
        setDataIndex(scheduleMenu.data.dataLength);
        setDataList(scheduleMenu.data.dataToDisplay);
        setMessage(null);
      })
      .catch((e) => {
        setMessage(e);
      });
  }, [page]); // 換頁時重新取得單頁資料

  // 進入頁面發送request，取得總共頁面數量及items數量
  useEffect(() => {
    // 第一次進到schedule頁面，還沒選擇指定時間
    if (!isDateRange) {
      ScheduleService.getAllScheduleCount()
        .then((response) => {
          setTotalCount({
            totalItems: response.data.totalItems,
            totalPages: response.data.totalPages,
            totalDonate: response.data.totalDonate,
          });
          setMessage(null);
        })
        .catch((e) => {
          setMessage(e);
        });
    }
    // 選擇指定時間後執行
    else {
      const startDateISO = startDate.toISOString();
      const endDateISO = endDate.toISOString();
      ScheduleService.getDateRangeCount(startDateISO, endDateISO, items)
        .then((response) => {
          console.log(response);
          setTotalCount({
            totalItems: response.data.totalItems,
            totalPages: response.data.totalPages,
            totalDonate: response.data.totalDonate,
          });
          setMessage(null);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [dataList]);

  return (
    <>
      <div className="container container-fluid">
        <div className="wrapper" style={{ padding: "140px 0" }}>
          <h1 className="fw-semibold mb-5" style={{ fontSize: "3.5rem" }}>
            My Schedule.
          </h1>
          <form>
            <fieldset>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="row mb-3 ">
                  <div className="col-12 col-md-3 mb-3 mb-md-0">
                    <DatePicker
                      className="date-picker"
                      label="Start Date"
                      showDaysOutsideCurrentMonth
                      value={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                      }}
                      format="yyyy/MM/dd"
                      formatDensity
                    />
                  </div>
                  <div className="col-12 col-md-3 mb-3 mb-md-0">
                    <DatePicker
                      className="date-picker"
                      label="End Date"
                      showDaysOutsideCurrentMonth
                      value={endDate}
                      onChange={(date) => {
                        setEndDate(date);
                      }}
                      format="yyyy/MM/dd"
                      formatDensity
                    />
                  </div>
                  <div className="col-12 col-md-2 offset-0 offset-md-4 d-flex justify-content-start justify-content-md-end align-items-center">
                    {!cancel && (
                      <button
                        type="button"
                        onClick={() => {
                          handleSearchBtn(startDate, endDate);
                        }}
                        className="btn btn-primary"
                      >
                        Search
                      </button>
                    )}
                    {!cancel && (
                      <button
                        type="button"
                        onClick={handleCancelBtn}
                        className="btn btn-primary ms-3"
                      >
                        Cancel
                      </button>
                    )}
                    {cancel && (
                      <button
                        type="button"
                        onClick={handleCancelBtn}
                        className="btn btn-primary ms-3"
                      >
                        Done
                      </button>
                    )}
                  </div>
                </div>
              </LocalizationProvider>
            </fieldset>
          </form>
          {message && (
            <div className="alert alert-danger">{String(message)}</div>
          )}
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered align-middle caption-top">
              <caption>List of Reservations</caption>
              <thead className="table-dark text-center">
                <tr>
                  <th scope="col" className="col-1">
                    #
                  </th>
                  <th scope="col">Start Time</th>
                  <th scope="col">End Time</th>
                  {/* Period === "時段" or "當天" */}
                  <th scope="col">Period</th>
                  <th scope="col">Seat Number</th>
                  <th scope="col">Reserve Date</th>
                  <th scope="col">Price</th>
                  {cancel && <th scope="col">Cancel</th>}
                </tr>
              </thead>
              <tbody className="table-group-divider text-center">
                {dataList &&
                  sortObjByDate(dataList).map((data, index) => {
                    // array.toReversed()
                    // const reversedIndex = dataList.length - index - 1;
                    return (
                      <tr>
                        <th
                          scope="row"
                          className="col-1"
                          data-order-id={data._id}
                        >
                          {dataIndex[index + (page - 1) * items]}
                        </th>
                        {/* data.data */}
                        <td>
                          {format(
                            new Date(data.startTime),
                            "yyyy/MM/dd HH:mm aaa"
                          )}
                        </td>
                        <td>
                          {format(
                            new Date(data.endTime),
                            "yyyy/MM/dd HH:mm aaa"
                          )}
                        </td>
                        <td>{data.period}</td>
                        <td>{data.seatNumber}</td>
                        <td>
                          {format(
                            new Date(data.createdAt),
                            "yyyy/MM/dd HH:mm aaa"
                          )}
                        </td>
                        <td>{`NT$${data.price}`}</td>
                        {cancel && (
                          <td>
                            <button
                              className="bg-transparent border-0"
                              onClick={handleDeleteBtn}
                              type="submit"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                                  stroke="#000000"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            {/* <input type="checkbox" /> */}
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
              {Number(page) === paginateOptions[paginateOptions.length - 1] && (
                <tfoot>
                  <tr>
                    <th scope="col" colSpan={6} className="text-end">
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
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {paginateOptions.map((p) => {
                  return (
                    <li
                      className={`page-item ${page == p ? "active" : ""}`}
                      onClick={handlePaginateBtn}
                    >
                      <a className="page-link" href="#">
                        {p}
                      </a>
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
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <SeatCategories />
    </>
  );
};

export default SchedulePage;
