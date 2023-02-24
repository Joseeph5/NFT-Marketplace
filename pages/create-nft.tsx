import { useState, useMemo, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { Button, Input } from '../components';
import images from '../assets';

const client = ipfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function CreateNft() {
  const [fileUrl, setFileUrl] = useState<string>('');
  const { theme } = useTheme();
  const router = useRouter();

  const uploadToInfura = async (file: any) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);

      setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  const onDrop = useCallback(async (acceptedFile: any) => {
    await uploadToInfura(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        'image/jpeg': [],
        'image/png': [],
      },
    });

  // add tailwind classes according to the file status
  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed  
       ${isDragActive ? ' border-file-active ' : ''} 
       ${isDragAccept ? ' border-file-accept ' : ''} 
       ${isDragReject ? ' border-file-reject ' : ''}`,
    [isDragActive, isDragReject, isDragAccept]
  );

  const [formInput, updateFormInput] = useState({
    price: '',
    name: '',
    description: '',
  });

  const createMarket = async () => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    // first, upload to IPFS
    const data = JSON.stringify({ name, description, image: fileUrl });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      router.push('/');
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  return (
    <div className='flex justify-center sm:px-4 p-12'>
      <div className='w-3/5 md:w-full'>
        <h1 className='font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl'>
          Create new item
        </h1>

        <div className='mt-16'>
          <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xl'>
            Upload file
          </p>
          <div className='mt-4'>
            <div
              {...getRootProps({
                className: fileStyle,
              })}>
              <input {...getInputProps()} />
              <div className='flexCenter flex-col text-center'>
                <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xl'>
                  JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                </p>
                <div className='my-12 w-full flex justify-center'>
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit='contain'
                    alt='file upload'
                    className={theme === 'light' ? 'filter invert' : undefined}
                  />
                </div>
                <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm'>
                  Drag and Drop File
                </p>
                <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2'>
                  Or browse media on your device
                </p>
              </div>
            </div>
          </div>
        </div>

        <Input
          inputType='input'
          title='Name'
          placeholder='Asset Name'
          handleClick={(e) => updateFormInput({ ...formInput, name: e.target.value })}
        />

        <Input
          inputType='textarea'
          title='Description'
          placeholder='Asset Description'
          handleClick={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />

        <Input
          inputType='number'
          title='Price'
          placeholder='Asset Price'
          handleClick={(e) => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <div className='mt-7 w-full flex justify-end'>
          <Button
            btnName='Create Item'
            btnType='primary'
            classStyles='rounded-xl'
            handleClick={createMarket}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateNft;
