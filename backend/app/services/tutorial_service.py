from datetime import datetime

class TutorialService:
    """Manage tutorials and learning"""
    
    # Sample tutorials data (in real app, this would be in database)
    TUTORIALS = [
        {
            "id": "git-basics",
            "title": "Git Basics",
            "description": "Learn what Git is and why we use it",
            "content": """
# What is Git?

Git is a **version control system** that tracks changes in code files.

## Why use Git?
- Track history of all changes
- Collaborate with team members
- Revert to previous versions if needed
- Work on different features in parallel

## Key Concepts:
- **Repository**: Folder with your code
- **Commit**: Snapshot of your code at a point in time
- **Branch**: Separate line of development
- **Push**: Upload changes to remote
- **Pull**: Download changes from remote
            """,
            "code_example": "git --version",
            "difficulty": "beginner",
            "xp_reward": 50,
            "order": 1,
            "quiz": [
                {
                    "id": "q1",
                    "question": "What is a Git repository?",
                    "options": [
                        "A folder with version control",
                        "A restaurant",
                        "A type of cloud storage",
                        "A programming language"
                    ],
                    "correct_answer": 0,
                    "explanation": "A repository is a folder where Git tracks all your files and changes."
                },
                {
                    "id": "q2",
                    "question": "What does 'commit' mean in Git?",
                    "options": [
                        "To send code to a friend",
                        "To create a snapshot of code changes",
                        "To delete files",
                        "To merge branches"
                    ],
                    "correct_answer": 1,
                    "explanation": "A commit is a snapshot of your code at a specific point in time."
                }
            ]
        },
        {
            "id": "github-setup",
            "title": "GitHub Account Setup",
            "description": "Create your GitHub account and configure SSH",
            "content": """
# Setting Up GitHub

## Step 1: Create GitHub Account
1. Go to https://github.com
2. Click "Sign Up"
3. Enter email, password, username
4. Complete email verification

## Step 2: Configure Git Locally
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

## Step 3: Generate SSH Key (Recommended)
ssh-keygen -t ed25519 -C "your@email.com"


This creates secure connection without passwords!

## Step 4: Add SSH Key to GitHub
1. Go to GitHub Settings → SSH and GPG keys
2. Click "New SSH Key"
3. Paste your public key
4. Save!

Now you can push without entering password every time.
            """,
            "code_example": "ssh-keygen -t ed25519 -C 'your@email.com'",
            "difficulty": "beginner",
            "xp_reward": 75,
            "order": 2,
            "quiz": [
                {
                    "id": "q1",
                    "question": "What is SSH in Git?",
                    "options": [
                        "A password to GitHub",
                        "A secure way to connect to GitHub",
                        "A type of commit",
                        "A branch name"
                    ],
                    "correct_answer": 1,
                    "explanation": "SSH is a secure protocol for connecting to GitHub without entering password each time."
                }
            ]
        },
        {
            "id": "create-repo",
            "title": "Create Your First Repository",
            "description": "Initialize and create a new Git repository",
            "content": """
# Creating a Repository

## Method 1: Initialize Locally
Create folder
mkdir my-project
cd my-project

Initialize Git
git init

Create a file
echo "# My Project" > README.md

Stage the file
git add README.md

Make first commit
git commit -m "Initial commit"
## Method 2: Clone from GitHub

git clone https://github.com/username/repository.git
cd repository


## What Each Command Does:
- `git init`: Initialize empty repository
- `git add`: Stage files for commit
- `git commit`: Create snapshot
- `git clone`: Copy remote repository locally

## Best Practices:
- Always write meaningful commit messages
- Commit frequently (not just once per day)
- Use clear, descriptive repo names
            """,
            "code_example": "git init && git add README.md && git commit -m 'Initial commit'",
            "difficulty": "beginner",
            "xp_reward": 100,
            "order": 3,
            "quiz": [
                {
                    "id": "q1",
                    "question": "What does 'git init' do?",
                    "options": [
                        "Creates a new GitHub account",
                        "Initializes a Git repository in current folder",
                        "Uploads files to GitHub",
                        "Deletes all files"
                    ],
                    "correct_answer": 1,
                    "explanation": "'git init' creates a new .git folder that tracks your project."
                }
            ]
        },
        {
            "id": "first-commit",
            "title": "Making Your First Commit",
            "description": "Learn how to stage files and create commits",
            "content": """
# Making Commits

A commit is like saving a version of your work.

## The Commit Workflow

### Step 1: Check Status
git status

Shows which files changed since last commit.

### Step 2: Stage Changes
Stage one file
git add filename.txt

Stage all changes
git add .

### Step 3: Commit Changes

git commit -m "Descriptive message about changes"

## Good Commit Messages:
- ✅ "Add login functionality"
- ✅ "Fix bug in user authentication"
- ✅ "Update README with instructions"
- ❌ "fix"
- ❌ "stuff"
- ❌ "asdf"

## View Commit History
git log
git log --oneline # Shorter format
git log --graph # Visual branches


## Undo Recent Changes
Undo uncommitted changes
git checkout filename.txt

Undo last commit (keep changes)
git reset HEAD~1

Undo last commit (delete changes)
git reset --hard HEAD~1

            """,
            "code_example": "git add . && git commit -m 'Add new features'",
            "difficulty": "beginner",
            "xp_reward": 100,
            "order": 4,
            "quiz": [
                {
                    "id": "q1",
                    "question": "What's the correct order to commit?",
                    "options": [
                        "add → commit",
                        "commit → add",
                        "commit only",
                        "add only"
                    ],
                    "correct_answer": 0,
                    "explanation": "First add files to staging area, then commit them."
                }
            ]
        },
        {
            "id": "push-pull",
            "title": "Push and Pull from Remote",
            "description": "Upload and download code from GitHub",
            "content": """
# Push and Pull

## Understanding Remote

A **remote** is a version of your repository on a server (like GitHub).

View your remotes
git remote -v

Add remote (usually done after creating repo on GitHub)
git remote add origin https://github.com/username/repo.git

Remove remote
git remote remove origin

## Pushing to GitHub

Pushing uploads your local commits to GitHub.


Push to main branch
git push origin main

Push a specific branch
git push origin branch-name

Push all branches
git push origin --all

First time setup
git push -u origin main
## Pulling from GitHub

Pulling downloads updates from GitHub.

Pull from main branch
git pull origin main

Same as: git fetch + git merge
## Common Workflow

1. Make changes locally
2. Add files
git add .

3. Commit
git commit -m "My changes"

4. Pull latest from GitHub
git pull origin main
5. Resolve conflicts if any
6. Push your changes
git push origin main

## Troubleshooting

### "fatal: The current branch has no upstream branch"
Solution:
git push -u origin main

### "Updates were rejected"
Solution:
git pull origin main
git push origin main

            """,
            "code_example": "git push origin main && git pull origin main",
            "difficulty": "intermediate",
            "xp_reward": 125,
            "order": 5,
            "quiz": [
                {
                    "id": "q1",
                    "question": "What does 'git push' do?",
                    "options": [
                        "Downloads changes from GitHub",
                        "Uploads local commits to GitHub",
                        "Creates a new branch",
                        "Deletes a repository"
                    ],
                    "correct_answer": 1,
                    "explanation": "'git push' uploads your commits to the remote repository."
                }
            ]
        },
        {
            "id": "branching",
            "title": "Branching and Merging",
            "description": "Work on multiple features simultaneously with branches",
            "content": """
# Branching and Merging

## Why Branches?

Branches let you:
- Work on features without affecting main code
- Work on multiple features simultaneously
- Maintain stability of main branch
- Easy to manage different versions

## Common Branching Strategy

main (production code)
├── feature/login
├── feature/profile
└── bugfix/auth-issue

## Creating Branches

Create and switch to new branch
git checkout -b feature/login

Or (newer syntax)
git switch -c feature/login

List all branches
git branch

Switch to existing branch
git checkout main

Delete branch locally
git branch -d feature/login

Delete branch on GitHub
git push origin --delete feature/login

## Merging Branches

### Method 1: Merge Locally
Switch to main
git checkout main

Pull latest
git pull origin main

Merge feature branch
git merge feature/login

Push merged code
git push origin main


### Method 2: Pull Request on GitHub (Recommended)
1. Push your branch: `git push origin feature/login`
2. Go to GitHub repository
3. Click "New Pull Request"
4. Select base branch (main) and compare branch (feature/login)
5. Add description
6. Click "Create Pull Request"
7. Review, discuss, then merge on GitHub

## Handling Merge Conflicts


If merge fails:
1. Check conflicted files
git status

2. Open files and fix conflicts (marked with <<<<<<, ======, >>>>>>>)
3. Stage resolved files
git add .

4. Complete merge
git commit -m "Merge feature/login into main"

            """,
            "code_example": "git checkout -b feature/new && git merge main",
            "difficulty": "intermediate",
            "xp_reward": 150,
            "order": 6,
            "quiz": [
                {
                    "id": "q1",
                    "question": "Why use branches in Git?",
                    "options": [
                        "To store backup copies",
                        "To work on features without affecting main code",
                        "To delete files safely",
                        "To organize commit messages"
                    ],
                    "correct_answer": 1,
                    "explanation": "Branches let you develop features independently from the main code."
                }
            ]
        },
        {
            "id": "pull-requests",
            "title": "Pull Requests & Code Review",
            "description": "Collaborate with teammates using pull requests",
            "content": """
# Pull Requests (PRs)

## What is a Pull Request?

A Pull Request is a way to:
- Propose changes to a repository
- Request review from teammates
- Discuss changes before merging
- Ensure code quality

## Creating a Pull Request

### Step 1: Create Feature Branch

git checkout -b feature/new-feature

Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature


### Step 2: Open PR on GitHub
1. Go to repository on GitHub
2. Click "Pull requests" tab
3. Click "New pull request"
4. Select branches (base: main, compare: feature/new-feature)
5. Add title: "Add new feature"
6. Add description explaining changes
7. Click "Create pull request"

## PR Description Template


Description
Brief description of changes

Type of change
 Bug fix

 New feature

 Breaking change

How has this been tested?
Explain how you tested this

Checklist
 Code follows style guidelines

 No new warnings

 Self-review completed

 Comments added for clarity

 Documentation updated

 
## Code Review Process

1. **Reviewer reads code**
2. **Leaves comments/suggestions**
3. **Approves or requests changes**
4. **Author responds and updates code**
5. **Once approved: Merge PR**

## Merging PR

After approval, merge options:
Option 1: Squash and merge (combine commits)
Option 2: Create merge commit
Option 3: Rebase and merge

## Deleting After Merge
GitHub auto-deletes branch
Or delete manually:
git branch -d feature/new-feature

            """,
            "code_example": "git push origin feature/name && # Create PR on GitHub",
            "difficulty": "intermediate",
            "xp_reward": 150,
            "order": 7,
            "quiz": [
                {
                    "id": "q1",
                    "question": "What is a PR used for?",
                    "options": [
                        "To store code backup",
                        "To propose changes and request review",
                        "To delete branches",
                        "To create tags"
                    ],
                    "correct_answer": 1,
                    "explanation": "Pull Requests are used to propose changes and facilitate code review."
                }
            ]
        }
    ]
    
    async def get_all_tutorials(self):
        """Get all tutorials"""
        return self.TUTORIALS
    
    async def get_tutorial(self, tutorial_id: str):
        """Get specific tutorial"""
        for tut in self.TUTORIALS:
            if tut["id"] == tutorial_id:
                return tut
        return None
    
    async def get_next_tutorial(self, current_id: str):
        """Get next tutorial in sequence"""
        for tut in self.TUTORIALS:
            if tut["id"] == current_id and tut["order"] < len(self.TUTORIALS):
                return self.TUTORIALS[tut["order"]]
        return None
    
    async def mark_tutorial_complete(
        self, 
        db,
        user_id: str, 
        tutorial_id: str, 
        quiz_score: float
    ):
        """Mark tutorial as completed"""
        try:
            # Calculate XP
            tutorial = await self.get_tutorial(tutorial_id)
            if not tutorial:
                return {"success": False, "error": "Tutorial not found"}
            
            # Award XP (full if score >= 70%)
            xp_earned = tutorial["xp_reward"] if quiz_score >= 70 else int(tutorial["xp_reward"] * quiz_score / 100)
            
            # Save progress
            progress = {
                "user_id": user_id,
                "tutorial_id": tutorial_id,
                "completed": quiz_score >= 70,
                "quiz_score": quiz_score,
                "xp_earned": xp_earned,
                "completed_at": datetime.utcnow().isoformat()
            }
            
            await db["tutorial_progress"].insert_one(progress)
            
            # Update user XP
            await db["users"].update_one(
                {"_id": user_id},
                {"$inc": {"total_xp": xp_earned}}
            )
            
            return {
                "success": True,
                "xp_earned": xp_earned,
                "message": "Tutorial completed!",
                "quiz_score": quiz_score
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def get_user_progress(self, db, user_id: str):
        """Get user's tutorial progress"""
        try:
            progress_list = await db["tutorial_progress"].find(
                {"user_id": user_id}
            ).to_list(100)
            
            return {
                "success": True,
                "progress": progress_list
            }
        except Exception as e:
            return {"success": False, "error": str(e)}

