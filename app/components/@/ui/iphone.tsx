import Image from "next/image";
import React from "react";

interface IphoneMockupProps {
  imageSrc: string;
  alt?: string;
}

const IphoneMockup = ({
  imageSrc,
  alt = "iPhone screen",
}: IphoneMockupProps) => {
  return (
    <div className="relative mb-10 mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">

        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
          <Image
            src={imageSrc}
            alt={alt}
            width={272}
            height={572}
          />
        </div>
      </div>
    </div>
  );



};

export default IphoneMockup;
