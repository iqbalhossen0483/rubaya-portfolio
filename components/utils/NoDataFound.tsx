const NoDataFound = ({ message }: { message?: string }) => {
  return (
    <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
      {message || "No data found"}
    </div>
  );
};

export default NoDataFound;
