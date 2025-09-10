"use client";
import { getUserDesigns } from "@/services/design-service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Recentdesign = () => {
  const design = Array(6)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      title: `Design ${i + 1}`,
      thumbnail: "/placeholder-design.svg",
    }));

  const [userDesign, setUserDesign] = useState([]);
  const router = useRouter();

  const fetchuserdesgin = async () => {
    const result = await getUserDesigns();

    if (result.success) {
      setUserDesign(result.data);
    }

    console.log(result.data);
  };

  useEffect(() => {
    fetchuserdesgin();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Designs</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {!userDesign.length && <h1>No Design Found</h1>}

        {userDesign.map((item) => (
          <div onClick={() => router.push(`/editor/${item._id}`)} key={item._id} className="group cursor-pointer">
            {/* Thumbnail Image */}
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden transition-shadow hover:shadow-lg"></div>

            <p className="mt-2 text-sm font-bold truncate">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recentdesign;
