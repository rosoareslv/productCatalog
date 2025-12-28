# -*- coding: utf-8 -*-

from concurrent.futures import ThreadPoolExecutor, as_completed
from requests.adapters import HTTPAdapter
from datetime import datetime
from faker import Faker
from tqdm import tqdm
import argparse
import requests
import json
import time


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
    https: bool = False,
    headers: dict = None,
    payload: dict = None,
    data_response: bool = False,
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
    if response.ok:
        return response.json() if data_response else True
    else:
        raise Exception(
    return response.json() if data_response else False


def create_product():
    pass


def create_user():
    return http_request(
        method="POST",
        ip="localhost",
        port=2000,
        url="/auth/register",
        calls=[],
        payload={
            "name":
            "username":
            "password"
        }
    )


def create_category():
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
    futures=[
        executor.submit(
            engine
        )
        for _ in range(0, quantity)
    ]
    [pbar.update(1) for _ in as_completed(futures)]


# Criar os users
# Salvar todoos os users criados
# Randomizar categorias baseado na quantidade
# Criar todas as categorias para todos os usuários
# depois os produtos (randomiza a vontade)


def loop_entities(total, create_entity, executor, pbar):
    counter=0
    for _ in range(0, total):
        counter += 1
        if counter >= 10000:
            run_threads(executor, counter, create_entity, pbar)
            counter=0
    run_threads(executor, counter, create_entity, pbar)


def runner():
    with ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        total_requests=args.user + args.product + args.category
        with tqdm(total=total_requests, desc="entities", unit="entity") as pbar:
            loop_entities(args.user, create_user, executor, pbar)
            loop_entities(args.category, create_category, executor, pbar)
            loop_entities(args.product, create_product, executor, pbar)


if __name__ == "__main__":
    start_time=time.time()
    parser=argparse.ArgumentParser(description="Fake data generator")
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
    args=parser.parse_args()
    runner()
