import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteUserData, getUser } from "../../API/userAuthApi";
import Loading from "../users/Loading";
import { FaTrash } from "react-icons/fa";
import { BsFillExclamationOctagonFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

const Users = () => {
  const [users, setUsers] = useState([]);

  const { data, error, isLoading } = useQuery(
    ["getusers"],
    async () => await getUser(),
    {
      onSuccess: (data) => {
        const userData = data?.data?.user.filter((data) => data?.role === 0);
        setUsers(userData);
      },
    }
  );
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (userId) => deleteUserData(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getusers"] });
    },
  });

  const deleteUser = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center justify-evenly">
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
                      className="text-xl text-red-700"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
