import Link from "next/link";

const NotFound = () => (
  <div className="mx-auto absolute left-[50%] top-[50%] ml-[-231px] mt-[-350px] select-none">
    <div className="flex flex-col items-center justify-center p-10">
      <p className="text-9xl font-light mb-1">4 0 4</p>
      <p className="text-3xl font-extralight">PAGE&nbsp; NOT&nbsp; FOUND</p>
      <p className="font-normal my-8 text-gray-500">
        这不是一个有效的（URL）访问地址，请确认后重试。
      </p>
      <Link className="underline hover:font-medium" href="/">
        返回首页
      </Link>
    </div>
  </div>
);

export default NotFound;
