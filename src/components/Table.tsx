import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import Cookies from "js-cookie";
import { logout } from "../store/auth/slice";
import {
  createTaskAsync,
  deleteAsnyc,
  getTasksAsync,
  updateTaskAsync,
} from "../store/tasks/async";
import { MdDelete } from "react-icons/md";

export function TaskTable() {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");

  const filteredTasks =
    filter === "completed"
      ? tasks.filter((task) => task.completed)
      : filter === "incomplete"
      ? tasks.filter((task) => !task.completed)
      : tasks;

  useEffect(() => {
    dispatch(getTasksAsync());
  }, [dispatch]);

  const handleToggleCompleted = (id: number) => {
    try {
      dispatch(updateTaskAsync(id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteAsnyc(id));
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    dispatch(logout());
    alert("Logout success");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    try {
      dispatch(createTaskAsync(title));
      setTitle("");
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setTitle("");
    setModal(false);
  }

  return (
    <div className="mx-5 mt-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer text-center me-2 mb-2 ${
              filter === "all"
                ? "text-white bg-gradient-to-r from-cyan-500  to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                : "bg-gray-200"
            }`}
          >
            All Tasks
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`font-medium rounded-lg text-sm px-5 cursor-pointer py-2.5 text-center me-2 mb-2 ${
              filter === "completed"
                ? "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                : "bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("incomplete")}
            className={`font-medium rounded-lg text-sm px-5 cursor-pointer py-2.5 text-center me-2 mb-2 ${
              filter === "incomplete"
                ? "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                : "bg-gray-200"
            }`}
          >
            Incomplete
          </button>
        </div>
        {isLoggedIn && (
          <div>
            <button
              onClick={() => setModal(true)}
              className="text-white bg-gradient-to-r cursor-pointer from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Create Task
            </button>
            <button
              onClick={handleLogout}
              className="text-white bg-gradient-to-r cursor-pointer from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Task Name</th>
              <th className="px-6 py-3">Completed</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {task.title}
                </td>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompleted(task.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                <td className="px-6 py-4 flex gap-2 justify-center">
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    <MdDelete className="cursor-pointer size-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[30%] max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-center">Create Task</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="text-xl font-semibold">Task</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type your task here"
                className="border rounded px-3 py-2"
              />
              <button
                type="submit"
                className="py-2 rounded text-white cursor-pointer bg-blue-500 hover:bg-blue-700"
              >
                Save Task
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                className="text-sm text-gray-500 hover:underline cursor-pointer"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
