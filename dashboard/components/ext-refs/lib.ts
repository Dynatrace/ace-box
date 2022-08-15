import { useContext } from "react"
import ExtRefsContext, { ExtRefsProps } from "./Context"

type RawExtRefs = {
  [refName:string]: any
}

const getExtRefs = () => {
  let extRefs: ExtRefsProps = {}

  const aceExtRefs = process.env.ACE_EXT_REFS
  const areUseCasesDefined = 
    !!aceExtRefs && 
    aceExtRefs != ''

  if (areUseCasesDefined) {
    try {
      const base64encodedData = Buffer.from(aceExtRefs || '', 'base64')
      const stringData = base64encodedData.toString()
      const extRefsObject = JSON.parse(stringData) as RawExtRefs

      extRefs = extRefsObject
    } catch(err) {
      console.error(err)
    }
  }

  return {
    extRefs
  }
}

const useExtRefs = () => {
  return useContext(ExtRefsContext)
}

export {
  useExtRefs,
  getExtRefs
}
