import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./ProfileShow.scss";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Layout from "../../components/Layout/Layout";
import Loading from "../../components/Loading/Loading";
import RedirectLoggedoutUser from "../../hooks/RedirectHook";
import AuthService from "../../services/AuthService";
import * as AuthSlice from "../../redux/Auth/AuthSlice";
import Card from "../../components/Card/Card";

const ProfileShow = () => {
  RedirectLoggedoutUser();

  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await AuthService.profile();

      setProfile(data);
      setIsLoading(false);

      await dispatch(AuthSlice.SET_USER(data));
      await dispatch(AuthSlice.SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="ProfileShowComponent profile --my2">
      {isLoading && <Loading />}

      <Sidebar>
        <Layout>
          <>
            {!isLoading && profile === null ? (
              <p>Something went wrong, please reload the page...</p>
            ) : (
              <Card cardClass={"card --flex-dir-column"}>
                {/* <span className="profile-photo">
              <img src={profile?.photo} alt="profilepic" />
            </span> */}
                <span className="profile-data">
                  <p>
                    <b>Name : </b> {profile?.name}
                  </p>
                  <p>
                    <b>Email : </b> {profile?.email}
                  </p>
                  <p>
                    <b>Phone : </b> {profile?.phone}
                  </p>
                  <p>
                    <b>Bio : </b> {profile?.bio}
                  </p>
                  <div>
                    <Link to="/profile/edit">
                      <button className="--btn --btn-primary">
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                </span>
              </Card>
            )}
          </>
        </Layout>
      </Sidebar>
    </div>
  );
};

export default ProfileShow;
