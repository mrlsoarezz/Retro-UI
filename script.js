let OPEN_WINDOWS = []
let MINIMIZED = []
let relation = [
    {"name": "paint", "html": `<h1>paint</h1>`},
    {"name": "internet-explorer", "html": `<h1> internet exp </h1>`}
]

function main() {

    const btns = document.querySelectorAll(".Menu-Btns");
    btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (btn.className.includes('Closed')) {
                createWindow(btn.id)
                btn.className = btn.className.replace('Closed', 'Open')
            }
        })
    })

}

function createWindow(window) {
    const DESKTOP = document.querySelector(".Desktop");
    const TASKBAR = document.querySelector(".Taskbar");
    for (let i = 0 ; i < relation.length; i++) {
        if (relation[i].name == window) {
            DESKTOP.innerHTML = DESKTOP.innerHTML + `
            <div id = "${window}" class = "Window">
                <div class = "Header">
                    <div class = "Title Container">
                        <img src = "/img/${window}.png">
                        <p>${window}</p>
                    </div>
                    <div class = "Window-Buttons">
                        <button style = "display:none; color: blue"></button>
                        <button id = "minimize" class = "Window-Btns ${window}" style = "background: url('/img/minimize.jpg'); background-size: cover;"></button>
                        <button id = "full" class = "Window-Btns ${window}" style = "background: url('/img/full.jpg'); background-size: cover;"></button>
                        <button id = "close" class = "Window-Btns ${window}" style = "background: url('/img/close.jpg'); background-size: cover;"></button>
                    </div>
                </div>
                <div class = "Border ${window}" id = 'border-1'></div>
                <div class = "Border ${window}" id = 'border-2'></div>
                <div class = "Border ${window}" id = 'border-3'></div>
                <div class = "Border ${window}" id = 'border-4'></div>
                <div class = 'Content'>${relation[i].html}</div>
            </div>`
            TASKBAR.innerHTML = TASKBAR.innerHTML + `
            <div id = "${window}-taskbar" class = "App Title">
                <img src = "/img/${window}.png">
                <p>${window}</p>
            </div>
            `
        }
    }

    moveWindow();
    resizeWindow();
    interactButtons();
}

function moveWindow() {
    const body = document.querySelector("body");
    const header = document.querySelectorAll(".Header");
    const window = document.querySelectorAll(".Window");
    for (let i = 0 ; i < header.length; i++) { 
        header[i].addEventListener("mousedown", (e) => {
            
            let X = e.clientX;
            let Y = e.clientY;

            let left = window[i].offsetLeft;
            let top = window[i].offsetTop;

            const Move = (e) => {
                let newX = left + e.clientX - X;
                let newY = top + e.clientY - Y;

                window[i].style.left = newX + "px";
                window[i].style.top = newY + "px";

            }

            const Stop = (e) => {
                document.removeEventListener("mousemove", Move);
                document.removeEventListener('mouseup', Stop);
            }

            document.addEventListener('mousemove', Move);
            document.addEventListener('mouseup', Stop);
        })
    }
}

function resizeWindow() {
    const border = document.querySelectorAll(".Border");
    border.forEach((b) => {
        b.addEventListener("mousedown", (e) => {
            const window = document.getElementById(b.className.split("Border ").join(""))
            let X = e.clientX;
            let Y = e.clientY;

            let height = window.offsetHeight;
            let width = window.offsetWidth;
            let left = window.offsetLeft;
            let top = window.offsetTop;

            const Resize = (e) => {

                let newX = left + e.clientX - X;
                let newY = top + e.clientY - Y;

                if (b.id == "border-1") {
                    window.style.top = newY + 'px';
                    window.style.height = (height - (e.clientY - Y)) + 'px';
                }

                else if (b.id == "border-2") {
                    window.style.left = newX + 'px';
                    window.style.width = (width - (e.clientX - X)) + 'px'
                }

                else if (b.id == "border-3") {
                    window.style.width = (width - (X - e.clientX)) + 'px'
                }

                else if (b.id == "border-4") {
                    window.style.height = (height - (Y- e.clientY))+ 'px';
                }
             
            }

            const Stop = (e) => {
                document.removeEventListener("mousemove", Resize);
                document.removeEventListener('mouseup', Stop);
            }

            document.addEventListener('mousemove', Resize);
            document.addEventListener('mouseup', Stop);
        })
    })
}

function interactButtons() {
    const btns = document.querySelectorAll(".Window-Btns");
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            let windowName = btn.className.split("Window-Btns ").join("")
            openWindow = document.getElementById(windowName)
            if (btn.id == "full") {
                openWindow.style.height = "90vh"
                openWindow.style.width = "100%"
            }
            else if (btn.id == "minimize") {
                openWindow.style.display = "none";
                MINIMIZED.push(openWindow)
                openMinimizedWindow(openWindow)
            }
            else {
                closeWindow(openWindow)
            }
        })
    })

    function openMinimizedWindow(window) {
        const taskbar = document.querySelectorAll(".App")
        taskbar.forEach((app) => {
            app.addEventListener("click", () => {
                let appReference = app.id.split("-taskbar").join("")
                if (appReference == window.id) {
                    window.style.display = "block";
                }
            })
        })
    }

    function closeWindow(window) {
        let menu = document.getElementsByClassName(`Menu-Btns Open ${window.id}`)
        let taskbar = document.getElementById(`${window.id}-taskbar`)

        menu[0].className = menu[0].className.replace('Open', 'Closed')
        taskbar.remove()
        window.remove()

    }
}

    


main();
