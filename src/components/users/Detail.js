import React, { useEffect, useState } from "react";
import {
  FaBarcode,
  FaBook,
  FaCalendar,
  FaCheckCircle,
  FaGlobe,
  FaStar,
  FaTimesCircle,
} from "react-icons/fa";
import {
  getKnn,
  getRating,
  getUserRecommendation,
  issueRequest,
  listBooks,
  recordRating,
} from "../../API/bookAPI";
import { useParams } from "react-router-dom";
import RecommendationSection from "./RecommendationSection";
import { RiDownloadCloud2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Knn from "./Knn";
import OtherInfo from "./OtherInfo";
import Issue from "../Modals/Issue";
import { useQuery } from "react-query";

const Detail = ({ result }) => {
  const { id } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [rating, setRating] = useState(0);
  const [knn, setKnn] = useState([]);
  const [message, setMessage] = useState(null);
  const { userid } = useSelector((state) => state.users);
  const [showFullText, setShowFullText] = useState(false);

  const toggleTextVisibility = () => {
    setShowFullText(!showFullText);
  };

  const getuserRecommendation = useQuery(
    ["getrecommendations", userid],
    async () => await getUserRecommendation(userid),
    {
      onSettled: (recommendation) =>
        setRecommendations(recommendation?.data?.recommendedBooks),
    }
  );

  const getSimilarGenreBook = useQuery(
    ["getsimilar", id],
    async () => await listBooks(id),
    {
      onSettled: (similar) => setSimilar(similar?.data?.book),
    }
  );

  const getRatingDetails = useQuery(
    ["getrating", id],
    async () => await getRating(id),
    {
      onSettled: (ratings) => {
        const ratingdata = ratings?.data?.books?.find((data) => {
          return data?.user === userid && data?.book?._id === id;
        });
        setRating(ratingdata?.rating);
      },
    }
  );

  const getNearest = useQuery(
    ["getknn", userid, id],
    async () => await getKnn(userid, id),
    {
      onSettled: (data) => setKnn(data?.data.recommendations),
    }
  );

  // useEffect(() => {
  //   Promise.all([getRating(id)])
  //     .then(([ratingRes]) => {
  //       const ratingData = ratingRes?.data?.books.find((data) => {
  //         return data?.user === userid && data?.book?._id === id;
  //       });
  //       setRating(ratingData?.rating);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [id]);

  // useEffect(() => {
  //   Promise.all([getUserRecommendation(userid), listBooks(id)])
  //     .then(([recommendationRes, bookRes]) => {
  //       const recommendationData =
  //         recommendationRes?.data?.recommendedBooks || [];
  //       const similarData = bookRes?.data?.book || [];

  //       setRecommendations(recommendationData);
  //       setSimilar(similarData);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //     });

  //   Promise.all([getRating(id)])
  //     .then(([ratingRes]) => {
  //       const ratingData = ratingRes?.data?.books.find((data) => {
  //         return data?.user === userid && data?.book?._id === id;
  //       });
  //       setRating(ratingData?.rating);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [userid, id]);

  // useEffect(() => {
  //   getKnn(userid, id).then((res) => {
  //     setKnn(res?.data.recommendations);
  //   });
  // }, [id, userid]);

  const newRecommendation = recommendations.filter((data) => {
    return data?._id !== id;
  });

  const handleStarHover = (hoverRating) => {
    setRating(hoverRating);
  };

  const handleStarClick = (rating) => {
    recordRating({ rating, book: id, user: userid }).then((data) => {
      if (data.error) {
        return toast.error(data.error, {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        return toast.success(data.message, {
          position: "top-center",
        });
      }
    });
  };

  const showStatus = (id) => {
    issueRequest({ books_id: id, user_id: userid }).then((data) => {
      if (data.error) {
        return toast.error(data.error, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        return setMessage(data?.message);
        // return toast.success(data.message, {
        //   position: "top-center",
        // });
      }
    });
  };

  return (
    <>
      <div className="p-2 my-20 xl:my-28  xl:w-[900px] ">
        <button className="py-2  px-2 bg-[#252525] rounded-md  text-white tracking-widest">
          <div className="flex gap-1">
            <span>
              <FaBook className="text-lg mt-[2px]" />
            </span>
            <span>{result?.publisher}</span>
          </div>
        </button>
        <h2 className="mt-3 text-white tracking-wider capitalize truncate transition-all duration-100 ease-in-out text-3xl group-hover:font-bold  ">
          {result?.title}
        </h2>
        {result?.stock !== 0 ? (
          <div className="my-3 flex justify-between gap-3">
            <div className="flex gap-3">
              <FaCheckCircle
                title="Available"
                className="text-white cursor-pointer text-2xl"
              />
              <p className="text-green-600 tracking-widest">
                Available in the Library
              </p>
            </div>

            <div>
              <p className="text-white tracking-widest">
                Stock:{result?.stock}
              </p>
            </div>
          </div>
        ) : (
          <div className="my-3 flex justify-between gap-3">
            <div className="flex gap-3">
              <FaTimesCircle
                title="Available"
                className="text-white cursor-pointer text-2xl"
              />
              <p className="text-red-600 tracking-widest">
                Currently not available
              </p>
            </div>

            <div>
              <p className="text-white tracking-widest">
                Stock:{result?.stock}
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col items-start gap-3">
          <p className="text-white tracking-widest">Provided by KCT Library</p>
          {result?.stock !== 0 && (
            <button
              className="py-[10px] ml-2 bg-slate-600 rounded-md px-8 text-white tracking-widest hover:bg-slate-800"
              onClick={() => showStatus(result?._id)}
            >
              <div className="flex gap-1">
                <span>
                  <RiDownloadCloud2Line className=" text-xl" />
                </span>{" "}
                <span>Request</span>
              </div>
            </button>
          )}
        </div>

        <hr className="my-5 border border-[#313131]" />
        <h2 className="text-3xl text-white tracking-widest">Synopsis</h2>
        <p className="text-white font-serif tracking-widest text-xl text-justify">
          {`${showFullText
            ? result?.desc
            : result?.desc.slice(0, result?.desc.length / 2.5)}`}
        </p>
        {result?.desc.length > 100 && (
          <button
            className="text-blue-500 underline mt-2"
            onClick={toggleTextVisibility}
          >
            {showFullText ? "See Less" : "See More..."}
          </button>
        )}
        <hr className="my-5 border border-[#313131]" />

        <h2 className="text-white text-2xl capitalize tracking-widest font-bold">
          Other info
        </h2>
        <div className=" grid grid-cols-2  sm:flex flex-wrap justify-center  mt-3 gap-4 cursor-pointer">
          <OtherInfo
            one={"isbn"}
            two={result?.isbn}
            Icon={<FaBarcode className="text-xl" />}
          />
          <OtherInfo
            one={"Language"}
            two={"English"}
            Icon={<FaGlobe className="text-xl" />}
          />
          <OtherInfo
            one={"Publisher"}
            two={result?.publisher}
            Icon={<FaBook className="text-xl" />}
          />
          <OtherInfo
            one={"Pub Date"}
            two={`${new Date(
              result?.yearofpublication
            ).getFullYear()}/${new Date(
              result?.yearofpublication
            ).getMonth()}/${new Date(result?.yearofpublication).getDate()} `}
            Icon={<FaCalendar className="text-xl" />}
          />
        </div>
        <hr className="my-5 border border-[#313131]" />

        <div>
          <h2 className="text-white text-xl tracking-widest ">Ratings</h2>
          <div className="w-full h-[150px] space-y-4   p-4 flex flex-col gap-2 mt-2 rounded-md text-white  border bg-[#EAF8FB]">
            <h2 className="text-black font-black text-xl tracking-widest">
              How would you rate this book?
            </h2>
            <div className="flex  text-3xl gap-5 text-[#212121] ">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((data) => {
                  return (
                    <span key={data}>
                      <FaStar
                        className={`cursor-pointer   ${
                          data <= rating ? "text-yellow-400" : "text-[#9E9E9E]"
                        }`}
                        onMouseOver={() => handleStarHover(data)}
                        onClick={() => handleStarClick(data)}
                      />
                    </span>
                  );
                })}
              </div>
              <div>
                <p className="text-black text-xl font-light">{`${
                  typeof rating === "undefined" ? "0" : rating
                }.0`}</p>
              </div>
            </div>
          </div>
        </div>

        <RecommendationSection
          newRecommendation={newRecommendation}
          h2="You May Like"
        />

        <Knn newRecommendation={knn} h2="Recommended to you" />

        <RecommendationSection
          newRecommendation={similar}
          h2="See similar books"
          category={result?.category?.category_name}
        />
        {message != null && <Issue message={message} id={id} />}
      </div>
    </>
  );
};

export default Detail;
