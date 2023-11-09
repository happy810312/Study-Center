import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SeatCategories from "../components/SeatCategories-component";
// import UserService from "../services/user-service";
import RechargeService from "../services/recharge-service";

const PlanPage = () => {
  const navigate = useNavigate();
  const [sliderPosition, setSliderPosition] = useState("left");
  const [selectedOption, setSelectedOption] = useState("recharge");
  const sliderStyle = {
    transform: sliderPosition === "left" ? "translateX(0)" : "translateX(100%)",
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value === "recharge") {
      setSliderPosition("left");
    } else if (value === "reserved") {
      setSliderPosition("right");
    }
  };
  const handleRecharge = async (amount) => {
    try {
      // const response = await RechargeService.recharge(amount);
      const response = await RechargeService.recharge(amount);
      window.location.replace(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // 直接幫radio打勾
    const firstRadio = document.querySelector('input[type="radio"]');
    firstRadio.checked = true;
  }, []);

  // linePay user comfirm => comfirm api

  const [active, setActive] = useState(false);

  const handleToggleButton = (event) => {
    const clickedButton = event.target;
    const listItem = clickedButton.closest("li");
    console.log(listItem);
    if (listItem) {
      active
        ? listItem.classList.remove("active")
        : listItem.classList.add("active");
      setActive(!active);
    }
  };

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
            <div className="plan-type_group">
              {sliderPosition === "left" && (
                <ul className="plan-type_group-menu">
                  <li className="plan-type_group-item">
                    <div className="plan-type_group-item-logo">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        <path
                          d="M79.5427 47.6651L50.675 26.2235C50.2748 25.9255 49.7253 25.9255 49.3244 26.2235L20.4577 47.6651C19.9555 48.0384 19.85 48.7475 20.2238 49.2505C20.5971 49.7528 21.3057 49.8578 21.8092 49.4845L25.2633 46.9189V58.9897C25.2633 59.615 25.7701 60.1231 26.3962 60.1231C27.0219 60.1231 27.5296 59.6154 27.5296 58.9897L27.5292 45.2368L50.0004 28.5459L72.4728 45.2378V71.2834H59.0669V51.6011C59.0669 50.9754 58.5593 50.4682 57.9336 50.4682H42.0667C41.441 50.4682 40.9333 50.975 40.9333 51.6011V71.2834H26.396C25.7703 71.2834 25.2631 71.7911 25.2631 72.4168C25.2631 73.0421 25.7699 73.5497 26.396 73.5497H73.6057C74.2314 73.5497 74.7387 73.042 74.7387 72.4168V46.9208L78.1916 49.486C78.3946 49.6366 78.6315 49.7099 78.8658 49.7099C79.2128 49.7099 79.5539 49.5517 79.7766 49.252C80.1499 48.7498 80.0444 48.04 79.5422 47.6666L79.5427 47.6651ZM43.2006 52.7318H56.8014V71.2816H43.2006V52.7318Z"
                          fill="#37474F"
                        />
                        <path
                          d="M55.2971 42.0186C55.2971 39.0972 52.9211 36.7205 50.0002 36.7205C47.0792 36.7205 44.7032 39.0969 44.7032 42.0186C44.7032 44.9396 47.0792 47.3159 50.0002 47.3159C52.9211 47.3159 55.2971 44.939 55.2971 42.0186ZM46.9689 42.0186C46.9689 40.347 48.329 38.9868 50.0003 38.9868C51.6715 38.9868 53.0317 40.347 53.0317 42.0186C53.0317 43.6903 51.6719 45.0496 50.0003 45.0496C48.3286 45.0496 46.9689 43.6902 46.9689 42.0186Z"
                          fill="#37474F"
                        />
                        <path
                          d="M55.1429 64.1257C55.1429 64.9791 54.4506 65.6714 53.5972 65.6714C52.7434 65.6714 52.0515 64.9791 52.0515 64.1257C52.0515 63.2719 52.7434 62.5801 53.5972 62.5801C54.4506 62.5801 55.1429 63.2719 55.1429 64.1257Z"
                          fill="#37474F"
                        />
                        <script xmlns="" />
                      </svg>
                    </div>
                    <h3 className="plan-type_group-item-title">Late Bloomer</h3>
                    <span className="plan-type_group-item-description">
                      Persistent Efforts to Achieve Goals
                    </span>
                    <div className="plan-type_group-item-price">
                      <span className="plan-type_group-item-price-unit">
                        NT$
                      </span>
                      <h4 className="plan-type_group-item-price-number">500</h4>
                    </div>
                    <span className="plan-type_group-item-discount">
                      Tea Bags For Free
                    </span>
                    <Link
                      to="#"
                      onClick={() => {
                        handleRecharge(500);
                      }}
                      className="plan-type_group-item-submit"
                      type="button"
                    >
                      Purchase
                    </Link>
                  </li>
                  <li className="plan-type_group-item">
                    <div className="plan-type_group-item-logo">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        <path
                          d="M71.0008 22C62 22 53.112 26.8357 45.9354 33.6576C44.2394 35.2701 42.6531 36.996 41.1675 38.7975H30.4062C30.3628 38.7936 30.3188 38.7936 30.2749 38.7975C30.1123 38.8263 29.9654 38.9118 29.8594 39.0382L23.5385 46.8028C23.4067 46.9595 23.3505 47.166 23.3842 47.3682C23.4179 47.5703 23.538 47.747 23.7133 47.853L32.55 53.2116C31.9856 54.6592 31.4998 56.0955 31.1283 57.5202C31.0609 57.7613 31.1278 58.0196 31.3031 58.1983L41.8017 68.6969C41.9804 68.8722 42.2386 68.9391 42.4798 68.8717C43.9044 68.5001 45.3408 68.0144 46.7884 67.45L52.147 76.2867C52.2535 76.4551 52.4258 76.5704 52.6221 76.6036C52.8183 76.6372 53.0195 76.5855 53.1752 76.4615L60.9398 70.1186C61.0999 69.9907 61.1961 69.7988 61.2025 69.5938V58.8324C63.004 57.3468 64.7299 55.7606 66.3424 54.0646C73.1643 46.8878 78 37.9992 78 28.9991C78 26.8964 77.9517 24.8923 77.2564 23.1377C77.1852 22.9575 77.0426 22.815 76.8625 22.7437C75.1078 22.0485 73.1037 22.0001 71.001 22.0001L71.0008 22ZM71.0008 23.3997C72.9332 23.3997 74.6253 23.5208 76.0094 23.9904C76.4791 25.3745 76.6002 27.0667 76.6002 28.999C76.6002 37.4959 71.987 46.1055 65.336 53.1021C58.7875 59.9903 50.2868 65.2592 42.5016 67.3839L32.6151 57.4975C34.7403 49.7124 40.0091 41.2121 46.897 34.663C53.8935 28.012 62.5037 23.3989 71 23.3989L71.0008 23.3997ZM64.0018 30.3988C60.9177 30.3988 58.4024 32.9141 58.4024 35.9981C58.4024 39.0822 60.9177 41.5975 64.0018 41.5975C67.0858 41.5975 69.6011 39.0822 69.6011 35.9981C69.6011 32.9141 67.0858 30.3988 64.0018 30.3988ZM64.0018 31.7984C66.3296 31.7984 68.2015 33.6703 68.2015 35.9981C68.2015 38.326 66.3296 40.1978 64.0018 40.1978C61.6739 40.1978 59.8021 38.326 59.8021 35.9981C59.8021 33.6703 61.6739 31.7984 64.0018 31.7984ZM30.7337 40.1977H40.0293C37.1572 43.9057 34.799 47.8949 33.0961 51.8773L25.1343 47.0654L30.7337 40.1977ZM59.8011 59.9701V69.2657L52.9114 74.8651L48.0995 66.9253C52.0907 65.2214 56.0853 62.8487 59.8011 59.9702V59.9701ZM28.9839 61.8727C28.8013 61.88 28.6285 61.9586 28.503 62.0914L24.3033 66.2911C24.1715 66.4244 24.0983 66.6045 24.0997 66.792C24.1012 66.979 24.1774 67.1582 24.3111 67.289C24.4454 67.4204 24.626 67.4926 24.8135 67.4897C25.0005 67.4873 25.1792 67.4101 25.3095 67.2754L29.5087 63.0757C29.7196 62.8726 29.7816 62.5601 29.665 62.2916C29.5478 62.0236 29.2763 61.8566 28.9839 61.8727L28.9839 61.8727ZM33.1836 66.0724C33.0005 66.0797 32.8282 66.1583 32.7022 66.2911L22.2036 76.7897C22.0718 76.923 21.9986 77.1032 22 77.2906C22.0015 77.4776 22.0776 77.6568 22.2119 77.7876C22.3457 77.919 22.5263 77.9912 22.7138 77.9883C22.9008 77.9859 23.0795 77.9087 23.2098 77.774L33.7084 67.2754C33.9193 67.0723 33.9813 66.7593 33.8642 66.4913C33.7475 66.2233 33.4755 66.0558 33.1836 66.0724V66.0724ZM37.3828 70.2721C37.2002 70.2789 37.0274 70.3575 36.9019 70.4908L32.7022 74.69C32.5704 74.8233 32.4972 75.0034 32.4986 75.1909C32.5001 75.3784 32.5762 75.5571 32.7105 75.6884C32.8443 75.8192 33.0249 75.8915 33.2124 75.8891C33.3994 75.8861 33.5781 75.809 33.7084 75.6742L37.9081 71.4751C38.1185 71.272 38.181 70.959 38.0639 70.691C37.9467 70.4225 37.6752 70.2555 37.3828 70.2721Z"
                          fill="#37474F"
                          stroke="#37474F"
                          stroke-width="0.8"
                        />
                        <script xmlns="" />
                      </svg>
                    </div>
                    <h3 className="plan-type_group-item-title">
                      Dream Fulfillment
                    </h3>
                    <span className="plan-type_group-item-description">
                      Stepping Directly onto the Path to Success
                    </span>
                    <div className="plan-type_group-item-price">
                      <span className="plan-type_group-item-price-unit">
                        NT$
                      </span>
                      <h4 className="plan-type_group-item-price-number">
                        3,000
                      </h4>
                    </div>
                    <span className="plan-type_group-item-discount">
                      Regular Price <del>$5,500</del>(Save $2500)
                    </span>
                    <Link
                      to="/booking"
                      className="plan-type_group-item-submit"
                      type="button"
                    >
                      Purchase
                    </Link>
                  </li>
                </ul>
              )}
              {sliderPosition === "right" && (
                <ul className="plan-type_group-menu">
                  <li className="plan-type_group-item">
                    <div className="plan-type_group-item-logo">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        <path
                          d="M79.5427 47.6651L50.675 26.2235C50.2748 25.9255 49.7253 25.9255 49.3244 26.2235L20.4577 47.6651C19.9555 48.0384 19.85 48.7475 20.2238 49.2505C20.5971 49.7528 21.3057 49.8578 21.8092 49.4845L25.2633 46.9189V58.9897C25.2633 59.615 25.7701 60.1231 26.3962 60.1231C27.0219 60.1231 27.5296 59.6154 27.5296 58.9897L27.5292 45.2368L50.0004 28.5459L72.4728 45.2378V71.2834H59.0669V51.6011C59.0669 50.9754 58.5593 50.4682 57.9336 50.4682H42.0667C41.441 50.4682 40.9333 50.975 40.9333 51.6011V71.2834H26.396C25.7703 71.2834 25.2631 71.7911 25.2631 72.4168C25.2631 73.0421 25.7699 73.5497 26.396 73.5497H73.6057C74.2314 73.5497 74.7387 73.042 74.7387 72.4168V46.9208L78.1916 49.486C78.3946 49.6366 78.6315 49.7099 78.8658 49.7099C79.2128 49.7099 79.5539 49.5517 79.7766 49.252C80.1499 48.7498 80.0444 48.04 79.5422 47.6666L79.5427 47.6651ZM43.2006 52.7318H56.8014V71.2816H43.2006V52.7318Z"
                          fill="#37474F"
                        />
                        <path
                          d="M55.2971 42.0186C55.2971 39.0972 52.9211 36.7205 50.0002 36.7205C47.0792 36.7205 44.7032 39.0969 44.7032 42.0186C44.7032 44.9396 47.0792 47.3159 50.0002 47.3159C52.9211 47.3159 55.2971 44.939 55.2971 42.0186ZM46.9689 42.0186C46.9689 40.347 48.329 38.9868 50.0003 38.9868C51.6715 38.9868 53.0317 40.347 53.0317 42.0186C53.0317 43.6903 51.6719 45.0496 50.0003 45.0496C48.3286 45.0496 46.9689 43.6902 46.9689 42.0186Z"
                          fill="#37474F"
                        />
                        <path
                          d="M55.1429 64.1257C55.1429 64.9791 54.4506 65.6714 53.5972 65.6714C52.7434 65.6714 52.0515 64.9791 52.0515 64.1257C52.0515 63.2719 52.7434 62.5801 53.5972 62.5801C54.4506 62.5801 55.1429 63.2719 55.1429 64.1257Z"
                          fill="#37474F"
                        />
                        <script xmlns="" />
                      </svg>
                    </div>
                    <h3 className="plan-type_group-item-title">100 Days</h3>
                    <span className="plan-type_group-item-description">
                      100-Day Short-Term Sprint
                    </span>
                    <div className="plan-type_group-item-price">
                      <span className="plan-type_group-item-price-unit">
                        NT$
                      </span>
                      <h4 className="plan-type_group-item-price-number">
                        3,725
                      </h4>
                    </div>
                    <span className="plan-type_group-item-discount">
                      Regular Price <del>$6,850</del>(Save $3,125)
                    </span>
                    <Link
                      to="/booking"
                      className="plan-type_group-item-submit"
                      type="button"
                    >
                      Purchase
                    </Link>
                  </li>
                  <li className="plan-type_group-item">
                    <div className="plan-type_group-item-logo">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        <path
                          d="M71.0008 22C62 22 53.112 26.8357 45.9354 33.6576C44.2394 35.2701 42.6531 36.996 41.1675 38.7975H30.4062C30.3628 38.7936 30.3188 38.7936 30.2749 38.7975C30.1123 38.8263 29.9654 38.9118 29.8594 39.0382L23.5385 46.8028C23.4067 46.9595 23.3505 47.166 23.3842 47.3682C23.4179 47.5703 23.538 47.747 23.7133 47.853L32.55 53.2116C31.9856 54.6592 31.4998 56.0955 31.1283 57.5202C31.0609 57.7613 31.1278 58.0196 31.3031 58.1983L41.8017 68.6969C41.9804 68.8722 42.2386 68.9391 42.4798 68.8717C43.9044 68.5001 45.3408 68.0144 46.7884 67.45L52.147 76.2867C52.2535 76.4551 52.4258 76.5704 52.6221 76.6036C52.8183 76.6372 53.0195 76.5855 53.1752 76.4615L60.9398 70.1186C61.0999 69.9907 61.1961 69.7988 61.2025 69.5938V58.8324C63.004 57.3468 64.7299 55.7606 66.3424 54.0646C73.1643 46.8878 78 37.9992 78 28.9991C78 26.8964 77.9517 24.8923 77.2564 23.1377C77.1852 22.9575 77.0426 22.815 76.8625 22.7437C75.1078 22.0485 73.1037 22.0001 71.001 22.0001L71.0008 22ZM71.0008 23.3997C72.9332 23.3997 74.6253 23.5208 76.0094 23.9904C76.4791 25.3745 76.6002 27.0667 76.6002 28.999C76.6002 37.4959 71.987 46.1055 65.336 53.1021C58.7875 59.9903 50.2868 65.2592 42.5016 67.3839L32.6151 57.4975C34.7403 49.7124 40.0091 41.2121 46.897 34.663C53.8935 28.012 62.5037 23.3989 71 23.3989L71.0008 23.3997ZM64.0018 30.3988C60.9177 30.3988 58.4024 32.9141 58.4024 35.9981C58.4024 39.0822 60.9177 41.5975 64.0018 41.5975C67.0858 41.5975 69.6011 39.0822 69.6011 35.9981C69.6011 32.9141 67.0858 30.3988 64.0018 30.3988ZM64.0018 31.7984C66.3296 31.7984 68.2015 33.6703 68.2015 35.9981C68.2015 38.326 66.3296 40.1978 64.0018 40.1978C61.6739 40.1978 59.8021 38.326 59.8021 35.9981C59.8021 33.6703 61.6739 31.7984 64.0018 31.7984ZM30.7337 40.1977H40.0293C37.1572 43.9057 34.799 47.8949 33.0961 51.8773L25.1343 47.0654L30.7337 40.1977ZM59.8011 59.9701V69.2657L52.9114 74.8651L48.0995 66.9253C52.0907 65.2214 56.0853 62.8487 59.8011 59.9702V59.9701ZM28.9839 61.8727C28.8013 61.88 28.6285 61.9586 28.503 62.0914L24.3033 66.2911C24.1715 66.4244 24.0983 66.6045 24.0997 66.792C24.1012 66.979 24.1774 67.1582 24.3111 67.289C24.4454 67.4204 24.626 67.4926 24.8135 67.4897C25.0005 67.4873 25.1792 67.4101 25.3095 67.2754L29.5087 63.0757C29.7196 62.8726 29.7816 62.5601 29.665 62.2916C29.5478 62.0236 29.2763 61.8566 28.9839 61.8727L28.9839 61.8727ZM33.1836 66.0724C33.0005 66.0797 32.8282 66.1583 32.7022 66.2911L22.2036 76.7897C22.0718 76.923 21.9986 77.1032 22 77.2906C22.0015 77.4776 22.0776 77.6568 22.2119 77.7876C22.3457 77.919 22.5263 77.9912 22.7138 77.9883C22.9008 77.9859 23.0795 77.9087 23.2098 77.774L33.7084 67.2754C33.9193 67.0723 33.9813 66.7593 33.8642 66.4913C33.7475 66.2233 33.4755 66.0558 33.1836 66.0724V66.0724ZM37.3828 70.2721C37.2002 70.2789 37.0274 70.3575 36.9019 70.4908L32.7022 74.69C32.5704 74.8233 32.4972 75.0034 32.4986 75.1909C32.5001 75.3784 32.5762 75.5571 32.7105 75.6884C32.8443 75.8192 33.0249 75.8915 33.2124 75.8891C33.3994 75.8861 33.5781 75.809 33.7084 75.6742L37.9081 71.4751C38.1185 71.272 38.181 70.959 38.0639 70.691C37.9467 70.4225 37.6752 70.2555 37.3828 70.2721Z"
                          fill="#37474F"
                          stroke="#37474F"
                          stroke-width="0.8"
                        />
                        <script xmlns="" />
                      </svg>
                    </div>
                    <h3 className="plan-type_group-item-title">365 Days</h3>
                    <span className="plan-type_group-item-description">
                      365-Day Long-Term Resistance
                    </span>
                    <div className="plan-type_group-item-price">
                      <span className="plan-type_group-item-price-unit">
                        NT$
                      </span>
                      <h4 className="plan-type_group-item-price-number">
                        36,000
                      </h4>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        <path
                          d="M71.0008 22C62 22 53.112 26.8357 45.9354 33.6576C44.2394 35.2701 42.6531 36.996 41.1675 38.7975H30.4062C30.3628 38.7936 30.3188 38.7936 30.2749 38.7975C30.1123 38.8263 29.9654 38.9118 29.8594 39.0382L23.5385 46.8028C23.4067 46.9595 23.3505 47.166 23.3842 47.3682C23.4179 47.5703 23.538 47.747 23.7133 47.853L32.55 53.2116C31.9856 54.6592 31.4998 56.0955 31.1283 57.5202C31.0609 57.7613 31.1278 58.0196 31.3031 58.1983L41.8017 68.6969C41.9804 68.8722 42.2386 68.9391 42.4798 68.8717C43.9044 68.5001 45.3408 68.0144 46.7884 67.45L52.147 76.2867C52.2535 76.4551 52.4258 76.5704 52.6221 76.6036C52.8183 76.6372 53.0195 76.5855 53.1752 76.4615L60.9398 70.1186C61.0999 69.9907 61.1961 69.7988 61.2025 69.5938V58.8324C63.004 57.3468 64.7299 55.7606 66.3424 54.0646C73.1643 46.8878 78 37.9992 78 28.9991C78 26.8964 77.9517 24.8923 77.2564 23.1377C77.1852 22.9575 77.0426 22.815 76.8625 22.7437C75.1078 22.0485 73.1037 22.0001 71.001 22.0001L71.0008 22ZM71.0008 23.3997C72.9332 23.3997 74.6253 23.5208 76.0094 23.9904C76.4791 25.3745 76.6002 27.0667 76.6002 28.999C76.6002 37.4959 71.987 46.1055 65.336 53.1021C58.7875 59.9903 50.2868 65.2592 42.5016 67.3839L32.6151 57.4975C34.7403 49.7124 40.0091 41.2121 46.897 34.663C53.8935 28.012 62.5037 23.3989 71 23.3989L71.0008 23.3997ZM64.0018 30.3988C60.9177 30.3988 58.4024 32.9141 58.4024 35.9981C58.4024 39.0822 60.9177 41.5975 64.0018 41.5975C67.0858 41.5975 69.6011 39.0822 69.6011 35.9981C69.6011 32.9141 67.0858 30.3988 64.0018 30.3988ZM64.0018 31.7984C66.3296 31.7984 68.2015 33.6703 68.2015 35.9981C68.2015 38.326 66.3296 40.1978 64.0018 40.1978C61.6739 40.1978 59.8021 38.326 59.8021 35.9981C59.8021 33.6703 61.6739 31.7984 64.0018 31.7984ZM30.7337 40.1977H40.0293C37.1572 43.9057 34.799 47.8949 33.0961 51.8773L25.1343 47.0654L30.7337 40.1977ZM59.8011 59.9701V69.2657L52.9114 74.8651L48.0995 66.9253C52.0907 65.2214 56.0853 62.8487 59.8011 59.9702V59.9701ZM28.9839 61.8727C28.8013 61.88 28.6285 61.9586 28.503 62.0914L24.3033 66.2911C24.1715 66.4244 24.0983 66.6045 24.0997 66.792C24.1012 66.979 24.1774 67.1582 24.3111 67.289C24.4454 67.4204 24.626 67.4926 24.8135 67.4897C25.0005 67.4873 25.1792 67.4101 25.3095 67.2754L29.5087 63.0757C29.7196 62.8726 29.7816 62.5601 29.665 62.2916C29.5478 62.0236 29.2763 61.8566 28.9839 61.8727L28.9839 61.8727ZM33.1836 66.0724C33.0005 66.0797 32.8282 66.1583 32.7022 66.2911L22.2036 76.7897C22.0718 76.923 21.9986 77.1032 22 77.2906C22.0015 77.4776 22.0776 77.6568 22.2119 77.7876C22.3457 77.919 22.5263 77.9912 22.7138 77.9883C22.9008 77.9859 23.0795 77.9087 23.2098 77.774L33.7084 67.2754C33.9193 67.0723 33.9813 66.7593 33.8642 66.4913C33.7475 66.2233 33.4755 66.0558 33.1836 66.0724V66.0724ZM37.3828 70.2721C37.2002 70.2789 37.0274 70.3575 36.9019 70.4908L32.7022 74.69C32.5704 74.8233 32.4972 75.0034 32.4986 75.1909C32.5001 75.3784 32.5762 75.5571 32.7105 75.6884C32.8443 75.8192 33.0249 75.8915 33.2124 75.8891C33.3994 75.8861 33.5781 75.809 33.7084 75.6742L37.9081 71.4751C38.1185 71.272 38.181 70.959 38.0639 70.691C37.9467 70.4225 37.6752 70.2555 37.3828 70.2721Z"
                          fill="#37474F"
                          stroke="#37474F"
                          stroke-width="0.8"
                        />
                        <script xmlns="" />
                      </svg>
                    </div>
                    <h3 className="plan-type_group-item-title">Custom-Made</h3>
                    <span className="plan-type_group-item-description">
                      According to Your Needs
                    </span>
                    <div className="plan-type_group-item-price">
                      <span className="plan-type_group-item-price-unit">
                        NT$
                      </span>
                      <h4 className="plan-type_group-item-price-number">
                        125
                        <span
                          style={{
                            fontSize: "1.25rem",
                          }}
                        >
                          /Day
                        </span>
                      </h4>
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
      <section className="faq trigger-for-header-dark">
        <div className="container">
          <div className="faq_wrapper">
            <div className="faq-content">
              <h2 className="faq-title">Convention for K-Books</h2>
              <span className="faq-subtitle">
                To maintain a clean and conducive reading environment and
                enhance the quality of reading, please adhere to the following
                rules together.
              </span>
            </div>
            <div className="faq-accordion">
              <ul className="faq-accordion_list">
                <li className="faq-accordion_card">
                  <h3 className="faq-accordion_card-title">
                    Before taking your seat, please be aware of the following
                  </h3>
                  <ol className="faq-accordion_card-contents">
                    <li className="faq-accordion_card-content">
                      Please set your mobile phone to silent mode.
                    </li>
                    <li className="faq-accordion_card-content">
                      Bringing food into the K Study Room is strictly
                      prohibited. Please refrain from dining in the K Study
                      Room. (You may have your meal in the lounge area and place
                      your food on the counter.)
                    </li>
                  </ol>
                  <button
                    onClick={handleToggleButton}
                    className="faq-accordion_card-arrow"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                    </svg>
                  </button>
                </li>
                <li className="faq-accordion_card">
                  <h3 className="faq-accordion_card-title">
                    In the K Study Room, please be mindful of the following
                  </h3>
                  <ol className="faq-accordion_card-contents">
                    <li className="faq-accordion_card-content">
                      Conversations and phone calls are not allowed in the K
                      Study Room. If you need to answer a phone call, please
                      proceed to the lounge area. Please refrain from answering
                      calls in the K Study Room corridor (carpeted area).
                    </li>
                    <li className="faq-accordion_card-content">
                      Please minimize noise from plastic bags, beverages,
                      flipping through books, pen movements, calculator usage,
                      keyboard typing, footsteps, and door/cabinet opening. Keep
                      noise levels to a minimum.
                    </li>
                    <li className="faq-accordion_card-content">
                      Do not post documents, graffiti, or damage the tabletops
                      at the study seats. If you are using audiovisual software,
                      please use headphones, and adjust the volume accordingly.
                    </li>
                    <li className="faq-accordion_card-content">
                      Readers who are not scheduled for the entire day should
                      not leave personal items on top of the bookshelves. Staff
                      members will regularly clean and dispose of items left on
                      top of the bookshelves.
                    </li>
                    <li className="faq-accordion_card-content">
                      If you have reserved a seat or a fixed location, and you
                      are unable to come, please call to inform us before the
                      designated time begins. The latest time for requesting
                      leave is just before the designated time starts (morning:
                      before 8:15 AM, noon: before 12:30 PM, evening: before
                      5:30 PM).
                    </li>
                  </ol>
                  <button
                    onClick={handleToggleButton}
                    className="faq-accordion_card-arrow"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                    </svg>
                  </button>
                </li>
                <li className="faq-accordion_card">
                  <h3 className="faq-accordion_card-title">
                    Before leaving your seat, please take note of the following
                  </h3>
                  <ol className="faq-accordion_card-contents">
                    <li className="faq-accordion_card-content">
                      When leaving your seat, please carry your valuable
                      belongings with you to avoid personal financial loss.
                    </li>
                    <li className="faq-accordion_card-content">
                      After finishing your reading, when preparing to leave your
                      seat, kindly ensure that you clean the tabletop
                      thoroughly. Do not leave eraser shavings, paper scraps, or
                      trash behind, and please push in the chair.
                    </li>
                  </ol>
                  <button
                    onClick={handleToggleButton}
                    className="faq-accordion_card-arrow"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                    </svg>
                  </button>
                </li>
                <li className="faq-accordion_card">
                  <h3 className="faq-accordion_card-title">
                    To maintain a high-quality environment, please adhere to the
                    following rules
                  </h3>
                  <ol className="faq-accordion_card-contents">
                    <li className="faq-accordion_card-content">
                      Smoking, indecent behavior, or excessive intimacy are
                      strictly prohibited throughout the facility.
                    </li>
                    <li className="faq-accordion_card-content">
                      Entry to the facility is not permitted for individuals
                      exhibiting abnormal behavior, untidy attire, shirtless
                      attire, or those who do not observe hygiene standards.
                    </li>
                    <li className="faq-accordion_card-content">
                      Loud noises and gambling games are strictly prohibited
                      inside the facility. In the lounge area, please keep
                      conversations and phone calls at a low volume to avoid
                      disturbing other readers.
                    </li>
                    <li className="faq-accordion_card-content">
                      Due to the enclosed nature of the K Study Room, please
                      refrain from using strongly scented items.
                    </li>
                    <li className="faq-accordion_card-content">
                      Feel free to inform the front desk if you require
                      adjustments to the air conditioning temperature or if
                      there are cleanliness concerns in the environment.
                    </li>
                    <li className="faq-accordion_card-content">
                      If you encounter any issues while studying, please report
                      them immediately to the front desk. The front desk staff
                      will handle them promptly. Avoid addressing fellow readers
                      directly to prevent conflicts.
                    </li>
                    <li className="faq-accordion_card-content">
                      During time periods when you do not have a fixed seat,
                      please refrain from retrieving books from the fixed seat
                      bookshelves. If you have an urgent need, kindly contact
                      the front desk, and they will assist you without
                      disturbing readers at their seats.
                    </li>
                    <li className="faq-accordion_card-content">
                      If you have allergies or cold symptoms, please wear a mask
                      and refrain from blowing your nose or coughing inside the
                      K Study Room.
                    </li>
                  </ol>
                  <button
                    onClick={handleToggleButton}
                    className="faq-accordion_card-arrow"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                    </svg>
                  </button>
                </li>
                <li className="faq-accordion_card">
                  <h3 className="faq-accordion_card-title">
                    If you are using a laptop, mouse, or computer, please take
                    note of the following
                  </h3>
                  <ol className="faq-accordion_card-contents">
                    <li className="faq-accordion_card-content">
                      Personal seats are designated for tablet and mobile phone
                      use only. The use of laptops is strictly prohibited. If
                      needed, please use the 'Large' seats or the research
                      rooms.
                    </li>
                    <li className="faq-accordion_card-content">
                      'Large' seats do not allow the use of external mice. You
                      may use the built-in touchpad or silent mice. If you
                      require an external mouse, please use the research rooms.
                    </li>
                    <li className="faq-accordion_card-content">
                      When using a computer or typing on a laptop keyboard,
                      please be mindful of the volume and force. If there is no
                      improvement after a warning, usage rights for that time
                      period may be revoked.
                    </li>
                  </ol>
                  <button
                    onClick={handleToggleButton}
                    className="faq-accordion_card-arrow"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
            <h3 className="faq-alert">
              If individuals repeatedly ignore the above rules, the library
              reserves the right to refund and vacate the seat, and may also
              cancel their membership.
            </h3>
          </div>
        </div>
      </section>
      <SeatCategories />
    </>
  );
};

export default PlanPage;
