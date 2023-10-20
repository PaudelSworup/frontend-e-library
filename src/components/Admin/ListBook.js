import React from "react";
import { getAllBooks } from "../../API/bookAPI";
import { image } from "../../config";
import { useQuery } from "react-query";

const ListBook = () => {
  const { data, status } = useQuery(
    ["getallbooks"],
    async () => await getAllBooks()
  );
  return (
    <div className="flex items-center lg:ml-[250px] justify-center">
      <div className="relative overflow-x-auto">
        <table className="lg:w-auto w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>

              <th scope="col" className="px-6 py-3">
                Category
              </th>

              <th scope="col" className="px-6 py-3">
                Publisher
              </th>
              <th scope="col" className="px-6 py-3">
                ISBN
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.books?.map((data) => {
              return (
                <tr
                  key={data?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    <img
                      className="h-auto req_thumb_image max-w-[150px] object-contain"
                      src={`${image}/${data?.image}`}
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data?.title}
                  </td>
                  <td className="px-6 py-4">{data?.category?.category_name}</td>
                  <td className="px-6 py-4">{data?.publisher}</td>
                  <td className="px-6 py-4">{data?.isbn}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBook;
