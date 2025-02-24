import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { useDebouncedCallback } from "use-debounce";
import { LuCopyCheck } from "react-icons/lu";
import { IoMdCopy } from "react-icons/io";
import Modal from "../reUsableCmponent/modal/Modal";
import {
  useAddZoneMutation,
  useDeleteZoneMutation,
  useEditZoneMutation,
  useGetZonesQuery,
} from "../../api/zones";
import Pagination from "../Pagination";
import { PUBLIC_USER_FRONTEND_URL } from "../../common/utils";
import { toast } from "sonner";
import { newOrdersTableData } from "../../constants/tableData";

const Zones = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPopupData, setEditPopupData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const isLoading = false;
  const data = [{}];
  // const { data, isLoading, refetch } = useGetZonesQuery({
  //   limit,
  //   page: currentPage,
  //   search: searchValue,
  // });
  const [addZone, { isLoading: isLoadingMutation }] = useAddZoneMutation();
  const [copied, setCopied] = useState("");

  const [deleteZone, { isLoading: isLoadingDelete }] = useDeleteZoneMutation();
  const [EditZone, { isLoading: isLoadingEdit }] = useEditZoneMutation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target); // Make sure event.target is the form
    const name = formData.get("name"); // Get email input value
    const description = formData.get("description");
    const body = {
      name,
      description,
    };
    try {
      if (editPopupData) {
        formData.append("zoneId", editPopupData?._id);
        const editBody = {
          ...body,
          zoneId: editPopupData?._id,
        };
        const res = await EditZone?.(editBody);
        if (res?.data?.success) {
          // refetch({ page: 1 });
          toggleModal();
          setEditPopupData(null);
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            duration: 2000,
            style: {
              backgroundColor: "#fb0909", // Custom green color for success
              color: "#FFFFFF", // Text color
            },
            dismissible: true,
          });
        }
      } else {
        const res = await addZone?.(body);
        if (res?.data?.success) {
          // refetch();
          toggleModal();
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            duration: 2000,
            style: {
              backgroundColor: "#fb0909", // Custom green color for success
              color: "#FFFFFF", // Text color
            },
            dismissible: true,
          });
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEditClick = (zone) => {
    toggleModal();
    setEditPopupData(zone);
  };

  const handleDeleteClick = (id) => {
    setShowDeletePopup(true);
    setSelectedZoneId(id);
  };
  const handleDelete = async () => {
    try {
      const body = {
        zoneId: selectedZoneId,
      };
      const deleteres = await deleteZone?.(body);
      if (deleteres?.data?.success) {
        toast.success(deleteres?.data?.msg, {
          position: "top-right",
          duration: 2000,
          style: {
            backgroundColor: "green", // Custom green color for success
            color: "#FFFFFF", // Text color
          },
          dismissible: true,
        });
        // refetch();
        setSelectedZoneId(null);
        setShowDeletePopup(false);
      } else {
        toast.error(deleteres.data.message, {
          position: "top-right",
          duration: 2000,
          style: {
            backgroundColor: "#fb0909", // Custom green color for success
            color: "#FFFFFF", // Text color
          },
          dismissible: true,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleModalClose = () => {
    toggleModal();
    setEditPopupData(null);
  };

  const handleDeleteModalClose = () => {
    setShowDeletePopup(false);
  };
  const handleSearchChange = useDebouncedCallback(
    // function
    (value) => {
      setSearchValue(value ?? "");
    },
    500
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCopy = async (value, mainJudge) => {
    if (mainJudge) {
      setCopied(value);
      copy(PUBLIC_USER_FRONTEND_URL + "/participant/" + value);
      setTimeout(() => {
        setCopied("");
      }, 2000);
    } else {
      toast.error("Please add at least one main judge in this zone.", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#fb0909", // Custom green color for success
          color: "#FFFFFF", // Text color
        },
        dismissible: true,
      });
    }
  };
  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">New Orders</h2>
        <div className="ml-auto flex items-center space-x-4">
          <span className="flex items-center">
            {/* <span
              className="bg-[#808080] hover:bg-[#F8BF40] text-white rounded-3xl pt-2 pb-2 pl-4 pr-4 cursor-pointer"
              onClick={toggleModal}
            >
            Add Zone
            </span> */}

            <Modal
              isVisible={isModalVisible}
              onClose={handleModalClose}
              modalHeader={editPopupData ? "Edit Zone" : "Add Zone"}
            >
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="zoneName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zone Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    defaultValue={editPopupData ? editPopupData?.name : null}
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="mt-1 block w-full h-20 border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    defaultValue={
                      editPopupData ? editPopupData?.description : null
                    }
                  />
                </div>
                <div className="flex justify-center p-6">
                  <button
                    disabled={isLoadingMutation || isLoadingEdit}
                    type="submit"
                    className="bg-[#808080] hover:bg-[#F8BF40] text-white font-bold py-2 px-6 rounded-3xl"
                  >
                    {isLoadingMutation || isLoadingEdit
                      ? "loading..."
                      : "Submit"}
                  </button>
                </div>
              </form>
            </Modal>
            <Modal isVisible={showDeletePopup} onClose={handleDeleteModalClose}>
              <h3 className="flex justify-center self-center text-md font-bold">
                Are you sure want to Delete?
              </h3>
              <h3 className="flex justify-center self-center text-md font-bold">
                This will also delete the judges and participants in this zone.
              </h3>
              <div className="flex justify-center p-6">
                <button
                  onClick={handleDeleteModalClose}
                  type="submit"
                  className="border border-green-500 text-green-600 hover:bg-green-700 hover:text-white font-bold  py-2 m-2 px-8 rounded-2xl"
                >
                  No
                </button>
                <button
                  disabled={isLoadingDelete}
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-2 px-8 rounded-2xl"
                >
                  YES
                </button>
              </div>
            </Modal>
          </span>
        </div>
      </div>
      <div className="ml-auto lg:mr-4 flex items-center space-x-4 justify-end pt-3">
        {/* Parent div for span elements */}
        <span className="flex items-center justify-center">
          <input
            className="p-2 lg:w-[250px] w-full appearance-none bg-white border border-gray-400 rounded-3xl"
            placeholder="Search by name"
            onChange={(e) => {
              handleSearchChange(e.target.value);
            }}
          />
        </span>
        <span className="flex items-center ">
          <span className="cursor-pointer bg-[#808080] hover:bg-[#F8BF40] text-white p-2 lg:w-[100px] text-center rounded-3xl">
            Search
          </span>
        </span>
      </div>

      <table className="min-w-full table-auto mt-6 border-collapse">
        <thead className="bg-white border-gray-400 border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px]">
          <tr>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Sl No
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Order ID
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Order Time
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Order Items
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Table No.
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Bill No.
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Actions
            </th>
            {/* <th className="px-4 py-4 text-left">Action</th> */}
          </tr>
        </thead>
        <tbody className="border-[2px] border-opacity-70 border-[#969696]">
          {isLoading ? (
            <>Loading...</>
          ) : (
            newOrdersTableData?.map((order, index) => (
              <tr
                className="odd:bg-[#FCD199] even:bg-grey border-[2px] border-opacity-50 border-[#9e9696]"
                key={index}
              >
                <td className="px-4 py-2 border-r border-gray-400">
                  {index + 1}
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  className="px-4 py-2 border-r border-gray-400"
                >
                  <u
                    style={{ cursor: "pointer" }}
                    onMouseOver={({ target }) => (target.style.color = "blue")}
                    onMouseOut={({ target }) => (target.style.color = "black")}
                  >
                    {order?.orderId}
                  </u>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {/* <button
              className="flex text-black items-center space-x-1"
              // onClick={() => handleCopy(zone?._id,zone?.mainJudge)}
            >
              {copied === zone?._id ? (
                <LuCopyCheck title="Copied" className="h-6 w-6" />
              ) : (
                <IoMdCopy title="Copy" className="h-6 w-6" />
              )}
              <span className="text-[#1F5EE7]">Competition Link</span>
            </button> */}
                  {order?.orderTime}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <div className=" -space-x-2">
                    {order.menu1} x 6   {"    "}
                   
                    {/* <span className="inline-block rounded-full p-2 border border-gray-400 text-sm w-[145px] text-center">
                      {"Move to kitchen"}
                    </span> */}
                  </div>
                  <div className=" -space-x-2">{order.menu2} x 2  </div>
                  <div className=" -space-x-2">{order.menu1} x 1  </div>
                  <div style={{display:"flex",justifyContent:"space-between"}} className=" -space-x-2">{order.menu2} x 4  </div>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <div className="flex -space-x-2">{order.tableNo}</div>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {order.billNo}
                </td>
                <td className="p-2 border-b border-r border-gray-400">
                <span className="inline-block rounded-full p-2 m-2 border border-gray-400 text-sm w-[145px] text-center">
                  {"Mark as Preparing"}
                </span>
                <span className="inline-block rounded-full p-2 m-2 border border-red-400 text-sm w-[145px] text-center">
                  {"Reject Order"}
                </span>
              </td>
                {/* <td className="px-4 py-2">
            <button onClick={() => handleEditClick(zone)}>
              <img
                alt="pics"
                src="/icons/edit.svg"
                className="w-6 h-6 rounded-full mr-2"
              />
            </button>
            <button onClick={() => handleDeleteClick(zone?._id)}>
              <img
                alt="pics"
                src="/icons/delete.svg"
                className="w-6 h-6 rounded-full mr-2 fill-red-500"
                style={{ filter: "invert(20%) sepia(94%) saturate(7496%) hue-rotate(347deg) brightness(102%) contrast(104%)" }} 
              />
            </button>
          </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="m-auto flex justify-end">
        <Pagination
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={data?.totalPages}
        />
      </div>
    </>
  );
};

export default Zones;
