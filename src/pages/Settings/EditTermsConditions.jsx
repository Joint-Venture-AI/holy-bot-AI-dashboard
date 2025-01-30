import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import Quill from "quill";
import { useUpdateTermsMutation } from "../../redux/features/settingApi";
import Swal from "sweetalert2";

// Import 'size' style attributor
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["14px", "16px", "18px"]; // Custom font sizes
Quill.register(Size, true);

const modules = {
  toolbar: {
    container: [
      [{ size: ["14px", "16px", "18px"] }], // Use whitelisted sizes
      [{ color: [] }], // Text color dropdown
      ["bold", "italic", "underline", "strike"], // Formatting options
      [{ align: [] }],
      ["image", "link"],
      [{ list: "bullet" }],
    ],
    handlers: {
      align: function (value) {
        this.quill.format("align", value);
      },
    },
  },
};

const formats = [
  "size", // Custom font sizes
  "color",
  "align",
  "bold",
  "italic",
  "underline",
  "link",
  "image",
  "list",
];
const EditTermsConditions = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const [data] = useUpdateTermsMutation();

  const handleSave = async () => {
    try {
      // Trigger the addTerms mutation with the new content
      const res = await data({ description: content }).unwrap();

      if (res?.success) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${res.message}`,
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/settings/terms-conditions");
      }
    } catch (err) {
      // Handle error (optional)
      Swal.fire({
        position: "top",
        icon: "error",
        title: `${err}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  console.log(content);

  return (
    <>
      <Link to="/settings/terms-conditions">
        <div className="flex items-center gap-2 text-xl">
          <FaAngleLeft />
          <h1>Terms & Condition </h1>
        </div>
      </Link>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-black mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
            Terms & Condition Edit
          </h3>
          <div className="w-full px-16">
            <div className="h-full border border-gray-400 rounded-md">
              <div className="ql-toolbar-container h-56">
                <ReactQuill
                  placeholder="Enter your update terms & conditions..."
                  theme="snow"
                  value={content}
                  onChange={(value) => setContent(value)}
                  modules={modules}
                  formats={formats}
                  className="custom-quill-editor"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-8 pr-16">
            <Button
              // onClick={(e) => navigate(`edit`)}
              onClick={handleSave}
              size="large"
              type="primary"
              className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold w-1/4"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTermsConditions;
