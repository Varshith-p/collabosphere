import Loading from "@/components/Loading";
import { removePicture, uploadPicture } from "@/redux/user/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const [isUpdated, setIsUpdated] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleFileUpload = async (event) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setImageLoading(true);
      const res = await dispatch(uploadPicture(formData));
      if (res.meta.requestStatus == "fulfilled") {
        console.log("done");
      }
      setImageLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    const res = await dispatch(removePicture());
    if (res.meta.requestStatus == "fulfilled") {
      console.log("done");
    }
  };

  return (
    <section>
      <div className="px-[60px] py-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium">Edit Profile</h1>
        <button
          // onClick={handleSubmit}
          className={`py-1 px-[14px] flex items-center justify-center rounded-[6px] h-[42px] bg-primary text-white ${
            !isUpdated && "bg-primary/50 pointer-events-none"
          }`}
        >
          Save
        </button>
      </div>
      <div className="px-[60px] pb-6 flex flex-col items-start gap-[24px]">
        <div className="flex gap-4 items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={`${user.image || "/avatar.svg"}`}
              alt="Avatar"
              className="object-cover"
            />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="h-[42px] cursor-pointer rounded-[6px]  bg-cancel text-cancelText font-medium">
            <input
              type="file"
              name="profile"
              id="profile"
              accept="image/*"
              onChange={(event) => {
                handleFileUpload(event);
                event.target.value = null; // This line resets the input field
              }}
              className="hidden"
            />
            <label
              htmlFor="profile"
              className={`cursor-pointer h-full flex items-center px-[14px] ${
                imageLoading && "pointer-events-none"
              }`}
            >
              {imageLoading ? <Loading /> : "Upload Photo"}
            </label>
          </div>
          <button
            onClick={handleRemoveImage}
            className="text-[#D30A0A] underline font-medium"
          >
            Remove Photo
          </button>
        </div>
        <div className="flex flex-col gap-6 w-[370px] 2xl:w-[420px]">
          <div className="flex flex-col gap-4">
            <label className="font-medium">First Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsUpdated(true);
              }}
              className="h-[42px] px-3 rounded-[6px] border border-border-color bg-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsUpdated(true);
              }}
              className="h-[42px] px-3 rounded-[6px] border border-border-color bg-white focus:outline-none"
            />
          </div>

          <button
            // onClick={() => setOpen(true)}
            className="h-[42px] w-fit px-[14px] rounded-[6px] font-medium bg-[#F1F1F1] text-[#61656C]"
          >
            Change Password
          </button>
        </div>
      </div>
      {/* <ChangePasswordModal
        userId={userId}
        open={open}
        onClose={handleCloseModal}
      /> */}
    </section>
  );
};

export default EditProfile;
