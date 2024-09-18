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

import { FunctionComponent } from 'react'
import { useExtRefs } from '../ext-refs/lib'
import LinkTemplate from '../ext-refs/templates/LinkTemplate'

type DynatraceProps = {}

const Dynatrace: FunctionComponent<DynatraceProps> = () => {
  const { findUrl } = useExtRefs()

  const url = findUrl('DYNATRACE')

	return (
		<div>
			<p>Your <LinkTemplate href={url} label='Dynatrace' /> has been specified when the ACE Box was launched.</p>
		</div>
	)
}

export { Dynatrace as default }
