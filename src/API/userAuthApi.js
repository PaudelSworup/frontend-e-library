import axios from "axios";
import { API } from "../config";

// register api

export const createAccount = async (userInfo) => {
  return await fetch(`${API}/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const confirmAccount = async (token) => {
  console.log(token);
  return await fetch(`${API}/confirmation/${token}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      // "Content-Type":"application/json"
    },
    body: JSON.stringify(token),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

// login API
export const login = async (user) => {
  return await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

// upload profile Image
export const upload = async (data) => {
  return await fetch(`${API}/profile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: data,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// get profile Image
export const getProfile = async () => {
  try {
    return await axios.get(`${API}/profile`);
  } catch (err) {
    console.log(err);
  }
};

// get history of the books issued/rejected/accepted
export const getHistory = async () => {
  try {
    return await axios.get(`${API}/history`);
  } catch (err) {
    console.log(err);
  }
};

export const getApprovalStatus = async (userid) => {
  try {
    return await axios.post(`${API}/approve/${userid}`);
  } catch (err) {
    console.log(err);
  }
};

// forgot password
export const forgotPassword = async (email) => {
  return await fetch(`${API}/forgot`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

// resend verification
export const resend = async (email) => {
  return await fetch(`${API}/resend`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const deleteUserData = async (id) => {
  // return console.log(id)
  return await fetch(`${API}/removeuser/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const getUser = async () => {
  try {
    return await axios.get(`${API}/users`);
  } catch (err) {
    console.log(err);
  }
};

export const updateDetails = async (data, id) => {
  try {
    const response = await fetch(`${API}/users/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong");
    }

    return responseData; // Return the JSON response data if everything is fine
  } catch (error) {
    console.log("Error:", error.message);
    return { error: error.message, success: false }; // Return an error object with the error message
  }
};

// reset password
export const resetPassword = async (data, token) => {
  try {
    const response = await fetch(`${API}/resetpassword/${token}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong");
    }

    return responseData; // Return the JSON response data if everything is fine
  } catch (error) {
    console.log("Error:", error.message);
    return { error: error.message, success: false }; // Return an error object with the error message
  }
};

// change password
export const changePassword = async (data, id) => {
  return await fetch(`${API}/changepassword/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const checkOTP = async (data) => {
  return await fetch(`${API}/validateotp`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};
