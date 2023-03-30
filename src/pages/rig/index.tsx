import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import { useRouter } from 'next/router'

interface RigProps {
  rigs: string[]
}

export default function Rig({ rigs = [] }: RigProps) {
  const router = useRouter()
  const editRig = (rig: string) => {
    router.push(`/rig/editor/${rig}`)
  }
  return (
    <>
      <Head>
        <title>Headrushfx Rig Editor</title>
        <meta name="description" content="Edit rigs and setlists" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>List of rigs</h1>
        <ul>
          {rigs.map((rig) => (
            <li key={rig} onClick={() => editRig(rig)}>{rig}</li>
          ))}
        </ul>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const rigFiles = fs.readdirSync(path.resolve(__dirname, '../../../headrush/Rigs'))
  return {
    props: {
      rigs: rigFiles.map(file => file.substring(0, file.length - 4))
    }
  }
}