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

import os
from locust import HttpUser, task, between

def generateXDynatraceTestHeader(test_step_name):
  load_test_name = os.getenv('LOCUST_LOAD_TEST_NAME')

  x_dynatrace_test = (
    f'LSN=LocustTest;'
    f'TSN={test_step_name};'
    f'LTN={load_test_name};'
    f'VU=LocustTester;'
  )

  return x_dynatrace_test

class TestUser(HttpUser):
  wait_time = between(1, 5)

  @task
  def root(self):
    self.client.headers = {
      'x-dynatrace-test': generateXDynatraceTestHeader("Test Root"),
    }
    self.client.get('/')

  @task
  def api(self):
    self.client.headers = {
      'x-dynatrace-test': generateXDynatraceTestHeader("Test API"),
    }
    self.client.get('/api/version')
    self.client.get('/api/echo')
    self.client.get(f'/api/invoke?url={self.host}')
