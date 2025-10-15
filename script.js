function updateLength() {
    const length = document.getElementById('length').value;
    document.getElementById('lengthValue').textContent = length;
}

function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;

    if (!uppercase && !lowercase && !numbers && !symbols) {
        alert('Selecione pelo menos uma opção!');
        return;
    }

    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    document.getElementById('passwordOutput').textContent = password;
    checkStrength(password);
}

function checkStrength(password) {
    const meter = document.getElementById('strengthMeter');
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    meter.style.display = 'block';

    if (strength <= 2) {
        meter.className = 'strength-meter strength-weak';
        meter.textContent = '⚠️ Senha Fraca';
    } else if (strength <= 4) {
        meter.className = 'strength-meter strength-medium';
        meter.textContent = '✓ Senha Média';
    } else {
        meter.className = 'strength-meter strength-strong';
        meter.textContent = '✓✓ Senha Forte';
    }
}

function copyPassword() {
    const password = document.getElementById('passwordOutput').textContent;

    if (password === 'Gere uma senha segura') {
        alert('Gere uma senha primeiro!');
        return;
    }

    navigator.clipboard.writeText(password).then(() => {
        const notification = document.getElementById('notification');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    });
}

generatePassword();
