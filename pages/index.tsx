import { useStorageUpload } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Logo from "./images/VNS_logo.png";
import Image from "next/image";

const Home: NextPage = () => {
  const [uris, setUris] = useState<string[]>([]);
  const [change, setChange] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [hashLink, setHashLink] = useState<string>("");
  const { mutateAsync: upload } = useStorageUpload();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const uris = await upload({
        data: acceptedFiles,
      });
      setUris((preUris) => [...preUris, ...uris]);
      setChange(true);
    },
    [upload]
  );
  const formattedUris = uris.map((uri) =>
    uri.replace("ipfs://", "gateway.ipfscdn.io/ipfs/")
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleChangeHash = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHashLink(event.target.value);
  };
  const handleCheck = () => {
    setCheck(true);
  };

  return (
    <>
      <header className="w-auto bg-gradient-to-r from-green-300 to-blue-300">
        <div className="h-20 w-40 py-4 flex items-center">
          <Image src={Logo} alt="logo" width={120} height={80}></Image>
        </div>
      </header>
      <div className="m-10 text-heading-10">
        {/* file input */}
        <div>
          <form className="flex">
            <p className="font-bold mr-5">Chọn file:</p>
            <div
              {...getRootProps()}
              className="w-[200px] h-[100px] text-teal-500 border-2 border-teal-500 border-dashed flex items-center justify-center cursor-pointer"
            >
              Chọn hoặc kéo thả tệp
              <input {...getInputProps} style={{ display: "none" }} />
            </div>
          </form>
          {change && (
            <div>
              <p className="font-bold">Kết quả:</p>
              {formattedUris && (
                <>
                  {formattedUris.map((uri, index) => (
                    <p key={index}>{uri}</p>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
        {/* form output */}
        <div>
          <form className="my-8">
            <p className="font-bold mb-4">Nhập mã hash:</p>
            <div>
              <input
                type="text"
                placeholder="hash"
                className="w-[500px] p-3 px-8 border-2 border-teal-500"
                onChange={handleChangeHash}
              />
              {/* <button
                title="Kiểm tra"
                className="px-2 py-3 text-teal-500 border-2 border-teal-500 ml-8"
                // onClick={handleCheck}
              >
                Kiểm tra
              </button> */}
            </div>
          </form>

          <div>
            <p className="font-bold">
              Kết quả:
              <a
                href={`gateway.ipfscdn.io/ipfs/${hashLink}`}
                target="_parent"
                className="text-teal-500 ml-4"
              >
                Load
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
