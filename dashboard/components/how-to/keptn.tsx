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

import { FunctionComponent } from "react";
import { useExtRefs } from "../ext-refs/lib";
import AceBoxCredentialInline from "../ext-refs/templates/CredentialInlineTemplate";
import LinkTemplate from "../ext-refs/templates/LinkTemplate";

type KeptnProps = {};

const Keptn: FunctionComponent<KeptnProps> = () => {
  const { findUrl, findCreds } = useExtRefs();

  const url = findUrl("KEPTN");
  const username = findCreds("KEPTN", "USERNAME");
  const password = findCreds("KEPTN", "PASSWORD");

  return (
    <div>
      <p>
        <LinkTemplate href={url} label="Keptn" /> will play a central role in
        most of the use cases. Keptn is a control-plane for DevOps automation of
        cloud-native applications.
        {!!username && !!password && (
          <>
            It&apos;s <LinkTemplate href={url} label="Bridge" /> can be accessed
            using <AceBoxCredentialInline value={username?.value} /> and
            password{" "}
            <AceBoxCredentialInline type="password" value={password?.value} />.
          </>
        )}
      </p>
      <p>
        More infos can be found on{" "}
        <a href="https://keptn.sh" target="_blank" rel="noreferrer">
          keptn.sh
        </a>
        .
      </p>
    </div>
  );
};

export { Keptn as default };
