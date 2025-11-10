"""
Quest System Service
Manages quests, tasks, progress, and gamification
"""

from datetime import datetime, timedelta

class QuestSystemService:
    """Complete quest system management"""
    
    def __init__(self):
        """Initialize with quests data"""
        # All quests definition
        self.QUESTS = [
            {
                "id": "quest_1_github_explorer",
                "title": "Exploring the GitHub World",
                "description": "Familiarize yourself with GitHub essential features and understand how open source projects work",
                "category": "github_basics",
                "difficulty": "beginner",
                "order": 1,
                "total_xp": 350,
                "estimated_time": "1-2 hours",
                "learning_outcomes": [
                    "Understand GitHub repository structure",
                    "Learn to navigate issues and PRs",
                    "Fork and clone repositories",
                    "Read and understand documentation"
                ],
                "tasks": [
                    {
                        "id": "task_1_1",
                        "title": "Explore Issue Tracker",
                        "description": "Learn how to find and read issues in repositories",
                        "instructions": """
### Task: Explore the Issue Tracker

1. Go to any popular GitHub repository (e.g., facebook/react)
2. Click on the "Issues" tab
3. Read at least 3 different issues
4. Note the following for each issue:
   - Issue title and number
   - Status (open/closed)
   - Number of comments
   - Assigned labels
5. Take a screenshot showing the issues page
6. Submit the screenshot as proof

**What you're learning:**
- How issues are used for bug reports and feature requests
- How to search and filter issues
- Community engagement patterns
- How to identify issues suitable for beginners
                    """,
                        "difficulty": "easy",
                        "xp_reward": 50,
                        "validation_type": "github_action",
                        "validation_criteria": {
                            "type": "github_api_check",
                            "endpoint": "user_viewed_issues",
                            "required_count": 3
                        }
                    },
                    {
                        "id": "task_1_2",
                        "title": "Understand Pull Requests",
                        "description": "Learn PR workflow and how code changes are reviewed",
                        "instructions": """
### Task: Understand Pull Requests

1. Go to a GitHub repository
2. Click on "Pull requests" tab
3. Open at least 2 pull requests
4. For each PR, examine:
   - Description and purpose
   - Files changed
   - Comments and reviews
   - Status (merged/open/closed)
5. Document what you learned
6. Answer: What makes a good PR description?

**What you're learning:**
- How code reviews work
- PR workflow from creation to merge
- Importance of clear communication
- Code collaboration best practices
                    """,
                        "difficulty": "easy",
                        "xp_reward": 50,
                        "validation_type": "github_action",
                        "validation_criteria": {
                            "type": "github_api_check",
                            "endpoint": "user_viewed_prs",
                            "required_count": 2
                        }
                    },
                    {
                        "id": "task_1_3",
                        "title": "Fork a Repository",
                        "description": "Practice creating personal copies of projects",
                        "instructions": """
### Task: Fork a Repository

1. Find a beginner-friendly repository (look for "good first issue" label)
2. Click the "Fork" button (top right)
3. GitHub creates a copy under your account
4. Clone it locally:
git clone https://github.com/YOUR_USERNAME/forked-repo.git

5. Navigate to the folder:
cd forked-repo

6. Verify you can see all the files
7. Check the original repository link in your fork settings

**What you're learning:**
- How to fork repositories
- Understanding fork vs. clone
- Preparing your workspace for contribution
                 """,
                        "difficulty": "easy",
                        "xp_reward": 100,
                        "validation_type": "github_action",
                        "validation_criteria": {
                            "type": "fork_created",
                            "required": True
                        }
                    },
                    {
                        "id": "task_1_4",
                        "title": "Read README Files",
                        "description": "Understand project documentation standards",
                        "instructions": """
### Task: Read and Understand READMEs

1. Open your forked repository on GitHub
2. Read the README.md file carefully
3. Document these sections:
- Project name and description
- Installation instructions
- How to run the project
- How to contribute
- License information
4. Note: What makes this README clear?
5. What's missing from this README?

**What you're learning:**
- How to read project documentation
- Understanding project setup
- Contribution guidelines
- Best practices for documentation
                 """,
                        "difficulty": "easy",
                        "xp_reward": 50,
                        "validation_type": "manual",
                        "validation_criteria": {
                            "type": "submission",
                            "requires_verification": True
                        }
                    },
                    {
                        "id": "task_1_5",
                        "title": "View Contributors",
                        "description": "Learn about project community and collaboration",
                        "instructions": """
### Task: Explore the Contributors

1. In your repository, click "Insights" tab
2. Click "Contributors"
3. Examine the contributor list:
- Top contributors
- Number of contributions
- Activity timeline
4. Click on a contributor to see their profile
5. Note: When did they join?
6. How many repos do they contribute to?

**What you're learning:**
- Understanding open source communities
- Contributor diversity
- Activity patterns
- How to identify mentors
                 """,
                        "difficulty": "easy",
                        "xp_reward": 50,
                        "validation_type": "github_action",
                        "validation_criteria": {
                            "type": "viewed_contributors",
                            "required": True
                        }
                    }
                ]
            },
            {
                "id": "quest_2_introduce_yourself",
                "title": "Introducing Yourself to the Community",
                "description": "Learn professional communication and collaboration with open source maintainers and contributors",
                "category": "community",
                "difficulty": "intermediate",
                "order": 2,
                "total_xp": 400,
                "estimated_time": "2-3 hours",
                "learning_outcomes": [
                    "Professional communication in tech",
                    "Understanding GitHub social features",
                    "Networking in open source",
                    "Respectful community engagement"
                ],
                "tasks": [
                    {
                        "id": "task_2_1",
                        "title": "Choose an Issue",
                        "description": "Select appropriate issue to work on",
                        "instructions": """
### Task: Find and Choose an Issue

1. Look for repositories with "good first issue" or "beginner-friendly" labels
2. Find 3 issues that interest you
3. For each issue, evaluate:
- Is it clearly described?
- Do you understand what needs to be fixed?
- Do you have the skills to solve it?
- Is the expected difficulty beginner-friendly?
4. Choose ONE issue you want to work on
5. Copy the issue link and paste it in your submission

**Criteria for good first issues:**
- Clear description of problem
- Expected solution outlined
- Mentors available for help
- Reasonable scope
- Matching your skill level

**What you're learning:**
- How to evaluate issues
- Matching tasks to your skills
- Scoping work appropriately
                 """,
                        "difficulty": "easy",
                        "xp_reward": 50,
                        "validation_type": "manual",
                        "validation_criteria": {
                            "type": "issue_link_submission",
                            "requires_verification": True
                        }
                    },
                    {
                        "id": "task_2_2",
                        "title": "Assign Yourself",
                        "description": "Claim the issue by assigning your GitHub username",
                        "instructions": """
### Task: Assign the Issue to Yourself

1. Open your chosen issue
2. Look for the "Assignees" section on the right side
3. Click on "Assignees"
4. Select your GitHub username
5. You should see yourself assigned to the issue now

**Why this matters:**
- Tells maintainers you're working on it
- Prevents duplicate work
- Shows commitment to the task
- Helps project management

**What you're learning:**
- GitHub project management
- How to claim work
- Professional responsibility
                 """,
                        "difficulty": "easy",
                        "xp_reward": 75,
                        "validation_type": "github_action",
                        "validation_criteria": {
                            "type": "issue_assigned",
                            "required": True
                        }
                    },
                    {
                        "id": "task_2_3",
                        "title": "Post a Professional Comment",
                        "description": "Introduce yourself professionally to the community",
                        "instructions": """
### Task: Post a Professional Introduction Comment

1. On your chosen issue, scroll to the comment section
2. Write a professional introduction comment that includes:
- Greeting and introduction
- Why you're interested in this issue
- Your relevant skills/experience
- When you plan to submit a fix
- Question for clarification (if needed)

**Example comment:**
Hi @maintainer! 👋

I'm [Your Name], a developer interested in contributing to this project.
I think I can help fix this issue because [reason].

I have experience with [relevant skills] and plan to submit a PR by [date].

One quick question: [clarifying question]

Looking forward to collaborating!


3. Click "Comment"
4. Your comment is now visible to the community

**What you're learning:**
- Professional communication
- Building relationships in open source
- Clear expectations setting
                    """,
                        "difficulty": "medium",
                        "xp_reward": 100,
                        "validation_type": "github_action",
                        "validation_criteria": {
                            "type": "comment_posted",
                            "min_length": 50,
                            "required": True
                        }
                    },
                    {
                        "id": "task_2_4",
                        "title": "Mention a Contributor",
                        "description": "Tag someone for guidance using @mentions",
                        "instructions": """
### Task: Respectfully Mention and Ask for Help

1. On the same issue, write a follow-up comment
2. In the comment, mention someone using @username
3. Your mention could be:
   - Thanking someone for guidance
   - Asking for clarification
   - Sharing progress update
   - Requesting a review

**Example with mention:**
Hi @maintainer! I've started working on this issue.

I have a question about [specific topic]. Could you help me understand [aspect]?

Thanks for the guidance!



4. Post the comment
5. They'll get a notification about your mention

**What you're learning:**
- Using @ mentions effectively
- Getting help respectfully
- Engaging with maintainers
- Community interaction norms
                    """,
                        "difficulty": "medium",
                        "xp_reward": 100,
                        "validation_type": "github_action",
                        "validation_criteria": {
                            "type": "mention_posted",
                            "required": True
                        }
                    }
                ]
            },
            {
                "id": "quest_3_make_contribution",
                "title": "Making Your First Contribution",
                "description": "Complete actual open source contribution workflow from issue resolution to PR merge",
                "category": "contribution",
                "difficulty": "advanced",
                "order": 3,
                "total_xp": 500,
                "estimated_time": "3-5 hours",
                "learning_outcomes": [
                    "Full contribution workflow",
                    "Creating quality pull requests",
                    "Code review process",
                    "Merging and closing issues"
                ],
                "tasks": [
                    {
                        "id": "task_3_1",
                        "title": "Solve the Issue",
                        "description": "Write code to fix the issue",
                        "instructions": """
### Task: Fix the Issue and Create a Branch

1. Create a new branch for your fix:

git checkout -b fix/issue-description
2. Make changes to fix the issue:
- Edit relevant files
- Test your changes
- Ensure code works

3. Stage your changes:
git add .

4. Commit with clear message:
git commit -m "Fix: Clear description of what you fixed"
5. Push to your fork:
git push origin fix/issue-description

**Commit message guidelines:**
- Start with verb: Fix, Add, Update, Refactor, etc.
- Be specific about what changed
- Reference the issue number: "Fix #123"

**What you're learning:**
- Git workflow
- Branch management
- Writing good commit messages
- Testing changes
                 """,
                        "difficulty": "hard",
                        "xp_reward": 150,
                        "validation_type": "github_action",
                        "validation_criteria": {
                            "type": "commit_created",
                            "required": True
                        }
                    },
                    {
                        "id": "task_3_2",
                        "title": "Submit Pull Request",
                        "description": "Create a PR with your fix and detailed description",
                        "instructions": """
### Task: Create a High-Quality Pull Request

1. Go to your fork on GitHub
2. You'll see a "Compare & pull request" button
3. Click it (or click "Pull requests" → "New pull request")
4. Write a comprehensive PR description:

**PR Template:**

Description
Brief summary of what this PR fixes

Fixes #[issue number]

Changes Made
Change 1

Change 2

Change 3

Type of Change
 Bug fix

 New feature

 Documentation update

How Was This Tested?
Describe how you tested this

Screenshots (if applicable)
Add screenshots showing before/after

Checklist
 My code follows the project's style guidelines

 I've added comments explaining complex parts

 I've updated documentation if needed

 No breaking changes

 
5. Click "Create Pull Request"
6. Your PR is now open for review!

**What you're learning:**
- Writing clear PRs
- Describing changes
- Setting expectations
- Professional documentation
                    """,
                        "difficulty": "hard",
                        "xp_reward": 150,
                        "validation_type": "github_action",
                        "validation_criteria": {
                            "type": "pull_request_created",
                            "required": True
                        }
                    },
                    {
                        "id": "task_3_3",
                        "title": "Handle Review Feedback",
                        "description": "Respond to code review comments and make improvements",
                        "instructions": """
### Task: Respond to Reviews Professionally

1. Maintainers will review your PR
2. They may request changes
3. For each comment:
   - Read it carefully
   - Understand the suggestion
   - Reply respectfully
   - Make the requested changes if agreed

**How to reply to review:**
- Click "Reply" under comment
- Thank them for feedback
- Ask clarifying questions if needed
- Explain your approach if you disagree

**Making changes:**


Make the requested changes
git add .
git commit -m "Address review feedback: [description]"
git push origin fix/issue-description


4. PR updates automatically with new commits
5. Continue until approved

**What you're learning:**
- Accepting feedback gracefully
- Iterative development
- Professional collaboration
- Improving code quality
                    """,
                        "difficulty": "hard",
                        "xp_reward": 100,
                        "validation_type": "github_action",
                        "validation_criteria": {
                            "type": "review_addressed",
                            "required": True
                        }
                    },
                    {
                        "id": "task_3_4",
                        "title": "PR Merged & Issue Closed",
                        "description": "Complete the contribution cycle",
                        "instructions": """
### Task: Celebrate Your Contribution!

1. After maintainer approves, your PR will be merged
2. GitHub automatically closes the related issue
3. You can now:
   - Check your contribution appears on their repo
   - Update your GitHub profile
   - Share with the community
   - Continue contributing!

**After merge:**
- Update your local repo:


git checkout main
git pull upstream main

- Delete your feature branch:
git branch -d fix/issue-description

**What you've accomplished:**
✅ Identified and claimed an issue
✅ Wrote high-quality code
✅ Created a professional PR
✅ Handled feedback
✅ Got merged into real project
✅ Became an open source contributor!

**What you're learning:**
- Full contribution cycle
- Professional development practices
- Open source culture
- How to become a maintainer
                  """,
                        "difficulty": "hard",
                        "xp_reward": 100,
                        "validation_type": "github_action",
                        "validation_criteria": {
                            "type": "pr_merged",
                            "required": True
                        }
                    }
                ]
            }
        ]
    
    async def get_all_quests(self):
        """Get all quests"""
        return self.QUESTS
    
    async def get_quest(self, quest_id: str):
        """Get specific quest"""
        for quest in self.QUESTS:
            if quest["id"] == quest_id:
                return quest
        return None
    
    async def get_quest_by_category(self, category: str):
        """Get quests by category"""
        return [q for q in self.QUESTS if q["category"] == category]
    
    async def start_quest(self, db, user_id: str, quest_id: str):
        """Start a new quest"""
        try:
            quest = await self.get_quest(quest_id)
            if not quest:
                return {"success": False, "error": "Quest not found"}
            
            # Check if already started
            existing = await db["user_quest_progress"].find_one({
                "user_id": user_id,
                "quest_id": quest_id
            })
            
            if existing:
                return {
                    "success": True,
                    "message": "Quest already started",
                    "progress": existing
                }
            
            # Create progress record
            progress = {
                "user_id": user_id,
                "quest_id": quest_id,
                "status": "in_progress",
                "tasks_completed": 0,
                "total_tasks": len(quest["tasks"]),
                "xp_earned": 0,
                "started_at": datetime.utcnow(),
                "completed_at": None,
                "task_progress": {
                    task["id"]: {
                        "status": "pending",
                        "completed_at": None,
                        "xp_earned": 0
                    }
                    for task in quest["tasks"]
                }
            }
            
            result = await db["user_quest_progress"].insert_one(progress)
            
            return {
                "success": True,
                "message": "Quest started!",
                "progress_id": str(result.inserted_id)
            }
        
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def complete_task(self, db, user_id: str, quest_id: str, task_id: str):
        """Mark task as completed"""
        try:
            quest = await self.get_quest(quest_id)
            if not quest:
                return {"success": False, "error": "Quest not found"}
            
            # Find task
            task = None
            for t in quest["tasks"]:
                if t["id"] == task_id:
                    task = t
                    break
            
            if not task:
                return {"success": False, "error": "Task not found"}
            
            # Update progress
            result = await db["user_quest_progress"].update_one(
                {
                    "user_id": user_id,
                    "quest_id": quest_id
                },
                {
                    "$set": {
                        f"task_progress.{task_id}.status": "completed",
                        f"task_progress.{task_id}.completed_at": datetime.utcnow(),
                        f"task_progress.{task_id}.xp_earned": task["xp_reward"]
                    }
                }
            )
            
            # Get updated progress
            progress = await db["user_quest_progress"].find_one({
                "user_id": user_id,
                "quest_id": quest_id
            })
            
            # Count completed tasks
            completed = sum(1 for t in progress["task_progress"].values() if t["status"] == "completed")
            total_xp = sum(t["xp_earned"] for t in progress["task_progress"].values())
            
            # Check if quest complete
            quest_completed = completed == len(quest["tasks"])
            
            # Update user XP
            await db["users"].update_one(
                {"_id": user_id},
                {"$inc": {"total_xp": task["xp_reward"]}}
            )
            
            # If quest complete
            if quest_completed:
                await db["user_quest_progress"].update_one(
                    {
                        "user_id": user_id,
                        "quest_id": quest_id
                    },
                    {
                        "$set": {
                            "status": "completed",
                            "completed_at": datetime.utcnow(),
                            "xp_earned": total_xp
                        }
                    }
                )
            
            return {
                "success": True,
                "task_xp": task["xp_reward"],
                "total_quest_xp": total_xp,
                "tasks_completed": completed,
                "quest_completed": quest_completed,
                "message": "Task completed! Well done!"
            }
        
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def get_user_quest_progress(self, db, user_id: str, quest_id: str):
        """Get user's progress on specific quest"""
        try:
            progress = await db["user_quest_progress"].find_one({
                "user_id": user_id,
                "quest_id": quest_id
            })
            
            if not progress:
                return {"success": False, "error": "No progress found"}
            
            # Convert ObjectId to string
            if "_id" in progress:
                progress["_id"] = str(progress["_id"])
            
            return {"success": True, "progress": progress}
        
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def get_all_user_quests(self, db, user_id: str):
        """Get all user's quest progress"""
        try:
            progress_list = await db["user_quest_progress"].find(
                {"user_id": user_id}
            ).to_list(100)
            
            # Convert ObjectIds
            for p in progress_list:
                if "_id" in p:
                    p["_id"] = str(p["_id"])
            
            return {"success": True, "quests": progress_list}
        
        except Exception as e:
            return {"success": False, "error": str(e)}
