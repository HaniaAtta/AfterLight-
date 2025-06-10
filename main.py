# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Just saving votes in memory (for now)
votes = {"sustain": 0, "delete": 0}

class Vote(BaseModel):
    choice: str

@app.post("/vote")
def vote(vote: Vote):
    if vote.choice in votes:
        votes[vote.choice] += 1
    return votes

@app.get("/results")
def get_results():
    return votes
