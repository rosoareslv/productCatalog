# -*- coding: utf-8 -*-

from concurrent.futures import ThreadPoolExecutor, as_completed
from requests.adapters import HTTPAdapter
from datetime import datetime
from faker import Faker
from tqdm import tqdm
import argparse
import requests
import threading
import random
import time


MAX_THREADS = 20
TIMEOUT_SECONDS = 20

IP = "localhost"
PORT = 81

USERS = {}

session = requests.Session()

adapter = HTTPAdapter(pool_connections=10, pool_maxsize=10, max_retries=3)
session.mount("http://", adapter)
session.mount("https://", adapter)


def http_request(
    method: str,
    ip: str,
    port: int,
    url: str,
    https: bool = False,
    headers: dict = None,
    payload: dict = None,
):
    scheme = "https" if https else "http"
    full_url = f"{scheme}://{ip}:{port}{url}"
    response = session.request(
        method=method,
        url=full_url,
        headers=headers or {},
        json=payload if payload else None,
        timeout=TIMEOUT_SECONDS,
        verify=False,
    )
    bool_status = True if str(response.status_code).startswith("2") else False
    return response.json(), bool_status


def create_user():
    try:
        name = fake.name()
        user = {
            "name": name,
            "username": f"{name.replace(" ", "").lower()}{str((random.random() * 1000)).split(".")[0]}",
            "password": fake.password()
        }
        _, bool = http_request(
            method="POST",
            ip=IP,
            port=PORT,
            url="/auth/register",
            payload=user
        )
        return user if bool else None
    except Exception as e:
        return str(e)


def authenticate_user(username: str, password: str):
    try:
        data, bool = http_request(
            method="POST",
            ip=IP,
            port=PORT,
            url="/auth/login",
            payload={
                "username": username,
                "password": password
            }
        )
        return data["accessToken"] if bool else None
    except Exception as e:
        return str(e)


def manage_user():
    user = create_user()
    if user:
        access_token = authenticate_user(user["username"], user["password"])
    if access_token:
        with lock:
            USERS[user["username"]] = access_token


def create_category():
    return "OK"


def create_product():
    return "OK"


def get_current_datetime():
    return str(
        datetime.now(tz=datetime.now().astimezone().tzinfo).isoformat(
            timespec="milliseconds"
        )
    )


def write_log(message: str, filename: str):
    with open(f"{filename}.txt", "a", encoding="utf-8") as log:
        log.write(message + "\n")


def run_threads(executor, quantity, engine, pbar):
    futures = [
        executor.submit(
            engine
        )
        for _ in range(0, quantity)
    ]
    [pbar.update(1) for _ in as_completed(futures)]


def loop_entities(total, create_entity, executor, pbar):
    counter = 0
    for _ in range(0, total):
        counter += 1
        if counter >= 10000:
            run_threads(executor, counter, create_entity, pbar)
            counter = 0
    run_threads(executor, counter, create_entity, pbar)


def runner():
    with ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        total_requests = args.user + args.product + args.category
        with tqdm(total=total_requests, desc="entities", unit="entity") as pbar:
            loop_entities(args.user, manage_user, executor, pbar)
            # loop_entities(args.category, create_category, executor, pbar)
            # loop_entities(args.product, create_product, executor, pbar)


if __name__ == "__main__":
    start_time = time.time()
    fake = Faker()
    lock = threading.Lock()
    parser = argparse.ArgumentParser(description="Fake data generator")
    parser.add_argument(
        "-u",
        "--users",
        help="How many users will be created",
        dest="user",
        type=int,
        action="store",
        default=5,
    )
    parser.add_argument(
        "-p",
        "--products",
        help="How many products will be created",
        dest="product",
        type=int,
        action="store",
        default=1000,
    )
    parser.add_argument(
        "-c",
        "--categories",
        help="How many categories will be created, with max of 20",
        dest="category",
        type=int,
        action="store",
        default=10,
    )
    args = parser.parse_args()
    runner()
