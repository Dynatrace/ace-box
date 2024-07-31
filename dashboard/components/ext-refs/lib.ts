/**
 * Copyright 2024 Dynatrace LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
