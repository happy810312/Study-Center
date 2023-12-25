import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SeatCategories from "../components/SeatCategories-component";
import ConventionComponent from "../components/Convention-component";
import RechargeService from "../services/recharge-service";
import {
  MoneyIcon,
  MoneyCoinIcon,
  StudyIcon,
  StudyLampIcon,
  UserIcon,
} from "../components/icons";

const PlanPage = () => {
  const [sliderPosition, setSliderPosition] = useState("left");
  const [message, setMessage] = useState(null);
  const sliderStyle = {
    transform: sliderPosition === "left" ? "translateX(0)" : "translateX(100%)",
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    value === "reserved"
      ? setSliderPosition("right")
      : setSliderPosition("left");
  };
  const handleRecharge = async (amount) => {
    try {
      // const response = await RechargeService.recharge(amount);
      const response = await RechargeService.recharge(amount);

      if (response.data.message) {
        setMessage(response.data.message);
      }

      window.location.replace(response.data.url);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // 直接幫radio打勾
    const radioLeft = document.querySelector('input[type="radio"]');
    radioLeft.checked = true;
  }, []);

  return (
    <>
      <section className="plan-type trigger-for-header-grey-light">
        <div className="container">
          <div className="plan-type_wrapper">
            <h2 className="plan-type_title">Plan Types</h2>
            <div className="plan-type_pay-type">
              <div
                style={sliderStyle}
                className="plan-type_switch-slider"
              ></div>
              <label className="plan-type_switch-item">
                <input
                  onChange={handleRadioChange}
                  type="radio"
                  name="payType"
                  value="recharge"
                />
                <span className="plan-type_switch-text">Recharge</span>
              </label>
              <label className="plan-type_switch-item">
                <input
                  onChange={handleRadioChange}
                  type="radio"
                  name="payType"
                  value="reserved"
                />
                <span className="plan-type_switch-text">Reserved</span>
              </label>
            </div>
            {message && <div className="alert alert-danger">{message}</div>}
            <div className="plan-type_group">
              {sliderPosition === "left" && (
                <ul className="plan-type_group-menu">
                  <li className="plan-type_group-item">
                    <div className="plan-type_group-item-logo">
                      <MoneyIcon />
                    </div>
                    <div className="plan-type_group-item-body">
                      <h3 className="plan-type_group-item-title">
                        Micro Deposit
                      </h3>
                      <span className="plan-type_group-item-description">
                        Approximately usable for 1-2 weeks
                      </span>
                    </div>
                    <div className="plan-type_group-item-price">
                      <span className="plan-type_group-item-price-unit">
                        NT$
                      </span>
                      <h4 className="plan-type_group-item-price-number">500</h4>
                      <span className="plan-type_group-item-discount-mobile">
                        No discount
                      </span>
                    </div>
                    <span className="plan-type_group-item-discount">
                      No discount
                    </span>
                    <Link
                      onClick={(e) => {
                        handleRecharge(500);
                      }}
                      className="plan-type_group-item-submit"
                      type="button"
                    >
                      LinePay
                    </Link>
                  </li>
                  <li className="plan-type_group-item">
                    <div className="plan-type_group-item-logo">
                      <MoneyCoinIcon width={"100px"} height={"100px"} />
                    </div>
                    <div className="plan-type_group-item-body">
                      <h3 className="plan-type_group-item-title">
                        Bulk Deposit
                      </h3>
                      <span className="plan-type_group-item-description">
                        Approximately usable for 3-4 weeks
                      </span>
                    </div>
                    <div className="plan-type_group-item-price">
                      <span className="plan-type_group-item-price-unit">
                        NT$
                      </span>
                      <h4 className="plan-type_group-item-price-number">
                        3,000
                      </h4>
                      <span className="plan-type_group-item-discount-mobile">
                        <del>$5,500</del>(Save $2,500)
                      </span>
                    </div>
                    <span className="plan-type_group-item-discount">
                      Regular Price <del>$5,500</del>(Save $2,500)
                    </span>
                    <Link
                      onClick={(e) => {
                        handleRecharge(3000);
                      }}
                      className="plan-type_group-item-submit"
                      type="button"
                    >
                      LinePay
                    </Link>
                  </li>
                </ul>
              )}
              {sliderPosition === "right" && (
                <ul className="plan-type_group-menu">
                  <li className="plan-type_group-item">
                    <div className="plan-type_group-item-logo">
                      <StudyIcon width={"100px"} height={"100px"} />
                    </div>
                    <div className="plan-type_group-item-body">
                      <h3 className="plan-type_group-item-title">By Hours</h3>
                      <span className="plan-type_group-item-description">
                        Seat reservation by the hour
                      </span>
                    </div>
                    <div className="plan-type_group-item-price">
                      <span className="plan-type_group-item-price-unit">
                        NT$
                      </span>
                      <h4 className="plan-type_group-item-price-number">
                        20/hr
                      </h4>
                      <span className="plan-type_group-item-discount-mobile">
                        No discount
                      </span>
                    </div>
                    <span className="plan-type_group-item-discount">
                      No discount
                    </span>
                    <Link
                      to="/booking"
                      className="plan-type_group-item-submit"
                      type="button"
                    >
                      Reserved
                    </Link>
                  </li>
                  <li className="plan-type_group-item">
                    <div className="plan-type_group-item-logo">
                      <StudyLampIcon width={"100px"} height={"100px"} />
                    </div>
                    <div className="plan-type_group-item-body">
                      <h3 className="plan-type_group-item-title">By Periods</h3>
                      <span className="plan-type_group-item-description">
                        Seat reservation by the period
                      </span>
                    </div>
                    <div className="plan-type_group-item-price period-price">
                      <span className="plan-type_group-item-price-unit">
                        NT$
                      </span>
                      <h4 className="plan-type_group-item-price-number">
                        <span className="plan-type_group-item-period">
                          a.m.: 65
                        </span>
                        <span className="plan-type_group-item-period">
                          p.m.: 80
                        </span>
                        <span className="plan-type_group-item-period">
                          e.m.: 95
                        </span>
                      </h4>
                      <span className="plan-type_group-item-discount-mobile">
                        <del>$75,200</del>(Save $39,200)
                      </span>
                    </div>
                    <span className="plan-type_group-item-discount">
                      Regular Price <del>$75,200</del>(Save $39,200)
                    </span>
                    <Link
                      to="/monthy-booking"
                      className="plan-type_group-item-submit"
                      type="button"
                    >
                      Purchase
                    </Link>
                  </li>
                  <li className="plan-type_group-item">
                    <div className="plan-type_group-item-logo">
                      <UserIcon
                        width={"100px"}
                        height={"100px"}
                        fill={"black"}
                      />
                    </div>
                    <div className="plan-type_group-item-body">
                      <h3 className="plan-type_group-item-title">
                        Custom-Made
                      </h3>
                      <span className="plan-type_group-item-description">
                        According to Your Needs
                      </span>
                    </div>
                    <div className="plan-type_group-item-price">
                      <span className="plan-type_group-item-price-unit">
                        NT$
                      </span>
                      <h4 className="plan-type_group-item-price-number">
                        For-free
                      </h4>
                      <span className="plan-type_group-item-discount-mobile">
                        For details, please contact our service staff.
                      </span>
                    </div>
                    <span className="plan-type_group-item-discount">
                      For details, please contact our service staff.
                    </span>
                    <Link
                      to="mailto:happy810312@gmail.com?cc=eva850323@gmail.com&subject=Custom%20Reservation%20Inquiry&body=CardID%3A%0APhone%3A"
                      className="plan-type_group-item-submit"
                      type="button"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
      <ConventionComponent />
      <SeatCategories />
    </>
  );
};

export default PlanPage;
