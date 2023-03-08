import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useContext, useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import AppContext from "../../context/appContext";
import "./rightbar.css";
import noNoise from './noNooise.png'

export default function Rightbar({ profile, userInfo }) {
  const [friends, setFriends] = useState([]);
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    fetch(`http://localhost:4005/users`)
      .then((response) => response.json())
      .then((data) => setFriends(data));
  }, []);

  const HomeRightbar = () => {
    return (
      <>
        <div className="right-side-container">
          <BiWorld className="world" />{" "}
          <span className="intro-text">
            <b>Report</b> instances <b>of</b> Noise Pollution in New York City <b>!</b>!
          </span>
        </div>
        <img
          className="rightbarAd"
          src={noNoise}
          alt=""
        />
        <div className="cover"></div>
      </>
    );
  };

  const ProfileRightbar = () => {
    const [intro, setIntro] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [bio, setBio] = useState("");

    const handleNewInfo = async (e) => {
      if (intro === "" && city === "" && country === "" && bio === "") return;

      const newUserInfo = {
        username: user.username,
  
        intro,
        bio,
        city,
        country,
      };

      if (newUserInfo.intro === "") newUserInfo.intro = "Wayne";
      if (newUserInfo.city === "") newUserInfo.city = "New York City";
      if (newUserInfo.country === "") newUserInfo.country = "United States";
      if (newUserInfo.bio === "") newUserInfo.bio = "Software Engineer";


    
    };

 
    
    return (
      <>
        <h4 className="rightbarTitle">
          User information {/* {userInfo.user_id === profile.user_id && ( */}
          {/* {user.user_id !== userInfo.user_id && (!friends.includes(userInfo.user_id)) && (
            <PersonAddIcon className="add_friend" onClick={handleFriend} />
          )} */}
          {user.user_id !== userInfo.user_id &&
            !friends.some((f) => f.user_id === userInfo.user_id) && (
              <PersonAddIcon className="add_friend"/>
            )}
         
          { (
            <>
              <button
                type="button"
                class="btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <EditIcon className="edit" />
              </button>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit Profile
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div className="row g-3 align-items-center mt-3">
                        <div className="col-auto">
                          <label
                            htmlFor="inputPassword6"
                            className="col-form-label"
                          >
                            Intro
                          </label>
                        </div>
                        <div className="col-auto">
                          <input
                            type="text"
                            id="inputPassword6"
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                            onChange={(e) => setIntro(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row g-3 align-items-center mt-3">
                        <div className="col-auto">
                          <label
                            htmlFor="inputPassword6"
                            className="col-form-label"
                          >
                            City
                          </label>
                        </div>
                        <div className="col-auto">
                          <input
                            type="text"
                            id="inputPassword6"
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row g-3 align-items-center mt-3">
                        <div className="col-auto">
                          <label
                            htmlFor="inputPassword6"
                            className="col-form-label"
                          >
                            Country
                          </label>
                        </div>
                        <div className="col-auto">
                          <input
                            type="text"
                            id="inputPassword6"
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row g-3 align-items-center mt-3 mb-3">
                        <div className="col-auto">
                          <label
                            htmlFor="inputPassword6"
                            className="col-form-label"
                          >
                            Bio
                          </label>
                        </div>
                        <div className="col-auto">
                          <input
                            type="text"
                            id="inputPassword6"
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                            onChange={(e) => setBio(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <CloseIcon data-bs-dismiss="modal" type="button" />
                      <CheckIcon
                        type="submit"
                        onClick={handleNewInfo}
                        data-bs-dismiss="modal"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.id}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.username}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Bio:</span>
            <span className="rightbarInfoValue">{user.email}</span>
          </div>
        </div>
      </>
    );
  };
 
}
