import os
import json
import logging
import http.client
from json.decoder import JSONDecodeError
import time

log_level = logging.DEBUG if os.getenv("KEPTN_DEBUG") else logging.INFO
logging.basicConfig(level=log_level)

KEPTN_CLUSTER_ENDPOINT = "mongodb-datastore.keptn.svc.cluster.local"
KEPTN_CLUSTER_PORT = 8080
KEPTN_EVALUATION_BASE_PATH = "/event"
KEPTN_HEADERS = {
    "Content-Type": "application/json",
}

# LOCAL
# KEPTN_CLUSTER_ENDPOINT = "keptn.104.155.100.64.nip.io"
# KEPTN_CLUSTER_PORT = 80
# KEPTN_API_TOKEN = "glFGk47rhd7WfsSdKjN1XaNwim3QzzR1rju9ac7xhKg5B"
# KEPTN_EVALUATION_BASE_PATH = "/api/mongodb-datastore/event"
# KEPTN_HEADERS = {
#     "Content-Type": "application/json",
#     "x-token": KEPTN_API_TOKEN,
# }
# /LOCAL

def retrieve_evaluation_events(keptn_context):
    logging.debug("Retrieving evaluation results...")

    path_with_query = f"{KEPTN_EVALUATION_BASE_PATH}?type=sh.keptn.event.evaluation.finished&keptnContext={keptn_context}"

    conn = http.client.HTTPConnection(KEPTN_CLUSTER_ENDPOINT, KEPTN_CLUSTER_PORT)
    conn.request("GET", path_with_query, None, KEPTN_HEADERS)

    response = conn.getresponse().read().decode('utf-8')
    conn.close()

    logging.debug('Retrieved evaluation data:')
    logging.debug(response)

    events = []
    parsed_response= json.loads(response)

    try:
        events = parsed_response["events"]
    except JSONDecodeError as err:
        logging.debug('No valid data retrieved!')

    return events


def handle_fail():
    print("TBD - handle_fail")
    return


def handle_pass():
    print("TBD - handle_pass")
    return


def wait_for_evaluation_result():
    logging.info('Waiting for evaluation result...')

    event = os.getenv('EVENT')
    logging.debug('Retrieved event:')
    logging.debug(event)

    event_parsed = json.loads(event)
    keptn_context = event_parsed['shkeptncontext']

    events = []

    EVALUATION_RETRIEVAL_MAX_RETRIES = 42
    EVALUATION_RETRIEVAL_POLLING_DELAY = 5

    try_number = 0

    while try_number < EVALUATION_RETRIEVAL_MAX_RETRIES and len(events) < 1:
        try_number += 1

        events = retrieve_evaluation_events(keptn_context)

        if len(events) > 0:
            break

        time.sleep(EVALUATION_RETRIEVAL_POLLING_DELAY)

    logging.debug(f"Retrieved {len(events)} events!")

    for index, event_data in enumerate(events):
        try:
            evaluation_source = event_data["source"]

            if evaluation_source == "lighthouse-service":
                evaluation_result = event_data["data"]["evaluation"]["result"]
                evaluation_score = event_data["data"]["evaluation"]["score"]

                logging.info(f"Retrieved result: {evaluation_result}; score: {evaluation_score}")

                if evaluation_result == "fail":
                    handle_fail()
                elif evaluation_result == "pass":
                    handle_pass()

        except JSONDecodeError:
            logging.debug(f"Invalid event on index {index}")

    return evaluation_result, evaluation_score


if __name__ == "__main__":
    wait_for_evaluation_result()
