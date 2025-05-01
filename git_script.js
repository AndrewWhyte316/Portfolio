document.addEventListener("DOMContentLoaded", async () => {
    const user = "AndrewWhyte316";

    // Fetch public repos
    const repoRes = await fetch(`https://api.github.com/users/${user}/repos`);
    const repos = await repoRes.json();
    document.querySelectorAll('.stats p')[0].innerText = `${repos.length} Repositories`;

    // Fetch commit events
    const eventsRes = await fetch(`https://api.github.com/users/${user}/events/public`);
    const events = await eventsRes.json();
    const commits = events.filter(e => e.type === "PushEvent")
                            .reduce((sum, e) => sum + e.payload.commits.length, 0);
    document.querySelectorAll('.stats p')[1].innerText = `${commits} Commits`;

    // Latest project
    if (repos.length > 0) {
        const latest = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0];
        document.querySelectorAll('.stats p')[2].innerText = latest.name;
    }
});
