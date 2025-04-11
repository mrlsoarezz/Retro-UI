let OPEN_WINDOWS = []
let MINIMIZED = []
let relation = [
    {"name": "paint", "html": `<h1>paint</h1>`},
    {"name": "internet-explorer", "html": `<h1> internet exp </h1>`},
    {"name": "email", "html": `<h1>email</h1>`},
    {"name": "notepad", "html": `<h1>notepad</h1>`},
    {"name": "media-player", "html": `<h1>media player</h1>`},
]

function main() {

    const btns = document.querySelectorAll(".Menu-Btns");
    const menuBTN = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");

    menuBTN.addEventListener("click", () => {
        menu.classList.toggle("Open");
    })

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
                <div class = "Header ${window}">
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
    let width_body = window.getComputedStyle(body).getPropertyValue('width');
    let height_body = window.getComputedStyle(body).getPropertyValue('height');
    const headers = document.querySelectorAll(".Header");
    
    let offsetHeight
    let offsetWidth

    headers.forEach((header) => {
        header.addEventListener('mousedown', (e) => {
            let w = document.getElementById(header.className.split("Header ").join(""))
                
            let X = e.clientX;
            let Y = e.clientY;

            let left = w.offsetLeft;
            let top = w.offsetTop;

            let width = window.getComputedStyle(w).getPropertyValue('width');
            let height = window.getComputedStyle(w).getPropertyValue('height');

            if (left == 0 && top == 0) {
                offsetWidth = parseInt(width_body) - (parseInt(left) + parseInt(width));
                offsetHeight = parseInt(height_body) - (parseInt(top) + parseInt(height));
            }
            

            const Move = (e) => {
               
                let newX = left + e.clientX - X;
                let newY = top + e.clientY - Y;

                if (((newX < offsetWidth && newX >= 0) && ((newY < offsetHeight - 35) && newY >= 0))) {
                    w.style.left = newX + "px";
                    w.style.top = newY + "px";
                }
                
             
            }

            const Stop = (e) => {
                document.removeEventListener("mousemove", Move);
                document.removeEventListener('mouseup', Stop);
            }
            console.log("This is before the move start, left and top value", left, top);

            document.addEventListener('mousemove', Move);
            document.addEventListener('mouseup', Stop);

        })
    })

}

function resizeWindow() {
    const body = document.querySelector("body");

    const border = document.querySelectorAll(".Border");

    border.forEach((b) => {
        b.addEventListener("mousedown", (e) => {

            const WindowOBJ = document.getElementById(b.className.split("Border ").join(""));

            let width_body = parseInt(window.getComputedStyle(body).getPropertyValue('width'));
            let height_body = parseInt(window.getComputedStyle(body).getPropertyValue('height'));  
          
        
            let X = e.clientX;
            let Y = e.clientY;

            let height = WindowOBJ.offsetHeight;
            let width = WindowOBJ.offsetWidth;
            let left = WindowOBJ.offsetLeft;
            let top = WindowOBJ.offsetTop;
        
            const Resize = (e) => {

                let newX = left + e.clientX - X + 'px';
                let newY = top + e.clientY - Y + 'px';

                let newHeight, newWidth

                switch(b.id) {
                    case "border-1": 
                        newHeight = (height - (e.clientY - Y)) + 'px';
                        if (checkProportionValidity(parseInt(newHeight), height_body)) {
                            WindowOBJ.style.top = newY;
                            WindowOBJ.style.height = newHeight;
                        }
                        break
                        case "border-2": 
                        newWidth = (width - (e.clientX - X)) + 'px'
                        if (checkProportionValidity(parseInt(newWidth), width_body)) {
                            WindowOBJ.style.left = newX;
                            WindowOBJ.style.width = newWidth;
                        }
                        break
                    case "border-3":
                        newWidth = (width - (X - e.clientX)) + 'px';
                        if (checkProportionValidity(parseInt(newWidth), width_body)) {
                            WindowOBJ.style.width = newWidth;
                        }
                        break
                    case "border-4":
                        newHeight = (height - (Y- e.clientY))+ 'px';
                        if (checkProportionValidity(parseInt(newHeight), height_body)) {
                            WindowOBJ.style.height = newHeight;
                        }
                        break
                }

                function checkProportionValidity(proportion, background) {
                  
                    if ((proportion < 50) || (proportion > (background * 0.93))) {
                        return false 
                    }
                    else {
                        return true
                    }
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
