const usersContainer = document.getElementById("users");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const search = document.getElementById("search");

let usersData = [];

async function fetchUsers() {
    try {
        loading.style.display = "block";

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        usersData = await response.json();

        displayUsers(usersData);

        loading.style.display = "none";
    }
    catch(err) {
        loading.style.display = "none";
        error.textContent = err.message;
    }
}

function displayUsers(users) {

    usersContainer.innerHTML = "";

    users.forEach(user => {

        usersContainer.innerHTML += `
        <div class="card">
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Company: ${user.company.name}</p>
        </div>
        `;
    });
}

search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    const filteredUsers = usersData.filter(user =>
        user.name.toLowerCase().includes(value)
    );

    displayUsers(filteredUsers);
});

fetchUsers();
