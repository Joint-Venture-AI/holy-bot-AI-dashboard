import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Button } from "antd";

import Swal from "sweetalert2";
import {
  useGetAllTermsQuery,
  useUpdateTermsMutation,
} from "../../redux/features/settingApi";
import Loading from "../../Components/Shared/Loading";

const TermsConditions = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    style: {
      height: "400px",
      background: "white",
    },
  };

  const { data, isLoading } = useGetAllTermsQuery(undefined);

  const [addTerms, { isLoading: isSaving }] = useUpdateTermsMutation();

  const handleSave = async () => {
    try {
      // Trigger the addTerms mutation with the new content
      const res = await addTerms({ description: content }).unwrap();

      if (res?.success) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${res.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
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

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-white px-4 py-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-3xl text-black font-semibold">
          Terms and Conditions
        </h3>
      </div>
      <div>
        <JoditEditor
          ref={editor}
          value={data?.data?.description || ""}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
          onChange={() => {}}
        />
      </div>
      <div className="mt-6 flex justify-center">
        <Button
          style={{
            height: 40,
            width: "150px",
          }}
          type="primary"
          onClick={handleSave}
          loading={isSaving} // Show loading state when saving
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default TermsConditions;
