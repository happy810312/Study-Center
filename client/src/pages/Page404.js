import React from "react";

const Page404 = () => {
  return (
    <div className="page404">
      <div className="page404_wrapper">
        <div class="page404_txt">
          <h2 className="page404_txt-not-found">
            Page <strong>NOT FOUND</strong>
          </h2>
          <span className="page404_txt-joker">Our Foods are Pages</span>
        </div>
        <div className="page404_monster-group">
          <div class="page404_monster monster-grey">
            <div class="page404_monster-eye">
              <div class="page404_monster-eyeball"></div>
            </div>
            <div class="page404_monster-mouth"></div>
          </div>
          <div class="page404_monster monster-blue">
            <div class="page404_monster-eye">
              <div class="page404_monster-eyeball"></div>
            </div>
            <div class="page404_monster-mouth"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
