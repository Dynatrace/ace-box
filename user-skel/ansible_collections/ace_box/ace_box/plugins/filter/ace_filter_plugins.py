#!/usr/bin/python3
# Copyright 2024 Dynatrace LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


class FilterModule(object):
  ''' Nested dict filter '''

  def filters(self):
    return {
      'useCaseExtSrcToName': self.useCaseExtSrcToName,
      'useCaseExtSrcToConfigPath': self.useCaseExtSrcToConfigPath
    }

  def useCaseExtSrcToName(self, use_case_ext_src):
    slug = use_case_ext_src.split('/')[-1]
    return slug.replace('.git', '')

  def useCaseExtSrcToConfigPath(self, use_case_ext_src, ace_box_user):
    name = self.useCaseExtSrcToName(use_case_ext_src)
    return f'/home/{ace_box_user}/.ace/{name}.config.yml'
