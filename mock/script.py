import threading
from fake_data import product_names, names, product_categories
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
import http.client
import random

# from tqdm import tqdm
import argparse
import string
import json
import time


env = {
    "ip": "localhost",
    "port": 81,
    "routes": {
        "auth": {"login": "/login", "register": "/register", "refresh": "/refresh"},
        "product": "/product",
        "category": "/category",
    },
}


def http_request(
    method: str,
    ip: str,
    port: int,
    url: str,
    headers={},
    payload: dict = None,
    data_response: bool = False,
    raise_exception: bool = True,
):
    conn = http.client.HTTPConnection(ip, port, timeout=60)
    conn.request(
        method,
        url,
        headers=headers,
        body=json.dumps(payload) if payload != None else None,
    )
    response = conn.getresponse()
    data = response.read().decode("utf-8")
    if str(response.status).startswith("2"):
        if data_response:
            return json.loads(data)
        return True
    if raise_exception:
        raise Exception(f"Erro na operacao")
    elif data_response:
        return json.loads(data)
    else:
        return False


def random_user():
    name = names[random.randint(0, len(names) - 1)]
    return {"name": name, "username": name.replace(" ", "_").lower()}


def random_product():
    return {
        "title": product_names[random.randint(0, len(product_names) - 1)],
        "description": product_names[random.randint(0, len(product_names) - 1)]
        + " description",
        "price": random.randint(1, 10000),
        "category": (
            product_categories[random.randint(0, len(product_categories) - 1)]
            if random.randint(0, 1) == 1
            else None
        ),
    }


def random_category(count):
    index = random.randint(0, len(product_categories) - 1)
    category = product_categories[index]
    return {"title": category, "description": category + " description"}


def engine(**kwargs):
    try:
        http_request(
            "POST",
            env["ip"],
            env["port"],
            kwargs["endpoint"],
            payload=kwargs["generator"],
        )
    except Exception as e:
        print(str(e))


def generate_password():
    characters = list(string.ascii_lowercase) + list(string.ascii_uppercase)
    mixed = [
        characters[random.randint(0, len(characters) - 1)]
        for _ in range(0, len(characters))
    ]
    password = "".join(mixed)
    return password


def get_current_datetime():
    return str(
        datetime.now(tz=datetime.now().astimezone().tzinfo).isoformat(
            timespec="milliseconds"
        )
    )


def write_log(message: str, filename: str):
    with open(f"{filename}.txt", "a", encoding="utf-8") as log:
        log.write(message + "\n")


def runner(fn, count, endpoint):
    threads = []
    with ThreadPoolExecutor(max_workers=args.thread) as executor:
        for _ in range(0, count):
            threads.append(executor.submit(runner), endpoint=endpoint, generator=fn)
    [task for task in as_completed(threads)]


def int_max_20(value):
    ivalue = int(value)
    if ivalue > 100:
        raise argparse.ArgumentTypeError(f"Maximum value is 20")
    return ivalue


if __name__ == "__main__":
    start = time.time()
    parser = argparse.ArgumentParser(description="Script")
    parser.add_argument(
        "-t",
        "--threads",
        help="How many threads will be invoked",
        dest="thread",
        type=int,
        action="store",
        default=20,
    )
    parser.add_argument(
        "-u",
        "--users",
        help="How many users will be created",
        dest="user",
        type=int,
        action="store",
        default=100,
    )
    parser.add_argument(
        "-p",
        "--products",
        help="How many products will be created",
        dest="product",
        type=int_max_20,
        action="store",
        default=1000,
    )
    parser.add_argument(
        "-c",
        "--category",
        help="How many categories will be created, with max of 20",
        dest="category",
        type=int,
        action="store",
        default=10,
    )
    args = parser.parse_args()
    lock = threading.Lock()
    runner(random_category, args.category, env["routes"]["category"])
    runner(random_product, args.product, env["routes"]["product"])
    end = time.time()
