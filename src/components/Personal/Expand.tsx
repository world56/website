"use client";

import { useState } from "react";
import { DownCircleOutlined } from "@ant-design/icons";

const Expand = () => {
  const [open, setOpen] = useState(false);

  function onClick() {
    const ele = document.getElementById("personal")!;
    ele.className = open ? `md:block hidden` : `md:block`;
    setOpen((b) => !b);
  }

  return (
    <button
      onClick={onClick}
      className="flex md:hidden absolute right-4 top-4"
    >
      <DownCircleOutlined
        className={`text-xl duration-200 transform ${open ? "rotate-180" : "rotate-0"}`}
      />
    </button>
  );
};

export default Expand;
