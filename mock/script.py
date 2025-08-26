import threading
from fake_data import product_names, NAMES, CATEGORIES
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests
import random
import argparse
import string
import queue
import time


LOCK = threading.Lock()
USERS = queue.Queue()
TOKENS = []

TOKEN_CATEGORIES = {}


# Faz o registro de clientes multithread baseados nos nomes (NAMES) disponíveis, populando a queue USERS para o login
def random_user(**kwargs):
    try:
        name = NAMES.get()
        username = name.replace(" ", "").lower()
        password = generate_password()
        res = requests.post(
            "http://localhost:81/auth/register",
            json={
                "name": name,
                "username": username,
                "password": password,
            },
            timeout=10,
        )
        if str(res.status_code).startswith("2"):
            USERS.put({"username": username, "password": password})
        NAMES.task_done()
    except Exception as e:
        print(e)


# Faz o login multithread, fazendo o dequeue de USERS E populando a list compartilhada TOKENS
def login_user(**kwargs):
    while True:
        try:
            user = USERS.get(block=False)
            res = requests.post("http://localhost:81/auth/login", json=user, timeout=10)
            if str(res.status_code).startswith("2"):
                with LOCK:
                    TOKENS.append(res.json()["accessToken"])
            USERS.task_done()
        except queue.Empty as qe:
            break
        except Exception as e:
            print(e)


# Para cada categoria, eu crio para todos os TOKENS registrados anteriormente e salvo individualmente para garantir que o usuario x, tem as categorias y
def random_category(**kwargs):
    try:
        token, category = kwargs["data"]
        res = requests.post(
            "http://localhost:81/category",
            headers={"Authorization": "Bearer " + token},
            json={"title": category, "description": category + " description"},
            timeout=10,
        )
        if str(res.status_code).startswith("2"):
            add_token_category(token, category)
        print(res.json())
    except Exception as e:
        print(e)


def random_product(**kwargs):
    try:
        product_name = product_names[random.randint(0, len(product_names) - 1)]
        token = TOKENS[random.randint(0, len(TOKENS) - 1)]
        categories_per_user = TOKEN_CATEGORIES[token]
        res = requests.post(
            "http://localhost:81/product",
            headers={"Authorization": "Bearer " + token},
            json={
                "title": product_name,
                "description": product_name + " description",
                "price": random.randint(1, 10000),
                "category": (
                    categories_per_user[random.randint(0, len(categories_per_user) - 1)]
                ),
            },
            timeout=10,
        )
        if not str(res.status_code).startswith("2"):
            print(res.json())
    except Exception as e:
        print(e)


def add_token_category(token, category):
    with LOCK:
        if TOKEN_CATEGORIES.get(token) is None:
            TOKEN_CATEGORIES[token] = []
        TOKEN_CATEGORIES[token].append(category)


def generate_password():
    characters = list(string.ascii_lowercase) + list(string.ascii_uppercase)
    mixed = [
        characters[random.randint(0, len(characters) - 1)]
        for _ in range(0, len(characters))
    ]
    password = "".join(mixed)
    return password[:10]


def runner(fn, counter=None):
    threads = []
    with ThreadPoolExecutor(max_workers=args.thread) as executor:
        iterator = counter if counter is not None else range(0, args.thread)
        for item in iterator:
            threads.append(executor.submit(fn, data=item))
    [task for task in as_completed(threads)]


def int_max_20(value):
    ivalue = int(value)
    if ivalue > 20:
        raise argparse.ArgumentTypeError(f"Maximum value is 20")
    return ivalue


def int_max_100(value):
    ivalue = int(value)
    if ivalue > 100:
        raise argparse.ArgumentTypeError(f"Maximum value is 100")
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
        type=int_max_100,
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
        "--category",
        help="How many categories will be created, with max of 20",
        dest="category",
        type=int_max_20,
        action="store",
        default=10,
    )
    args = parser.parse_args()
    lock = threading.Lock()
    runner(random_user, range(0, args.user))
    runner(login_user)
    # Para cada token, todas as categorias serão registradas, para dar maior flexibilidade a criação dos produtos
    runner(
        random_category,
        [
            (token, category)
            for token in TOKENS
            for category in CATEGORIES[: args.category]
        ],
    )
    # Os produtos são criados aleatoriamente (em quantidade e definição) nos users cadastrados
    runner(random_product, range(0, args.product))
    end = time.time()
    print(f"Tokens available to test endpoints:\n{"\n".join(TOKENS)}")
    print(f"Elapsed time: {(end - start) / 60} min")
