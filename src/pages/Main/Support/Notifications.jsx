import { Button } from "antd";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Swal from "sweetalert2";
import moment from "moment";
import { formatDistanceToNow } from "date-fns";
import {
  useDeleteAllNotificationsMutation,
  useGetAllNotificationQuery,
  useGetANotificationQuery,
  useReadNotificationMutation,
} from "../../../redux/features/notificationApi";
import Loading from "../../../Components/Shared/Loading";

const Notifications = () => {
  const [page, setPage] = useState(1); // Current page state
  const [notifications, setNotifications] = useState([]); // To store notifications
  const itemsPerPage = 10; // Number of items per page

  const { data, isLoading, refetch } = useGetAllNotificationQuery({
    page,
    limit: itemsPerPage,
  });
  const { refetch: refetchNotification } = useGetANotificationQuery(undefined);

  const [read, { isLoading: isReadLoading }] = useReadNotificationMutation();

  //delele
  const [deleteNotification, { isLoading: isDeleteLoading }] =
    useDeleteAllNotificationsMutation();

  const handlePageChange = (newPage) => {
    setPage(newPage); // Update the page number
  };

  // Setup the socket connection and listen for real-time updates
  useEffect(() => {
    const socket = io(import.meta.env.VITE_BASE_URL); // Connect to your socket server

    socket.on("get-notification::ADMIN", (newNotification) => {
      setNotifications((prevNotifications) => {
        refetchNotification();

        const exists = prevNotifications.some(
          (notification) => notification._id === newNotification._id
        );

        if (!exists) {
          return [newNotification, ...prevNotifications]; // Add the new notification
        }
        return prevNotifications; // Return the previous state if no new data
      });
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // When data is fetched, set it in the notifications state
  useEffect(() => {
    if (data?.data) {
      setNotifications(data.data); // Replace notifications with current page data
    }
  }, [data]);

  // Trigger refetch on component mount or page change
  useEffect(() => {
    refetch();
  }, [refetch, page]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleDeleteNotification = async () => {
    try {
      const res = await deleteNotification("/admin").unwrap();

      if (res?.success) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${res.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      refetch();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleReadNotification = async () => {
    try {
      const res = await read("/admin").unwrap();

      if (res?.success) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${res.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      refetch();
    } catch (error) {
      console.error("Error reading notification:", error);
    }
  };

  return (
    <div className="mt-5">
      <div className="p-5 bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between my-4">
          <h1 className="text-2xl font-semibold text-black">Notification</h1>
          <div>
            <Button
              loading={isReadLoading}
              onClick={handleReadNotification}
              className="h-10 text-sm font-normal bg-black border rounded-lg text-primary border-primary"
            >
              <span>Read All</span>
            </Button>
            <Button
              loading={isDeleteLoading}
              onClick={handleDeleteNotification}
              className="h-10 ml-5 text-sm font-normal bg-black border rounded-lg text-primary border-primary"
            >
              <span>Delete All</span>
            </Button>
          </div>
        </div>
        <div>
          {notifications?.map((item) => (
            <div
              key={item._id}
              className="w-full p-4 mx-auto my-4 bg-white rounded-md shadow-md min-h-20"
            >
              <div className="text-sm">
                <div className="flex items-center justify-between gap-5 ">
                  <p className="font-semibold text-[#555555]">{item?.text}</p>
                  <div className="flex justify-between items-center gap-5 text-[#A7A7A7]">
                    <span className="text-xs text-black">
                      {formatDistanceToNow(new Date(item?.createdAt), {
                        addSuffix: true,
                      })}{" "}
                      {/* Display time ago */}
                    </span>
                    <span className="text-xs text-black">
                      {moment(item?.createdAt).format("YYYY-MM-DD")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <Button
            className="mr-2"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-500">{`Page ${page}`}</span>
          <Button
            className="ml-2"
            onClick={() => handlePageChange(page + 1)}
            disabled={data?.meta?.nextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
