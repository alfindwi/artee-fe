import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store";
import { loginAsync, registerAsync } from "../store/auth/async";
import { loginSchema } from "../validations/loginSchema";

export function ButtonAuth() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<loginSchema> = async (data) => {
    try {
      if (modal === "login") {
        const res = await dispatch(loginAsync(data));
        if (loginAsync.fulfilled.match(res) && res.payload) {
          reset();
          setModal(null);
        } else if (loginAsync.rejected.match(res)) {
          console.error("Login failed:", res.payload);
        }
      } else if (modal === "register") {
        const res = await dispatch(registerAsync(data));
        if (registerAsync.fulfilled.match(res)) {
          reset();
          setModal(null);
        } else if (registerAsync.rejected.match(res)) {
          console.error("Register failed:", res.payload);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const [modal, setModal] = useState<null | "login" | "register">(null);
  const closeModal = () => {
    reset();
    setModal(null);
  };

  return (
    !isLoggedIn && (
      <div className="flex justify-end gap-2 m-5">
        <button
          onClick={() => setModal("login")}
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
        <button
          onClick={() => setModal("register")}
          className="bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-2 px-4 rounded"
        >
          Register
        </button>

        {modal && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-[30%] max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 text-center">
                {modal === "login" ? "Login" : "Register"}
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="border rounded px-3 py-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className="border rounded px-3 py-2"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}

                <button
                  type="submit"
                  className={`py-2 rounded text-white cursor-pointer ${
                    modal === "login"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {modal === "login" ? "Login" : "Register"}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  className="text-sm text-gray-500 hover:underline cursor-pointer"
                  onClick={closeModal}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}
