import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { WebUSB } from 'usb';

export default function Home() {
  const router = useRouter()
  const [file, setFile] = useState<string>()
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.value)
  }
  const onSubmit = () => {
    console.log(file)
    debugger
    router.push(`/rig/editor/?file=${file}`)
  }

  return (
    <>
      <Head>
        <title>Headrushfx Editor</title>
        <meta name="description" content="Edit rigs and setlists" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form onSubmit={onSubmit}>
          <h1>Write the path of your Headrush assets</h1>
          <input type="text" name="path" onChange={onChange} />
          <button type="submit">Read directory</button>
        </form>
      </main>
    </>
  )
}

// export async function getServerSideProps() {
//   const customWebUSB = new WebUSB({
//     // Bypass cheking for authorised devices
//     allowAllDevices: true
//   });

//   // Uses blocking calls, so is async
//   const devices = await customWebUSB.getDevices();

//   for (const device of devices) {
//       console.log(device.manufacturerName); // WebUSB device
//   }

//   return {
//     props: {

//     }
//   }
// }