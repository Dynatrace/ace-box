import { createContext } from 'react'

type GuideProps = {
  description: string
  url: string
}

type PreviewProps = {
  section: string
  description: string
  url: string
}

type PreviewsBySectionProps = {
  section: string,
  previews: PreviewProps[]
}

type UseCaseContextProps = {
  guides: GuideProps[]
  previews: {section: string, previews: PreviewProps[]}[]
}

const UseCaseContext = createContext({
	guides: [],
	previews: [],
} as UseCaseContextProps)

type UseCaseContextProviderProps = {
	value: {
		guides: GuideProps[]
		previews: PreviewsBySectionProps[]
	}
	children: any
}

const UseCaseContextProvider = ({ value, children }: UseCaseContextProviderProps) =>
	<UseCaseContext.Provider value={value}>
		{children}
	</UseCaseContext.Provider>

export {
	UseCaseContext as default,
	UseCaseContextProvider
}
export type {
  GuideProps,
  PreviewProps,
  PreviewsBySectionProps
}
