import React from "react";
import { Transition, Disclosure} from "@headlessui/react";

import { useLocation, useNavigate } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Transition
      show={isOpen}
      enter="transition duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition duration-300 transfo rm"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
      className="bg-[#FFFFFF] w-[268px] h-full space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform lg:relative lg:translate-x-0 z-50"
    >
      {/* Sidebar content */}
      <div>
        {/* Close button for mobile */}
        <button
          className="lg:hidden text-black focus:outline-none absolute right-4 top-4"
          onClick={() => setIsOpen(false)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Links */}
        {/* <div
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split("/")[1] === ""
              ? "text-[#000000]"
              : "text-[#909294]"
          }  hover:text-[#F8BF40]`}
          onClick={() => navigate("/")}
        >
          <span className="flex items-center ml-2">
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill={
                location?.pathname?.split("/")[1] === ""
                  ? "#000000"
                  : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.375 0.8125H17.9708L17.675 1.075L14.1875 4.5625H5.3125C4.47361 4.5625 3.69306 4.77222 2.97083 5.19167C2.24583 5.61111 1.67361 6.18333 1.25417 6.90833C0.834722 7.63056 0.625 8.41111 0.625 9.25V18.625C0.625 19.4639 0.834722 20.2458 1.25417 20.9708C1.67361 21.6931 2.24583 22.2639 2.97083 22.6833C3.69306 23.1028 4.47361 23.3125 5.3125 23.3125H14.6875C15.5264 23.3125 16.3083 23.1028 17.0333 22.6833C17.7556 22.2639 18.3264 21.6931 18.7458 20.9708C19.1653 20.2458 19.375 19.4639 19.375 18.625V0.8125ZM14.9792 6.4375L17.5 3.91667V18.625C17.5 19.4056 17.2264 20.0694 16.6792 20.6167C16.1319 21.1639 15.4681 21.4375 14.6875 21.4375H5.3125C4.53194 21.4375 3.86806 21.1639 3.32083 20.6167C2.77361 20.0694 2.5 19.4056 2.5 18.625V9.25C2.5 8.46944 2.77361 7.80556 3.32083 7.25833C3.86806 6.71111 4.53194 6.4375 5.3125 6.4375H14.9792ZM12.8125 9.25H7.1875C6.67917 9.25 6.24028 9.43611 5.87083 9.80833C5.49861 10.1778 5.3125 10.6167 5.3125 11.125V16.75C5.3125 17.2583 5.49861 17.6972 5.87083 18.0667C6.24028 18.4389 6.67917 18.625 7.1875 18.625H16.9417L14.6875 16.3417V11.125C14.6875 10.6167 14.5014 10.1778 14.1292 9.80833C13.7597 9.43611 13.3208 9.25 12.8125 9.25ZM7.1875 16.75V11.125H12.8125V16.75H7.1875Z"
                fill={
                  location?.pathname?.split("/")[1] === ""
                    ? "#000000"
                    : "currentColor"
                }
              />
            </svg>
            <span className="text-custom-16 hover:text-[#F8BF40] ml-4">
              Dashboard
            </span>
          </span>
        </div> */}
        <div
          onClick={() => navigate("/zones")}
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split("/")[1] === "zones"
              ? "text-[#000000]"
              : "text-[#909294]"
          }  hover:text-[#F8BF40]`}
        >
          <span className="flex items-center ml-2 ">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={
                location?.pathname?.split("/")[1] === "zones"
                  ? "#000000"
                  : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
d="M3 17h18c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1zm2-4h14v-1c0-3.31-2.69-6-6-6h-2c-3.31 0-6 2.69-6 6v1zm7-9c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zM8 20c0 .55.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1z"
fill={
                  location?.pathname?.split("/")[1] === "zones"
                    ? "#000000"
                    : "currentColor"
                }
              />
            </svg>
            <span className={`text-custom-16 ml-4`}>New Orders</span>
          </span>
        </div>

        <div
          onClick={() => navigate("/judges")}
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split("/")[1] === "judges"
              ? "text-[#000000]"
              : "text-[#909294]"
          }  hover:text-[#F8BF40]`}
        >
          <span className="flex items-center ml-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 64 64"
              fill={
                location?.pathname?.split("/")[1] === "judges"
                  ? "#000000"
                  : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
              className="transition-colors duration-200"
            >
              <path
  d="M32 3l-30 15 30 15 30-15-30-15zm0 9.5l20 10-20 10-20-10 20-10zm0 11l-20 10v7l20-10 20 10v-7l-20-10zm0 8.5l-10 5v2l10-5 10 5v-2l-10-5z"
fill={
                  location?.pathname?.split("/")[1] === "judges"
                    ? "#000000"
                    : "currentColor"
                }
              />
            </svg>

            <span className="text-custom-16 ml-4">Ongoing Orders</span>
          </span>
        </div>
        <div
          onClick={() => navigate("/participants")}
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split('/')[1] === "participants"
              ? "text-[#000000]"
              : "text-[#909294]"
          }  hover:text-[#F8BF40]`}
        >
          <span className="flex items-center ml-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 22 20"
              fill={
                location?.pathname?.split("/")[1] === "participants"
                  ? "#000000"
                  : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
              className="transition-colors duration-200"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"

fill={
                  location?.pathname?.split("/")[1] === "participants"
                    ? "#000000"
                    : "currentColor"
                }
              />
            </svg>

            <span className="text-custom-16 ml-4">Completed Orders</span>
          </span>
        </div>
        <div
          onClick={() => navigate("/questions")}
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split('/')[1] === "questions"
              ? "text-[#000000]"
              : "text-[#909294]"
          }  hover:text-[#F8BF40]`}
        >
          <span className="flex items-center ml-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 64 64"
              fill={
                location?.pathname?.split("/")[1] === "questions"
                  ? "#000000"
                  : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
              className="transition-colors duration-200"
            >
              <path
d="M32 2C15.4 2 2 15.4 2 32s13.4 30 30 30 30-13.4 30-30S48.6 2 32 2zm0 52C18.8 54 8 43.2 8 32S18.8 10 32 10s24 10.8 24 24-10.8 24-24 24zm0-14a4 4 0 110 8 4 4 0 010-8zm1-6c-.6 0-1-.4-1-1v-2c0-3.6 3.4-5 5.4-6.1 1.6-.8 2.6-2.5 2.6-4.4 0-2.9-2.4-5.2-5.5-5.2-3.3 0-5.5 2.3-5.5 5.5 0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1 0-5.1 4.1-9.5 9.5-9.5 5.2 0 9.5 4.2 9.5 9.2 0 3.2-1.7 6-4.5 7.5-2.2 1.2-3.5 2.1-3.5 3.8v2c0 .6-.4 1-1 1h-2z"
fill={
                  location?.pathname?.split("/")[1] === "questions"
                    ? "#000000"
                    : "currentColor"
                }
              />
            </svg>

            <span className="text-custom-16 ml-4">Cancelled Orders</span>
          </span>
        </div>
            {/* <div
              onClick={() => navigate("/bundles")}
              className={`cursor-pointer flex items-center ${
                location?.pathname?.split('/')[1] === "bundles"
                  ? "text-[#000000]"
                  : "text-[#909294]"
              }  hover:text-[#F8BF40]`}
            >
              <span className="flex items-center ml-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={
                    location?.pathname?.split("/")[1] === "bundles"
                      ? "#000000"
                      : "currentColor"
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors duration-200"
                >
                  <path
                    d="M3 3h18v18H3V3zm3 2v3h3V5H6zm5 0v3h3V5h-3zm5 0v3h3V5h-3zM5 10v3h3v-3H5zm5 0v3h3v-3h-3zm5 0v3h3v-3h-3zm-10 5v3h3v-3H5zm5 0v3h3v-3h-3zm5 0v3h3v-3h-3z"
                    fill={
                      location?.pathname?.split("/")[1] === "bundles"
                        ? "#000000"
                        : "currentColor"
                    }
                  />
                </svg>

                <span className="text-custom-16 ml-4">Settings</span>
              </span>
            </div> */}


        {/* <div
          onClick={() => navigate("/result")}
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split("/")[1] === "result"
              ? "text-[#000000]"
              : "text-[#909294]"
          }  hover:text-[#F8BF40]`}
        >
          <span className="flex items-center ml-2">
            <svg
              width="22"
              height="21"
              viewBox="0 0 24 24"
              fill={
                location?.pathname === "/result" ? "#000000" : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 9l-6 6-3-3 1.41-1.41L12 14.17l4.59-4.59L17 11z"
fill={
                  location?.pathname === "/result" ? "#000000" : "currentColor"
                }
              />
            </svg>

            <span className="text-custom-16 ml-4">
              Competition Result
            </span>
          </span>
        </div> */}
      </div>
    </Transition>
  );
}

export default Sidebar;
