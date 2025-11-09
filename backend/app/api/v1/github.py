from fastapi import APIRouter, Depends
from app.services.github_service import GitHubService
from pydantic import BaseModel

router = APIRouter(prefix="/github", tags=["github"])
github_service = GitHubService()

class GitHubRequest(BaseModel):
    github_username: str
    repo_name: str

@router.post("/profile")
async def github_profile(req: GitHubRequest):
    result = await github_service.get_user_profile(req.github_username)
    return result

@router.post("/track_commits")
async def github_commits(req: GitHubRequest):
    result = await github_service.count_recent_commits(req.github_username, req.repo_name)
    return result

@router.post("/track_prs")
async def github_prs(req: GitHubRequest):
    result = await github_service.count_pull_requests(req.github_username, req.repo_name)
    return result
