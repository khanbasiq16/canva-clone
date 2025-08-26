import React from "react";

const Recentdesign = () => {
  const design = Array(6)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      title: `Design ${i + 1}`,
      thumbnail: "/placeholder-design.svg", // replace with real image
    }));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Designs</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {design.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            {/* Thumbnail Image */}
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
           
            </div>

            <p className="mt-2 text-sm font-bold truncate">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recentdesign;
