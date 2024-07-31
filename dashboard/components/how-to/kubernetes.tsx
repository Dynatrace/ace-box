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

type KubernetesProps = {}

const Kubernetes: FunctionComponent<KubernetesProps> = () =>
  <div>
    <p>
      Not only the services which will be deployed as part of the use cases but also all tools (e.g. <i>Jenkins</i>, <i>Gitea</i>, ...) are running on <i>MicroK8s</i>. <i>MicroK8s</i> has been installed with a few addons, most importantly a registry. This local registry will be used during some use cases to push and pull container images.
    </p>
    <p>
      <i>kubectl</i> is available on the host machine.
    </p>
  </div>

export { Kubernetes as default }
