import React, { useState } from 'react';
import api from '../services/api';

export default function GitHubIntegration() {
  const [username, setUsername] = useState('');
  const [repo, setRepo] = useState('');
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const loadProfile = async () => {
    setLoading(true);
    const res = await api.post('/github/profile', { github_username: username, repo_name: repo });
    setProfile(res.data);
    setLoading(false);
  };

  const trackCommits = async () => {
    setLoading(true);
    const res = await api.post('/github/track_commits', { github_username: username, repo_name: repo });
    setResult(`Commits: ${res.data.commits}, XP: ${res.data.xp_earned}`);
    setLoading(false);
  };

  const trackPRs = async () => {
    setLoading(true);
    const res = await api.post('/github/track_prs', { github_username: username, repo_name: repo });
    setResult(`PRs: ${res.data.pull_requests}, XP: ${res.data.xp_earned}`);
    setLoading(false);
  };

  return (
    <div>
      <h1>GitHub Integration</h1>
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="GitHub username" />
      <input value={repo} onChange={e=>setRepo(e.target.value)} placeholder="Repository name" />
      <button onClick={loadProfile} disabled={loading}>Load Profile</button>
      {profile && (<div>
        <img src={profile.avatar_url} alt="avatar" width={60} />
        <h3>@{profile.username}</h3>
        <div>{profile.bio}</div>
      </div>)}
      <div>
        <button onClick={trackCommits} disabled={loading}>Track Commits</button>
        <button onClick={trackPRs} disabled={loading}>Track PRs</button>
        <div>{result}</div>
      </div>
    </div>
  );
}
