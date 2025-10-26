import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export function AvatarInput({ value }: { value: string }) {
  const [url, setUrl] = useState<string>();

  return (
    <label className="cursor-pointer">
      {!!url && <img src={url} className="w-20 h-20 rounded-full object-cover object-center" />}
      {!url && <FaUserCircle size={80} />}
      <input
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(e) => {
          setUrl(URL.createObjectURL(e.currentTarget.files[0]));
        }}
      />
      <input className="hidden" name="avatar" defaultValue={value} value={url} readOnly />
    </label>
  );
}