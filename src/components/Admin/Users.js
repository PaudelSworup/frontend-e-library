import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteUserData, getUser } from "../../API/userAuthApi";
import Loading from "../users/Loading";
import { FaTrash } from "react-icons/fa";
import { BsFillExclamationOctagonFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [sure, setSure] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { status } = useQuery(["getusers"], async () => await getUser(), {
    onSuccess: (data) => {
      const userData = data?.data?.user.filter((data) => data?.role === 0);
      setUsers(userData);
    },
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (userId) => deleteUserData(userId),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["getusers"] });
    },
  });

  const handleSubmit = () => {
    mutation.mutate(selectedUserId);
    setSure(false);
  };

  const deleteUser = (id) => {
    setSelectedUserId(id);
    setSure(true);
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center lg:ml-[250px] justify-center">
        <div className="relative overflow-x-auto">
          <table className="lg:w-auto w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>

                <th scope="col" className="px-6 py-3">
                  email
                </th>

                <th scope="col" className="px-6 py-3">
                  Status
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((data) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={data?._id}
                >
                  <td className="px-6 py-4">{data?.fullname}</td>

                  <td className="px-6 py-4">{data?.address}</td>
                  <td className="px-6 py-4">{data?.mobilenum}</td>
                  <td className="px-6 py-4">{data?.email}</td>

                  <td className="px-6 py-4">
                    {data?.isVerified === true ? (
                      <MdVerified className="text-2xl text-green-700" />
                    ) : (
                      <BsFillExclamationOctagonFill className="text-2xl text-yellow-400" />
                    )}
                  </td>
                  <td className="px-6 py-4 grid gap-4">
                    <FaTrash
                      onClick={() => deleteUser(data?._id)}
                      className="text-xl  cursor-pointer text-red-700"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {sure && (
        <>
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full justify-center items-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FaTrash className="text-2xl text-red-700" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 tracking-wide">
                            Are you sure want to Remove this user?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                      Delete
                    </button>
                    <Link to="/admin">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer position="top-center" />
        </>
      )}
    </>
  );
};

export default Users;
