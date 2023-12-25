import React, { useEffect, useState, useRef } from "react";
import UserService from "../services/user-service";
import { format } from "date-fns";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditPhone, setIsEditPhone] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(null);
  const [userObject, setUserObject] = useState(null);
  const [message, setMessage] = useState(null);

  const [imgSrc, setImgSrc] = useState(null);

  const fileInput = useRef(null);

  const handleClickPhotoBtn = () => {
    fileInput.current.click();
  };
  const handleChangePhoto = (file) => {
    // 送資料庫的function
    const photoURL2Back = (imgURL) => {
      const _id = JSON.parse(localStorage.getItem("User")).user._id;
      UserService.patchThumbnail(_id, imgURL)
        .then((data) => {
          setMessage(data.data.message);
        })
        .catch((e) => {
          setMessage(JSON.stringify(e.response.error));
        });
    };

    // 更換大頭貼
    const reader = new FileReader();
    const { files } = file.target;

    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result);
        photoURL2Back(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handlePatchPhone = () => {
    const _id = JSON.parse(localStorage.getItem("User")).user._id;
    UserService.patchPhoneNumner(_id, newPhoneNumber)
      .then((data) => {
        setMessage(data.data.message);
      })
      .catch((e) => {
        setMessage(JSON.stringify(e.response.error));
      });
  };

  // 解析cookie轉成JSON
  const decodeCookieToObject = (cookieName) => {
    const cookieValue = document.cookie
      .split(";")
      .find((row) => row.startsWith(`${cookieName}=`))
      .split("=")[1];

    if (cookieValue) {
      const decodedValue = decodeURIComponent(cookieValue);
      const parseValue = JSON.parse(decodedValue);
      return parseValue;
    }

    return null;
  };

  useEffect(() => {
    if (localStorage.getItem("User")) {
      const userID = JSON.parse(localStorage.getItem("User")).user._id;
      UserService.getProfile(userID)
        .then((data) => {
          setUserObject(data.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    } else if (document.cookie) {
      // 解析cookie轉成JSON
      const userObject = decodeCookieToObject("User");
      if (userObject !== null) {
        localStorage.setItem("User", JSON.stringify(userObject));
      }
    }
  }, [isEditPhone, imgSrc]);
  console.log(userObject);
  return (
    <>
      {isLoading && <div className="alert alert-danger">Loading...</div>}
      {!isLoading && (
        <section className="profile trigger-for-header-grey-light">
          <div className="container">
            <div className="profile_wrapper">
              <div className="profile_inner">
                {message && (
                  <div className="alert alert-success ">{message}</div>
                )}
                <div className="profile-title">
                  <div className="profile-title_photo">
                    <img
                      src={userObject.foundUser.thumbnail}
                      alt="thumbnail"
                      className="profile-title_thumbnail"
                    />
                    <button
                      type="button"
                      className="profile-title_add-thumbnail"
                      onClick={handleClickPhotoBtn}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width={"25px"}
                        height={"25px"}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeQidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                          <path
                            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>
                    <input
                      ref={fileInput}
                      onChange={handleChangePhoto}
                      type="file"
                      id="thumbnailInput"
                      name="thumbnail"
                      accept="image/*"
                      hidden
                    />
                  </div>
                  <div className="profile-title_info">
                    <h2 className="profile-title_name">
                      {userObject.foundUser.username}
                    </h2>
                    <span className="profile-title_cardID">
                      {`CardID : ${userObject.foundUser.cardID}`}
                    </span>
                  </div>
                </div>
                <div className="profile-items profile-phone">
                  <div className="profile-items_left">
                    <h3 className="profile-items_titles phone-title">
                      Phone Number :
                    </h3>
                    <button
                      onClick={() => {
                        setIsEditPhone(true);
                      }}
                      type="button"
                      className="profile-phone_edit-phone"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width={"25px"}
                        height={"25px"}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeQidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                          <path
                            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>
                  </div>
                  <div className="profile-items_right">
                    {!isEditPhone && (
                      <p className="profile-items_phone-number">
                        {userObject.foundUser.phoneNumber !== undefined
                          ? userObject.foundUser.phoneNumber
                          : ""}
                      </p>
                    )}
                    {isEditPhone && (
                      <input
                        id="edit-phone"
                        onChange={(e) => {
                          setNewPhoneNumber(e.target.value);
                        }}
                        type="text"
                        placeholder="0912-654-987"
                      />
                    )}
                    {isEditPhone && (
                      <button
                        onClick={() => {
                          setIsEditPhone(false);
                          handlePatchPhone();
                        }}
                        type="button"
                        className="save-phone_btn"
                      >
                        Save
                      </button>
                    )}
                    {isEditPhone && (
                      <button
                        onClick={() => {
                          setIsEditPhone(false);
                        }}
                        type="button"
                        className="cancel-phone_btn"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <div className="profile-items  profile-email">
                  <div className="profile-items_left">
                    <h3 className="profile-items_titles">E-Mail :</h3>
                  </div>
                  <div className="profile-items_right">
                    <p className="profile-items_email">
                      {userObject.foundUser.email}
                    </p>
                  </div>
                </div>
                <div className="profile-items  profile-role">
                  <div className="profile-items_left">
                    <h3 className="profile-items_titles">Role :</h3>
                  </div>
                  <div className="profile-items_right">
                    <p className="profile-items_role">
                      {userObject.foundUser.role}
                    </p>
                  </div>
                </div>
                <div className="profile-items  profile-wallet">
                  <div className="profile-items_left">
                    <h3 className="profile-items_titles">Wallet :</h3>
                  </div>
                  <div className="profile-items_right">
                    <p className="profile-wallet">
                      {userObject.foundUser.wallet}
                    </p>
                  </div>
                </div>
                <div className="profile-items  profile-createAt">
                  <div className="profile-items_left">
                    <h3 className="profile-items_titles">CreatedAt :</h3>
                  </div>
                  <div className="profile-items_right">
                    <p className="profile-wallet">
                      {format(
                        new Date(userObject.foundUser.createdAt),
                        "yyyy/MM/dd"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProfilePage;
