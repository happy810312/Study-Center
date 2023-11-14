import React from "react";

const AboutPage = () => {
  return (
    <section className="about-us trigger-for-header-grey-light">
      <div className="container">
        <div className="about-us_wrapper">
          <div className="about-us_content">
            <h2 className="about-us_content-title">About us.</h2>
            <span className="about-us_content-subtitle">
              Please contact us through the following information, and feel free
              to inquire about any related questions in person.
            </span>
          </div>
          <div className="about-us_google-map">
            <iframe
              className="about-us_google-map-embeded"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14458.729853333418!2d121.516019!3d25.044848!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9731123ddb1%3A0xffdec426b5677879!2z6ZW36Z2SL-mbqOiBskvmm7jmnIPppKgtS-abuOS4reW_gw!5e0!3m2!1szh-TW!2stw!4v1699801410071!5m2!1szh-TW!2stw"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="about-us_information">
            <h3 className="about-us_information-title">Contact information</h3>
            <ul className="about-us_information-menu">
              <div className="about-us_information-card">
                <div className="about-us_information-card-icon">
                  <svg
                    width="35px"
                    height="35px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M22 22L2 22"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M2 11L10.1259 4.49931C11.2216 3.62279 12.7784 3.62279 13.8741 4.49931L22 11"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M4 22V9.5"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M20 22V9.5"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393C9 14.8787 9 15.5858 9 17V22"
                        stroke="#1C274C"
                        stroke-width="1.5"
                      ></path>{" "}
                      <path
                        d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z"
                        stroke="#1C274C"
                        stroke-width="1.5"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="about-us_information-card-content">
                  <h4 className="about-us_information-card-title">
                    Address: 20 Nanyang Street, 2nd Floor, Zhongzheng District,
                    Taipei City
                  </h4>
                  <span className="about-us_information-card-subtitle">
                    Take the M6 exit at Taipei Main Station or the 4th exit at
                    National Taiwan University Hospital Station. It's about a
                    5-minute walk to reach our location.
                  </span>
                </div>
              </div>
              <div className="about-us_information-card">
                <div className="about-us_information-card-icon">
                  <svg
                    fill="#000000"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="32px"
                    height="32px"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <path d="M460.8,25.6H179.2c0-14.14-11.46-25.6-25.6-25.6h-51.2C91.921,0,0,7.185,0,256s91.921,256,102.4,256h51.2 c14.14,0,25.6-11.46,25.6-25.6h281.6c28.279,0,51.2-22.921,51.2-51.2V76.8C512,48.521,489.079,25.6,460.8,25.6z M153.6,486.4 c0,0-25.6,0-51.2,0c-25.6,0-76.8-51.2-76.8-230.4S76.8,25.6,102.4,25.6c25.6,0,51.2,0,51.2,0V128c0,0-20.207,0-42.667,0 c-6.793,0-13.303,2.697-18.099,7.501c-5.53,5.521-33.101,37.308-33.101,120.499s27.571,114.978,33.101,120.499 c4.796,4.804,11.307,7.501,18.099,7.501c22.46,0,42.667,0,42.667,0V486.4z M128,153.6v204.8h-17.067c0,0-25.6-25.6-25.6-102.4 s25.6-102.4,25.6-102.4H128z M486.4,435.2c0,14.114-11.486,25.6-25.6,25.6H179.2V384c0-14.14-11.46-25.6-25.6-25.6V153.6 c14.14,0,25.6-11.46,25.6-25.6V51.2h281.6c14.114,0,25.6,11.486,25.6,25.6V435.2z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="230.4"
                            y="128"
                            width="51.2"
                            height="25.6"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="307.2"
                            y="128"
                            width="51.2"
                            height="25.6"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="384"
                            y="128"
                            width="51.2"
                            height="25.6"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="230.4"
                            y="204.8"
                            width="51.2"
                            height="25.6"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="307.2"
                            y="204.8"
                            width="51.2"
                            height="25.6"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="384"
                            y="204.8"
                            width="51.2"
                            height="25.6"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="230.4"
                            y="281.6"
                            width="51.2"
                            height="25.6"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="307.2"
                            y="281.6"
                            width="51.2"
                            height="25.6"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="384"
                            y="281.6"
                            width="51.2"
                            height="25.6"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="230.4"
                            y="358.4"
                            width="51.2"
                            height="25.6"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="307.2"
                            y="358.4"
                            width="51.2"
                            height="25.6"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <rect
                            x="384"
                            y="358.4"
                            width="51.2"
                            height="25.6"
                          ></rect>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
                <div className="about-us_information-card-content">
                  <h4 className="about-us_information-card-title">
                    Phone: (02) 2375-4033
                  </h4>
                  <span className="about-us_information-card-subtitle">
                    Service Hours: 08:00 - 23:00 (Open year-round, except during
                    the Chinese New Year)
                  </span>
                </div>
              </div>
              <div className="about-us_information-card">
                <div className="about-us_information-card-icon">
                  <svg
                    width="35px"
                    height="35px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M3.29289 5.29289C3.47386 5.11193 3.72386 5 4 5H20C20.2761 5 20.5261 5.11193 20.7071 5.29289M3.29289 5.29289C3.11193 5.47386 3 5.72386 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.72386 20.8881 5.47386 20.7071 5.29289M3.29289 5.29289L10.5858 12.5857C11.3668 13.3668 12.6332 13.3668 13.4142 12.5857L20.7071 5.29289"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="about-us_information-card-content">
                  <h4 className="about-us_information-card-title">
                    Email: k-studycenter@service.com
                  </h4>
                  <span className="about-us_information-card-subtitle">
                    Feel free to call or email us if you have any questions.
                  </span>
                </div>
              </div>
              <div className="about-us_information-card">
                <div className="about-us_information-card-icon">
                  <svg
                    width="35px"
                    height="35px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M17.6361 7H17.6477"
                        stroke="#292D32"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="about-us_information-card-content">
                  <h4 className="about-us_information-card-title">
                    Follow us on Instagram:@chungching_rain_sound
                  </h4>
                  <span className="about-us_information-card-subtitle">
                    Visit our Instagram page for the latest promotions and
                    announcements.
                  </span>
                </div>
              </div>
              <div className="about-us_information-card">
                <div className="about-us_information-card-icon">
                  <svg
                    fill="#000000"
                    width="35px"
                    height="35px"
                    viewBox="0 0 1920 1920"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="m1416.013 791.915-30.91 225.617h-371.252v789.66H788.234v-789.66H449.808V791.915h338.426V585.137c0-286.871 176.207-472.329 449.09-472.329 116.87 0 189.744 6.205 231.822 11.845l-3.272 213.66-173.5.338c-4.737-.451-117.771-9.25-199.332 65.655-52.568 48.169-79.191 117.433-79.191 205.65v181.96h402.162Zm-247.276-304.018c44.446-41.401 113.71-36.889 118.787-36.663l289.467-.113 6.204-417.504-43.544-10.717C1511.675 16.02 1426.053 0 1237.324 0 901.268 0 675.425 235.206 675.425 585.137v93.97H337v451.234h338.425V1920h451.234v-789.66h356.7l61.932-451.233H1126.66v-69.152c0-54.937 14.214-96 42.078-122.058Z"
                        fill-rule="evenodd"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="about-us_information-card-content">
                  <h4 className="about-us_information-card-title">
                    Follow us on Facebook:Chungching Rain Sound
                  </h4>
                  <span className="about-us_information-card-subtitle">
                    Visit our Facebook page for the latest promotions and
                    announcements.
                  </span>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
