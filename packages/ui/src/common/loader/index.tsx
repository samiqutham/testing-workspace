import loaderGif from "@workspace/ui/assets/loader.gif";

const Loader = () => {
  return (
    <div className="fixed loading inset-0 z-[9999] flex items-center overflow-hidden justify-center bg-[#1a2c38]">
      <img src={loaderGif.src} alt="loader" className="w-[200] h-18" />
    </div>
  );
};

export default Loader;
