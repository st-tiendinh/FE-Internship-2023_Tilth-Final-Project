import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BlankUserImage from '../../../../../assets/images/blank-user.webp';

import { isImageUrlValid } from '../../../../shared/utils/checkValidImage';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

export const UserProfile = ({ isLoggedUser, user }: any) => {
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  useEffect(() => {
    apiService.setHeaders(jwtHelper.getAuthHeader());
    (async () => {
      try {
        const response: any = await apiService.get([
          ENDPOINT.friends.followings,
        ]);
        setIsFollowed(
          response.filter((item: any) => item.id === user.id).length
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    isImageUrlValid(user.picture).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [isValidUserImg, user.picture]);

  const handleFollow = () => {
    (async () => {
      try {
        apiService.setHeaders(jwtHelper.getAuthHeader());
        await apiService.post([ENDPOINT.friends.follow], {
          followingId: user.id,
        });
        setIsFollowed(!isFollowed);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <section className="section profile-section">
      <div className="profile">
        <div className="row">
          <div className="col col-4">
            <div className="d-flex profile-image">
              <div className="user-avatar-wrapper">
                <img
                  className="user-avatar"
                  src={isValidUserImg ? user.picture : BlankUserImage}
                  alt="Profile Image"
                />
              </div>
            </div>
          </div>
          <div className="col col-8">
            <div className="d-flex flex-column profile-content">
              <p className="user-name">{user.displayName}</p>
              <ul className="d-flex user-follow-list">
                <li className="user-follow-item">
                  <div className="user-follow">
                    <span className="user-follow-title">Followers: </span>
                    <span className="user-follow-amount">{user.followers}</span>
                  </div>
                </li>
                <li className="user-follow-item">
                  <div className="user-follow">
                    <span className="user-follow-title">Followings: </span>
                    <span className="user-follow-amount">
                      {user.followings}
                    </span>
                  </div>
                </li>
              </ul>
              <ul className="d-flex user-about-list">
                <li className="d-flex user-about-item">
                  <i className="icon icon-person"></i>
                  <p>{user.firstName}</p>
                </li>
                <li className="d-flex user-about-item">
                  <i className="icon icon-mail"></i>
                  <p>{user.email}</p>
                </li>
                <li className="d-flex user-about-item">
                  <i className="icon icon-dob"></i>
                  <p>{user.dob?.split('/').reverse().join('-')}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="profile-button">
          {isLoggedUser ? (
            <Link to="/management" className="btn btn-primary">
              Update Profile
            </Link>
          ) : (
            <button onClick={handleFollow} className="btn btn-primary">
              {isFollowed ? 'Followed' : 'Follow'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
