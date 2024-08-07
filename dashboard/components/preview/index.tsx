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

import { useState, useEffect, FunctionComponent } from "react";
import { useUseCases } from "../use-cases/lib";

type PreviewProps = {
  isAwxEnabled?: boolean;
};

const Preview: FunctionComponent<PreviewProps> = ({ isAwxEnabled }) => {
  const { previews } = useUseCases();
  const arePreviewsDefined = previews.length > 0;

  const [iframeKey, setIframeKey] = useState(
    Math.random().toString(36).substring(7)
  );

  useEffect(() => {
    if (arePreviewsDefined) {
      const intervalId = setInterval(() => {
        setIframeKey(Math.random().toString(36).substring(7));
      }, 10000);

      return () => clearInterval(intervalId);
    }
  }, [arePreviewsDefined]);

  return (
    <div>
      {previews.map((previewSection, sectionKey) => (
        <div
          key={sectionKey}
          style={{
            marginBottom: "20px",
          }}
        >
          <h2>{previewSection.section}</h2>
          <div className="section">
            {previewSection.previews.map((preview, previewKey) => (
              <div
                key={previewKey}
                className="column column--1-of-2"
                style={{
                  marginBottom: "20px",
                }}
              >
                <h3>{preview.description}</h3>
                <iframe
                  title="staging"
                  key={iframeKey}
                  id="iframe1"
                  height="600px"
                  width="100%"
                  src={preview.url}
                />
                <div>({preview.url})</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { Preview as default };
