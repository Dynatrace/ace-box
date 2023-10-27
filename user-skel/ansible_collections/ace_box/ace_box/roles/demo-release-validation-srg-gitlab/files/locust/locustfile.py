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

  number_invalid_status_codes = 0

  def on_stop(self):
    print(f'Received {self.number_invalid_status_codes} invalid HTTP status codes during last test run. Invalid HTTP status codes are ignored!')

  @task
  def root(self):
    self.client.headers = {
      'x-dynatrace-test': generateXDynatraceTestHeader('Test Root'),
    }
    with self.client.get('/', catch_response=True) as response:
      if (response.status_code == 0):
        self.number_invalid_status_codes += 1
        print('Ignoring invalid status code "0"')
        response.success()

  @task
  def api(self):
    self.client.headers = {
      'x-dynatrace-test': generateXDynatraceTestHeader('Test API'),
    }
    with self.client.get('/api/version', catch_response=True) as response:
      if (response.status_code == 0):
        self.number_invalid_status_codes += 1
        print('Ignoring invalid status code "0"')
        response.success()
    with self.client.get('/api/echo', catch_response=True) as response:
      if (response.status_code == 0):
        self.number_invalid_status_codes += 1
        print('Ignoring invalid status code "0"')
        response.success()
    with self.client.get(f'/api/invoke?url={self.host}', catch_response=True) as response:
      if (response.status_code == 0):
        self.number_invalid_status_codes += 1
        print('Ignoring invalid status code "0"')
        response.success()
