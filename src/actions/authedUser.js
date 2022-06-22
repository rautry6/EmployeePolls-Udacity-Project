export const AUTHED_USER = "AUTHED_USER";

export function authedUser(authedUserID) {
    return {
        type: AUTHED_USER,
        authedUserID,
    };
}


