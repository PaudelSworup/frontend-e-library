import React from "react";
import { enableBookAccess, getReports } from "../../API/bookAPI";
import { image } from "../../config";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Requests = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => enableBookAccess(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });

  const { isLoading, data, error } = useQuery(
    ["requests"],
    async () => await getReports()
  );

  if (error) {
    return <h2>something went wrong...</h2>;
  }

  if (isLoading) {
    return <h2>Loading.....</h2>;
  }

  const authorizeBookRequests = (id) => {
    mutation.mutate(id);
    // enableBookAccess(id)
    //   .then((res) => {
    //     if (res?.error && res?.success === false) {
    //       return toast.error(res?.error, { position: "top-right" });
    //     } else return toast.success(res?.message, { position: "top-center" });
    //   })
    //   .catch((err) => console.error(err));
  };

  return (
    <div className="flex items-center justify-end">
      <div className="relative overflow-x-auto">
        <table className="lg:w-auto w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Book Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Issue Date
              </th>

              <th scope="col" className="px-6 py-3">
                user Name
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>

              <th scope="col" className="px-6 py-3">
                Approval Corner
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.request?.map((data) => {
              return (
                <tr
                  key={data?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    <img
                      className="h-auto req_thumb_image max-w-[150px] object-contain"
                      src={`${image}/${data?.books_id?.image}`}
                      alt=""
                    />
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data?.books_id?.title}
                  </td>
                  <td className="px-6 py-4">
                    {data?.books_id?.category?.category_name}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(data?.issueDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{data?.user_id?.fullname}</td>
                  <td className="px-6 py-4">
                    {data?.issueStatus === 1
                      ? "Approved"
                      : data?.issueStatus === 2
                      ? "Rejected"
                      : "Pending"}
                  </td>
                  <td className="px-6 py-4 grid gap-4">
                    {data?.issueStatus === 1 ? (
                      <button
                        disabled
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Approved
                      </button>
                    ) : data?.issueStatus === 2 ? (
                      <button
                        disabled
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Rejected
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            authorizeBookRequests(data?.user_id?._id)
                          }
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Approve
                        </button>

                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
