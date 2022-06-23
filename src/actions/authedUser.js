export const SET_AUTHED_USER = "SET_AUTHED_USER";

export function setAuthedUser(authedUserID) {
  return {
    type: SET_AUTHED_USER,
    authedUserID,
  };
}

