from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .models import Person

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bob = Person(person_id="1", name="Bob", email="bob@epfl.ch")


@app.get("/persons", response_model=list[Person])
def persons():
    # TODO link to db
    return [bob.dict()]


@app.get("/persons/{id}", response_model=Person)
def persons(id: str):
    # TODO link to db
    if id != bob.person_id:
        raise HTTPException(
            status_code=400,
            detail="Wasn't Bob's ID.",
        )
    return bob.dict()


@app.post("/persons", response_model=Person)
def persons(body: Person):
    # TODO link to db
    return body.dict()


@app.delete("/persons/{id}", response_model=Person)
def persons(id: str):
    # TODO link to db
    return bob.dict()
