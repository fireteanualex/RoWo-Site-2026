document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
});

function checkAuth() {
    const teamName = localStorage.getItem("team_name");
    const loginBtns = document.querySelectorAll(".login-btn");

    if (teamName) {
        loginBtns.forEach(btn => {
            btn.innerHTML = `
                <span>Logout </span>
                <span style="display:flex; align-items:center;">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
                        <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
                    </svg>
                </span>
            `;
            btn.onclick = (e) => {
                e.preventDefault();
                logoutUser();
            };
        });
    }
}

async function logoutUser() {
    localStorage.removeItem("team_name");
    await fetch("/logout");
    window.location.href = "/index.html"; // redirect to main page
}

function checkQuizAccess(event) {
    const teamName = localStorage.getItem("team_name");
    if (!teamName) {
        event.preventDefault();
        alert("Eroare: Trebuie să fii conectat pentru a participa la quiz!");
    }
}
