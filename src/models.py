from pydantic import BaseModel


class Person(BaseModel):
    person_id: str
    name: str
    email: str
