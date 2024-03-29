import axios from "axios";
import { API } from "../config";

// to search books and shows result on binary search
export const searchBook = async (name) => {
  try {
    return await axios.get(`${API}/browse/${name}`);
  } catch (err) {
    console.log(err);
  }
};

// to show books according to recommendation algorithm on the basis of rating
export const recommendedBooks = async (userId) => {
  try {
    return await axios.get(`${API}/recommend/${userId}`);
  } catch (err) {
    console.log(err);
  }
};

// to get all the books
export const getAllBooks = async () => {
  try {
    return await axios.get(`${API}/books`);
  } catch (err) {
    console.log(err);
  }
};

// to get generes/ book category
export const getGenre = async () => {
  try {
    return await axios.get(`${API}/category`);
  } catch (err) {
    console.log(err);
  }
};

// to get single book details
export const getBookDetails = async (id) => {
  try {
    return await axios.get(`${API}/single/${id}`);
  } catch (err) {
    console.log(err);
  }
};

// get books by category
export const getBookbyCategory = async (cat) => {
  try {
    return await axios.get(`${API}/books/${cat}`);
  } catch (err) {
    console.log(err);
  }
};

// get books by userChoosed category (recommendation)
export const getUserRecommendation = async (id) => {
  try {
    return await axios.get(`${API}/categoryrecommendation/${id}`);
  } catch (err) {
    console.log(err);
  }
};

// get/show books related to category (on recommendation section)
export const listBooks = async (id) => {
  try {
    return await axios.get(`${API}/listcatbooks/${id}`);
  } catch (err) {
    console.log(err);
  }
};

// get ratings detail
export const getRating = async (bookId) => {
  try {
    return await axios.get(`${API}/rate/check/${bookId}`);
  } catch (err) {
    console.log(err);
  }
};

// post a book rating
export const recordRating = async (ratingData) => {
  return await fetch(`${API}/rate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ratingData),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const getKnn = async (userid, bookid) => {
  try {
    return await axios.get(`${API}/knn/${userid}/${bookid}`);
  } catch (err) {
    console.log(err);
  }
};

// issue a book request
export const issueRequest = async (data) => {
  return await fetch(`${API}/reports`, {
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

// get issuerequest for admin
export const getReports = async () => {
  try {
    return await axios.get(`${API}/reports`);
  } catch (err) {
    console.log(err);
  }
};

// like a book
export const likeBook = async (data) => {
  return await fetch(`${API}/like`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      res.json();
      return getLikes();
    })
    .catch((err) => {
      return console.log(err);
    });
};

// get likes of a book
export const getLikes = async () => {
  try {
    return await axios.get(`${API}/like`);
  } catch (err) {
    console.log(err);
  }
};

// get most requested Books
export const getMostRequested = async () => {
  try {
    return await axios.get(`${API}/mostrequested`);
  } catch (err) {
    console.log(err);
  }
};

// get Notification for specific user
export const getNotified = async (userid) => {
  try {
    return await axios.get(`${API}/notifications/${userid}`);
  } catch (err) {
    console.log(err);
    // throw new Error("Failed to get data, something went wrong")
  }
};

// get Notification
export const getNotifications = async (userid) => {
  try {
    return await axios.get(`${API}/notifications/${userid}`);
  } catch (err) {
    console.log(err);
    // throw new Error("Failed to get data, something went wrong")
  }
};

// update notification status
export const setStatus = async (data, userid) => {
  return await fetch(`${API}/notifications/${userid}`, {
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

// userfavourites bookmark
export const postBookMark = async (data) => {
  return await fetch(`${API}/bookmark`, {
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

// getting userFavourites Bookmark

export const getBookmarks = async () => {
  try {
    return await axios.get(`${API}/bookmark`);
  } catch (err) {
    console.log(err);
    // throw new Error("Failed to get data, something went wrong")
  }
};

//removing userfavourite
export const removeBookmark = async (id, bookid) => {
  // return console.log(id)
  return await fetch(`${API}/bookmark/${id}/${bookid}`, {
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

export const downloadBook = async (bookId) => {
  try {
    const response = await fetch(`${API}/download/${bookId}`, {
      method: "GET",
      headers: {
        Accept: "application/pdf",
      },
    });

    const contentDisposition = response.headers.get("Content-Disposition");
    const fileName =
      getFileNameFromContentDisposition(contentDisposition) || "file.pdf";

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  } catch (error) {
    console.error(error);
  }
};

function getFileNameFromContentDisposition(contentDisposition) {
  const fileNameMatch =
    contentDisposition && contentDisposition.match(/filename="(.+)"/);
  return fileNameMatch && fileNameMatch[1] ? fileNameMatch[1] : null;
}

// add books for admin
export const addBooks = async (data) => {
  return await fetch(`${API}/books`, {
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
      return console.log(err);
    });
};

// add books category for admin
export const addCategory = async (data) => {
  return await fetch(`${API}/category`, {
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
    .catch((err) => console.log(err));
};

// approve books
export const enableBookAccess = async (userid) => {
  return await fetch(`${API}/approve/${userid}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
