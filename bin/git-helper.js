#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import readline from 'readline';

const gitCommands = {
    "📚 Basic Git Commands": [
        { cmd: "git init", desc: "Initialize a new Git repository in the current directory" },
        { cmd: "git clone <url>", desc: "Clone a remote repository to your local machine" },
        { cmd: "git add <file>", desc: "Add a specific file to the staging area" },
        { cmd: "git commit -m \"message\"", desc: "Commit staged changes with a message" },
        { cmd: "git status", desc: "Show the working tree status" }
    ],
    "🌳 Branch Management": [
        { cmd: "git branch", desc: "List all local branches" },
        { cmd: "git checkout <branch>", desc: "Switch to a branch" },
        { cmd: "git checkout -b <name>", desc: "Create and switch to a new branch" },
        { cmd: "git merge <branch>", desc: "Merge a branch into current branch" }
    ],
    "☁️ Remote Repository": [
        { cmd: "git remote", desc: "List all remotes by name" },
        { cmd: "git remote -v", desc: "List remote repositories with URLs" },
        { cmd: "git remote add <name> <url>", desc: "Add a new remote repository" },
        { cmd: "git remote remove <name>", desc: "Remove a remote repository" },
        { cmd: "git remote rename <old> <new>", desc: "Rename a remote repository" },
        { cmd: "git remote set-url <name> <url>", desc: "Change the URL of a remote" },
        { cmd: "git fetch", desc: "Download objects and refs from another repository" },
        { cmd: "git fetch <remote>", desc: "Fetch from a specific remote" },
        { cmd: "git fetch --all", desc: "Fetch from all remotes" },
        { cmd: "git push", desc: "Push commits to the default remote" },
        { cmd: "git push <remote> <branch>", desc: "Push a branch to a specific remote" },
        { cmd: "git push -u <remote> <branch>", desc: "Push and set upstream for the branch" },
        { cmd: "git pull", desc: "Fetch and merge changes from the default remote" },
        { cmd: "git pull <remote> <branch>", desc: "Fetch and merge from a specific remote branch" }
    ]
    // ...add other categories similarly...
};

function displayAllCommandsTable(commandsDatabase) {
    for (const [category, commands] of Object.entries(commandsDatabase)) {
        console.log(`\n=== ${category} ===`);
        console.table(
            commands.map((c, i) => ({
                No: i + 1,
                Command: c.cmd,
                Description: c.desc
            }))
        );
    }
}

displayAllCommandsTable(gitCommands);
