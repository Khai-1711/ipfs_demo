import { useStorageUpload } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import {useState, useCallback } from "react";
import {useDropzone } from "react-dropzone";

//0x09Cb77ba7ad5Cc937E8E6b7Ec71b165eada3bfdF
//QmQxGMaZTK1gvCh7G7PGnnW4qFTYfftr7pVPNFUdX7nrNq/CV_NguyenDinhKhai_ENG.pdf

const Home: NextPage = () => {
  const [uris, setUris] = useState<String[]> ([]);

  const {mutateAsync : upload}  =  useStorageUpload();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) =>{
      const uris = await upload({
        data: acceptedFiles,
      });
      setUris((preUris) => [...preUris, ...uris]);
        console.log(uris);
    },
    [upload],
  )
  const formattedUris = uris.map((uri) => uri.replace('ipfs://', 'gateway.ipfscdn.io/ipfs/'));
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps} />
      <p>drop here</p>
      {formattedUris && (
          <div>
          {formattedUris.map((uri, index) => (
            <p key={index}>{uri}</p>
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;
