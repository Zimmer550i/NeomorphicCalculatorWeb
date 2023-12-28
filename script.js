const themeToggleBtn = document.getElementById('themeToggle');

storedTheme = localStorage.getItem('theme');
if (storedTheme == 'dark') {
    toggleDark();
    document.getElementById('themeToggle').checked = true;
} else {
    toggleLight();
}

themeToggleBtn.addEventListener('change', function () {
    if (this.checked) {
        toggleDark();
        localStorage.setItem('theme', 'dark');
    } else {
        toggleLight();
        localStorage.setItem('theme', 'light');
    }
})

function toggleDark() {
    playEqualSound();
    document.documentElement.style.setProperty('--bg-color', '#20222e');
    document.documentElement.style.setProperty('--bg-color2', '#25272f');
    document.documentElement.style.setProperty('--calc-color', '#20222e');
    document.documentElement.style.setProperty('--text-color', '#e8ebf1');
    document.documentElement.style.setProperty('--text-color2', '#9fb1df');
    document.documentElement.style.setProperty('--shadow-color', '#313239');
    document.documentElement.style.setProperty('--shadow-color2', '#1a1a21');
}

function toggleLight() {
    playEqualSound();
    document.documentElement.style.setProperty('--bg-color', '#e8ebf1');
    document.documentElement.style.setProperty('--bg-color2', '#f5f6fa');
    document.documentElement.style.setProperty('--calc-color', '#edeef2');
    document.documentElement.style.setProperty('--text-color', '#68738c');
    document.documentElement.style.setProperty('--text-color2', '#0d38a5');
    document.documentElement.style.setProperty('--shadow-color', '#f7f7f9');
    document.documentElement.style.setProperty('--shadow-color2', '#dedfe3');
}

function playSound(){
    const button = document.getElementById('tapSound');
    button.currentTime = 0;
    button.play();
}
function playEqualSound(){
    const button = document.getElementById('equalSound');
    button.currentTime = 0;
    button.play();
}

const result = document.getElementById('calculatorDisplay');
const history1 = document.getElementById('calculatorDisplayHistory');
const history2 = document.getElementById('calculatorDisplayHistory2');
showingRes = false;

function appendRes(value) {
    result.value += value;
    if(result.value[0]==='0'){
        result.value = result.value.slice(0);
    }
    showingRes = false;
    playSound();
}

function backspace() {
    playSound();
    if (showingRes) {
        result.value = '';
    }
    else {
        result.value = result.value.slice(0, -1);
    }
}

function clearDisplay() {
    playEqualSound();
    history1.value = '';
    history2.value = '';
    result.value = '';
}

function calc() {
    playEqualSound();
    history2.value = history1.value;
    history1.value = result.value;
    showingRes = true;

    if (result.value == '') {
        result.value = '0';
    } else if (result.value == 'error') {
        result.value = '';
    } else {
        try {
            result.value = eval(result.value);
        } catch (e) {
            result.value = 'error'
        }
    }
}