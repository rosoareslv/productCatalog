# -*- coding: utf-8 -*-

from concurrent.futures import ThreadPoolExecutor, as_completed
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from bs4 import BeautifulSoup
from datetime import datetime
from tqdm import tqdm
import argparse
import requests
import json
import time

#Usar inteligencia artificial aqui para gerar os dados
                                       
MAX_THREADS = 20
TIMEOUT_SECONDS = 20

session = requests.Session()

adapter = HTTPAdapter(pool_connections=10, pool_maxsize=10, max_retries=3)
session.mount("http://", adapter)
session.mount("https://", adapter)

def http_request(
    method: str,
    ip: str,
    port: int,
    url: str,
    opr: str,
    calls: list,
    https: bool = False,
    headers: dict = None,
    payload: dict = None,
    data_response: bool = False,
    raise_exception: bool = True,
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
    data = response.text
    calls.append(
        f"INFO: {get_current_datetime()} | {url} | {method} | HTTP {response.status_code}\n"
        f"{json.dumps(payload,indent=4) if payload else 'Sem payload'}"
        f"\n{data if not str(response.status_code).startswith('2') else 'Sucesso na operacao'}",
    )
    if response.ok:
        return response.json() if data_response else True
    elif raise_exception:
        raise Exception(
            f"Error: {opr} | code: {response.status_code} | mensage: {data}"
        )
    return response.json() if data_response else False


def create_products():
    pass

def create_users():
    pass

def create_categories():
    pass
    

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

def create_entities(users, products, categories, executor, pbar):
    run_threads(executor, users, create_users, pbar)
    run_threads(executor, products, create_products, pbar)
    run_threads(executor, categories, create_categories, pbar)

def runner():
    with ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        counter = 0
        total_requests = args.user + args.product + args.category
        with tqdm(total=total_requests, desc="entities", unit="entity") as pbar:
            for _ in range(0, total_requests):
                counter += 1
                if counter >= 10000:
                    create_entities(args.user, args.product, args.category, executor, pbar)
                    args.user -= counter
                    args.product -= counter
                    args.category -= counter
                    counter = 0
            create_entities(args.user, args.product, args.category, executor, pbar)


if __name__ == "__main__":
    start_time = time.time()
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