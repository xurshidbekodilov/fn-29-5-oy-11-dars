const block = document.querySelector(".block");
const button = document.querySelector(".button");

function createCard(value) {
    return `
    <div class="card">
        <h3>${value.name || 'No Name'}</h3>
        <p>Email: ${value.email || 'No Email'}</p>
        <p>Phone: ${value.phone || 'No Phone'}</p>
        <p>Website: ${value.website || 'No Website'}</p>
        <p>ID: ${value.id}</p>
    </div>
    `;
}

button.addEventListener("click", function() {
    fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET"
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 404) {
            throw new Error("API ga noto'g'ri murojaat qilindi");
        }
    })
    .then(data => {
        block.innerHTML = '';
        data.forEach(element => {
            const card = createCard(element);
            block.innerHTML += card;
        });
    })
    .catch(error => {
        console.log("Xato:", error);
    })
    .finally(() => {
        console.log("API ga murojaat tugadi!");
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const urls = [
        "https://jsonplaceholder.typicode.com/comments",
        "https://jsonplaceholder.typicode.com/albums",
        "https://jsonplaceholder.typicode.com/photos",
        "https://jsonplaceholder.typicode.com/todos"
    ];

    urls.forEach(url => {
        fetch(url, {
            method: "GET"
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                throw new Error("API ga noto'g'ri murojaat qilindi");
            }
        })
        .then(data => {
            data.slice(0, 4).forEach(element => {
                const card = createCard(element);
                block.innerHTML += card;
            });
        })
        .catch(error => {
            console.log("Xato:", error);
        })
        .finally(() => {
            console.log("API ga murojaat tugadi!");
        });
    });
});
