import Image from "next/image";
import { uploadFiles } from "@/app/api";
import { useState, forwardRef } from "react";
import { getUploadFiles } from "@/lib/filter";
import { CameraFilled, LoadingOutlined } from "@ant-design/icons";

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
  const [load, setLoad] = useState(false);
  const [val, setVal] = useState<string>();

  async function onStart() {
    try {
      const chunk = await getUploadFiles({
        size: 3145728,
        accept: ".svg, .jpg, .jpeg, .png, .ico, .webp",
      });
      setLoad(true);
      const [res] = await uploadFiles(chunk);
      updateValue(res?.url);
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

  const url = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${RESOURCE_URL}`;

  return (
    <div
      ref={ref}
      onClick={onStart}
      className={`
         relative flex justify-center items-center flex-col ${STYLE.IMG} 
         cursor-pointer border border-dashed overflow-hidden select-none ${className}
        border-gray-400 text-gray-600 hover:border-black hover:text-black ${borderRadius}
      `}
    >
      {RESOURCE_URL ? (
        <>
          <Image
            alt="#"
            priority
            src={url}
            width={STYLE.SIZE}
            height={STYLE.SIZE}
            className={`w-full h-auto object-cover ${borderRadius}`}
          />
          {load ? (
            <LoadingOutlined className="text-sm text-black absolute" />
          ) : (
            <CameraFilled className="text-sm text-black absolute" />
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
