const form = document.getElementById('registrationForm');

const fields = {
  fullName: document.getElementById('fullName'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  confirmPassword: document.getElementById('confirmPassword'),
  extracurricular: document.getElementById('extracurricular')
};

const successMessage = document.getElementById('successMessage');

function setFieldState(field, message) {
  const error = document.getElementById(`${field.id}Error`);
  error.textContent = message;
  field.classList.remove('valid', 'invalid');
  field.classList.add(message ? 'invalid' : 'valid');
  return message === '';
}

function validateName() {
  const value = fields.fullName.value.trim();
  if (!value) return setFieldState(fields.fullName, 'Nama lengkap wajib diisi.');
  if (value.length < 3) return setFieldState(fields.fullName, 'Nama lengkap minimal 3 karakter.');
  return setFieldState(fields.fullName, '');
}

function validateEmail() {
  const value = fields.email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!value) return setFieldState(fields.email, 'Email wajib diisi.');
  if (!emailPattern.test(value)) return setFieldState(fields.email, 'Masukkan alamat email dengan format yang benar.');
  return setFieldState(fields.email, '');
}

function validatePassword() {
  const value = fields.password.value;
  if (!value) return setFieldState(fields.password, 'Password wajib diisi.');
  if (value.length < 8) return setFieldState(fields.password, 'Password minimal 8 karakter.');
  const valid = setFieldState(fields.password, '');
  if (fields.confirmPassword.value) validateConfirmPassword();
  return valid;
}

function validateConfirmPassword() {
  const value = fields.confirmPassword.value;
  if (!value) return setFieldState(fields.confirmPassword, 'Konfirmasi password wajib diisi.');
  if (value !== fields.password.value) return setFieldState(fields.confirmPassword, 'Konfirmasi password harus sama persis dengan password.');
  return setFieldState(fields.confirmPassword, '');
}

function validateExtracurricular() {
  if (!fields.extracurricular.value) {
    return setFieldState(fields.extracurricular, 'Silakan pilih ekstrakurikuler.');
  }
  return setFieldState(fields.extracurricular, '');
}

// Validasi real-time saat pengguna mengetik atau memilih opsi.
fields.fullName.addEventListener('input', validateName);
fields.email.addEventListener('input', validateEmail);
fields.password.addEventListener('input', validatePassword);
fields.confirmPassword.addEventListener('input', validateConfirmPassword);
fields.extracurricular.addEventListener('change', validateExtracurricular);

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Mencegah halaman refresh saat form divalidasi.

  const results = [
    validateName(),
    validateEmail(),
    validatePassword(),
    validateConfirmPassword(),
    validateExtracurricular()
  ];

  if (results.every(Boolean)) {
    successMessage.textContent = 'Pendaftaran Berhasil! Semua data sudah valid.';
  } else {
    successMessage.textContent = '';
  }
});
