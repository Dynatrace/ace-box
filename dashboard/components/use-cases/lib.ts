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
import UseCaseContext from "./Context"
import type {
  GuideProps,
  PreviewProps,
  PreviewsBySectionProps
} from "./Context"

type RawUseCaseProps = {
  guides: GuideProps[]
  previews: PreviewProps[]
}

const getUseCases = () => {
  let guides: GuideProps[] = []
  let previews: PreviewsBySectionProps[] = []

  const areUseCasesDefined = 
    !!process.env.ACE_USE_CASES && 
    process.env.ACE_USE_CASES != ''

  if (areUseCasesDefined) {
    try {
      const base64encodedData = Buffer.from(process.env.ACE_USE_CASES || '', 'base64')
      const stringData = base64encodedData.toString()
      const useCasesObject = JSON.parse(stringData) as RawUseCaseProps[]

      let _previewsBySection: {[section: string]:PreviewProps[]} = {}
      let _previewsDefaultSection: PreviewsBySectionProps = {
        section: "PreviewProps",
        previews: []
      }

      for (const useCase in useCasesObject) {
        const useCaseGuides = useCasesObject[useCase].guides
        if (!!useCaseGuides) {
          guides = [...guides, ...useCaseGuides]
        }

        const useCasePreviews = useCasesObject[useCase].previews
        if (!!useCasePreviews) {
          useCasePreviews.forEach(useCasePreview => {
            const section = useCasePreview.section
            if (!section || section === '') {
              _previewsDefaultSection.previews.push(useCasePreview)
            } else {
              if (!_previewsBySection[section]) _previewsBySection[section] = []
              _previewsBySection[section].push(useCasePreview)
            }
          })
        }
      }

      const isPreviewsDefaultSectionDefined = _previewsDefaultSection.previews.length > 0
      if (isPreviewsDefaultSectionDefined) {
        previews.push(_previewsDefaultSection)
      }

      const isAdditionalPreviewSectionsDefined = Object.keys(_previewsBySection).length > 0
      if (isAdditionalPreviewSectionsDefined) {
        for (const section in _previewsBySection) {
          const sectionPreviews = _previewsBySection[section]
          previews.push({
            section: section,
            previews: sectionPreviews
          })
        }
      }
    } catch(err) {
      console.error(err)
    }
  }

  return {
    guides,
    previews
  }
}

const useUseCases = () => {
  return useContext(UseCaseContext)
}

export {
  useUseCases,
  getUseCases
}
