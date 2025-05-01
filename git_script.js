document.addEventListener("DOMContentLoaded", async () => {
    const user = "AndrewWhyte316";

    // Fetch public repos
    const repoRes = await fetch(`https://api.github.com/users/${user}/repos`);
    const repos = await repoRes.json();
    document.querySelectorAll('.stats p')[0].innerText = `${repos.length} Repositories`;

    // Fetch total commits (simplified by counting events)
    const eventsRes = await fetch(`https://api.github.com/users/${user}/events/public`);
    const events = await eventsRes.json();
    const commits = events.filter(e => e.type === "PushEvent")
                            .reduce((sum, e) => sum + e.payload.commits.length, 0);
    document.querySelectorAll('.stats p')[1].innerText = `${commits} Commits`;
});