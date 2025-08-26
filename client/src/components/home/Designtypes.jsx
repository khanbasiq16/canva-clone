import { designTypes } from '@/config'
import { Loader } from 'lucide-react'
import React from 'react'

const Designtypes = () => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 mt-12 justify-center">
      {designTypes.map((type, index) => (
        <div
        //   onClick={() => handleCreateNewDesign(type, index)}
          key={index}
          className="flex cursor-pointer flex-col items-center"
        >
          <div
            className={`${type.bgColor} w-14 h-14 rounded-full flex items-center justify-center mb-2`}
          >
            {type.icon}
          </div>
          <span className="text-xs items-center flex gap-2 text-center">
            {/* {loading && currentSelectedType === index && (
              <Loader className="w-3 h-3" />
            )} */}
            {type.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Designtypes