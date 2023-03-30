import Head from "next/head";
import { useRouter } from "next/router";
import fs from 'fs'
import path from 'path'
import { GetServerSidePropsContext } from "next";
import { RigWithContent } from "@/types/rig";



export default function RigEditor({ rig }: { rig: RigWithContent }) {
  const router = useRouter()

  console.log({ rig })

  const rigPatch = rig.content.data.Patch
  const rigChain = rigPatch.children.Chain

  console.log({ patch: rigPatch })
  console.log({ chain: rigChain })

  return (
    <>
      <Head>
        <title>Headrushfx Rig Editor</title>
        <meta name="description" content="Edit rigs and setlists" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Rig Editor</h1>
        <h2>Rig: {router.query.rig}</h2>
        <h4>Author: {rig.author}</h4>
        <h3>Patch</h3>
        <div>
          {rigChain.childorder.map((child, index) => {
            return (
              <div key={index}>
                <div>{child}</div>
                {rigChain.children[child].string}
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  if (query?.rig) {
    const rigData = fs.readFileSync(path.resolve(__dirname, `../../../../../headrush/Rigs/${query.rig}.rig`), 'utf8')
    const rigJSON = JSON.parse(rigData)
    const rigContent = JSON.parse(rigJSON.content)
    return {
      props: {
        rig: {
          ...rigJSON,
          content: rigContent
        }
      }
    }
  }
}