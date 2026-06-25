// ===========================
// Faik's Arcade
// Developed by Faik Pathan
// ===========================

const buttons = document.querySelectorAll(".card button");

buttons.forEach((button, index) => {

    button.addEventListener("click", () => {

        switch (index) {

            case 0:
                window.location.href = "games/snake/index.html";
                break;

            case 1:
                alert("🧩 Tetris - Coming Soon");
                break;

            case 2:
                alert("🚗 Car Racing - Coming Soon");
                break;

            case 3:
                alert("🏍️ Bike Racing - Coming Soon");
                break;

            case 4:
                alert("🏓 Pong - Coming Soon");
                break;

            case 5:
                alert("🧠 2048 - Coming Soon");
                break;

            case 6:
                alert("♟️ Chess - Coming Soon");
                break;

            case 7:
                alert("🎲 Ludo - Coming Soon");
                break;

            default:
                alert("Coming Soon");
        }

    });

});