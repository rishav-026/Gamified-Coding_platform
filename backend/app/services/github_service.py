from github import Github
import os

class GitHubService:
    def __init__(self):
        self.github = Github(os.getenv("GITHUB_TOKEN"))
        self.xp_rewards = {
            "commit": 50,
            "pull_request": 100,
        }
    async def get_user_profile(self, username):
        user = self.github.get_user(username)
        return {
            "username": user.login,
            "name": user.name or "",
            "avatar_url": user.avatar_url,
            "bio": user.bio or "",
            "followers": user.followers,
            "public_repos": user.public_repos
        }
    async def count_recent_commits(self, username, repo_name, days=7):
        user = self.github.get_user(username)
        repo = user.get_repo(repo_name)
        from datetime import datetime, timedelta
        since_date = datetime.utcnow() - timedelta(days=days)
        commits = repo.get_commits(since=since_date)
        commit_count = commits.totalCount
        xp_earned = self.xp_rewards["commit"] * commit_count
        return {
            "commits": commit_count,
            "xp_earned": xp_earned,
        }
    async def count_pull_requests(self, username, repo_name, state="all"):
        user = self.github.get_user(username)
        repo = user.get_repo(repo_name)
        prs = repo.get_pulls(state=state)
        pr_count = prs.totalCount
        xp_earned = self.xp_rewards["pull_request"] * pr_count
        return {
            "pull_requests": pr_count,
            "xp_earned": xp_earned,
        }
