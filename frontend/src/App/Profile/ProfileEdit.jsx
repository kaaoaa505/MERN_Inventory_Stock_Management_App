import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./ProfileShow.scss";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Layout from "../../components/Layout/Layout";
import Loading from "../../components/Loading/Loading";
import RedirectLoggedoutUser from "../../hooks/RedirectHook";
import AuthService from "../../services/AuthService";
import * as AuthSlice from "../../redux/Auth/AuthSlice";
import Card from "../../components/Card/Card";
import { toast } from "react-toastify";

const ProfileEdit = () => {
  RedirectLoggedoutUser();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(AuthSlice.selectUser);


  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await AuthService.profile();

      setProfile(data);
      setIsLoading(false);

      await dispatch(AuthSlice.SET_USER(data));
    }
    getUserData();
  }, [dispatch]);

  const initialState = {
    name: user?.name,
    phone: user?.phone,
    bio: user?.bio,
  };
  const [profile, setProfile] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
      };

      const data = await AuthService.update(formData);
      console.log(data);
      toast.success("User updated");
      navigate("/profile/show");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loading />}

      <Sidebar>
        <Layout>
          <>
            <Card cardClass={"card --flex-dir-column"}>
              <form className="--form-control --m" onSubmit={saveProfile}>
                <span className="profile-data">
                  <p>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={profile?.name}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile?.phone}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>Bio:</label>
                    <br />
                    <textarea
                      name="bio"
                      value={profile?.bio}
                      onChange={handleInputChange}
                      cols="30"
                      rows="10"
                    ></textarea>
                  </p>
                  <div>
                    <button className="--btn --btn-primary">
                      Edit Profile
                    </button>
                  </div>
                </span>
              </form>
            </Card>
            <br />
          </>
        </Layout>
      </Sidebar>
    </div>
  );
};

export default ProfileEdit;
