let planbox = document.querySelector(".planbox")
let fire = document.querySelectorAll(".fire");
let prize = document.querySelectorAll(".prize")
let endscore = document.querySelector(".endscore h1")
let speedEne = [600, 400, 225, 300];
let h = 850;
let w = window.innerWidth;
let startX, startY, startV, toggle, bv = 1;
if (w > 1000) {
    planbox.style.width = "414px";
    planbox.style.height = h + "px";
}
let pboxW = planbox.offsetWidth;
let pboxH = planbox.offsetHeight;
function timer(ele) {
    planbox.timerBg = setInterval(function () {
        ele.style.backgroundPositionY = (bv++) + "px";//初始背景速度
        if (bv == 768) {
            bv = 0
        }
    }, 10)
}

function random(min, max) {
    num = Math.floor(Math.random() * (max - min + 1) + min)
    return num
}
eneInfo = {
    big: {
        width: 60,
        height: 60,
        blood: 6,
    },
    small: {
        width: 50,
        height: 35,
        blood: 3,
    }
}
myplanInfo = {
    big: {
        width: 60,
        height: 60,
        src: "images/plane_0.png",
        blood: 5,
    },
    small: {
        width: 40,
        height: 40,
        src: "images/plane_1.png",
        blood: 3,
    }
}
startView()
function startView() {
    let selectA = ["简单模式", "一般模式", "困难模式", "VM附体"]
    planbox.innerHTML = "";
    let p = document.createElement("p");
    p.innerHTML = "打 飞 机 v2.0";
    planbox.appendChild(p);
    planbox.style.backgroundImage = "linear-gradient(pink, blue, red)";
    planbox.style.backgroundPositionY = "0px";
    for (let i = 0; i < selectA.length; i++) {
        let div = document.createElement("div");
        div.className = "select";
        div.dataset.i = i;
        div.innerHTML = selectA[i]
        div.addEventListener("click", function () {
            startGame(i);
        })
        planbox.appendChild(div);
    }

}
function startGame(num, e = window.event) {
    planbox.open = true;
    planbox.score = 0;
    planbox.innerHTML = "";
    runPlan = ["big", "small", "small", "small", "small"];
    planbox.style.backgroundImage = "url(images/bg_" + (num + 1) + ".jpg)";
    timer(planbox)
    planbox.eneTimer = setInterval(function () {
        enemy(num, runPlan[random(0, 4)]);
    }, speedEne[num])
    me(e, num, "small");
    planbox.prizeTimer = setInterval(function () {
        creatPrize(["Speed", "Power"][random(0, 1)])
    }, random(5500, 25000))
    scoreRun();
}
function creatPrize(str) {
    let prize = document.createElement("div");
    prize.className = "prize";
    prize.innerHTML = str;
    planbox.appendChild(prize);
    prize.style.left = random(0, pboxW - prize.offsetWidth) + "px"
    prizeSend()
    function prizeSend(str) {
        let myPlan = document.querySelector(".myplan");
        let blood = document.querySelectorAll(".mybloodwrap .blood")
        let mybloodwrap = document.querySelector(".mybloodwrap")
        prize.style.top = prize.offsetTop + random(1, 3) + "px";
        if (prize.offsetTop >= h) {
            planbox.removeChild(prize);
        } else {
            if (planbox.open) {
                if (myPlan.offsetLeft + myPlan.offsetWidth > prize.offsetLeft && myPlan.offsetLeft < (prize.offsetLeft + prize.offsetWidth) && myPlan.offsetTop < (prize.offsetTop + prize.offsetHeight) && myPlan.offsetHeight + myPlan.offsetTop > prize.offsetTop) {
                    planbox.removeChild(prize)
                    if (prize.innerHTML === "Power") {
                        mybloodwrap.innerHTML = "";
                        planbox.myBlood = planbox.myBlood + 1;
                        planbox.myBlood = Math.min(planbox.myBlood, 6)
                        for (let i = 0; i < planbox.myBlood; i++) {
                            let blood = document.createElement("div");
                            blood.className = "blood";
                            mybloodwrap.appendChild(blood);
                        }

                        myPlan.power += 1
                        myPlan.children[0].className = "big";
                        setTimeout(function name(params) {
                            myPlan.children[0].src = "images/plane_0.png";
                        }, 1000)
                        if (myPlan.power > 3) {
                            myPlan.power = 3
                        }
                    }
                    if (prize.innerHTML === "Speed") {
                        myPlan.bullet += 1
                        if (myPlan.bullet > 2) {
                            myPlan.bullet = 2
                        }
                    }
                } else {
                    requestAnimationFrame(prizeSend)
                }
            }
        }
    }

}
function scoreRun() {
    let div = document.createElement("div");
    div.className = "score";
    div.innerHTML = "0"
    planbox.appendChild(div)
}
function enemy(num, runPlan) {
    let img = document.createElement("img"),
        enefire = document.createElement("div"),
        eneblood = document.createElement("div"),
        enebloodwrap = document.createElement("div"),
        ene = document.createElement("div");
    ene.className = "enemy " + runPlan;
    enefire.className = "enefire";
    enebloodwrap.className = "bloodwrap";
    eneblood.className = "blood";
    img.src = "images/enemy_" + runPlan + ".png";
    img.width = eneInfo[runPlan].width;
    img.height = eneInfo[runPlan].height;
    ene.runPlan = runPlan;
    ene.blood = eneInfo[runPlan].blood;
    planbox.appendChild(ene).appendChild(enebloodwrap).appendChild(eneblood);
    ene.appendChild(img);
    planbox.appendChild(enefire);
    ene.style.top = -ene.offsetHeight + "px";
    ene.style.left = random(0, pboxW - ene.offsetWidth) + "px";
    enefire.style.top = ene.offsetTop + ene.offsetHeight / 2 + "px";
    enefire.style.left = ene.offsetLeft + ene.offsetWidth / 2 - 3 + "px";
    ene.speed = random(1, 2);
    eneSend();
    function eneSend(params) {
        let myPlan = document.querySelector(".myplan");
        let blood = document.querySelectorAll(".mybloodwrap .blood")
        let mybloodwrap = document.querySelector(".mybloodwrap")
        ene.style.top = ene.offsetTop + ene.speed + "px";
        if (ene.offsetTop >= h) {
            planbox.removeChild(ene);
        } else {
            if (planbox.open) {
                if (myPlan.offsetLeft + myPlan.offsetWidth > ene.offsetLeft && myPlan.offsetLeft < (ene.offsetLeft + ene.offsetWidth) && myPlan.offsetTop < (ene.offsetTop + ene.offsetHeight) && myPlan.offsetHeight + myPlan.offsetTop > ene.offsetTop) {
                    boom(ene);
                    planbox.myBlood = planbox.myBlood - 1
                    mybloodwrap.innerHTML = "";
                    for (let i = 0; i < planbox.myBlood; i++) {
                        let blood = document.createElement("div");
                        blood.className = "blood";
                        mybloodwrap.appendChild(blood);
                    }
                    if (planbox.myBlood <= 0) {
                        boom(myPlan);
                        gameOver();
                        planbox.open = false;
                    }

                } else {
                    requestAnimationFrame(eneSend);
                }
            }
        }
    }
    eneFireSend();
    var i = random(-0.7, 0.7)
    function eneFireSend() {
        let myPlan = document.querySelector(".myplan"),
            blood = document.querySelectorAll(".mybloodwrap .blood"),
            bloodwrap = document.querySelectorAll(".mybloodwrap"),
            mybloodwrap = document.querySelector(".mybloodwrap");
        enefire.style.top = enefire.offsetTop + 2.5 + "px";
        enefire.style.left = enefire.offsetLeft - i + "px";
        if (enefire.offsetLeft == 0) {
            i = -i;
        }
        if (enefire.offsetLeft == planbox.offsetWidth) {
            i = -i;
        }
        if (enefire.offsetTop >= h) {
            planbox.removeChild(enefire);
        } else {
            if (planbox.open) {
                if (myPlan.offsetLeft + myPlan.offsetWidth > enefire.offsetLeft && myPlan.offsetLeft < (enefire.offsetLeft + enefire.offsetWidth) && myPlan.offsetTop < (enefire.offsetTop + enefire.offsetHeight) && myPlan.offsetHeight + myPlan.offsetTop > enefire.offsetTop) {
                    enefire.remove()
                    planbox.myBlood = planbox.myBlood - 1
                    mybloodwrap.innerHTML = "";
                    for (let i = 0; i < planbox.myBlood; i++) {
                        let blood = document.createElement("div");
                        blood.className = "blood";
                        mybloodwrap.appendChild(blood);
                    }
                    if (planbox.myBlood <= 0) {
                        boom(myPlan);
                        gameOver();
                        planbox.open = false;
                    }

                } else {
                    requestAnimationFrame(eneFireSend);
                }
            }
        }
    }
}
function gameOver() {
    planbox.innerHTML = "";
    let endscore = document.createElement("div"),
        replay = document.createElement("div"),
        h6 = document.createElement("h6"),
        h1 = document.createElement("h1"),
        h4 = document.createElement("h4"),
        h5 = document.createElement("h5");
    endscore.className = "endscore";
    replay.className = "replay";
    h5.innerHTML = "最终得分：";
    h4.innerHTML = "获得评价：";
    h6.innerHTML = planbox.score;
    replay.innerHTML = "重新开始";
    if (planbox.score <=100) {
        h1.innerHTML = "废物";
    } else if (planbox.score<=500) {
        h1.innerHTML = "真渣";
    } else if (planbox.score<=1000) {
        h1.innerHTML = "菜鸡";
    } else if (planbox.score<=2000){
        h1.innerHTML = "哎哟，不错哦";
    } else if (planbox.score<=3000) {
        h1.innerHTML = "nice！";
    } else if (planbox.score<=4000) {
        h1.innerHTML = "你很棒";
    } else if (planbox.score<=5000) {
        h1.innerHTML = "牛批！";
    } else if (planbox.score<=6000) {
        h1.innerHTML = "你可真闲！";
    }else if (6000<planbox.score) {
        h1.innerHTML = "大神！";
    }
    planbox.appendChild(endscore).appendChild(h5).appendChild(h6);
    planbox.appendChild(endscore).appendChild(h4).appendChild(h1);
    planbox.appendChild(replay);
    replay.addEventListener("click", function () {
        startView();
    })
    clearInterval(planbox.timerBg);
    clearInterval(planbox.eneTimer);
    clearInterval(planbox.prizeTimer);
}
function me(e, num, runPlan) {
    let maxTop, maxLeft, minleft;
    let img = document.createElement("img"),
        myplan = document.createElement("div");
    img.src = myplanInfo[runPlan].src;
    img.width = myplanInfo[runPlan].width;
    img.height = myplanInfo[runPlan].height;
    myplan.className = "myplan";
    myplan.runPlan = runPlan;
    myplan.power = 0;
    myplan.bullet = 0;
    myplan.style.zIndex = 3;
    planbox.appendChild(myplan).appendChild(img);
    img.onload = function () {
        maxTop = pboxH - myplan.offsetHeight;
        maxLeft = pboxW - myplan.offsetWidth;
        myplan.style.top = maxTop + "px";
        myplan.style.left = pboxW / 2 - myplan.offsetWidth / 2 + "px";
        myplan.dataset.intX = pboxW / 2 - myplan.offsetWidth / 2;
        myplan.dataset.intY = maxTop;
    }
    blood();
    function blood() {
        planbox.myBlood = 3;
        let bloodwrap = document.createElement("div");
        bloodwrap.className = "mybloodwrap";
        for (let i = 0; i < planbox.myBlood; i++) {
            let blood = document.createElement("div");
            blood.className = "blood";
            planbox.appendChild(bloodwrap).appendChild(blood);
        }
    }
    if (w > 1000) {
        myplan.addEventListener("mousedown", moveMe)
        document.addEventListener("mousemove", moveMe)
        document.addEventListener("mouseup", moveMe)
        function moveMe(e) {
            if (planbox.open) {
                e.preventDefault()
            }
            switch (e.type) {
                case "mousedown":
                    toggle = true
                    startX = e.clientX;
                    startY = e.clientY;
                    myplan.dataset.x = myplan.offsetLeft;
                    myplan.dataset.y = myplan.offsetTop;
                    break;
                case "mousemove":
                    if (toggle) {
                        let mX = e.clientX;
                        let mY = e.clientY;
                        myplan.style.left = parseInt(myplan.dataset.x) + (mX - startX) + "px";
                        myplan.style.top = parseInt(myplan.dataset.y) + (mY - startY) + "px";
                        myplan.style.left = Math.max(myplan.offsetLeft, 0) + "px";
                        myplan.style.left = Math.min(myplan.offsetLeft, maxLeft) + "px"
                        myplan.style.top = Math.max(myplan.offsetTop, 0) + "px";
                        myplan.style.top = Math.min(myplan.offsetTop, maxTop) + "px"
                    }
                    break;
                case "mouseup":
                    toggle = false;
                    myplan.dataset.x = parseInt(myplan.style.left);
                    myplan.dataset.y = parseInt(myplan.style.top);
                    break;
            }
        }
    } else {
        myplan.addEventListener("touchstart", moveMe)
        planbox.addEventListener("touchmove", moveMe)
        planbox.addEventListener("touchend", moveMe)
        function moveMe(e) {
            if (planbox.open) {
                e.preventDefault()
            }
            switch (e.type) {
                case "touchstart":
                    toggle = true
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                    myplan.dataset.x = myplan.offsetLeft;
                    myplan.dataset.y = myplan.offsetTop;
                    break;
                case "touchmove":
                    if (toggle) {
                        mX = e.touches[0].clientX;
                        mY = e.touches[0].clientY;
                        myplan.style.left = parseInt(myplan.dataset.x) + (mX - startX) + "px";
                        myplan.style.top = parseInt(myplan.dataset.y) + (mY - startY) + "px";
                        myplan.style.left = Math.max(myplan.offsetLeft, 0) + "px";
                        myplan.style.left = Math.min(myplan.offsetLeft, maxLeft) + "px";
                        myplan.style.top = Math.max(myplan.offsetTop, 0) + "px";
                        myplan.style.top = Math.min(myplan.offsetTop, maxTop) + "px";
                    }
                    break;
                case "touchend":
                    toggle = false;
                    myplan.dataset.x = parseInt(myplan.style.left);
                    myplan.dataset.y = parseInt(myplan.style.top);
                    break;
            }
        }
    }

    let speed = [500, 450, 400, 350][num],
        bulletS = [8, 10, 12, 14][num];
    myplan.timer = setInterval(function () {
        for (let i = 0; i <= myplan.bullet; i++) {
            send(i, myplan.power, myplan.bullet);
        }
    }, speed)
    function send(i, power, bullet) {
        let fire = document.createElement("img")
        fire.src = "images/fire.png";
        if (power > 0) {
            fire.className = "fire";
        } else {
            fire.className = "fire strong";
        }
        fire.power = power + 1;
        fire.bullet = bullet + 1
        planbox.appendChild(fire);
        fire.style.top = myplan.offsetTop + "px"
        switch (bullet) {
            case 0:
                fire.style.left = myplan.offsetLeft + myplan.offsetWidth / 2 - fire.offsetWidth / 2 + "px"
                break;
            case 1:
                fire.style.left = [myplan.offsetLeft - 20, 20 + myplan.offsetLeft + myplan.offsetWidth - fire.offsetWidth][i] + "px"
                break;
            case 2:
                fire.style.left = [myplan.offsetLeft - 30, myplan.offsetLeft + myplan.offsetWidth / 2 - fire.offsetWidth / 2, 30 + myplan.offsetLeft + myplan.offsetWidth - fire.offsetWidth][i] + "px"
                break;
        }
        runfire();
        function runfire() {
            fire.style.top = fire.offsetTop - bulletS + "px";
            let ene = document.querySelectorAll(".enemy");
            let score = document.querySelector(".score");
            if (fire.offsetTop <= 0) {
                fire.remove();
            } else {
                for (let i = 0; i < ene.length; i++) {
                    if (fire.offsetLeft + fire.offsetWidth > ene[i].offsetLeft && fire.offsetLeft < (ene[i].offsetLeft + ene[i].offsetWidth) && fire.offsetTop < (ene[i].offsetTop + ene[i].offsetHeight) && fire.offsetHeight + fire.offsetTop > ene[i].offsetTop) {
                        planbox.removeChild(fire)
                        ene[i].blood = ene[i].blood - fire.power
                        ene[i].children[0].children[0].style.width = (ene[i].blood / eneInfo[ene[i].runPlan].blood) * ene[i].children[0].clientWidth + "px";
                        if (ene[i].blood <= 0) {
                            if (ene[i].runPlan === "small") {
                                planbox.score += 10;
                            } else {
                                planbox.score += 50;
                            }
                            boom(ene[i])
                            score.innerHTML = planbox.score;
                        }
                    }
                }
                requestAnimationFrame(runfire)
            }
        }
    }
    function creatPrize(str) {
        let div = document.createElement("div");
        div.className = "prize";
        div.attr = str;
        div.innerHTML = str;
        div.style.top = Math.random(0, maxTop) + "px"
        div.style.left = Math.random(0, maxLeft) + "px"
    }
}
function boom(ele) {
    let img = document.createElement("img");
    img.className = "boom";
    img.src = "images/boom_" + ele.runPlan + ".png";
    img.style.width = ele.offsetHeight + "px";
    img.style.height = ele.offsetWidth + "px";
    img.style.left = ele.offsetLeft + "px";
    img.style.top = ele.offsetTop + "px";
    planbox.appendChild(img);
    planbox.removeChild(ele);
    img.addEventListener("webkitAnimationEnd", function (pl) {
        planbox.removeChild(img);
    })
}