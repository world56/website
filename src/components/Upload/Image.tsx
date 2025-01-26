import Image from "next/image";
import { uploadFile } from "@/app/api";
import { useState, forwardRef } from "react";
import { getUploadFiles } from "@/lib/filter";
import { CameraFilled, LoadingOutlined } from "@ant-design/icons";

import { API_RESOURCE } from "@/app/api";

import type { ForwardRefRenderFunction } from "react";

type TypeUploadImageRefProps<T = string> = ForwardRefRenderFunction<
  HTMLDivElement,
  {
    radius?: boolean;
    size?: keyof typeof SIZE;
    readonly value?: T;
    onChange?(value?: T): void;
    className?: string;
  }
>;

const SIZE = {
  small: { IMG: `w-11 h-11`, NAME: undefined, SIZE: 80 },
  middle: { IMG: `w-20 h-20`, NAME: `text-xs`, SIZE: 108 },
  large: { IMG: `w-36 h-36`, NAME: `text-sm`, SIZE: 140 },
};

/**
 * @name UploadImage 上传图片
 */
const UploadImage: TypeUploadImageRefProps = (
  { size = "middle", radius = true, className = "", value, onChange },
  ref,
) => {
  const toWhite = size === "small" ? "dark:dark-icon" : "";

  const [load, setLoad] = useState(false);
  const [val, setVal] = useState<string>();

  async function onStart() {
    try {
      const [file] = await getUploadFiles({
        size: 3145728,
        accept: ".svg, .jpg, .jpeg, .png, .ico, .webp",
      });
      setLoad(true);
      const { path } = await uploadFile(file);
      updateValue(path);
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  }

  function updateValue(val?: string) {
    onChange ? onChange(val) : setVal(val);
  }

  function getValue() {
    return value || val || "";
  }

  const RESOURCE_URL = getValue();

  const STYLE = SIZE[size];

  const borderRadius = radius ? "rounded-full" : "rounded-md";

  return (
    <div
      ref={ref}
      onClick={onStart}
      className={`
         relative flex justify-center items-center flex-col ${STYLE.IMG} 
         cursor-pointer border border-dashed overflow-hidden select-none ${className}
        border-gray-400 text-gray-600 hover:border-black hover:text-black ${borderRadius}
        dark:text-white dark:hover:border-white
      `}
    >
      {RESOURCE_URL ? (
        <>
          <Image
            alt="#"
            priority
            width={STYLE.SIZE}
            height={STYLE.SIZE}
            src={`${API_RESOURCE}${RESOURCE_URL}`}
            className={`w-full h-full object-cover ${toWhite} ${borderRadius}`}
          />
          {load ? (
            <LoadingOutlined className="text-sm absolute text-black dark:text-white" />
          ) : (
            <CameraFilled className="text-sm absolute text-black dark:text-white" />
          )}
        </>
      ) : (
        <>
          {load ? <LoadingOutlined /> : <CameraFilled />}
          {STYLE?.NAME ? (
            <span className={`mt-1 ${STYLE.NAME}`}>
              {load ? "正在上传" : "点击上传"}
            </span>
          ) : null}
        </>
      )}
    </div>
  );
};

export default forwardRef(UploadImage);
