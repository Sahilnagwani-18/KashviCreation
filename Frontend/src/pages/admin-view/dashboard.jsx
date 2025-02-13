import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#F5F5F5] min-h-screen">
      {/* Image Upload Box */}
      <div className="bg-[#C0BEBE] p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button
          onClick={handleUploadFeatureImage}
          className="mt-5 w-full bg-[#D19A66] hover:bg-[#B67C49] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Upload
        </Button>
      </div>

      {/* Display Uploaded Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-md bg-[#C0BEBE] transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={featureImgItem.image}
                  className="w-full h-[250px] object-cover rounded-lg transform scale-100 group-hover:scale-105 transition-transform duration-300"
                  alt="Uploaded"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#D19A66] via-transparent to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center font-semibold">Feature Image</p>
                </div>
              </div>
            ))
          : <p className="text-center text-gray-600">No images uploaded yet.</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;
